const express = require("express");
const app = express();
const port = 3000;
const path = require("path");
const mongoose = require("mongoose");
const Post = require("./models/Post");
const ejs = require("ejs");

//Connect DB
mongoose.connect("mongodb://localhost/cleanblog-test-db", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.set("view engine", "ejs");

//MIDDLEWARES
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", async (req, res) => {
  const posts = await Post.find();
  res.render("index", {
    posts: posts,
  });
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

app.post("/posts", async (req, res) => {
  try {
    console.log(req.body);
    await Post.create(req.body);
    console.log("Post Created");
  } catch (error) {
    console.log(error);
  }
  res.redirect("/");
});

app.listen(port, () => {
  console.log("Server is live");
});
