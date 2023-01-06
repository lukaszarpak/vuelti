import { createRouter, createWebHistory } from "vue-router";

// enums
import { PageName } from "@/enums/PageName";

export const routerInstance = createRouter({
  history: createWebHistory("/pages/page-2"),
  scrollBehavior: () => ({ top: 0, behavior: "smooth" }),
  routes: [
    {
      name: PageName.PAGE_2,
      path: "/",
      component: () => import("../routes/index.vue"),
    },
  ],
});
