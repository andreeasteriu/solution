const router = require("express").Router();
const Post = require(__dirname + "/../../models/Post");
// const { uploadFile, removeImages } = require(__dirname +"/../../helpers/handleImages.js");

// const multipleUpload = uploadFile.array("images", 1);

router.get("/", async (req, res, next) => {
  try {
    const posts = await Post.query()
      .select("posts.id", "posts.title", "posts.description", "posts.imagePath")
      .orderBy("posts.created_at", "desc");
    if (!posts) {
      res.json({
        status: 0,
        message: "Error getting the posts from the db",
      });
    }
    return res.send(posts);
  } catch (error) {
    return res.json({ status: 0, message: "Error returning the posts" });
  }
});

module.exports = router;
