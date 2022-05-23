const express = require("express");
const router = express.Router();
const { auth } = require("../middlewares/auth");
const commentController = require("../controllers/comment");
const { hasAccess } = require("../permissions/content");
const db = require("../models");

router.post("/create/:id", auth, commentController.create);
router.get("/:id", auth, commentController.getOne);
router.post("/all/:id", auth, commentController.getAllByPostId);
router.put(
  "/update/:id",
  auth,
  setComment,
  accessComment,
  commentController.update
);
router.delete(
  "/delete/:id",
  auth,
  setComment,
  accessComment,
  commentController.delete
);

/**
 * Add a comment property to req.
 */
async function setComment(req, res, next) {
  const commentId = req.params.id;
  req.comment = await db.Comment.findOne({ where: { id: req.params.id } });

  if (req.comment == null) {
    return res.status(404);
  }
  next();
}
/**
 * Check if user can access content from req.comment
 */
function accessComment(req, res, next) {
  if (!hasAccess(req.user, req.comment)) {
    return res.status(401);
  }
  next();
}

module.exports = router;
