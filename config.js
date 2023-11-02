const crypto = require('crypto');

function generateSecretKey() {
    // Tạo secret key ngẫu nhiên với 64 bytes
    return crypto.randomBytes(64).toString('hex');
}

module.exports = {
    secretKey: generateSecretKey()
};
