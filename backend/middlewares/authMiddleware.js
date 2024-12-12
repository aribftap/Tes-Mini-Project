const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1]; // Bearer token

    if (!token) {
        return res.status(403).json({
            code: 403,
            status: 'failed',
            message: 'No token provided',
            data: []
        });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({
                code: 401,
                status: 'failed',
                message: 'Unauthorized',
                data: []
            });
        }

        req.userId = decoded.idUser;
        next();
    });
};

module.exports = verifyToken;
