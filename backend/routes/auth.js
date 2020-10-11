const express = require('express');
const auth = require('../middlewares/auth');

const { getUser, authUser } = require('../controlls/auth');

const router = express.Router();

router.route('/').get(auth, getUser);
router.route('/').post(authUser);

module.exports = router;