const { Admin } = require('../models/index');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Render the login page
exports.renderLogin = (req, res) => {
    res.render('auth/login');
};

// Render the register page
exports.renderRegister = (req, res) => {
    res.render('auth/register');
};

// Register a new admin
exports.registerAdmin = async (req, res) => {
    try {
        const { username, password, email } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const admin = await Admin.create({ username, password: hashedPassword, email });
        res.status(201).json(admin);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Admin login
exports.loginAdmin = async (req, res) => {
    try {
        const { username, password } = req.body;
        const admin = await Admin.findOne({ where: { username } });

        if (!admin) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const isPasswordValid = await bcrypt.compare(password, admin.password);

        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const token = jwt.sign({ id: admin.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.cookie('authToken', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production' });
        return res.redirect('/admin/dashboard'); // Assicurati di usare return per terminare l'esecuzione
    } catch (error) {
        return res.status(500).json({ error: error.message }); // Usa return qui anche
    }
};
