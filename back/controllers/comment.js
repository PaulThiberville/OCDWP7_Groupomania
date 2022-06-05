const db = require("../models");
const { Op } = require("sequelize");

/**
 * This endpoint create a new comment.
 ** req.body.text : Content of the comment
 ** req.params.id : Id of the post to comment
 */
exports.create = async (req, res) => {
  try {
    const newComment = await db.Comment.create({
      text: req.body.text || null,
      UserId: req.user.id,
      PostId: req.params.id,
    });
    return res.status(201).json(newComment);
  } catch {
    return res.status(500);
  }
};

/**
 * This endpoint return a single comment.
 ** req.params.id : Id of the comment
 */
exports.getOne = async (req, res) => {
  try {
    const comment = await db.Comment.findOne({
      where: { id: req.params.id },
      include: [
        {
          model: db.User,
          //We don't want to send the password and email of the user.
          attributes: ["id", "firstName", "lastName", "imageUrl"],
        },
      ],
    });
    return res.status(200).json(comment);
  } catch {
    return res.status(500);
  }
};

/**
 * This endpoint return an array of comments in json with the same PostId from newest to oldest.
 * It use pagination.
 ** req.body.date : Date of the newest comment we want
 ** req.body.offset : Index where we want to start returning rows
 ** req.body.limit : Number of rows to return
 ** req.params.id : Id of the post
 */
exports.getAllByPostId = async (req, res) => {
  try {
    const date = new Date(req.body.date);
    const comments = await db.Comment.findAndCountAll({
      where: {
        PostId: req.params.id,
        createdAt: {
          [Op.lt]: date,
        },
      },
      includes: ["id"],
      offset: req.body.offset,
      limit: req.body.limit,
      order: [["createdAt", "DESC"]],
    });
    return res.status(200).json(comments);
  } catch (error) {
    return res.status(500);
  }
};

/**
 * This endpoint is used to edit a comment.
 * It return the edited comment.
 ** req.body.text : New content of the comment
 ** req.params.id : Id of comment
 */
exports.update = async (req, res) => {
  try {
    const comment = await db.Comment.findOne({
      where: { id: req.params.id },
    });
    await comment.update({ text: req.body.text });
    return res.status(200).json(comment);
  } catch {
    return res.status(500);
  }
};

/**
 * This endpoint is used to delete a comment.
 ** req.params.id : Id of comment
 */
exports.delete = async (req, res) => {
  try {
    const comment = await db.Comment.findOne({ where: { id: req.params.id } });
    await comment.destroy();
    return res.status(200).json({ message: "Succesfully deleted comment !" });
  } catch (error) {
    return res.status(500);
  }
};
