const bcrypt = require("bcryptjs");

const User = require("../../../../models/users");

async function getUser({ email }) {
  if (email) {
    const user = await User.findOne({ email: email.toLowerCase() });
    return user;
  }
}

async function deleteUser({ email }) {
  if (email) {
    await User.deleteOne({ email: email.toLowerCase() });
  }
}

async function createUser({ username, email, password }) {
  encryptedPassword = await bcrypt.hash(password, 10);

  const user = {
    username,
    email: email.toLowerCase(),
    password: encryptedPassword,
    create_datetime: new Date(),
    update_datetime: new Date(),
  };
  const userModel = new User(user);
  const createdUsed = await userModel.save();
  return createdUsed;
}

module.exports = { getUser, createUser, deleteUser };
