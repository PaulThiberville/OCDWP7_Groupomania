require("dotenv").config();
const jwt = require("jsonwebtoken");
const tokenSecret = process.env.ACCESS_TOKEN_SECRET;
const db = require('../models')

function auth(req, res, next){ 
  console.log("Auth") 
  console.log('Auth req.body : ', req.body)
  try{
    const token = req.headers.authorization.split(" ")[1];
    if(!token){
      return res.status(401);
    }
    const decodedToken = jwt.verify(token, tokenSecret);
    const userId = decodedToken.userId;
    db.User.findOne({where : { id:userId },raw:true}).then(user => {
      if(!user){
        return res.status(401)
      }
      req.user = {id:userId,role:user.role}
      next()
    })
  }
  catch{
    console.log("Auth Error")
    return res.status(500)
  }
}

function authRole(role) {
  return (req, res, next) => {
    if (req.user.role !== role) {
      return res.status(401)
    }
    next()
  }
}

module.exports = {
  auth,
  authRole,
}