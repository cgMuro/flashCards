const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
    const token = req.header('x-auth-token');

    // Check for token
    if (!token) return res.status(401).json({ success: false, message: 'No token. Authorization denied' });

    try {
        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(400).json({ success: false, message: 'Token is invalid' });
    }
}

module.exports = auth;