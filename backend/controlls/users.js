const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');


// @desc --> Create user
// @route --> POST api/users
// @acces --> Public
exports.createUser = async(req, res, next) => {
    // Get fields
    const { username, email, password } = req.body;

    // Check if all fields are filled
    if (!username || !email || !password) return res.status(500).json({ success: false, message: 'Please enter all fields' });

    // Check if user already exists
    const existingUser = await User.getUser(email);
    if (existingUser) return res.status(500).json({ success: false, message: 'User already exists' });

    // Encrypt password
    const salt = await bcrypt.genSalt(10);
    req.body.password = await bcrypt.hash(password, salt);

    try {
        // Create new user
        await User.createUser(req.body);
        // Get just created user
        const newUser = await User.getUser(email);

        // Sign JsonWebToken
        jwt.sign(
            { id: newUser.id},
            process.env.JWT_SECRET,
            { expiresIn: 3600 },
            (err, token) => {
                if(err) throw err;
                // Set response status
                return res.status(201).json({ success: true, message: 'User created', user: newUser, token });
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
        // Get fields
        let field = Object.keys(req.body)[0];
        let value = req.body[field];
        // Hash new password
        if (field === 'password') {
            const salt = await bcrypt.genSalt(10);
            value = await bcrypt.hash(value, salt);
        }
        // Update user
        await User.updateUser(req.params.id, field, value);
        // Get just updated user
        const updUser = await User.getUserbyId(req.params.id);
        // Set response status
        res.status(200).json({ success:true, message: 'User update', user: updUser });
    } catch (error) {
        next(new Error(error));
    }
}