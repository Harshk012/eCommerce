const db = require('../config');

const getAllProducts = async (country) => {
    let query = 'SELECT * FROM Products JOIN Variants ON Products.product_id = Variants.product_id';
    if (country) {
        query += ' WHERE country = ?';
        return await db.execute(query, [country]);
    }
    return await db.execute(query);
};

const getProductById = async (id) => {
    const query = 'SELECT * FROM Products JOIN Variants ON Products.product_id = Variants.product_id WHERE Products.product_id = ?';
    return await db.execute(query, [id]);
};

const createProduct = async (product, variants) => {
    const productQuery = 'INSERT INTO Products (name, description, model_number, sku) VALUES (?, ?, ?, ?)';
    const result = await db.execute(productQuery, [product.name, product.description, product.model_number, product.sku]);
    const productId = result[0].insertId;
    for (let variant of variants) {
        const variantQuery = 'INSERT INTO Variants (product_id, colour, quantity, price, country) VALUES (?, ?, ?, ?, ?)';
        await db.execute(variantQuery, [productId, variant.colour, variant.quantity, variant.price, variant.country]);
    }
};

const updateProduct = async (id, product) => {
    const query = 'UPDATE Products SET name = ?, description = ?, model_number = ?, sku = ? WHERE product_id = ?';
    
    // Validate and set default values
    const name = product.name || null;
    const description = product.description || null;
    const model_number = product.model_number || null;
    const sku = product.sku || null;

    await db.execute(query, [name, description, model_number, sku, id]);
};


const deleteProduct = async (id) => {
    const deleteVariantsQuery = 'DELETE FROM Variants WHERE product_id = ?';
    const deleteProductQuery = 'DELETE FROM Products WHERE product_id = ?';
    await db.execute(deleteVariantsQuery, [id]);
    await db.execute(deleteProductQuery, [id]);
};

const deleteVariant = async (id) => {
    const query = 'DELETE FROM Variants WHERE variant_id = ?';
    await db.execute(query, [id]);
};

module.exports = {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
    deleteVariant
};
