const jwt = require('jsonwebtoken');
const extractToken = (req) => {
    const token = req.headers.token;
    if (!token) {
        throw new Error('No token provided');
    }
    const decodedToken = jwt.verify(token, 'jwt-secret-key'); // use your actual secret or store in .env
    return decodedToken;
};

module.exports = extractToken;