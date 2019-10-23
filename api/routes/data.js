const express = require('express');
const router = express.Router();
const logger = require('../../logger/logger');
const mongoose = require('mongoose');

const Data = require('../models/data_model');

router.post('/', (req, res, next) => {

    // hier muss zuerst entschlüsselung des Bodies erfolgen
    logger.info('Server success');
    const data = new Data({
        _id: new mongoose.Types.ObjectId,
        station_id: req.body.station_id,
        airpressure: req.body.airpressure,
        humidity: req.body.humidity,
        temperature: req.body.temperature,
        timestamp: req.body.timestamp,
        latitude: req.body.latitude,
        longitude: req.body.longitude,
        position_tag: req.body.position_tag
    });
    data.save().then( result => {
        logger.info(result);
        res.status(200).json({
            message: 'Created data',
            data: data
        });
    }).catch( err => {
        logger.error(err);
        res.status(409).json({
            message: 'Wrong data format'
        });
    });
});

module.exports = router;