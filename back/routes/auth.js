const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth');

router.get("/", (req,res)=>{return res.send("hello")})
router.post("/signup", authController.signup);
router.post("/login", authController.login);
router.post("/token", authController.token);
router.delete("/logout", authController.logout);

module.exports = router;