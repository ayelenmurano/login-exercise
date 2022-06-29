const jwt = require("jsonwebtoken");

const { tokenKey } = require("../env");

function getToken({ user, email }) {
  const token = jwt.sign({ user_id: user._id, email }, tokenKey, {
    expiresIn: "2h",
  });
  return token;
}

function validate({ email, password }) {
  let indications = [];

  if (email && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email))
    indications.push(`the format of the mail is not correct.`);

  if (password && !/^(?=\w*\d)(?=\w*[A-Z])\S{8,}$/.test(password))
    indications.push(
      `password must contain numbers, letters, at least one capital letter and 8 or more characters characters.`
    );

  if (password && typeof password !== "string")
    indications.push(`password must be string.`);

  return indications;
}

module.exports = { getToken, validate };
