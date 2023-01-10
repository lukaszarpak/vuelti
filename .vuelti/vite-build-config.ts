import { resolve } from "node:path";
import { readdirSync } from "fs";

const getDirectoryNames = (source: string) =>
    readdirSync(source, { withFileTypes: true })
        .filter((dirent) => dirent.isDirectory())
        .map((dirent) => dirent.name);

const __root = resolve(__dirname, "..");

const pageNames = getDirectoryNames(resolve(__root, "./pages"));

const getInputFiles = (pageNames: string[]) => {
  const inputFiles: Record<string, string> = {};

  pageNames.forEach((pageName) => {
    inputFiles[pageName] = resolve(__root, `./pages/${pageName}/index.html`);
  });

  return inputFiles;
};

export const viteBuildConfig = {
  outDir: resolve(__root, ".dist"),
  rollupOptions: {
    input: {
      homepage: resolve(__root, "/pages/index.html"),
      ...getInputFiles(pageNames),
    },
  },
};
