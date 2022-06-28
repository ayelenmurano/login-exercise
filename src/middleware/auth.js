const jwt = require("jsonwebtoken");
const { tokenKey } = require("../utils/env");

module.exports = {

    verifyToken: (req, res, next) => {
    const token = req.headers["x-access-token"];

    if (!token) {
        return res.status(400).send({response_message:"A token is required for authentication"});
    }
    try {
        const decoded = jwt.verify(token, tokenKey);
        req.user = decoded;
    } catch (err) {
        return res.status(400).send({response_message:"Invalid Token"});
    }
    return next();
    }
    
};