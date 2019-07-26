const express = require('express');
const router = express.Router();

const UserController = require('../controllers/user.controller');
const AuthMiddleware = require('../middlewares/auth.middleware');

router.post('/register', UserController.createUser);
router.post('/login', UserController.authUser);
router.get('/checkLogin', AuthMiddleware.checkAuth, UserController.checkLogin);

module.exports = router;