const orderModel = require('../models/orderModel');

const getAllOrders = async (req, res) => {
    const country = req.query.country;
    try {
        const [rows] = await orderModel.getAllOrders(country);
        res.json(rows);
    } catch (err) {
        res.status(500).json(err);
    }
};

const getOrderById = async (req, res) => {
    const id = req.params.id;
    try {
        const [rows] = await orderModel.getOrderById(id);
        res.json(rows);
    } catch (err) {
        res.status(500).json(err);
    }
};

const createOrder = async (req, res) => {
    const order = req.body;
    try {
        await orderModel.createOrder(order);
        res.status(201).json({ message: 'Order created successfully' });
    } catch (err) {
        res.status(500).json(err);
    }
};

const updateOrder = async (req, res) => {
    const id = req.params.id;
    const order = req.body;
    try {
        await orderModel.updateOrder(id, order);
        res.json({ message: 'Order updated successfully' });
    } catch (err) {
        res.status(500).json(err);
    }
};

const deleteOrder = async (req, res) => {
    const id = req.params.id;
    try {
        await orderModel.deleteOrder(id);
        res.json({ message: 'Order deleted successfully' });
    } catch (err) {
        res.status(500).json(err);
    }
};

module.exports = {
    getAllOrders,
    getOrderById,
    createOrder,
    updateOrder,
    deleteOrder
};
