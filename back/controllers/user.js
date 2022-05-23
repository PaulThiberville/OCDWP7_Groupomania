const dotenv = require("dotenv");
const db = require("../models");
const fm = require("../modules/fileManager");

dotenv.config();

/**
 * This endpoint return a single user
 ** req.params.id : Id of the user
 */
exports.getOne = async (req, res) => {
  try {
    const user = await db.User.findOne({
      where: { id: req.params.id },
      //We don't want to send the password and email of the user.
      attributes: ["id", "firstName", "lastName", "bio", "imageUrl", "role"],
    });
    return res.status(200).json(user);
  } catch (error) {
    return res.status(404);
  }
};

/**
 * This endpoint is used to edit a user. It return some of the edited user informations.
 ** req.body.text : New text content of the post
 ** req.params.id : Id of post
 ** (optional) req.file : New image of the post
 */
exports.update = async (req, res) => {
  try {
    const user = await db.User.findOne({ where: { id: req.params.id } });
    if (req.file) {
      if (user.imageUrl != "") {
        fm.deleteImageByUrl(user.imageUrl);
      }
      req.body.imageUrl = `${req.protocol}://${req.get("host")}/images/${
        req.file.filename
      }`;
    } else {
      req.body.imageUrl = user.imageUrl;
    }
    await user.update({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      bio: req.body.bio,
      imageUrl: req.body.imageUrl,
    });
    return res.status(200).json({
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      bio: user.bio,
      imageUrl: user.imageUrl,
    });
  } catch (error) {
    return res.status(500);
  }
};

/**
 * This endpoint is used to delete a user.
 ** req.params.id : Id of user
 */
exports.delete = async (req, res) => {
  try {
    const user = await db.User.findOne({ where: { id: req.params.id } });
    if (user.imageUrl != "") {
      fm.deleteImageByUrl(user.imageUrl);
    }
    await user.destroy();
    return res.status(200).json({ message: "User deleted succesfully !" });
  } catch (error) {
    return res.status(404);
  }
};
