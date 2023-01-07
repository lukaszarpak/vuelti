#!/usr/bin/env node

const fs = require('fs')
const path = require('path')

const __root = path.resolve(__dirname, "..");

const getDirectoryNames = (source) =>
    fs.readdirSync(source, { withFileTypes: true })
        .filter((dirent) => dirent.isDirectory())
        .map((dirent) => dirent.name);

const pageNames = getDirectoryNames(path.resolve(__root, "./pages"));

const pagesEnumFileContent = `
export enum PageName {
    ${pageNames.map((pageName) => `${pageName.toUpperCase().replace('-', '_')} = "${pageName}"`).join(",")}
}`

fs.writeFileSync('./.vuelti/PageName.ts', pagesEnumFileContent)