// Authentication middleware example using JWT
const jwt = require('jsonwebtoken');

const isAdmin = (req, res, next) => {
    // Get the token from the request header, query parameter, or cookies
    const token = req.headers.authorization?.split(' ')[1]; // Assuming the token is in the Authorization header

    if (token) {
        jwt.verify(token, 'secretkey', (err, decoded) => {
            if (err) {
                // Token is invalid or expired
                return res.status(401).json({ message: 'Unauthorized' });
            } else {
                // Token is valid, store user details (including role) in req.user
                req.user = decoded; // decoded contains user details, including the role
                next(); // Proceed to the next middleware or route handler
            }
        });
    } else {
        // No token provided
        res.status(401).json({ message: 'No token provided' });
    }
};



 const isUser = (req, res, next) => {
    // Get the token from the request header, query parameter, or cookies
    const token = req.headers.authorization?.split(' ')[1]; // Assuming the token is in the Authorization header

    if (token) {
        jwt.verify(token, 'secretkey', (err, decoded) => {
            if (err) {
                // Token is invalid or expired
                return res.status(401).json({ message: 'Unauthorized' });
            } else {
                // Token is valid, store user details (including role) in req.user
                req.user = decoded; // decoded contains user details, including the role
                next(); // Proceed to the next middleware or route handler
            }
        });
    } else {
        // No token provided
        res.status(401).json({ message: 'No token provided' });
    }
};
module.exports = isAdmin,isUser;
