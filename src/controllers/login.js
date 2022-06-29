const bcrypt = require("bcryptjs");

const log4js = require("../utils/logger");
const { getUser, createUser } = require("../utils/db/functions/users");
const { getToken, validate } = require("../utils/functions");

const logger = log4js.getLogger("server");

async function register(req, res) {
  const { username, email, password } = req.body;

  if (!(username && email && password))
    return res.status(400).send({
      response_message: "Send username, email and password for register.",
    });

  const oldUser = await getUser({ email });
  if (oldUser)
    return res.status(400).send({
      response_message: "User with this email address is already registered.",
    });

  const indications = validate({ email, password });
  if (indications.length !== 0)
    return res.status(400).send({
      response_message: "User not created.",
      response_description: indications,
    });

  const user = await createUser({ username, email, password });
  const token = getToken({ user, email });

  return res
    .status(200)
    .json({ response_message: "User created.", token: token });
}

async function login(req, res) {
  const { email, password } = req.body;

  if (!(email && password))
    return res
      .status(400)
      .send({ response_message: "Send email and password for login" });

  const user = await getUser({ email });
  if (!user)
    return res.status(400).send({
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

module.exports = {
  register,
  login,
  getUsername,
};
