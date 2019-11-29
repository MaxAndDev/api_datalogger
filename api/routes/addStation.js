const express = require('express');
const router = express.Router();
const logger = require('../../logger/logger');
const mongoose = require('mongoose');
const Station = require('../models/station_model');

router.post('/', (req, res, next) => {
    const station = new Station({
        _id: new mongoose.Types.ObjectId,
        latitude: req.body.latitude,
        longitude: req.body.longitude,
        description: req.body.description,
        position_tag: req.body.position_tag,
        created_at: new Date.now()/1000,
    });
    station.save()
    .then( result => {
        logger.inf(result);
        res.status(200).json({
            message: 'success'
        })
    }).catch( err => {
        logger.error(err);
        res.status(500).json({
            error: 'Something went wrong'
        });
    });
});

module.exports = router;
