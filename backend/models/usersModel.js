const db = require('../config/db');
const bcrypt = require('bcryptjs');

const User = {
    findByUsername: (username, callback) => {
        const sql = 'SELECT * FROM Users WHERE username = ?';
        db.query(sql, [username], callback);
    },
    createUser: (newUser, callback) => {
        bcrypt.hash(newUser.password, 10, (err, hashedPassword) => {
            if (err) return callback(err);
            newUser.password = hashedPassword;
            const sql = 'INSERT INTO Users SET ?';
            db.query(sql, newUser, callback);
        });
    }
};

module.exports = User;
