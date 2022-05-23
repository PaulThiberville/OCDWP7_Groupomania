require("dotenv").config();
const jwt = require("jsonwebtoken");
const tokenSecret = process.env.ACCESS_TOKEN_SECRET;
const db = require("../models");

/**
 * Used to check user accessToken and if user exist in our users table
 * If ok, it add a user property to req containing user id and user role
 */
function auth(req, res, next) {
  try {
    //Does req have an access token ?
    const token = req.headers.authorization.split(" ")[1];
    if (!token) return res.status(401);

    //Is the accessToken valid ?
    const decodedToken = jwt.verify(token, tokenSecret);

    //Does this user exist in our users table ?
    const userId = decodedToken.userId;
    db.User.findOne({ where: { id: userId }, raw: true }).then((user) => {
      if (!user) {
        return res.status(401);
      }
      req.user = { id: userId, role: user.role };
      next();
    });
  } catch {
    return res.status(500);
  }
}

module.exports = {
  auth,
};
