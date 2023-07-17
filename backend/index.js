require("./src/db/config.js");
const express = require("express");
const routes = require("./src/routes.js");
const cors = require('cors');
const { json } = require("express");

require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors())
app.use(routes);
const PORT = process.env.PORT || 3333;
app.listen(PORT);


module.exports = app;