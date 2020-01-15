const express = require('express');
const router = express.Router();

// Controllers
const StationControllers = require('../controllers/addStation_controller');

router.post('/add', StationControllers.post_station);

module.exports = router;
