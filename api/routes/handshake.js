const express = require('express');
const fs = require('fs');
const router = express.Router();
const logger = require('../../logger/logger');
const mongoose = require('mongoose');

const Station = require('../models/station_model');
const secretGenerator = require('../utilities/secretGenerator');
const encrypt = require('../utilities/encrypt');

router.get('/hello', (req, res, next) => {
    fs.access('public.txt', fs.F_OK, (err) => {
        if(err) {
            logger.err(err);
            res.status(500).json({
                message: "Public Key not found"
            });
        } else {
            fs.readFile('public.txt', 'utf8', (err, data) => {
                if (err) {
                    logger.err(err);
                    res.status(500).json({
                        message: 'Read File Error'
                    });
                } else {
                    res.status(200).json({
                        public: data, // Achtung response enthält Zeilenumruch \n 
                    })                  
                }
            });
        }
    });

}); 

router.post('/register', (req, res, next) => {
    public_client = req.body.public; // public client nehmen um secret zu verschlüsseln und als response zurück zu senden
    station_id = req.body.station_id;
    const station = new Station({
        _id: new mongoose.Types.ObjectId,
        station_id: station_id,
        public: public_client
    });
    station.save().then( result => {
        logger.info(result);
        secretGenerator(station_id, (doc, err) => {
            console.log(doc);
            if (doc) {
                encrypt(station_id, ( data, err) => {
                    if (data) {
                        res.status(200).json({
                            message: 'Station registered',
                            station: data
                        });
                    } else {
                        res.status(500).json({
                            message: err
                        });
                    }
                });
            } else {
                res.status(500).json({
                    message: err
                });
            }
        })
    }).catch( err => {
        logger.err(err);
        res.status(409).json({
            message: 'Wrong data format'
        });
    });
});

module.exports = router;