const express = require("express");
const { Pool } = require("pg");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const pool = new Pool({
  user: process.env.DB_USER || "IE5021_ADMIN",
  host: process.env.DB_HOST || "ie-server.postgres.database.azure.com",
  database: process.env.DB_DATABASE || "postgres",
  password: process.env.DB_PASSWORD || "IEproject21",
  port: process.env.DB_PORT || 5432,
  ssl: { rejectUnauthorized: false },
});

/*
  Define keyword arrays for each category:
  - IsPositive: e.g. "thanks", "good job"
  - HasBadLanguage: explicit swear words
  - IsRacist: negative sentiments aimed at a group
  - NoobRelated: "noob", "newbie", etc.
  - SpecificTarget: "you suck", "you are useless", etc.
  - FilteredText: e.g. "****"
*/
const positiveWords = [
  "well played",
  "thanks",
  "good job",
  "nice",
  "great",
  "awesome",
  "fantastic",
  "bravo",
];
const badLanguageWords = [
  "fuck",
  "cunt",
  "bitch",
  "asshole",
  "dick",
  "piss",
  "shit",
];
const racistWords = ["nigger", "chink", "spic", "kike", "towelhead"];
const noobWords = ["noob", "newbie", "rookie"];
const specificTargetPhrases = [
  "you suck",
  "your team sucks",
  "you are useless",
];
const filteredPattern = /\*{2,}/; // e.g. "you ****"

// Function to censor bad language and racist words
function censorMessage(msg) {
  let censored = msg;
  badLanguageWords.forEach((word) => {
    const regex = new RegExp(word, "gi");
    censored = censored.replace(regex, "****");
  });
  racistWords.forEach((word) => {
    const regex = new RegExp(word, "gi");
    censored = censored.replace(regex, "****");
  });
  return censored;
}

// Function to classify a message
function classifyMessage(msg) {
  const cleaned = msg.replace(/[^\w\s]/gi, "").toLowerCase();
  let result = {
    IsAbusive: 0,
    IsPositive: 0,
    HasBadLanguage: 0,
    IsRacist: 0,
    NoobRelated: 0,
    SpecificTarget: 0,
    FilteredText: 0,
  };

  if (filteredPattern.test(msg)) {
    result.FilteredText = 1;
  }
  if (positiveWords.some((phrase) => cleaned.includes(phrase))) {
    result.IsPositive = 1;
  }
  if (badLanguageWords.some((word) => cleaned.includes(word))) {
    result.HasBadLanguage = 1;
  }
  if (racistWords.some((word) => cleaned.includes(word))) {
    result.IsRacist = 1;
  }
  if (noobWords.some((word) => cleaned.includes(word))) {
    result.NoobRelated = 1;
  }
  if (specificTargetPhrases.some((phrase) => cleaned.includes(phrase))) {
    result.SpecificTarget = 1;
  }
  if (
    result.HasBadLanguage ||
    result.IsRacist ||
    result.NoobRelated ||
    result.SpecificTarget ||
    result.FilteredText
  ) {
    result.IsAbusive = 1;
  }
  return result;
}

// Compute score using your rules (unchanged from before)
function computeScore(classification, negativeCount) {
  let score = 0;
  let explanation = [];

  if (classification.IsPositive) {
    score -= 1;
    explanation.push("Positive(-1)");
    if (classification.SpecificTarget) {
      score -= 3;
      explanation.push("specific(-3)");
    }
    return { score, explanation };
  } else {
    score += 1;
    explanation.push("negative(+1)");
    if (classification.NoobRelated) {
      score += 1;
      explanation.push("noob(+1)");
    }
    if (classification.HasBadLanguage || classification.FilteredText) {
      score += 2;
      explanation.push("badLang/filtered(+2)");
    }
    if (classification.IsRacist) {
      score += 2;
      explanation.push("racist(+2)");
    }
    if (classification.SpecificTarget) {
      score += 3;
      explanation.push("specific(+3)");
    }
    if (score > 0) {
      score += negativeCount;
      explanation.push(`repeatedNeg(+${negativeCount})`);
    }
  }
  return { score, explanation };
}

// Endpoint 1: /api/word-types (for the bar graph)
app.get("/api/word-types", async (req, res) => {
  try {
    const result = await pool.query("SELECT messages FROM communication_data");
    const rows = result.rows;
    let aggregated = {
      IsAbusive: 0,
      IsPositive: 0,
      HasBadLanguage: 0,
      IsRacist: 0,
      NoobRelated: 0,
      SpecificTarget: 0,
      FilteredText: 0,
    };

    rows.forEach((row) => {
      const c = classifyMessage(row.messages);
      for (let key in c) {
        aggregated[key] += c[key];
      }
    });

    res.json(aggregated);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database error" });
  }
});

// Endpoint 2: /api/random-comments remains unchanged (if still used)
// (We will now add a new endpoint for the word cloud)

// Endpoint 3: /api/negative-words - Returns a unique list of negative words (censored)
app.get("/api/negative-words", async (req, res) => {
  try {
    // Fetch all messages (or you could limit to a sample)
    const result = await pool.query("SELECT messages FROM communication_data");
    const rows = result.rows;
    const negativeWordsSet = new Set();

    rows.forEach((row) => {
      const msg = row.messages;
      const classification = classifyMessage(msg);
      // Consider only messages that have any negative flag
      if (
        classification.HasBadLanguage ||
        classification.IsRacist ||
        classification.NoobRelated ||
        classification.SpecificTarget ||
        classification.FilteredText
      ) {
        // Tokenize the message
        const tokens = msg
          .replace(/[^\w\s]/g, "")
          .toLowerCase()
          .split(/\s+/);
        tokens.forEach((token) => {
          // If token belongs to any negative category arrays, add it
          if (
            badLanguageWords.includes(token) ||
            racistWords.includes(token) ||
            noobWords.includes(token)
          ) {
            negativeWordsSet.add(token);
          }
          // For specific target phrases, add each individual word from the phrase
          specificTargetPhrases.forEach((phrase) => {
            phrase.split(" ").forEach((w) => {
              if (token === w) {
                negativeWordsSet.add(token);
              }
            });
          });
        });
      }
    });

    res.json(Array.from(negativeWordsSet));
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database error" });
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
