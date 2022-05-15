const express = require("express");
const app = express();
const helmet = require('helmet');
const cors = require('cors');

app.use(cors());
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(helmet());

app.use("", require('./routes/auth'));

module.exports = app;
