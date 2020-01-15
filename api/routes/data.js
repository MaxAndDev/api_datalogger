const express = require('express');
const router = express.Router();

// Controllers
const DataController = require('../controllers/data_controller');

// POST data
router.post('/', DataController.data_post);
    
// GET all data
router.get('/', DataController.data_get_all);

// GET Data by dataId
router.get('/findById/:dataId', DataController.data_get_byId);

// GET Data by stationId
router.get('/findByStationId/:stationId', DataController.data_get_byStationId);

module.exports = router;