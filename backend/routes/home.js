const express = require('express');
const router = express.Router();

// Route per visualizzare la pagina di login
router.get('/', (req, res) => {
    res.render('home/home')
});

module.exports = router;