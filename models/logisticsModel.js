const db = require('../config');

const getAllLogistics = async (country) => {
    let query = 'SELECT * FROM Logistics';
    if (country) {
        query += ' WHERE country_code = ?';
        return await db.execute(query, [country]);
    }
    return await db.execute(query);
};

const getLogisticsById = async (id) => {
    const query = 'SELECT * FROM Logistics WHERE logistics_id = ?';
    return await db.execute(query, [id]);
};

const createLogistics = async (logistics) => {
    const query = 'INSERT INTO Logistics (order_id, warehouse_location, shipping_status, delivery_date, country_code, currency) VALUES (?, ?, ?, ?, ?, ?)';
    return await db.execute(query, [logistics.order_id, logistics.warehouse_location, logistics.shipping_status, logistics.delivery_date, logistics.country_code, logistics.currency]);
};

const updateLogistics = async (id, logistics) => {
    const query = 'UPDATE Logistics SET order_id = ?, warehouse_location = ?, shipping_status = ?, delivery_date = ?, country_code = ?, currency = ? WHERE logistics_id = ?';
    return await db.execute(query, [logistics.order_id, logistics.warehouse_location, logistics.shipping_status, logistics.delivery_date, logistics.country_code, logistics.currency, id]);
};

const deleteLogistics = async (id) => {
    const query = 'DELETE FROM Logistics WHERE logistics_id = ?';
    return await db.execute(query, [id]);
};

module.exports = {
    getAllLogistics,
    getLogisticsById,
    createLogistics,
    updateLogistics,
    deleteLogistics
};
