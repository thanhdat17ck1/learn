const jwt = require('jsonwebtoken');
const config = require('../config');
const secretKey = config.secretKey;

function authenticateToken(req, res, next) {
    const token = req.header('Authorization');
    console.log(secretKey);
    if (!token) return res.status(401).json({ message: 'Không có token được cung cấp.' });

    jwt.verify(token, secretKey, (err, user) => {
        if (err) {
            // console.log(err); // Log lỗi để xem mã lỗi là gì
            return res.status(403).json({ message: 'Token không hợp lệ.' });
        }
        req.user = user;
        next();
    });
}

module.exports = authenticateToken;
