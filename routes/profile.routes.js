const express = require('express');
const router = express.Router();

const ProfileController = require('../controllers/profile.controller');

router.get('/', ProfileController.getProfile)
router.patch('/edit', ProfileController.editProfile);

module.exports = router;