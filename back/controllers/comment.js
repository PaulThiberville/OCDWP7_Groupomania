const db = require("../models");
const { Op } = require("sequelize");

exports.create = async (req, res) =>{
    console.log("CreateComment: ", req.body)
    try{
        const newComment = await db.Comment.create({
            text: req.body.text || null,
            UserId: req.user.id,
            PostId: req.params.id
        })
        console.log("Created comment :", newComment)
        return res.status(201).json(newComment);
    }
    catch{
        return res.status(500);
    }    
};

exports.getOne = async (req, res) =>{
    console.log("GetOneComment :", req.params.id)
    try{
        const comment = await db.Comment.findOne({
            where: {id: req.params.id},
            include: [ {model: db.User, attributes:["id","firstName","lastName", "imageUrl"]}]
        });
        console.log(comment)
        return res.status(200).json(comment);
    }
    catch{
        return res.status(500);
    }
}

exports.getAllByPostId = async (req, res) =>{
    console.log(" GetAllCommentsByPostId : ", req.body, req.params.id)
    try{
        const date = new Date(req.body.date)
        const comments = await db.Comment.findAndCountAll({
            where: {
                PostId: req.params.id,
                createdAt:{
                    [Op.lt]: date
                }
            },
            includes: ["id"],
            offset: req.body.offset,
            limit: req.body.limit,
            order: [['createdAt', 'DESC']],
        });
        console.log(comments)
        return res.status(200).json(comments);
    }
    catch(error){
        console.log(error)
        return res.status(500);
    }
}

exports.update = async (req, res) =>{
    try{
        const comment = await db.Comment.findOne({where: {id: req.params.id}});
        await comment.update({text: req.body.text});
        return res.status(200).json(comment);
    }
    catch{
        return res.status(500);
    }    
};

exports.delete = async (req, res) =>{
    try{
        const comment = await db.Comment.findOne({where: {id: req.params.id}});
        await comment.destroy();
        return res.status(200).json({message: "Succesfully deleted comment !"});
    }
    catch(error){
        return res.status(500);
    }    
};