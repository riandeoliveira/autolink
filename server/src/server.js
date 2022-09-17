const express = require("express");
const runBot = require("./main");

const app = express();

app.get("/bot", (req, res) => {
  runBot();

  res.json({ mensagem: "OLA" });
});

app.listen(3333);
