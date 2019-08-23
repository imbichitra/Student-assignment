const express = require('express');
const router = express.Router();

const UserController = require('../controllers/user');

router.post('/login',UserController.user_login);
router.post('/signup',UserController.user_signup);
module.exports = router;