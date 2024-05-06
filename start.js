const express = require("express");
const app = express();
const path = require("path");

// Palvele staattisia tiedostoja kansioista "public"
app.use(express.static(path.join(__dirname, "public")));

// Palauta index.html pyydettäessä
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// Kuuntele pyyntöjä portissa 3000
app.listen(3000, () => {
  console.log("Server running at http://127.0.0.1:3000/");
});
