import { rename, rmSync } from 'fs';
import { fileURLToPath } from "url";
import { dirname, resolve } from "node:path";


// tools
import { getDirectoryNames } from "@/tools/getDirectoryNames";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const __root = resolve(__dirname, "..");

const pageNames = getDirectoryNames(resolve(__root, "./pages"));

const distDir = resolve(__root, ".dist");
const distPagesDir = resolve(distDir, "pages");

try {
    pageNames.forEach((pageName) => {
        rename(resolve(__root, `${distPagesDir}/${pageName}/index.html`), resolve(__root, `${distDir}/${pageName}/index.vue`), (err) => {
            if (err) throw err;
        });
    });

    rmSync(distPagesDir, { recursive: true, force: true });

    console.log('Built pages moved successfully');
} catch (error) {
    console.error(error);
}