const express = require("express");
const runBot = require("./main");
const cors = require("cors");

const app = express();

app.use(cors());

app.get("/bot", (req, res) => {
  runBot();

  res.json({ mensagem: "OLA" });
});

app.listen(3333);
