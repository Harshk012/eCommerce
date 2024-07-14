const logisticsModel = require('../models/logisticsModel');

const getAllLogistics = async (req, res) => {
    const country = req.query.country;
    try {
        const [rows] = await logisticsModel.getAllLogistics(country);
        res.json(rows);
    } catch (err) {
        res.status(500).json(err);
    }
};

const getLogisticsById = async (req, res) => {
    const id = req.params.id;
    try {
        const [rows] = await logisticsModel.getLogisticsById(id);
        res.json(rows);
    } catch (err) {
        res.status(500).json(err);
    }
};

const createLogistics = async (req, res) => {
    const logistics = req.body;
    try {
        await logisticsModel.createLogistics(logistics);
        res.status(201).json({ message: 'Logistics record created successfully' });
    } catch (err) {
        res.status(500).json(err);
    }
};

const updateLogistics = async (req, res) => {
    const id = req.params.id;
    const logistics = req.body;
    try {
        await logisticsModel.updateLogistics(id, logistics);
        res.json({ message: 'Logistics record updated successfully' });
    } catch (err) {
        res.status(500).json(err);
    }
};

const deleteLogistics = async (req, res) => {
    const id = req.params.id;
    try {
        await logisticsModel.deleteLogistics(id);
        res.json({ message: 'Logistics record deleted successfully' });
    } catch (err) {
        res.status(500).json(err);
    }
};

module.exports = {
    getAllLogistics,
    getLogisticsById,
    createLogistics,
    updateLogistics,
    deleteLogistics
};
