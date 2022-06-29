const request = require("supertest");

const app = require("../app");
const mongoose = require("../src/utils/db/conn/mongoAtlas");

const {
  deleteUser,
  createUser,
  getUser,
} = require("../src/utils/db/functions/users");
const { getToken } = require("../src/utils/functions");

const user = {
  email: "emailtest24@gmail.com",
  username: "UsuarioTest",
  password: "sssss3KKK",
};

module.exports = {
  request,
  app,
  mongoose,
  getUser,
  deleteUser,
  createUser,
  getToken,
  user,
};
