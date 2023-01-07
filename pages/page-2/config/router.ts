import { createRouter, createWebHistory } from "vue-router";

// enums
import { PageName } from "../../../.vuelti/PageName";
import { Route } from "@/pages/page-2/enums/Route";

export const routerInstance = createRouter({
  history: createWebHistory(`/${PageName.PAGE_2}`),
  scrollBehavior: () => ({ top: 0, behavior: "smooth" }),
  routes: [
    {
      name: Route.MAIN,
      path: "/",
      component: () => import("../routes/index.vue"),
    },
  ],
});
