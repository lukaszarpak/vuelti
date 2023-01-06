import { createRouter, createWebHistory } from "vue-router";

// enums
import { Route } from "@/enums/Route";

export const routerInstance = createRouter({
  history: createWebHistory("/"),
  scrollBehavior: () => ({ top: 0, behavior: "smooth" }),
  routes: [
    {
      name: Route.PAGE_1,
      path: "/",
      component: () => import("../pages/Example.vue"),
    },
  ],
});
