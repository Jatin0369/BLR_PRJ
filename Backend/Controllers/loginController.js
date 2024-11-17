const login = require('../Models/login')
const Joi = require('joi')

exports.checklogin = async (req, res) => {
    try {
        const { username, password } = req.body;
        const result = await login.find({ username });

        if (result.length === 0) {
            return res.status(404).json({ success: false, error: 'No such user found' });
        }

        const user = result[0];

        if (user.password !== password) {
            return res.status(400).json({ success: false, error: 'Incorrect password' });
        }

        // On successful login, send user data (or whatever data is needed)
        res.status(200).json({ success: true, message: 'Login successful', user: user });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};
