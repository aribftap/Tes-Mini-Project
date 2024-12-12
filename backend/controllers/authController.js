const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/usersModel');

exports.register = (req, res) => {
    const newUser = {
        username: req.body.username,
        password: req.body.password,
        email: req.body.email
    };
    User.createUser(newUser, (err, result) => {
        if (err) {
            res.status(500).json({
                code: 500,
                status: 'failed',
                message: 'Internal Server Error',
                data: []
            });
        } else {
            res.status(201).json({
                code: 201,
                status: 'success',
                message: 'User registered successfully',
                data: { id: result.insertId, username: newUser.username, email: newUser.email }
            });
        }
    });
};

exports.login = (req, res) => {
    const { username, password } = req.body;
    User.findByUsername(username, (err, users) => {
        if (err) {
            res.status(500).json({
                code: 500,
                status: 'failed',
                message: 'Internal Server Error',
                data: []
            });
        } else if (!users.length) {
            res.status(404).json({
                code: 404,
                status: 'failed',
                message: 'User not found',
                data: []
            });
        } else {
            const user = users[0];
            bcrypt.compare(password, user.password, (err, isMatch) => {
                if (err || !isMatch) {
                    res.status(401).json({
                        code: 401,
                        status: 'failed',
                        message: 'Invalid credentials',
                        data: []
                    });
                } else {
                    const token = jwt.sign({ idUser: user.idUser, username: user.username }, process.env.JWT_SECRET, { expiresIn: '1h' });
                    res.json({
                        code: 200,
                        status: 'success',
                        message: 'Login successful',
                        data: { token }
                    });
                }
            });
        }
    });
};

exports.logout = (req, res) => {
    res.json({
        code: 200,
        status: 'success',
        message: 'Logged out successfully'
    });
};
