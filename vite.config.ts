import { fileURLToPath } from "node:url";
import { resolve, dirname } from "node:path";
import path from "path";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueI18n from "@intlify/vite-plugin-vue-i18n";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueI18n({
      // https://github.com/intlify/bundle-tools/tree/main/packages/vite-plugin-vue-i18n
      include: resolve(
        dirname(fileURLToPath(import.meta.url)),
        "./assets/translations/messages.pl.json"
      ),
    }),
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(import.meta.url),
    },
  },
  build: {
    outDir: path.resolve(__dirname, ".dist"),
    rollupOptions: {
      input: {
        // homepage: resolve(__dirname, "/pages/index.html"),
        page1: resolve(__dirname, "/pages/page-1/index.html"),
        // page2: resolve(__dirname, "/pages/page-2/index.html"),
      },
    },
  },
  server: {
    host: "0.0.0.0",
  },
});
