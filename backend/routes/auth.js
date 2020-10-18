const express = require('express');
const auth = require('../middlewares/auth');

// Get Auth controlls
const { getUser, authUser } = require('../controlls/auth');

// Init router
const router = express.Router();

// Routes
router.route('/').get(auth, getUser);
router.route('/').post(authUser);

module.exports = router;