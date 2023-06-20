const express = require('express');
const router = express.Router();
const userController = require('../Controllers/User.controllers');

router.post('/signUp', userController.createUser);
router.post('/signIn', userController.signInUser);

module.exports = router;