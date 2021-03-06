const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/auth");

const Post = require("../models/Post");

// @route GET api/posts
// @desc Get post
// @access Private
router.get("/", verifyToken, async (req, res) => {
  // vào url ..api/posts >> verifyToken kiểm tra token ? thực hiện arrow function : bỏ qua

  try {
    const posts = await Post.find({ user: req.userId }).populate("user", [
      "username",
    ]);
    // populate bỏ vào user.username
    res.json({ success: true, posts });
  } catch (e) {
    console.log(e);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

// @route POST api/posts
// @desc create post
// @access Private
router.post("/", verifyToken, async (req, res) => {
  // vào url ..api/posts >> verifyToken kiểm tra token ? thực hiện arrow function : bỏ qua

  const { title, description, url, status } = req.body;

  //Simple validation
  if (!title) {
    return res
      .status(400)
      .json({ success: false, message: "Title is required" });
  }
  try {
    const newPost = new Post({
      title,
      description,
      url: url.startsWith("https://") ? url : `https://${url}`,
      // url bắt đầu bằng https:// thì lấy luôn url, nếu không thì thêm https://
    });

    await newPost.save();

    res.json({ success: true, message: "Happy learning!", post: newPost });
  } catch (e) {
    console.log(e);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

// @route PUT api/posts
// @desc Update post
// @access Private
router.put("/:id", verifyToken, async (req, res) => {
  // vào url ..api/posts >> verifyToken kiểm tra token ? thực hiện arrow function : bỏ qua

  const { title, description, url, status } = req.body;

  //Simple validation
  if (!title) {
    return res
      .status(400)
      .json({ success: false, message: "Title is required" });
  }
  try {
    let updatePost = {
      title,
      description: description || "",
      url: (url.startsWith("https://") ? url : `https://${url}`) || "",
      // url bắt đầu bằng https:// thì lấy luôn url, nếu không thì thêm https://
      status: status || "TO LEARN",
    };

    const postUpdateCondition = {
      _id: req.params.id,
      user: req.userId,
    };

    updatePost = await Post.findOneAndUpdate(postUpdateCondition, updatePost, {
      new: true,
    });
    // condition là postUpdateCondition,
    // dataUpdate là updatePost,
    // option new:true là nếu update thì trả về Post new, nếu không update thì trả về Post chưa update

    // User not authorized to update Post or post not found
    if (!updatePost) {
      return res.status(401).json({
        success: false,
        message: "Post not found or user not authorized",
      });
    }
    res.json({
      success: true,
      message: "Excellent progress!!",
      post: updatePost,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

// @route DELETE api/posts
// @desc Delete post
// @access Private
router.delete("/:id", verifyToken, async (req, res) => {
  // vào url ..api/posts >> verifyToken kiểm tra token ? thực hiện arrow function : bỏ qua

  try {
    const postDeleteCondition = { _id: req.params.id, user: req.userId };
    const deletePost = await Post.findOneAndDelete(postDeleteCondition);

    // User not authorized to update Post or post not found
    if (!deletePost) {
      return res.status(401).json({
        success: false,
        message: "Post not found or user not authorized",
      });
    }

    res.json({ success: true, post: deletePost });
  } catch (e) {
    console.log(e);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});
module.exports = router;
