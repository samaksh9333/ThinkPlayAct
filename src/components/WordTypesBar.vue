<template>
  <div class="home-page">
    <!-- Background Video -->
    <video id="bg-video" autoplay muted loop>
      <source src="@/assets/tetris.mp4" type="video/mp4" />
      Your browser does not support HTML5 video.
    </video>

    <!-- Top Navigation Bar -->
    <header class="navbar">
      <div class="container navbar-container">
        <div class="logo">
          <img
            src="@/assets/icon.png"
            alt="Digital Parenting Icon"
            class="logo-icon"
          />
          <span class="logo-text">ThinkPlayAct</span>
        </div>
        <nav class="nav-menu">
          <ul>
            <li>
              <router-link to="/" class="nav-link">Home</router-link>
            </li>
            <!-- Additional nav items can be added if needed -->
          </ul>
        </nav>
      </div>
    </header>

    <!-- Main Content Area -->
    <main class="content-area">
      <!-- Bar Graph Section -->
      <section class="graph-section">
        <h2 class="section-heading">Word Types Usage</h2>
        <div class="chart-container">
          <Bar v-if="chartData" :data="chartData" :options="chartOptions" />
        </div>
        <!-- Chart Description Box -->
        <div class="chart-description text-layer">
          <p>
            The bar graph displays the aggregated counts of different word types
            derived from in-game chat data. Each bar is uniquely color-coded:<br />
            <strong style="color: #e74c3c">HasBadLanguage</strong> (red),
            <strong style="color: #2ecc71">IsPositive</strong> (green),
            <strong style="color: #d35400">HasBadLanguage</strong> (burnt
            orange), <strong style="color: #9b59b6">IsRacist</strong> (purple),
            <strong style="color: #f1c40f">NoobRelated</strong> (yellow),
            <strong style="color: #e67e22">SpecificTarget</strong> (orange), and
            <strong style="color: #34495e">FilteredText</strong> (dark
            blue/gray).<br /><br />
            <em>
              Source: Murnion et al. (2018), "Machine learning and semantic
              analysis of in-game chat for cyber bullying", Computers &amp;
              Security, 76. DOI: 10.1016/j.cose.2018.02.016
            </em>
          </p>
        </div>
      </section>

      <!-- Word Cloud Section -->
      <section class="wordcloud-section">
        <h2 class="section-heading">Negative Word Cloud</h2>
        <div class="word-cloud">
          <span
            v-for="wordObj in processedWords"
            :key="wordObj.original"
            :style="wordStyle(wordObj)"
            :title="wordObj.category"
          >
            {{ wordObj.censored }}
          </span>
        </div>
      </section>
    </main>

    <!-- Footer -->
    <footer class="footer">
      <div class="container footer-container">
        <div class="text-layer">
          <p>© 2025 Digital Parenting. All rights reserved.</p>
          <div class="footer-links">
            <router-link to="/privacy" class="footer-link"
              >Privacy Policy</router-link
            >
            <router-link to="/terms" class="footer-link"
              >Terms of Use</router-link
            >
            <router-link to="/contact" class="footer-link">Contact</router-link>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
import { defineComponent, ref, computed, onMounted } from "vue";
import axios from "axios";
import { Bar } from "vue-chartjs";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
);

export default defineComponent({
  name: "WordTypesBar",
  components: { Bar },
  setup() {
    const chartData = ref(null);
    const chartOptions = ref({
      responsive: true,
      maintainAspectRatio: false,
      scales: { y: { beginAtZero: true, ticks: { stepSize: 1 } } },
    });

    const rawWords = ref([]);

    // Local positive words which remain uncensored.
    const positiveWordsClient = [
      "well played",
      "good job",
      "nice",
      "awesome",
      "fantastic",
      "bravo",
    ];

    // Mapping of word categories to colors.
    const categoryColors = {
      IsPositive: "#2ecc71", // Green
      HasBadLanguage: "#d35400", // Burnt Orange
      IsRacist: "#9b59b6", // Purple
      NoobRelated: "#f1c40f", // Yellow
      SpecificTarget: "#e67e22", // Orange
      FilteredText: "#34495e", // Dark Blue/Gray
      Negative: "#3498db", // Default blue for unspecified negative
    };

    // Negative keyword arrays.
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

    // Determine the category for a given word (assumes lowercase).
    const getCategory = (word) => {
      const categories = [];
      if (positiveWordsClient.includes(word)) categories.push("IsPositive");
      if (badLanguageWords.includes(word)) categories.push("HasBadLanguage");
      if (racistWords.includes(word)) categories.push("IsRacist");
      if (noobWords.includes(word)) categories.push("NoobRelated");
      specificTargetPhrases.forEach((phrase) => {
        phrase.split(" ").forEach((w) => {
          if (w === word && !categories.includes("SpecificTarget"))
            categories.push("SpecificTarget");
        });
      });
      return categories.length ? categories.join(", ") : "Negative";
    };

    // Censor a word by replacing one random letter with an asterisk unless it's a positive word.
    const censorWord = (word) => {
      if (positiveWordsClient.includes(word.toLowerCase())) {
        return word; // Do not censor positive words.
      }
      if (word.length === 0) return word;
      const idx = Math.floor(Math.random() * word.length);
      return word.substring(0, idx) + "*" + word.substring(idx + 1);
    };

    // Merge backend negative words with local positive words.
    const mergedWords = computed(() => {
      return [...rawWords.value, ...positiveWordsClient];
    });

    // Process merged words into objects with original, censored, and category info.
    const processedWords = computed(() => {
      return mergedWords.value
        .filter((w) => w.trim() !== "")
        .map((w) => {
          const lower = w.toLowerCase();
          return {
            original: w,
            censored: censorWord(w),
            // Use only the first category if there are multiple
            category: getCategory(lower).split(", ")[0],
          };
        });
    });

    // Generate a style for each word in the cloud.
    const wordStyle = (wordObj) => {
      const size = Math.floor(Math.random() * 20) + 40; // Font size between 40px and 60px.
      const color = categoryColors[wordObj.category] || "#3498db";
      const rotation = Math.floor(Math.random() * 21) - 10; // Rotation between -10deg and +10deg.
      return {
        fontSize: `${size}px`,
        color: color,
        transform: `rotate(${rotation}deg)`,
        textAlign: "center",
        margin: "5px",
        display: "inline-block",
        overflowWrap: "break-word",
      };
    };

    // Fetch aggregated data for the bar graph from the backend using the environment variable.
    const fetchChartData = async () => {
      try {
        const response = await axios.get(
          `${process.env.VUE_APP_API_URL}/api/word-types`
        );
        const data = response.data;
        const labels = Object.keys(data);
        const values = Object.values(data);
        // Map labels to their corresponding colors.
        const backgroundColors = labels.map(
          (label) => categoryColors[label] || "#3498db"
        );
        chartData.value = {
          labels,
          datasets: [
            {
              label: "Word Type Counts",
              data: values,
              backgroundColor: backgroundColors,
            },
          ],
        };
      } catch (error) {
        console.error("Error fetching word types data:", error);
      }
    };

    // Fetch unique negative words for the word cloud using the backend endpoint.
    const fetchNegativeWords = async () => {
      try {
        const response = await axios.get(
          `${process.env.VUE_APP_API_URL}/api/negative-words`
        );
        rawWords.value = response.data;
      } catch (error) {
        console.error("Error fetching negative words:", error);
      }
    };

    onMounted(() => {
      fetchChartData();
      fetchNegativeWords();
    });

    return {
      chartData,
      chartOptions,
      rawWords,
      processedWords,
      wordStyle,
    };
  },
});
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap");

