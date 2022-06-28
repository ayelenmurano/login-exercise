const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const log4js = require("../utils/logger");
const { tokenKey } = require("../utils/env");
const { getUser, createUser } = require("../utils/db/functions/users");

const logger = log4js.getLogger("server");

async function register(req, res) {
  const { username, email, password } = req.body;

  if (!(username && email && password))
    return res
      .status(400)
      .send({
        response_message: "Send username, email and password for register.",
      });

  const oldUser = await getUser({ email });
  if (oldUser)
    return res
      .status(400)
      .send({
        response_message: "User with this email address is already registered.",
      });

  const indications = validate({ email, password });
  if (indications.length !== 0)
    return res.status(400).send({ response_message: indications });

  encryptedPassword = await bcrypt.hash(password, 10);

  const user = await createUser({
    username,
    email: email.toLowerCase(),
    password: encryptedPassword,
  });

  const token = getToken({ user, email });

  return res.status(200).json({ response_message: "User created." });
}

async function login(req, res) {
  const { email, password } = req.body;

  if (!(email && password))
    return res
      .status(400)
      .send({ response_message: "Send email and password for login" });

  const user = await getUser({ email });
  if (!user)
    return res
      .status(400)
      .send({
        response_message:
          "User with this email address is not already registered.",
      });

  if (user && (await bcrypt.compare(password, user.password))) {
    const token = getToken({ user, email });

    res.status(200).json({ token });
  } else {
    res.status(400).send({ response_message: "Invalid Credentials" });
  }
}

async function getUsername(req, res) {
  const { email } = req.query;

  if (!email)
    return res
      .status(400)
      .send({ response_message: "Send email and password for login" });

  const user = await getUser({ email });

  res.status(200).json({ username: user.username });
}

function getToken({ user, email }) {
  const token = jwt.sign({ user_id: user._id, email }, tokenKey, {
    expiresIn: "2h",
  });
  return token;
}

function validate({ email, password }) {
  let indications = [];
  if (email && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email))
    indications.push({
      response_message: `the format of the mail is not correct.`,
    });
  if (password && !/^(?=\w*\d)(?=\w*[A-Z])\S{8,}$/.test(password))
    indications.push({
      response_message: `password must contain numbers, letters, at least one capital letter and 8 or more characters characters.`,
    });
  if (password && typeof password !== "string")
    indications.push({ response_message: `password must be string.` });

  return indications;
}

module.exports = {
  register,
  login,
  getUsername,
};
