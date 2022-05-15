const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
const db = require("../models");

dotenv.config();

exports.signup = async (req, res) => {
  if(await emailExist(req.body.email) === true) return res.status(409).json("Email already exist");

  try{
    const credentials =  req.body;
    const cryptedPassword = await bcrypt.hash(credentials.password,10);
    await db.User.create({
      firstName: credentials.firstName,
      lastName: credentials.lastName,
      email: credentials.email,
      password: cryptedPassword,
      bio: "Hey !",
      imageUrl: "",
      role: setRole(credentials)
    })
    return res.status(201).json({message:"User succesfully created !"});
  }
  catch(error){
    return res.status(500).json(error.message);
  }    
}

exports.login = async (req, res) => {
    try{
        const user = await db.User.findOne({where : { email: req.body.email },raw:true});
        if (!user) {
          return res.status(401).json("Can't find user");
        }
        const valid = await bcrypt.compare(req.body.password, user.password)
        if (!valid) {
          return res.status(403).json("Invalid password");
        }
      
        const accessToken = generateAccessToken(user.id);
        const refreshToken = jwt.sign({ userId: user.id }, process.env.REFRESH_TOKEN_SECRET);
        await db.Session.create({
            refreshToken: refreshToken,
            UserId: user.id
        })
        return res.status(200).json({
          userId: user.id,
          role:user.role,
          accessToken: accessToken,
          refreshToken: refreshToken,
          expiresAt: 15 * 60 * 1000 + Date.now()
          });
    }
    catch(error){
        return res.status(500).json("Error on login : "+error.message);
    }
  
}

exports.token = async (req, res) => {
    const refreshToken = req.body.refreshToken;
    if(refreshToken==null)return res.status(401).json("Can't find refreshToken in request body");

    const tokenExist = await db.Session.tokenExist(refreshToken);
    if(tokenExist === false){
        return res.status(403).json("Can't find requested refreshToken in database");
    }    

    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err,user) =>{
        if(err)return res.status(403).json("JWT verify error");
        const accessToken = generateAccessToken(user.userId);
        res.status(200).json({accessToken:accessToken, expiresAt: 15 * 60 * 1000 + Date.now() });
    }) 
};

exports.logout = async (req, res) => {
    
    const refreshToken = req.body.refreshToken;
    if(refreshToken==null)return res.status(404).json("Can't find refreshToken in request body");
    const dbRefreshToken = await db.Session.findOne({where:{refreshToken:refreshToken}});
    if(dbRefreshToken === null)return res.status(404).json("Token not found");
    await dbRefreshToken.destroy();
    return res.status(200).json("Succesfully logged out");
};

function generateAccessToken(userId){
    const accessToken = jwt.sign({userId:userId}, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "15m"
      });
    return accessToken;
}

async function emailExist(email){
  const sameEmailUsers = await db.User.findOne({where: {email: email}});
  if(sameEmailUsers){
    return true
  }
  return false
}

function setRole(credentials){
  if(credentials.email === process.env.ADMIN_EMAIL
    && credentials.password === process.env.ADMIN_PASSWORD){
      return "admin";
    }
  return "basic";
}



