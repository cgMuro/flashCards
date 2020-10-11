const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');


// @desc --> Create user
// @route --> POST api/users
// @acces --> Public
exports.createUser = async(req, res, next) => {
    const { username, email, password } = req.body;

    // Check if all fields are filled
    if (!username || !email || !password) return res.status(500).json({ success: false, message: 'Please enter all fields' });

    // Check if user already exists
    const existingUser = await User.getUser(email);
    if (existingUser) return res.status(500).json({ success: false, message: 'User already exists' });

    const salt = await bcrypt.genSalt(10);
    req.body.password = await bcrypt.hash(password, salt);

    try {
        const { username, email, password } = req.body;
        await User.createUser(username, email, password);
        const newUser = await User.getUser(email);

        jwt.sign(
            { id: newUser.id},
            process.env.JWT_SECRET,
            { expiresIn: 3600 },
            (err, token) => {
                if(err) throw err;
                return res.status(201).json({ success: true, message: 'User created', newUser, token });
            }
        );
    } catch (error) {
        next(new Error(error));
    }
}

// @desc --> Update user
// @route --> PUT api/users
// @acces --> Private
exports.updateUser = async(req, res, next) => {
    try {
        const field = Object.keys(req.body)[0];
        const value = req.body[field];
        await User.updateUser(req.params.id, field, value);
        const updUser = await User.getUserbyId(req.params.id);
        res.status(200).json({ success:true, message: 'User update', user: updUser });
    } catch (error) {
        next(new Error(error));
    }
}