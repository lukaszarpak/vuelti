import { createApp } from "vue";

// tooltip directives
import { VTooltip, VClosePopper } from "floating-vue";

// safe v-html directive
import VueSafeHTML, { allowedTags } from "vue-safe-html";

// toasts
import Toast from "vue-toastification";
import type { PluginOptions as VueToastificationPluginOptions } from "vue-toastification";

// i18n - translations
import { createI18n } from "vue-i18n";
import messages from "@/assets/translations/messages.pl.json";

// global styles
import "@/assets/scss/global.scss";

import App from "./App.vue";
import { routerInstance } from "./config/router";

const i18n = createI18n({
  locale: "pl",
  messages: {
    pl: messages,
  },
});

const vueToastificationPluginOptions: VueToastificationPluginOptions = {
  hideProgressBar: true,
  timeout: 5000,
};

const app = createApp(App);

app
  .use(routerInstance)
  .use(i18n)
  .directive("tooltip", VTooltip)
  .directive("close-popper", VClosePopper)
  .use(VueSafeHTML, {
    allowedTags: [...allowedTags, "span"],
  })
  .use(Toast, vueToastificationPluginOptions)
  .mount("#app");
