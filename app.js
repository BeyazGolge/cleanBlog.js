const express = require("express");
const app = express();
const port = 3000;
const ejs = require("ejs");

app.set("view engine", "ejs");

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/about", (req, res) => {
  res.render("about");
});

app.get("/add_post", (req, res) => {
  res.render("add_post");
});

app.get("/post", (req, res) => {
  res.render("post");
});

app.listen(port, () => {
  console.log("Server is live");
});
