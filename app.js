const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const path = require("path");
const mongoose = require("mongoose");
const Post = require("./models/Post");
const ejs = require("ejs");
const methodOverride = require("method-override", {
  methods: ["POST", "GET"],
});
const postController = require("./controllers/postController");
const pageController = require("./controllers/pageController");

//Connect DB
mongoose
  .connect(
    "mongodb+srv://BeyazGolge:005383@cluster0.x9qj7.mongodb.net/cleanBlog-db?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("connected to database");
  })
  .catch((err) => {
    console.log(err);
  });

app.set("view engine", "ejs");

//MIDDLEWARES
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride("_method"));

app.get("/", postController.getAllPosts);
app.get("/about", pageController.getAboutPage);
app.get("/add_post", pageController.getAddPostPage);
app.get("/post", pageController.getPostPage);
app.delete("/post/:id", postController.deletePost);
app.get("/posts/:id", postController.getPost);
app.post("/posts", postController.createPost);
app.get("/post/edit/:id", pageController.getEditPage);
app.put("/post/:id", postController.editPost);
app.listen(port, () => {
  console.log("Server is live");
});
