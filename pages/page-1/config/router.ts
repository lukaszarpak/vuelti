import { createRouter, createWebHistory } from "vue-router";

// enums
import { Page1RouteName } from "@/enums/RouteName";

export const routerInstance = createRouter({
  history: createWebHistory("/pages/page-1"),
  scrollBehavior: () => ({ top: 0, behavior: "smooth" }),
  routes: [
    {
      name: Page1RouteName.MAIN,
      path: "/",
      component: () => import("../routes/index.vue"),
    },
    {
      name: Page1RouteName.ABOUT,
      path: "/about",
      component: () => import("../routes/about/index.vue"),
    },
  ],
});
