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
      status: status || "TO LEARN",
      // người dùng nhập status thì lấy status, nếu không thì status = TO LEARN
      user: req.userId,
      // là userId gán userId của User đã create
    });

    await newPost.save();

    res.json({ success: true, message: "Happy learning!", post: newPost });
  } catch (e) {
    console.log(e);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

module.exports = router;
