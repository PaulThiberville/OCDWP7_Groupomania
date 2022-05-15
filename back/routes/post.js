const express = require('express');
const router = express.Router();
const {auth,authRole} = require("../middlewares/auth");
const { hasAccess } = require('../permissions/content');
const multer = require("../middlewares/multer-config");
const postController = require('../controllers/post');
const db = require('../models');

router.post("/create",auth ,multer , postController.create);

router.post("/all",auth , postController.getAll);

router.post("/all/:id",auth , postController.getAllByUserId);

router.get("/:id",auth , postController.getOne);

router.put("/update/:id",auth , setPost, accessPost, multer,postController.update);

router.delete("/delete/:id",auth ,setPost , accessPost, postController.delete);

router.post("/like/:id",auth , postController.like );


async function setPost(req, res, next) {
    console.log("Set Post")
    const postId = req.params.id;
    req.post = await db.Post.findOne({where: {id: postId}});    
    if (req.post == null) return res.status(404);
    next();
}

function accessPost(req, res, next) {
    console.log("Access Post")
    if (!hasAccess(req.user, req.post)) return res.status(401);
    next();
}

module.exports = router;