import { createRouter, createWebHistory } from "vue-router";

// enums
import { Route } from "@/pages/page-1/enums/Route";
import { PageName } from "../../../.vuelti/PageName";

export const routerInstance = createRouter({
  history: createWebHistory(`/${PageName.PAGE_1}`),
  scrollBehavior: () => ({ top: 0, behavior: "smooth" }),
  routes: [
    {
      name: Route.MAIN,
      path: "/",
      component: () => import("../routes/index.vue"),
    },
    {
      name: Route.ABOUT,
      path: "/about",
      component: () => import("../routes/about/index.vue"),
    },
  ],
});
