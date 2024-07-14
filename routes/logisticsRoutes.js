const express = require('express');
const router = express.Router();
const logisticsController = require('../controllers/logisticsController');

router.post('/logistics', logisticsController.createLogistics);
router.get('/logistics', logisticsController.getAllLogistics);
router.get('/logistics/:id', logisticsController.getLogisticsById);
router.put('/logistics/:id', logisticsController.updateLogistics);
router.delete('/logistics/:id', logisticsController.deleteLogistics);

module.exports = router;
