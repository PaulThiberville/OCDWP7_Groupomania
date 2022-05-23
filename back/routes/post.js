const express = require("express");
const router = express.Router();
const { auth } = require("../middlewares/auth");
const { hasAccess } = require("../permissions/content");
const multer = require("../middlewares/multer-config");
const postController = require("../controllers/post");
const db = require("../models");

router.post("/create", auth, multer, postController.create);

router.post("/all", auth, postController.getAll);

router.post("/all/:id", auth, postController.getAllByUserId);

router.get("/:id", auth, postController.getOne);

router.put(
  "/update/:id",
  auth,
  setPost,
  accessPost,
  multer,
  postController.update
);

router.delete("/delete/:id", auth, setPost, accessPost, postController.delete);

router.post("/like/:id", auth, postController.like);

/**
 * Add a post property to req.
 */
async function setPost(req, res, next) {
  const postId = req.params.id;
  req.post = await db.Post.findOne({ where: { id: postId } });
  if (req.post == null) return res.status(404);
  next();
}

/**
 * Check if user can access content from req.comment
 */
function accessPost(req, res, next) {
  if (!hasAccess(req.user, req.post)) return res.status(401);
  next();
}

module.exports = router;
