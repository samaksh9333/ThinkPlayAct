import { createRouter, createWebHistory } from "vue-router";
import HomePage from "../components/Homepage.vue";
import WordTypesBar from "../components/WordTypesBar.vue";
import NoticingShifts from "../components/NoticingShifts.vue"; // Adjust the path if needed
import DecodingDigitalLife from "@/components/DecodingDigitalLife.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: HomePage,
  },
  {
    path: "/word-types",
    name: "WordTypes",
    component: WordTypesBar,
  },
  {
    path: "/noticing-shifts",
    name: "NoticingShifts",
    component: NoticingShifts,
  },
  {
    path: "/decoding-digital-life",
    name: "DecodingDigitalLife",
    component: DecodingDigitalLife,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
