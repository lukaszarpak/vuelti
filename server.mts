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
  .get("/pages/*", (req, res) => {
    if (req.path.includes("/pages/")) {
      const page = req.path.split("/")[2].split("page-")[1];

      if (page) {
        res.sendFile(`${__dirname}/.dist/pages/page-${page}/index.html`);
      } else {
        res.sendFile(`${__dirname}/.dist/pages/index.html`);
      }
    } else {
      res.status(404).send("Page not found");
    }
  })
  .use("/assets", express.static(path.resolve(__dirname, ".dist/assets")))
  .use("/images", express.static(path.resolve(__dirname, ".dist/images")))
  .listen(port, () => {
    console.log(`client-panel node app listing on: http://localhost:${port}/`);
  });

export {};
