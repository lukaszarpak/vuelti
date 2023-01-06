import { createRouter, createWebHistory } from "vue-router";

// enums
import { Route } from "@/enums/Route";

export const routerInstance = createRouter({
  history: createWebHistory(import.meta.env.VITE_APP_BASE_URL),
  scrollBehavior: () => ({ top: 0, behavior: "smooth" }),
  routes: [
    {
      name: Route.PAGE_1,
      path: "/page-1",
      // route level code-splitting
      // this generates a separate chunk (CandidateUserProfile.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../pages/Example.vue"),
    },
  ],
});
