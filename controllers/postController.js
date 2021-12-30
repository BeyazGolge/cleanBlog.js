const Post = require("../models/Post");

exports.getAllPosts = async (req, res) => {
  const posts = await Post.find();
  res.render("index", {
    posts: posts,
  });
};

exports.getPost = async (req, res) => {
  const post = await Post.findById(req.params.id);
  res.render("post", {
    post: post,
  });
};

exports.createPost = async (req, res) => {
  try {
    console.log(req.body);
    await Post.create(req.body);
    console.log("Post Created");
  } catch (error) {
    console.log(error);
  }
  res.redirect("/");
};

exports.editPost = async (req, res) => {
  const post = await Post.findById(req.params.id);
  post.title = req.body.title;
  post.detail = req.body.detail;
  post.save();
  res.redirect(`/../posts/${req.params.id}`);
};

exports.deletePost = async (req, res) => {
  console.log("deleting");
  await Post.findByIdAndRemove(req.params.id);
  console.log("deleting");

  res.redirect("/");
};
