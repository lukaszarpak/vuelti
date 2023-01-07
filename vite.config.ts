import { fileURLToPath, URL } from "node:url";
import { resolve, dirname } from "node:path";
import path from "path";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueI18n from "@intlify/vite-plugin-vue-i18n";

import { readdirSync } from "fs";

const getDirectoryNames = (source: string) =>
  readdirSync(source, { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => dirent.name);

const pageNames = getDirectoryNames(path.resolve(__dirname, "./pages"));

const getInputFiles = (pageNames: string[]) => {
  const inputFiles: Record<string, string> = {};

  pageNames.forEach((pageName) => {
    inputFiles[pageName] = path.resolve(
      __dirname,
      `./pages/${pageName}/index.html`
    );
  });

  return inputFiles;
};

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
      "@": fileURLToPath(new URL(".", import.meta.url)),
    },
  },
  build: {
    outDir: path.resolve(__dirname, ".dist"),
    rollupOptions: {
      input: {
        homepage: resolve(__dirname, "/pages/index.html"),
        ...getInputFiles(pageNames),
      },
    },
  },
  server: {
    host: "0.0.0.0",
  },
});
