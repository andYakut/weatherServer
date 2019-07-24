const express = require('express');
const router = express.Router();

const UserController = require('../controllers/user.controller');

router.post('/register', UserController.createUser);
router.post('/login', UserController.authUser);

module.exports = router;