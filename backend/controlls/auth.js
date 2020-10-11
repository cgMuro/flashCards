const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');


// @desc --> Get user
// @route --> GET api/auth
// @acces --> Private
exports.getUser = async (req, res, next) => {
    const user = await User.getUserbyId(req.user.id);
    res.status(200).json({ success: true, user });
}

// @desc --> Authenticate User
// @route --> POST api/auth
// @acces --> Public
exports.authUser = async (req, res, next) => {
    const { email, password } = req.body;

    // Check if all fields are filles
    if (!email || !password) return res.status(500).json({ success: false, message: 'Please enter all fields' });

    const user = await User.getUser(email);

    // Check if user exists
    if (!user) return res.status(500).json({ success: true, message: 'Invalid credentials' });

    // Validate password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(500).json({ success: false, message: 'Invalid credentials' });


    user.password = '*******';

    jwt.sign(
        { id: user.id },
        process.env.JWT_SECRET,
        { expiresIn: 3600 },
        (err, token) => {
            if (err) throw err;
            res.status(200).json({
                success: true,
                user,
                token
            })
        }
    );
}