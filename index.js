const express = require("express");
const app = express;
require("dotenv").config();

const port = process.env.PORT;

app.get("/", (req, res) => {
  res.sendFile("index.html", { root: __dirname });
});

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
