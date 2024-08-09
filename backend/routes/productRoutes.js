const express = require('express');
const {
    createProduct,
    getProducts,
    getProductById,
    updateProduct,
    deleteProduct
} = require('../controllers/productController');
const { Category } = require('../models/index')
const router = express.Router();

// Rotta per recuperare tutti i prodotti
router.get('/products', getProducts);

router.get('/products/new', async (req, res) => {
    const categories = await Category.findAll()
    res.render('admin/product/new-product', { categories })
});

// Rotta per creare un nuovo prodotto
router.post('/products', createProduct);

// Rotta per recuperare un singolo prodotto tramite ID
router.get('/products/:id', getProductById);

// Rotta per aggiornare un prodotto tramite ID
router.put('/products/:id', updateProduct);

// Rotta per eliminare un prodotto tramite ID
router.delete('/products/:id', deleteProduct);

module.exports = router;
