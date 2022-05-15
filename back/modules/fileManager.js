const fs = require('fs');
const path = require('path');

module.exports.deleteImageByUrl = imageUrl =>{
    const imageName = path.basename(imageUrl);
        fs.unlink(`images/${imageName}`, (err) =>{
            console.log("Error while deleting image :",err);
        });
}