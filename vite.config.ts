import { fileURLToPath, URL } from "node:url";
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
        "./src/assets/translations/messages.pl.json"
      ),
    }),
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  build: {
    outDir: path.resolve(__dirname, "dist"),
    emptyOutDir: true,
  },
  server: {
    host: "0.0.0.0",
  },
  // base: "/",
});
