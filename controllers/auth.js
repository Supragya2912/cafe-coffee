const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {success, error} = require('../utils/response');


const registerUser = async (req, res) => {

    const { email, password, phone, confirmPassword, fullName } = req.body;
    console.log(email, password, phone, confirmPassword, fullName);
    try {
        const existingUser = await User.findOne({ email });
     
        if (existingUser) {
           return res.send(error(res, "User already exists"));
        }
        if (password !== confirmPassword) {
            return res.send(error(res, "Passwords do not match"));
        }

        const hashedPassword = await bcrypt.hash(password, 12);
        const hashedConfirmPassword = await bcrypt.hash(confirmPassword, 12);
        const user = await User.create({ email, password: hashedPassword, phone, fullName, confirmPassword:hashedConfirmPassword });
        user.password = undefined;
        user.confirmPassword = undefined;
        return res.send(success(res, user, "User registered successfully"));
    } catch (error) {
        res.status(500).json({ message: "Something went wrong" });
    }
}

module.exports = { registerUser };