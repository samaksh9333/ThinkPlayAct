import { createRouter, createWebHistory } from "vue-router";
import HomePage from "../components/Homepage.vue";
import WordTypesBar from "../components/WordTypesBar.vue";

const routes = [
  { path: "/", name: "Home", component: HomePage },
  { path: "/word-types", name: "WordTypes", component: WordTypesBar },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
