import dotenv from "dotenv";
import { fileURLToPath } from "url";

import express from "express";
import { dirname, resolve } from "node:path";

// config
dotenv.config();
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const __root = resolve(__dirname, "..");
const port = process.env.PORT || 4000;

const app = express();

app
  .use("/assets", express.static(resolve(__root, ".dist/assets")))
  .use("/images", express.static(resolve(__root, ".dist/images")))
  .get("/*", (req, res) => {
      const page = req.path.split("/")[1];

      res.sendFile(page ? `${__root}/.dist/${page}/index.html` : `${__root}/.dist/index.html`)

  })
  .listen(port, () => {
    console.log(`client-panel node app listing on: http://localhost:${port}/`);
  });

export {};
