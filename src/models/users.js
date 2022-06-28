const mongoose = require("mongoose");

const UsersSchema = new mongoose.Schema({
    username: {type: String, require: true},
    email: {type: String, require: true},
    password: {type: String, require: true},
    create_datetime: {type: Date, require: true},
    update_datetime: {type: Date, require: false},
});

const users = mongoose.model('users', UsersSchema);

module.exports = users;