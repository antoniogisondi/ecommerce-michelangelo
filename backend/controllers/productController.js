const { Product, Category, Review } = require('../models/index');

// Recupero di tutti i prodotti
exports.getProducts = async (req, res) => {
    try {
        const products = await Product.findAll({
            include: [
                {
                    model: Category,
                    attributes: ['name'],
                },
                {
                    model: Review,
                    attributes: ['rating', 'comment'],
                }
            ]
        });

        if (products.length === 0) {
            return res.render('admin/product/product-view', { products });
        }
        res.render('admin/product/product-view', { products });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Creazione di un nuovo prodotto
exports.createProduct = async (req, res) => {
    try {
        const { name, description, price, stock, categoryId } = req.body;
        const product = await Product.create({ name, description, price, stock, categoryId });
        res.status(201).json(product);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Recupero di un singolo prodotto tramite ID
exports.getProductById = async (req, res) => {
    try {
        const product = await Product.findByPk(req.params.id, {
            include: [
                {
                    model: Category,
                    attributes: ['name'],
                },
                {
                    model: Review,
                    attributes: ['rating', 'comment'],
                }
            ]
        });
        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Aggiornamento di un prodotto tramite ID
exports.updateProduct = async (req, res) => {
    try {
        const { name, description, price, stock, categoryId } = req.body;
        const product = await Product.findByPk(req.params.id);
        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }
        await product.update({ name, description, price, stock, categoryId });
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Cancellazione di un prodotto tramite ID
exports.deleteProduct = async (req, res) => {
    try {
        const product = await Product.findByPk(req.params.id);
        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }
        await product.destroy();
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
