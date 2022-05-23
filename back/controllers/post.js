const db = require("../models");
const fm = require("../modules/fileManager");
const { Op } = require("sequelize");

/**
 * This endpoint is used create a post.
 ** req.body.text : Text content of the post
 ** (optional) req.file :  Image of the post
 */
exports.create = async (req, res) => {
  try {
    let imageUrl = "";
    if (req.file) {
      imageUrl = `${req.protocol}://${req.get("host")}/images/${
        req.file.filename
      }`;
    }
    const post = await db.Post.create({
      text: req.body.text,
      imageUrl: imageUrl,
      UserId: req.user.id,
      likes: 0,
      usersLiked: JSON.stringify([]),
    });
    return res.status(200).json(post);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

/**
 * This endpoint return an array of posts in json from newest to oldest.
 * It use pagination.
 ** req.body.date : Date of the newest post we want
 ** req.body.offset : Index where we want to start returning rows
 ** req.body.limit : Number of rows to return
 */
exports.getAll = async (req, res) => {
  try {
    const date = new Date(req.body.date);
    const posts = await db.Post.findAndCountAll({
      where: {
        createdAt: {
          [Op.lt]: date,
        },
      },
      offset: req.body.offset,
      limit: req.body.limit,
      order: [["createdAt", "DESC"]],
      include: [{ model: db.Comment, attributes: ["id"] }],
    });
    return res.status(200).json(posts);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

/**
 * This endpoint return an array of posts in json with the same UserId from newest to oldest.
 * It use pagination.
 ** req.body.date : Date of the newest post we want
 ** req.body.offset : Index where we want to start returning rows
 ** req.body.limit : Number of rows to return
 ** req.params.id : Id of the user
 */
exports.getAllByUserId = async (req, res) => {
  try {
    const date = new Date(req.body.date);
    const posts = await db.Post.findAndCountAll({
      where: {
        UserId: req.params.id,
        createdAt: {
          [Op.lt]: date,
        },
      },
      includes: ["id"],
      offset: req.body.offset,
      limit: req.body.limit,
      order: [["createdAt", "DESC"]],
      include: [{ model: db.Comment, attributes: ["id"] }],
    });
    return res.status(200).json(posts);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

/**
 * This endpoint return a single post.
 ** req.params.id : Id of the post
 */
exports.getOne = async (req, res) => {
  try {
    const post = await db.Post.findOne({
      where: { id: req.params.id },
      include: [{ model: db.Comment, attributes: ["id"] }],
    });
    return res.status(200).json(post);
  } catch (error) {
    return res.status(500);
  }
};

/**
 * This endpoint is used to edit a post. It return the edited post.
 ** req.body.text : New text content of the post
 ** req.params.id : Id of post
 ** (optional) req.file : New image of the post
 */
exports.update = async (req, res) => {
  try {
    const post = await db.Post.findOne({ where: { id: req.params.id } });
    if (req.file) {
      fm.deleteImageByUrl(post.imageUrl);
      post.imageUrl = `${req.protocol}://${req.get("host")}/images/${
        req.file.filename
      }`;
    }
    post.text = req.body.text;
    await post.save();
    return res.status(200).json(post);
  } catch (error) {
    return res.status(500);
  }
};

/**
 * This endpoint is used to delete a post.
 ** req.params.id : Id of post
 */
exports.delete = async (req, res) => {
  try {
    const postId = req.params.id;
    const post = await db.Post.findOne({
      where: { id: postId },
    });
    await post.destroy();
    return res.status(200).json({ message: "Post succesfully deleted !" });
  } catch (error) {
    return res.status(500);
  }
};

/**
 * This endpoint is used to like or unlike a post.
 ** req.body.like : "1" if like , "0" if unlike
 ** req.params.id: Id of post
 */
exports.like = async (req, res) => {
  try {
    const postId = req.params.id;
    const post = await db.Post.findOne({ where: { id: postId } });
    const input = req.body.like;
    if (input === "0" && post.usersLiked.includes(req.user.id)) {
      const usersLiked = JSON.parse(post.usersLiked);
      const index = usersLiked.indexOf(req.user.id);
      usersLiked.splice(index, 1);
      post.usersLiked = JSON.stringify(usersLiked);
      post.likes--;
      await post.save();
    }
    if (input === "1" && !post.usersLiked.includes(req.user.id)) {
      const usersLiked = JSON.parse(post.usersLiked);
      usersLiked.push(req.user.id);
      post.usersLiked = JSON.stringify(usersLiked);
      post.likes++;
      await post.save();
    }
    return res.status(200).json(post);
  } catch {
    return res.status(500);
  }
};
