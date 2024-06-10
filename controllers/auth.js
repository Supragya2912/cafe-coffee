const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { success, error } = require('../utils/response');


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
        const user = await User.create({ email, password: hashedPassword, phone, fullName, confirmPassword: hashedConfirmPassword });
        user.password = undefined;
        user.confirmPassword = undefined;
        return res.send(success(res, user, "User registered successfully"));
    } catch (error) {
        res.status(500).json({ message: "Something went wrong" });
    }
}

const loginUser = async (req, res) => {

    const { email, password } = req.body;
  
    try {
        const user = await User
            .findOne({ email })
            .select('+password');
        
        if (!user) {
            return res.send(error(res, "User not found"));
        }
        const isMatch = await bcrypt.compare(password, user.password);
       
        if (!isMatch) {
            return res.send(error(res, "Invalid credentials"));
        }
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: 24 * 60 * 60 * 1000 });
   
        user.password = undefined;
        return res.send(success(res,
            token, "User logged in successfully"));

    } catch (error) {
        res.status(500).json({ message: "Something went wrong" });
    }

}

const getProfile = async (req, res) => {

    try {

        const user = await User.findById(req.user.id);
        if (!user) {
            return res.send(error(res, "User not found"));
        }
        user.password = undefined;
        user.confirmPassword = undefined;
        return res.send(success(res, user, "User profile fetched successfully"));
    } catch (error) {
        res.status(500).json({ message: "Something went wrong" });
    }
}

module.exports = { registerUser, loginUser, getProfile };