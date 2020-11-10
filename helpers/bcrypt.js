var bcrypt = require('bcryptjs');

function hashPassword(password) {
    let salt = bcrypt.genSaltSync(10);
    let hash = bcrypt.hashSync(password, salt);

    return hash;
}

function verifyPassword(password, hash){
    let result = bcrypt.compareSync(password, hash); // true
    return result;
}

module.exports = {hashPassword, verifyPassword}