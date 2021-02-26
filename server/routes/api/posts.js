const router = require("express").Router();
const Post = require(__dirname + "/../../models/Post");
const { uploadFile, removeImages } = require(__dirname +
  "/../../helpers/handleImages.js");
const multipleUpload = uploadFile.array("imagePath", 1);

// ====================== GET ALL POSTS ======================

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

//create post
router.post("/", async (req, res, next) => {
  try {
    multipleUpload(req, res, async (err) => {
      if (err)
        return res.status(422).json({
          errors: [{ title: "Image Upload Error", detail: err.message }],
        });

      const errorRemoveImgs = [];
      if (req.files.length > 0)
        req.files.forEach((img) =>
          errorRemoveImgs.push(img.location.slice(-41))
        );

      if (!req.body) {
        if (errorRemoveImgs.length > 0) removeImages(errorRemoveImgs);
        return res.json({ status: 0, message: "Invalid request!", code: 404 });
      }

      let newPost = {};
      const data = req.body;
      if (req.files.length > 0) {
        const photos = [];
        req.files.map((img) => photos.push(img.location.slice(-41)));
        newPost.imagePath = JSON.stringify(photos[0]);
      }

      newPost.title = data.title;
      newPost.description = data.description;

      const createdPost = await Post.query().insertGraph(newPost);
      if (!createdPost)
        return res.json({
          status: 0,
          message: "Error while inserting post!",
          code: 404,
        });
      return res.json({ status: 1, post: createdPost });
    });
  } catch (err) {
    return res.json({ status: 0, message: "Error creating new post!" });
  }
});

//delete post
router.delete("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!id) return res.json({ status: 0, message: "Missing id!", code: 404 });

    const post = await Post.query().select("imagePath").findById(id);
    if (!post)
      return res.json({
        status: 0,
        message: "Post does not exists!",
        code: 404,
      });

    const dbRes = await Post.query().deleteById(id);
    if (!dbRes) return res.json({ status: 0, message: "Post does not exist!" });
    return res.json({ status: 1, message: "Post deleted successfully!" });
  } catch (err) {
    return res.json({ status: 0, message: "Error deleting post!" });
  }
});

module.exports = router;
