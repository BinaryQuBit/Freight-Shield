// authMiddleware.js
const jwt = require('jsonwebtoken');
require('dotenv').config();

const protect = async (req, res, next) => {
    try {
        let token;
        if (req.headers.authorization) {
            token = req.headers.authorization;
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.driverId = decoded.id; // Attach the driver's ID to the request object
            next();
        } else {
            throw new Error('Not authorized, no token');
        }
    } catch (error) {
        console.error(error);
        res.status(401).send({ message: 'Not authorized' });
    }
};

module.exports = { protect };
