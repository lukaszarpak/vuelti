import {readdirSync, renameSync, rmSync, existsSync, mkdirSync} from 'fs';
import { fileURLToPath } from "url";
import { dirname, resolve } from "node:path";

const getDirectoryNames = (source: string) =>
    readdirSync(source, { withFileTypes: true })
        .filter((dirent) => dirent.isDirectory())
        .map((dirent) => dirent.name);

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const __root = resolve(__dirname, "..");

const pageNames = getDirectoryNames(resolve(__root, "./pages"));

const distDir = resolve(__root, ".dist");
const distPagesDir = resolve(distDir, "pages");

try {
    // moves homepage
    renameSync(resolve(distPagesDir, 'index.html'), resolve(distDir, 'index.html'));

    // moves other pages
    pageNames.forEach((pageName) => {
        if(!existsSync(resolve(distDir, pageName))) {
            mkdirSync(resolve(distDir, pageName))
        }

        renameSync(resolve(distPagesDir, `${pageName}/index.html`), resolve(distDir, `${pageName}/index.html`));
    });

    rmSync(distPagesDir, { recursive: true, force: true });

    console.log('Built pages moved successfully');
} catch (error) {
    console.error('move error:', error);
}