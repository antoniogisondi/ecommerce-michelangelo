const express = require('express');
const { renderLogin, renderRegister, registerAdmin, loginAdmin } = require('../controllers/adminController');
const router = express.Router();

// Route per visualizzare la pagina di login
router.get('/login', renderLogin);

// Route per visualizzare la pagina di registrazione
router.get('/register', renderRegister);

// Register a new admin
router.post('/register', registerAdmin);

// Admin login
router.post('/login', loginAdmin);

module.exports = router;
