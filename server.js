require("dotenv").config();

const express = require("express");
const path = require("path");
const history = require("connect-history-api-fallback");

// config
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
  // .use(history()) // It's needed to support history API in Vue Router
  .use("/assets", express.static(path.resolve(__dirname, ".dist/assets")))
  .use("/images", express.static(path.resolve(__dirname, ".dist/images")))
  .listen(port, () => {
    console.log(`client-panel node app listing on: http://localhost:${port}/`);
  });
