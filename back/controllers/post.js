const db = require("../models");
const fm = require('../modules/fileManager');
const { Op } = require("sequelize");

exports.create = async (req, res) => {
    try{
        let imageUrl = "";
        if(req.file){
            imageUrl = `${req.protocol}://${req.get("host")}/images/${req.file.filename}`
        }
        const post = await db.Post.create({ 
            text: req.body.text,
            imageUrl: imageUrl,
            UserId: req.body.userId,
            likes:0,
            usersLiked: JSON.stringify([])
        });
        return res.status(200).json(post);
    }
    catch(error){
        console.log("Create Post Error")
        return res.status(500).json(error.message);
    }    
};

exports.getAll = async (req, res) =>{
    try{
        const date = new Date(req.body.date)
        const posts = await db.Post.findAndCountAll({
            where : {
                createdAt:{
                    [Op.lt]: date
                }},
            offset:req.body.offset,
            limit:req.body.limit,
            order: [['createdAt', 'DESC']],
            include: [{model: db.Comment, attributes:["id"]}]
        });  
        return res.status(200).json(posts);
    }
    catch(error){
        return res.status(500).json(error.message);
    }    
};

exports.getAllByUserId = async (req, res) =>{
    try{
        const date = new Date(req.body.date)
        const posts = await db.Post.findAndCountAll({
            where: {
                UserId: req.params.id,
                createdAt:{
                    [Op.lt]: date
                }
            },
            includes: ["id"],
            offset: req.body.offset,
            limit: req.body.limit,
            order: [['createdAt', 'DESC']],
            include: [{model: db.Comment, attributes:["id"]}]
        })
        return res.status(200).json(posts);
    }
    catch(error){
        return res.status(500).json(error.message);
    }    
};

exports.getOne = async (req, res) =>{
    try{
        const post = await db.Post.findOne({
            where: {id: req.params.id},
            include:  [{model: db.Comment, attributes:["id"]}]
        })
        console.log("GetOnePost:",post)
        return res.status(200).json(post);
    }
    catch(error){
        return res.status(500);
    }    
};

exports.update = async (req, res) => {
    console.log("Update Post")
    try{
        const post = await db.Post.findOne({where :{ id: req.params.id }});
        if(req.file){
            fm.deleteImageByUrl(post.imageUrl);
            post.imageUrl = `${req.protocol}://${req.get("host")}/images/${ req.file.filename }`;           
        }
        post.text = req.body.text;
        await post.save();
        return res.status(200).json(post);
    }
    catch(error){
        return res.status(500);
    }
};

exports.delete = async (req, res) =>{
    try{
        const postId = req.params.id
        const post = await db.Post.findOne({
            where: { id: postId }
        }); 
        await post.destroy();            
        return res.status(200).json({message:"Post succesfully deleted !"});
    }
    catch(error){
        return res.status(500);
    }       
};

exports.like = async (req, res)=>{
    try{
        const postId = req.params.id;
        const post = await db.Post.findOne({where: { id: postId }});
        const input = req.body.like;
        if(input === '0' && post.usersLiked.includes(req.user.id)){
            console.log("LIKING")
            const usersLiked = JSON.parse(post.usersLiked);
            const index = usersLiked.indexOf(req.user.id);
            usersLiked.splice(index, 1);
            post.usersLiked= JSON.stringify(usersLiked);
            post.likes --;
            await post.save();
        }
        if(input === '1' && !post.usersLiked.includes(req.user.id)){
            console.log("UNLIKING")
            const usersLiked = JSON.parse(post.usersLiked);
            usersLiked.push(req.user.id);
            post.usersLiked= JSON.stringify(usersLiked);
            post.likes ++;
            await post.save();
        }
        return res.status(200).json(post)
    }
    catch{
        return res.status(500);
    }
}


