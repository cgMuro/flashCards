const express = require('express');
const auth = require('../middlewares/auth');

const router = express.Router();

const { createUser, updateUser } = require('../controlls/users');

router.route('/').post(createUser)
router.route('/:id').put(auth, updateUser)

module.exports = router;