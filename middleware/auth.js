const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { success, error } = require('../utils/response');

const authCheck = async (req, res) => {

    if (!req.headers, !req.headers.authorization || !req.headers.authorization.startsWith('Bearer')) {
        return res.send(success(res, "Token is missing"));
    }

    const accessToken = req.headers.authorization.split(' ')[1];

    try {

        const decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
        const user = await User.findOne({ _id: decoded.id });
        if (!user) {
            return res.send(success(res, "User not found"));
        }
        req.user = user;
        next();

    } catch (error) {
        return res.send(error(res, "Invalid token"));
    }
}

module.exports = authCheck;

