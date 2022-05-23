const http = require("http");
const socialApp = require("./socialApp");
const authApp = require("./authApp");
const db = require("./models");
const AUTH_PORT = process.env.AUTH_PORT || 4000;
const SOCIAL_PORT = process.env.SOCIAL_PORT || 5000;

//This server run two applications.
//AuthApp : manage users Creation , connexion and token refresh.
//SocialApp : manage our social network features like profiles, posts and comments.

db.sequelize.sync().then(() => {
  authApp.listen(AUTH_PORT, () => {
    console.log(
      `Authentication app listening on : http://localhost:${AUTH_PORT}`
    );
  });
  socialApp.listen(SOCIAL_PORT, () => {
    console.log(`Social app listening on : http://localhost:${SOCIAL_PORT}`);
  });
});
