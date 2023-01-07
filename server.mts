import dotenv from "dotenv";
import { fileURLToPath } from "url";

import express from "express";
import path from "path";

// config
dotenv.config();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const port = process.env.PORT || 4000;

const app = express();

app
  .use("/assets", express.static(path.resolve(__dirname, ".dist/assets")))
  .use("/images", express.static(path.resolve(__dirname, ".dist/images")))
  .get("/*", (req, res) => {
      const page = req.path.split("/")[1];

      res.sendFile(page ? `${__dirname}/.dist/${page}/index.html` : `${__dirname}/.dist/index.html`)

  })
  .listen(port, () => {
    console.log(`client-panel node app listing on: http://localhost:${port}/`);
  });

export {};
