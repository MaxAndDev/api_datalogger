const logger = require('../../logger/logger');
const mongoose = require('mongoose');
const Station = require('../models/station_model');
const crypto = require('crypto');
const apikey = require('uuid-apikey');

// Models
const Station = require('../models/station_model');

exports.post_station = (req, res, next) => {
    const secret = crypto.randomBytes(16); // produces 32 bytes
    const key = apikey.create();

    const station = new Station({
        _id: new mongoose.Types.ObjectId,
        secret: secret.toString('hex'),
        api_key: key.uuid,                  // save uuid and use package to get api key -> readme
        latitude: req.body.latitude,
        longitude: req.body.longitude,
        description: req.body.description,
        position_tag: req.body.position_tag,
    });

    station.save()  
    .then( result => {
        const message_object = {
            station_id: result._id,
            secret: secret.toString('hex'),
            api_key: key.apiKey
        };

        logger.info(message_object);

        res.status(200).json({
            station_id: result._id,
            api_key: key.apiKey,
            secret: secret.toString('hex')
        })

    }).catch( err => {
        logger.info(station);
        logger.error(err);
        res.status(500).json({
            error: 'Something went wrong'
        });
    });
}