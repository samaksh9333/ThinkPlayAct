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
            <!-- <li>
              <router-link to="/about" class="nav-link">About</router-link>
            </li>
            <li>
              <router-link to="/resources" class="nav-link"
                >Resources</router-link
              >
            </li>
            <li>
              <router-link to="/contact" class="nav-link">Contact</router-link>
            </li> -->
          </ul>
        </nav>
      </div>
    </header>

    <!-- Hero Section with Carousel and Text Box -->
    <section class="hero">
      <div class="container hero-container">
        <!-- Image Carousel (Left Column) -->
        <div class="hero-image">
          <transition name="fade" mode="out-in">
            <img
              v-if="images.length"
              :src="images[currentImage]"
              :key="images[currentImage]"
              alt="Gaming Related Image"
              class="carousel-image"
            />
          </transition>
        </div>

        <!-- Text Content (Right Column) with Translucent Overlay -->
        <div class="hero-content">
          <div class="text-layer hero-textbox">
            <h1 class="hero-title">
              Observing New Behaviours in Your Teenage Boy Related to Gaming?
            </h1>
            <p class="hero-description">
              Delve into the factors influencing these changes, understand the
              impact of the gaming world, and learn what subtle cues to look
              for.
            </p>
            <button class="cta-button">Know More</button>
          </div>
        </div>
      </div>
    </section>

    <!-- "Their Game World" Section -->
    <section class="section game-world">
      <div class="container game-world-container">
        <!-- Small black box around the heading -->
        <div class="section-title-box">
          <h2 class="section-title">Their Game World</h2>
        </div>
        <!-- Cards row -->
        <div class="cards">
          <div class="card text-layer">
            <h3 class="card-title">Identifying Influences</h3>
            <p class="card-text">
              Explore common signs of gaming-related behavioral changes and
              potential triggers.
            </p>
          </div>
          <div class="card text-layer">
            <h3 class="card-title">Decoding Digital Life</h3>
            <p class="card-text">
              Understand how in-game experiences might shape offline
              interactions and friendships.
            </p>
          </div>
          <div class="card text-layer">
            <h3 class="card-title">Gaming’s Pull</h3>
            <p class="card-text">
              Dive into the immersive nature of modern games and how they keep
              teens hooked.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- "Understanding Their Play" Section with Clickable Keyboard Image -->
    <section class="section understanding-play">
      <div class="container">
        <div class="text-layer">
          <h2 class="section-title">Understanding Their Play</h2>
          <div class="placeholder-image">
            <!-- The keyboard.png image is wrapped in a router-link for navigation -->
            <router-link to="/word-types">
              <img
                src="@/assets/keyboard.png"
                alt="Keyboard"
                class="keyboard-img"
              />
            </router-link>
          </div>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer class="footer">
      <div class="container footer-container">
        <div class="text-layer footer-textbox">
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
export default {
  name: "HomePage",
  data() {
    return {
      images: [
        require("@/assets/image1.png"),
        require("@/assets/image2.png"),
        require("@/assets/image3.png"),
        require("@/assets/image4.png"),
      ],
      currentImage: 0,
      intervalId: null,
    };
  },
  mounted() {
    // Automatically switch images every 3.5 seconds
    this.intervalId = setInterval(() => {
      this.currentImage = (this.currentImage + 1) % this.images.length;
    }, 3500);
  },
  beforeUnmount() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap");

:root {
  --primary-color: #000; /* Black shade */
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
  overflow-x: hidden;
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
}

/* Hero Section */
.hero-container {
  display: flex;
  align-items: stretch;
  justify-content: space-between;
  gap: 1.5rem;
  flex-wrap: nowrap;
  height: 400px;
  margin-top: 2rem; /* Moves hero down from navbar */
  margin-left: 2rem;
}
.hero-image,
.hero-content {
  width: 50%;
  height: 100%;
}
.carousel-image {
  width: 100%;
  height: 100%;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  object-fit: cover;
}

/* Text Layer: Black translucent overlay */
.text-layer {
  background: rgba(0, 0, 0, 0.6);
  color: #fff;
  width: 90%;
  height: 90%;
  padding: 20px;
  border-radius: 8px;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.hero-title {
  font-size: 2.5rem;
  margin-bottom: 1rem;
}
.hero-description {
  font-size: 1.2rem;
  margin-bottom: 1.5rem;
}
.cta-button {
  background-color: var(--accent-color);
  color: var(--secondary-color);
  border: none;
  padding: 0.8rem 1.5rem;
  font-size: 1rem;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}
.cta-button:hover {
  background-color: #217dbb;
}

/* Section Titles */
.section-title {
  text-align: center;
  font-size: 2rem;
  margin: 0;
}
/* Update: Change text color of "Their Game World" heading to white */
.section-title-box .section-title {
  color: #fff;
}

/* "Their Game World" Section */
.game-world-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 3rem 1rem; /* Spacing around the section */
  text-align: center;
}
.section-title-box {
  display: inline-block;
  background: rgba(0, 0, 0, 0.6);
  border-radius: 8px;
  padding: 5px 15px;
  margin-bottom: 2rem;
}
.cards {
  display: flex;
  gap: 1.5rem;
  justify-content: center; /* Center all cards horizontally */
  flex-wrap: wrap;
}
.card.text-layer {
  background: rgba(0, 0, 0, 0.655);
  color: #fff;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.4);
  transition: transform 0.3s, box-shadow 0.3s;
  width: 300px; /* Fixed width for uniform cards */
}
.card.text-layer:hover {
  transform: translateY(-5px);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.6);
}
.card-title {
  font-size: 1.4rem;
  margin-bottom: 0.75rem;
}
.card-text {
  font-size: 1rem;
  line-height: 1.5;
}

/* "Understanding Their Play" Section */
.section.understanding-play {
  padding: 3rem 0;
}
.placeholder-image img {
  width: 100%;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

/* Word Cloud Section */
.wordcloud-section {
  margin-bottom: 2rem;
}
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
.footer-textbox {
  background: rgba(0, 0, 0, 0.6);
  padding: 20px;
  border-radius: 8px;
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

/* Responsive */
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
  .hero-title {
    font-size: 2rem;
  }
  .hero-description {
    font-size: 1rem;
  }
  .cards {
    flex-direction: column;
    align-items: center;
  }
  .card.text-layer {
    width: 100%;
    max-width: 400px;
  }
}
</style>
