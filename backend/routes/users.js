const express = require('express');
const auth = require('../middlewares/auth');

// Get User controlls
const { createUser, updateUser } = require('../controlls/users');

// Init router
const router = express.Router();

// Routes
router.route('/').post(createUser)
router.route('/:id').put(auth, updateUser)

module.exports = router;