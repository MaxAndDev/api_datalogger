const express = require('express');
const router = express.Router();

// Controllers
const NumbersController = require('../controllers/numbers_controller');

// GET Maximum by parameter
router.post('/max', NumbersController.get_max);

// GET Minimum by Parameter
router.post('/min', NumbersController.get_min);

// GET Average by Parameter
router.post('/avg', NumbersController.get_avg);

module.exports = router;