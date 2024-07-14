const productModel = require('../models/productModel');
const multer = require('multer');
const path = require('path');

// Handling File Upload
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const upload = multer({ storage: storage }).array('images', 10);

// Get all products
const getAllProducts = async (req, res) => {
    const country = req.query.country;
    try {
        const [rows] = await productModel.getAllProducts(country);
        res.json(rows);
    } catch (err) {
        res.status(500).json(err);
    }
};

// Get product by ID
const getProductById = async (req, res) => {
    const id = req.params.id;
    try {
        const [rows] = await productModel.getProductById(id);
        res.json(rows);
    } catch (err) {
        res.status(500).json(err);
    }
};

// Create Product
const createProduct = async (req, res) => {
    upload(req, res, async (err) => {
        if (err) {
            return res.status(500).json(err);
        }
        const product = req.body;

        product.name = product.name || null;
        product.description = product.description || null;
        product.model_number = product.model_number || null;
        product.sku = product.sku || null;

        const files = req.files || [];

        const variants = (product.variants || []).map(variant => {
            const file = files.find(file => file.originalname === variant.colour);
            return {
                colour: variant.colour || null,
                quantity: variant.quantity || 0,
                price: variant.price || 0,
                country: variant.country || null,
            };
        });

        try {
            await productModel.createProduct(product, variants);
            res.status(201).json({ message: 'Product created successfully' });
        } catch (err) {
            res.status(500).json(err);
        }
    });
};

// Update product by ID
const updateProduct = async (req, res) => {
    const id = req.params.id;
    const product = req.body;

    product.name = product.name || null;
    product.description = product.description || null;
    product.model_number = product.model_number || null;
    product.sku = product.sku || null;

    try {
        await productModel.updateProduct(id, product);
        res.json({ message: 'Product updated successfully' });
    } catch (err) {
        res.status(500).json(err);
    }
};

// Delete product by ID
const deleteProduct = async (req, res) => {
    const id = req.params.id;

    try {
        await productModel.deleteProduct(id);
        res.json({ message: 'Product deleted successfully' });
    } catch (err) {
        res.status(500).json(err);
    }
};

// Delete variant by ID
const deleteVariant = async (req, res) => {
    const id = req.params.id;

    try {
        await productModel.deleteVariant(id);
        res.json({ message: 'Variant deleted successfully' });
    } catch (err) {
        res.status(500).json(err);
    }
};

module.exports = {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
    deleteVariant
};
