const express = require('express');
const router = express.Router();
const logger = require('../../logger/logger');
const mongoose = require('mongoose');
const Station = require('../models/station_model');
const crypto = require('crypto');
const apikey = require('uuid-apikey');


router.post('/add', (req, res, next) => {
    const secret = crypto.randomBytes(32);
    const key = apikey.create();

    const station = new Station({
        _id: new mongoose.Types.ObjectId,
        secret: secret.toString('hex'),
        api_key: key.uuid, // save uuid and use package to get api key readme
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

        /* let iv = crypto.randomBytes(16);

        // iv length in base64 is 16 but if you encode it to hex it is 32

        let cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(process.env.PRIVATE), iv);
        let encrypted = cipher.update(secret.toString('hex'));

        encrypted = Buffer.concat([encrypted, cipher.final()]); */

        res.status(200).json({
            station_id: result._id,
            api_key: key.apiKey,
            secret: secret.toString('hex')
            //iv: iv.toString('hex'),
            //encrypted: encrypted.toString('hex')
        })

    }).catch( err => {
        console.log("Error: " + err);
        logger.info(station);
        logger.error(err);
        res.status(500).json({
            error: 'Something went wrong'
        });
    });
});

module.exports = router;
