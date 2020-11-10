var jwt = require('jsonwebtoken');

function hashToken(payload){
    let token = jwt.sign(payload, 'secret');
    return token;
}

function verifyToken(token){
    let decoded = jwt.verify(token, 'secret');
    return decoded
}

module.exports = {hashToken, verifyToken};