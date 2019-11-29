const express = require('express');
const router = express.Router();
const logger = require('../../logger/logger');
const mongoose = require('mongoose');

router.post('/', (req, res, next) => {
    res.status(200).json({
        message: 'success'
    })
});

module.exports = router;
