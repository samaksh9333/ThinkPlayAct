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
            <li><router-link to="/" class="nav-link">Home</router-link></li>
            <!-- Additional nav items commented out -->
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
      </section>

      <!-- Word Cloud Section -->
      <section class="wordcloud-section">
        <h2 class="section-heading">Negative Word Cloud</h2>
        <div class="word-cloud">
          <span
            v-for="wordObj in processedWords"
            :key="wordObj.original"
            :style="randomStyle()"
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

    // Negative keyword arrays (should match your backend arrays)
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

    // Determine the category for a given word (assumes lowercase)
    const getCategory = (word) => {
      const categories = [];
      if (badLanguageWords.includes(word)) categories.push("HasBadLanguage");
      if (racistWords.includes(word)) categories.push("IsRacist");
      if (noobWords.includes(word)) categories.push("NoobRelated");
      specificTargetPhrases.forEach((phrase) => {
        phrase.split(" ").forEach((w) => {
          if (w === word && !categories.includes("SpecificTarget"))
            categories.push("SpecificTarget");
        });
      });
      return categories.join(", ") || "Negative";
    };

    // Censor a word by replacing one random letter with an asterisk.
    const censorWord = (word) => {
      if (word.length === 0) return word;
      const idx = Math.floor(Math.random() * word.length);
      return word.substring(0, idx) + "*" + word.substring(idx + 1);
    };

    // Process rawWords into objects with original, censored, and category info.
    const processedWords = computed(() => {
      return rawWords.value
        .filter(
          (w) =>
            w.toLowerCase() !== "you" &&
            w.toLowerCase() !== "your" &&
            w.trim() !== ""
        )
        .map((w) => ({
          original: w,
          censored: censorWord(w),
          category: getCategory(w.toLowerCase()),
        }));
    });

    // Generate random style for each word.
    // Using CSS Grid: words will be placed in grid cells (ensuring no overlap),
    // but we add random rotation to simulate a "floating" look.
    const randomStyle = () => {
      const size = Math.floor(Math.random() * 20) + 40; // Font size between 40px and 60px
      const colors = ["#3498db", "#e74c3c", "#2ecc71", "#9b59b6", "#f1c40f"];
      const color = colors[Math.floor(Math.random() * colors.length)];
      const rotation = Math.floor(Math.random() * 21) - 10; // Rotation between -10deg and +10deg
      return {
        fontSize: `${size}px`,
        color: color,
        transform: `rotate(${rotation}deg)`,
        textAlign: "center",
      };
    };

    // Fetch aggregated data for the bar graph from the backend using environment variable
    const fetchChartData = async () => {
      try {
        const response = await axios.get(
          `${process.env.VUE_APP_API_URL}/api/word-types`
        );
        const data = response.data;
        const labels = Object.keys(data);
        const values = Object.values(data);
        chartData.value = {
          labels,
          datasets: [
            {
              label: "Word Type Counts",
              data: values,
              backgroundColor: "#3498db",
            },
          ],
        };
      } catch (error) {
        console.error("Error fetching word types data:", error);
      }
    };

    // Fetch unique negative words for the word cloud using backend endpoint
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
      randomStyle,
    };
  },
});
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap");

/* CSS Variables (same as homepage) */
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
}

/* Background Video (same as homepage) */
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

/* Navbar (same as homepage) */
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
  transition: color 0.3s;
}
.nav-link:hover {
  color: var(--accent-color);
}

/* Content Area (same as homepage) */
.content-area {
  max-width: 1200px;
  margin: 4rem auto 2rem;
  padding: 0 1rem;
  z-index: 1;
}

/* Section Headings (same as homepage) */
.section-heading {
  font-size: 2rem;
  color: var(--primary-color);
  margin-bottom: 1rem;
}

/* Chart Container (same as homepage) */
.chart-container {
  position: relative;
  height: 300px;
  width: 100%;
  margin: 1rem 0;
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 1rem;
}

/* Word Cloud Container using CSS Grid to ensure non-overlap while fitting the style */
.word-cloud {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 15px;
  padding: 1rem;
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 8px;
  min-height: 300px;
}

/* Footer (same as homepage) */
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

/* Responsive Styles (same as homepage) */
@media (max-width: 768px) {
  .hero-container {
    flex-direction: column;
    align-items: center;
  }
  .hero-image,
  .hero-content {
    width: 100%;
    text-align: center;
    height: auto;
  }
  .text-layer {
    height: auto;
  }
  .cards {
    flex-direction: column;
  }
  .card {
    flex: 1 1 100%;
  }
}
</style>
