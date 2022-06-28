const express = require("express");
let router = express.Router();
let { loginControllers } = require('../controllers');
let auth = require('../middleware/auth');

router.post('/registrar', loginControllers.register );
router.post('/login', loginControllers.login );
router.get('/user', auth.verifyToken, loginControllers.getUsername );

module.exports = router;
