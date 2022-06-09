const http = require("http");
const db = require("./models");
const AUTH_PORT = process.env.AUTH_PORT || 4000;
const express = require("express");
const app = express();
const helmet = require("helmet");
const cors = require("cors");

//This server is used for user authentication.
//It manage user creation, connexion, token refresh and logout

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(helmet());

app.use("", require("./routes/auth"));

db.sequelize.sync().then(() => {
  app.listen(AUTH_PORT, () => {
    console.log(
      `Authentication app listening on : http://localhost:${AUTH_PORT}`
    );
  });
});
