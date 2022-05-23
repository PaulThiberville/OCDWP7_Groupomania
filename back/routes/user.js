const express = require("express");
const router = express.Router();
const { auth } = require("../middlewares/auth");
const multer = require("../middlewares/multer-config");
const userController = require("../controllers/user");

router.get("/all", auth, userController.getAll);
router.get("/:id", auth, userController.getOne);
router.put("/update/:id", auth, accessUser, multer, userController.update);
router.delete("/delete/:id", auth, accessUser, userController.delete);

/**
 * Check if user can access user
 */
function accessUser(req, res, next) {
  if (req.user.id !== req.params.id && req.user.role !== admin)
    return res.status(401);
  next();
}

module.exports = router;