:root {
  --primary-color: #2c3e50;
  --secondary-color: #ffffff;
  --accent-color: #3498db;
  --light-gray: #f7f7f7;
  --dark-gray: #555555;
  --font-family: "Roboto", sans-serif;
}

.home-page {
  font-family: var(--font-family);
  color: var(--dark-gray);
  background-color: var(--secondary-color);
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

/* Background Video */
#bg-video {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: contain;
  filter: blur(8px);
  z-index: -1;
}

/* Navbar */
.navbar {
  background-color: var(--primary-color);
  color: var(--secondary-color);
  padding: 1rem 0;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
.navbar-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.logo {
  display: flex;
  align-items: center;
}
.logo-icon {
  width: 50px;
  height: 50px;
  margin-right: 0.5rem;
}
.logo-text {
  font-size: 1.8rem;
  font-weight: 700;
}
.nav-menu ul {
  list-style: none;
  display: flex;
  gap: 1.5rem;
}
.nav-link {
  color: var(--secondary-color);
  text-decoration: none;
  font-size: 1rem;
  margin: 2rem;
  transition: color 0.3s;
}
.nav-link:hover {
  color: var(--accent-color);
}

/* Content Area */
.content-area {
  max-width: 1200px;
  margin: 4rem auto 2rem;
  padding: 0 1rem;
  z-index: 1;
  /* For mobile, we reserve space so content doesn't shift */
  min-height: calc(100vh - 180px); /* approximate height for header+footer */
}

/* Section Headings */
.section-heading {
  font-size: 2rem;
  color: var(--primary-color);
  margin-bottom: 1rem;
}

/* Chart Container */
.chart-container {
  position: relative;
  height: 300px;
  width: 100%;
  margin: 1rem 0;
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 1rem;
  min-height: 300px; /* reserve space */
  overflow-y: auto;
}

/* Chart Description Box */
.chart-description {
  margin-top: 1rem;
  padding: 1rem;
  background: rgba(0, 0, 0, 0.6);
  border-radius: 8px;
  color: #fff;
  text-align: center;
  font-size: 1.2rem;
}

/* Word Cloud Container using CSS Grid */
.word-cloud {
  display: grid;
  grid-template-columns: repeat(minmax(150px, 1fr));
  gap: 15px;
  padding: 1rem;
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 8px;
  min-height: 300px; /* reserve space */
  overflow-y: auto;
}

/* Footer */
.footer {
  background-color: var(--primary-color);
  color: var(--secondary-color);
  padding: 1.5rem 0;
  text-align: center;
  margin-top: auto;
}
.footer-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}
.footer-links a {
  color: var(--secondary-color);
  text-decoration: none;
  margin: 0 0.5rem;
  font-size: 0.9rem;
  transition: text-decoration 0.3s;
}
.footer-links a:hover {
  text-decoration: underline;
}

/* Responsive Styles */
@media (max-width: 768px) {
  .hero-container {
    flex-direction: column;
    align-items: center;
    height: auto;
    margin-top: 1rem;
  }
  .hero-image,
  .hero-content {
    width: 100%;
    text-align: center;
    height: auto;
  }
  .text-layer {
    width: 95%;
    height: auto;
    padding: 15px;
  }
  .chart-container {
    height: 250px;
    min-height: 250px;
    overflow-y: auto;
  }
  .word-cloud {
    grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
    gap: 10px;
    padding: 0.5rem;
    height: 250px;
    min-height: 250px;
    overflow-y: auto;
  }
}

@media (max-width: 480px) {
  .content-area {
    padding: 0 0.5rem;
  }
  .section-heading {
    font-size: 1.75rem;
  }
  .logo-text {
    font-size: 1.5rem;
  }
  .nav-link {
    font-size: 0.9rem;
  }
  .footer-textbox,
  .text-layer {
    font-size: 0.9rem;
  }
}
</style>
