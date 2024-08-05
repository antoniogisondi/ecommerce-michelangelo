const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');

// Route per visualizzare la pagina admin dashboard
router.get('/admin/dashboard', authMiddleware, (req, res) => {
    res.render('admin/dashboard', { admin: req.admin });
});

module.exports = router;
