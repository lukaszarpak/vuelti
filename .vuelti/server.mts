import dotenv from "dotenv";
import { fileURLToPath } from "url";

import express from "express";
import path from "path";

// config
dotenv.config();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const __root = path.resolve(__dirname, "..");
const port = process.env.PORT || 4000;

const app = express();

app
  .use("/assets", express.static(path.resolve(__root, ".dist/assets")))
  .use("/images", express.static(path.resolve(__root, ".dist/images")))
  .get("/*", (req, res) => {
      const page = req.path.split("/")[1];

      res.sendFile(page ? `${__root}/.dist/${page}/index.html` : `${__root}/.dist/index.html`)

  })
  .listen(port, () => {
    console.log(`client-panel node app listing on: http://localhost:${port}/`);
  });

export {};
