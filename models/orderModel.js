const db = require('../config');

const getAllOrders = async (country) => {
    let query = 'SELECT * FROM Orders';
    if (country) {
        query += ' WHERE country_code = ?';
        return await db.execute(query, [country]);
    }
    return await db.execute(query);
};

const getOrderById = async (id) => {
    const query = 'SELECT * FROM Orders WHERE order_id = ?';
    return await db.execute(query, [id]);
};

const createOrder = async (order) => {
    const query = 'INSERT INTO Orders (product_id, variant_id, delivery_date, order_date, quantity, total_price, country_code) VALUES (?, ?, ?, ?, ?, ?, ?)';
    return await db.execute(query, [order.product_id, order.variant_id, order.delivery_date, order.order_date, order.quantity, order.total_price, order.country_code]);
};

const updateOrder = async (id, order) => {
    const query = 'UPDATE Orders SET product_id = ?, variant_id = ?, delivery_date = ?, order_date = ?, quantity = ?, total_price = ?, country_code = ? WHERE order_id = ?';
    return await db.execute(query, [order.product_id, order.variant_id, order.delivery_date, order.order_date, order.quantity, order.total_price, order.country_code, id]);
};

const deleteOrder = async (id) => {
    const query = 'DELETE FROM Orders WHERE order_id = ?';
    return await db.execute(query, [id]);
};

module.exports = {
    getAllOrders,
    getOrderById,
    createOrder,
    updateOrder,
    deleteOrder
};
