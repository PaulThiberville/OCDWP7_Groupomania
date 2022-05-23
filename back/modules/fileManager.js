const fs = require("fs");
const path = require("path");

/**
 * This is used to delete an image of our server from url
 * @param {String} imageUrl
 */
module.exports.deleteImageByUrl = (imageUrl) => {
  const imageName = path.basename(imageUrl);
  fs.unlink(`images/${imageName}`, (err) => {
    console.log("Error while deleting an image :", err);
  });
};
