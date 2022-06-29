const express = require("express");
const app = express();
require("dotenv").config();

const cookieParser = require("cookie-parser");
require("./src/utils/db/conn/mongoAtlas.js");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

const { loginRouter } = require("./src/routes");

app.use("/", loginRouter);
app.get("/prueba", (req, res) => {
  res.status(200).send("Hello World!");
});

module.exports = app;
