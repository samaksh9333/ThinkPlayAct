<template>
  <div class="gaming-pull-page">
    <!-- Page Header (White Box with Blue Border on the Left) -->
    <div class="page-header">
      <h1 class="page-title">Game’s Pull</h1>
      <p class="page-subtitle">
        More than just play. <br />
        The psychological reasons <br />
        they engage.
      </p>
    </div>

    <!-- Section 1: Social Connection and Achievement -->
    <section class="content-section">
      <h2 class="section-tagline">Wondering why the intense focus on games</h2>
      <div class="text-block white-bg">
        <h3 class="section-heading">Social Connection and Achievement</h3>
        <p>
          For teenage boys, gaming is often a key social space. Research shows a
          significant majority use online games to connect with friends and even
          make new ones (AIBM, 2023). The teamwork and shared challenges within
          games build important social bonds during these crucial years. Beyond
          socialising, games offer a sense of achievement and mastery that can
          be deeply rewarding (Anderson et al., 2010).
        </p>
      </div>

      <!-- Subsection: Boys Say Gaming Good for Friendship + small chart-like area -->
      <div class="text-block white-bg">
        <h3 class="section-heading smaller">
          Boys Say Gaming Good For Friendship
        </h3>
        <p>
          Among teens who play video games, % who say playing has helped their:
        </p>
        <div class="chart-like-container">
          <div class="comparison-row">
            <div class="label">Boys</div>
            <div class="percent">55%</div>
            <span>Friendships</span>
          </div>
          <div class="comparison-row">
            <div class="label">Girls</div>
            <div class="percent">49%</div>
            <span>Friendships</span>
          </div>
          <hr />
          <div class="comparison-row">
            <div class="label">Boys</div>
            <div class="percent">60%</div>
            <span>Problem solving skills</span>
          </div>
          <div class="comparison-row">
            <div class="label">Girls</div>
            <div class="percent">46%</div>
            <span>Problem solving skills</span>
          </div>
          <hr />
          <div class="comparison-row">
            <div class="label">Boys</div>
            <div class="percent">49%</div>
            <span>Ability to work with others</span>
          </div>
          <div class="comparison-row">
            <div class="label">Girls</div>
            <div class="percent">36%</div>
            <span>Ability to work with others</span>
          </div>
        </div>
        <p class="source-note">
          Source: Data is from the Pew Research Center report, "Teens and Video
          Games Today." Respondents are aged 13-17. Survey conducted 2023 in
          United States
        </p>
      </div>
    </section>

    <!-- Section 2: Online Dynamics -->
    <section class="content-section">
      <h2 class="section-tagline">Wondering why the intense focus on games</h2>
      <div class="text-block white-bg">
        <h3 class="section-heading">Online Dynamics</h3>
        <p>
          The design of many popular games actively encourages engagement
          through community and a sense of belonging, powerful draws for
          teenagers. However, parents should also be aware that these online
          environments can unfortunately expose boys to negative interactions
          like harassment (ADL, 2023).
        </p>
        <p class="source-note">
          Source: Anti-Defamation League. (2023). Disruption and harms online
          gaming framework. Retrieved from
          <a
            href="https://www.adl.org/resources/report/disruption-and-harms-online-gaming-framework"
            target="_blank"
            >https://www.adl.org/resources/report/disruption-and-harms-online-gaming-framework
          </a>
        </p>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: "GamingPull",
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap");

.gaming-pull-page {
  width: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  font-family: "Roboto", sans-serif;
  color: #333;
}

/* Page Header: White box with a blue left border */
.page-header {
  background-color: #fff; /* White background */
  border-left: 4px solid #3498db; /* Blue left border */
  padding: 1.5rem;
  border-radius: 4px;
  text-align: left; /* or center if you prefer */
  margin-bottom: 2rem;
}
.page-title {
  font-size: 2.2rem;
  margin-bottom: 0.5rem;
  color: #2c3e50;
}
.page-subtitle {
  font-size: 1.2rem;
  line-height: 1.4;
  white-space: pre-line;
  color: #666;
}

/* Content Sections */
.content-section {
  margin-bottom: 2rem;
}
.section-tagline {
  font-size: 1rem;
  color: #666;
  margin-bottom: 1rem;
  padding-left: 1rem;
  font-style: italic;
}

/* White block for text content */
.text-block.white-bg {
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 6px;
  padding: 1.5rem;
  margin: 1rem;
}
.section-heading {
  font-size: 1.4rem;
  font-weight: 700;
  color: #2c3e50;
  margin-bottom: 0.5rem;
}
.section-heading.smaller {
  font-size: 1.2rem;
}

/* Comparison Chart-like Container */
.chart-like-container {
  margin-top: 1rem;
}
.comparison-row {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
}
.comparison-row .label {
  font-weight: 700;
  width: 60px;
}
.comparison-row .percent {
  width: 50px;
  text-align: right;
  font-weight: 500;
}
hr {
  border: 0;
  border-bottom: 1px solid #ccc;
  margin: 0.5rem 0;
}
.source-note {
  font-size: 0.85rem;
  color: #666;
  margin-top: 1rem;
}
a {
  color: #3498db;
}

/* Responsive */
@media (max-width: 768px) {
  .page-header {
    padding: 1rem;
  }
  .page-title {
    font-size: 1.8rem;
  }
  .page-subtitle {
    font-size: 1rem;
  }
  .text-block.white-bg {
    margin: 0.5rem;
    padding: 1rem;
  }
  .comparison-row .label {
    width: 50px;
  }
  .comparison-row .percent {
    width: 40px;
  }
}
</style>
