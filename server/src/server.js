const express = require("express");
const runBot = require("./main");
const cors = require("cors");

const app = express();

app.use(
  cors({
    origin: "https://autolink-client.vercel.app/",
  })
);

app.get("/bot", (req, res) => {
  runBot();

  res.json({ mensagem: "OLA" });
});

app.listen(3333);
