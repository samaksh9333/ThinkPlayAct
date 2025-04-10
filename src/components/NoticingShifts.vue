<template>
  <div class="noticing-shifts-page">
    <!-- Top Hero/Intro Section -->
    <section class="hero-section">
      <h1 class="hero-title">Noticing Shifts</h1>
      <p class="hero-subtitle">Learn how gaming might<br />be playing a role</p>
    </section>

    <!-- "Research Offers Insights" Section with Image on the Left -->
    <section class="content-block image-row">
      <!-- Image Column -->
      <div class="image-col">
        <!-- Replace with your desired image path -->
        <img
          src="src/assets/5.png"
          alt="Research Insights Illustration"
          class="content-image"
        />
      </div>

      <!-- Text Column -->
      <div class="text-col">
        <h3 class="block-heading">
          Seeing Changes in Your Son's Gaming Behaviour
        </h3>
        <h2 class="subheading">Research Offers Insights</h2>
        <p class="block-paragraph">
          As parents, you're often the first to notice subtle shifts in your
          teenager's behaviour. If excessive gaming seems linked to increased
          irritability, withdrawal, or academic struggles, your concerns are
          valid. Research is exploring these connections.
        </p>
        <p class="block-paragraph">
          Studies suggest that significant gaming can be associated with
          emotional and behavioural changes in teens (Anderson et al., 2010).
          The WHO highlights the importance of balanced screen time for
          adolescent mental health (WHO, 2024).
        </p>
        <p class="block-source">
          Source: World Health Organization. (2024, September 25). Retrieved
          from
          <a
            href="https://www.who.int/europe/news/item/25-09-2024-teens--screens-and-mental-health"
            target="_blank"
            >https://www.who.int/europe/news/item/25-09-2024-teens--screens-and-mental-health</a
          >
        </p>
      </div>
    </section>

    <!-- "You Might Be Observing" Section with Image on the Right -->
    <section class="content-block image-row reverse-layout">
      <!-- Text Column -->
      <div class="text-col">
        <h3 class="block-heading">
          Seeing Changes in Your Son's Gaming Behaviour
        </h3>
        <h2 class="subheading">You Might Be Observing</h2>
        <ul class="observing-list">
          <li>
            <strong>Increased Irritability/Aggression:</strong> Some research
            links frequent gaming to heightened aggression in adolescents
            (Anderson et al., 2010).
          </li>
          <li>
            <strong>Sleep Issues:</strong> Late-night gaming can disrupt sleep
            patterns, impacting mood and focus (Anderson et al., 2010).
          </li>
          <li>
            <strong>Social Withdrawal:</strong> Intense gaming can sometimes
            lead to less engagement in real-world relationships (Anderson et
            al., 2010).
          </li>
          <li>
            <strong>Academic Slips:</strong> Time spent gaming can sometimes
            take away from schoolwork (Anderson et al., 2010).
          </li>
        </ul>
        <p class="block-source">
          Source: Anderson, C. A., et al. (2010). Journal of Adolescent Health,
          46(5), 501-505.
        </p>
      </div>

      <!-- Image Column -->
      <div class="image-col">
        <!-- Replace with your desired image path -->
        <img
          src="src/assets/6.png"
          alt="Observations Illustration"
          class="content-image"
        />
      </div>
    </section>

    <!-- "Data Points" Section -->
    <section class="content-block">
      <h3 class="block-heading">
        Seeing Changes in Your Son's Gaming Behaviour
      </h3>
      <h2 class="subheading">Data Points</h2>
      <div class="data-points">
        <div class="data-point">
          <h4 class="data-heading">12%</h4>
          <p class="data-text">
            Around 12% of adolescents are at risk of problematic gaming, with
            boys being more affected than girls (16% vs. 7%) (WHO, 2024).
          </p>
        </div>
        <div class="data-point">
          <h4 class="data-heading">25%</h4>
          <p class="data-text">
            Research also suggests that up to 25% of teen gamers may exhibit
            aggression linked to game content (Anderson et al., 2010).
          </p>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: "NoticingShifts",
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap");

.noticing-shifts-page {
  font-family: "Roboto", sans-serif;
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem;
  color: #333;
  background-color: #f9f9f9;
}

/* Hero / Intro Section */
.hero-section {
  margin-bottom: 2rem;
  padding: 1rem;
  background-color: #fff;
  border-left: 4px solid #3498db;
  border-radius: 4px;
}
.hero-title {
  font-size: 2.2rem;
  margin-bottom: 0.5rem;
}
.hero-subtitle {
  font-size: 1.2rem;
  line-height: 1.4;
  color: #666;
}

/* Content Block */
.content-block {
  margin-bottom: 2rem;
  background-color: #fff;
  padding: 1rem 1.5rem;
  border-radius: 4px;
  box-shadow: 0 0 2px rgba(0, 0, 0, 0.1);
}
.block-heading {
  font-size: 1rem;
  text-transform: uppercase;
  color: #999;
  margin-bottom: 0.5rem;
  letter-spacing: 0.05rem;
}
.subheading {
  font-size: 1.4rem;
  color: #2c3e50;
  margin-bottom: 1rem;
}
.block-paragraph {
  margin-bottom: 1rem;
  line-height: 1.6;
}
.block-source {
  font-size: 0.85rem;
  color: #888;
  margin-top: 1rem;
}

/* Observing List */
.observing-list {
  list-style: none;
  padding-left: 0;
  margin-top: 1rem;
}
.observing-list li {
  margin-bottom: 1rem;
  line-height: 1.6;
}

/* Data Points Section */
.data-points {
  display: flex;
  gap: 2rem;
  flex-wrap: wrap;
  margin-top: 1rem;
}
.data-point {
  flex: 1;
  min-width: 200px;
  background-color: #f4f4f4;
  border-radius: 4px;
  padding: 1rem;
}
.data-heading {
  font-size: 2rem;
  color: #3498db;
  margin-bottom: 0.5rem;
}
.data-text {
  font-size: 1rem;
  line-height: 1.4;
  color: #333;
}

/* Links */
.block-source a {
  color: #3498db;
  text-decoration: underline;
}
.block-source a:hover {
  color: #217dbb;
}

/* Image + Text Row (for side-by-side layout) */
.image-row {
  display: flex;
  align-items: flex-start;
  gap: 1.5rem;
}
.image-col {
  flex: 1;
  max-width: 50%;
  /* Ensure images don’t overflow the container */
  overflow: hidden;
}
.text-col {
  flex: 1;
}
.content-image {
  width: 100%;
  height: auto;
  border-radius: 4px;
  object-fit: contain;
}
.reverse-layout {
  flex-direction: row-reverse;
}

/* Responsive for small screens */
@media (max-width: 768px) {
  .image-row {
    flex-direction: column !important;
  }
  .image-col,
  .text-col {
    max-width: 100% !important;
  }
  .reverse-layout {
    flex-direction: column !important;
  }
}
</style>
