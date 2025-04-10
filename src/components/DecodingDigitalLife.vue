<template>
  <div class="decoding-digital-life-page">
    <!-- Header Section -->
    <header class="page-header">
      <h1 class="page-title">Decoding Digital Life</h1>
      <p class="page-subtitle">
        Unlock their online world.<br />
        Understand the platforms they inhabit.
      </p>
    </header>

    <!-- Insights Section -->
    <section class="section-insights content-block">
      <h2 class="section-heading">
        Seeing Changes in Your Son's Gaming Behaviour
      </h2>
      <h3 class="subheading">Research Offers Insights</h3>
      <p class="paragraph">
        As parents, you're often the first to notice subtle shifts in your
        teenager's behaviour. If excessive gaming seems linked to increased
        irritability, withdrawal, or academic struggles, your concerns are
        valid. Research is exploring these connections.
      </p>
      <p class="paragraph">
        Studies suggest that significant gaming can be associated with emotional
        and behavioural changes in teens (Anderson et al., 2010). The WHO
        highlights the importance of balanced screen time for adolescent mental
        health (WHO, 2024).
      </p>
      <p class="source">
        Source: World Health Organization. (2024, September 25). Retrieved from
        <a
          href="https://www.who.int/europe/news/item/25-09-2024-teens--screens-and-mental-health"
          target="_blank"
        >
          https://www.who.int/europe/news/item/25-09-2024-teens--screens-and-mental-health
        </a>
      </p>
    </section>

    <!-- Observations Section -->
    <section class="section-observations content-block">
      <h2 class="section-heading">
        Seeing Changes in Your Son's Gaming Behaviour
      </h2>
      <h3 class="subheading">You Might Be Observing</h3>
      <ul class="observations-list">
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
          <strong>Social Withdrawal:</strong> Intense gaming can sometimes lead
          to less engagement in real-world relationships (Anderson et al.,
          2010).
        </li>
        <li>
          <strong>Academic Slips:</strong> Time spent gaming can sometimes take
          away from schoolwork (Anderson et al., 2010).
        </li>
      </ul>
      <p class="source">
        Source: Anderson, C. A., et al. (2010). Journal of Adolescent Health,
        46(5), 501-505.
      </p>
    </section>

    <!-- Data Points Section -->
    <section class="section-data-points content-block">
      <h2 class="section-heading">
        Seeing Changes in Your Son's Gaming Behaviour
      </h2>
      <h3 class="subheading">Data Points</h3>
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
  name: "DecodingDigitalLife",
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap");

/* Base container */
.decoding-digital-life-page {
  max-width: 1200px;
  margin: 2rem auto;
  padding: 1rem;
  background-color: #fff;
  color: #333;
  font-family: "Roboto", sans-serif;
}

/* Header styling */
.page-header {
  text-align: center;
  margin-bottom: 2rem;
  padding: 1rem;
  background-color: #000;
  color: #fff;
  border-radius: 4px;
}
.page-title {
  font-size: 2.2rem;
  margin-bottom: 0.5rem;
}
.page-subtitle {
  font-size: 1.2rem;
  line-height: 1.4;
}

/* Content Block (common styling) */
.content-block {
  background-color: #fff;
  padding: 1.5rem 2rem;
  border-radius: 4px;
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 2rem;
}
.section-heading {
  font-size: 1.8rem;
  color: #2c3e50;
  margin-bottom: 1rem;
}
.subheading {
  font-size: 1.4rem;
  color: #3498db;
  margin-bottom: 1rem;
}
.paragraph {
  font-size: 1rem;
  line-height: 1.6;
  margin-bottom: 1rem;
}
.source {
  font-size: 0.85rem;
  color: #666;
  margin-top: 1rem;
}
.source a {
  color: #3498db;
  text-decoration: underline;
}
.source a:hover {
  color: #217dbb;
}

/* Observations List */
.observations-list {
  list-style: none;
  padding: 0;
  margin: 1rem 0;
}
.observations-list li {
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
</style>
