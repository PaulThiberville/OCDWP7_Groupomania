const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
const db = require("../models");
const fm = require("../modules/fileManager");


dotenv.config();

exports.getAll = async (req, res) =>{
  try{        
    const users = await db.User.findAll({
      attributes : ["id", "firstName", "lastName", "bio", "imageUrl", "role"]
    });
    return res.status(200).json(users);
  }
  catch(error){
    return res.status(404);
  }
};

exports.getOne = async (req, res) =>{
  try{      
    const user = await db.User.findOne({ where : {id:req.params.id},
      attributes : ["id", "firstName", "lastName", "bio", "imageUrl", "role"]
    });
    return res.status(200).json(user);
  }
  catch(error){
    return res.status(404);
  }
};

exports.update = async (req, res) =>{
  console.log("UserUpdate:",req.body)
  try{        
    const credentials = req.body;
    const user = await db.User.findOne({ where : {id: req.params.id}});
    //const cryptedPassword = await bcrypt.hash(req.body.password,10);
    if(req.file){
      if(user.imageUrl != ""){
        fm.deleteImageByUrl(user.imageUrl);
      }
      credentials.imageUrl = `${req.protocol}://${req.get("host")}/images/${req.file.filename}`;
    }
    else{
      credentials.imageUrl = user.imageUrl;
    }
    await user.update({
      firstName: credentials.firstName,
      lastName: credentials.lastName,
      bio: credentials.bio,
      imageUrl: credentials.imageUrl,
    });
    return res.status(200).json({     
      id:user.id, 
      firstName:user.firstName,
      lastName:user.lastName,
      bio:user.bio,
      imageUrl:user.imageUrl
    });
  }  
  catch(error){
    return res.status(500);
  }
};

exports.delete = async (req, res) =>{
    try{        
      const user = await db.User.findOne({where:{id:req.params.id}});
      if(user.imageUrl != ""){
        fm.deleteImageByUrl(user.imageUrl);
      }
      await user.destroy();
      return res.status(200).json({message:"User deleted succesfully !"});
    }
    catch(error){
      return res.status(404);
    }
};