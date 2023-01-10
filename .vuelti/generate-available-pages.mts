import { readdirSync } from "fs";
import { fileURLToPath } from "url";
import { writeFileSync } from "fs";
import { dirname, resolve } from "node:path";

const getDirectoryNames = (source: string) =>
    readdirSync(source, { withFileTypes: true })
        .filter((dirent) => dirent.isDirectory())
        .map((dirent) => dirent.name);

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const __root = resolve(__dirname, "..");

const pageNames = getDirectoryNames(resolve(__root, "./pages"));

const pagesEnumFileContent = `export enum PageName {
    ${pageNames.map((pageName) => `${pageName.toUpperCase().replace('-', '_')} = "${pageName}"`).join(",")}
}`

writeFileSync('./.vuelti/PageName.ts', pagesEnumFileContent)