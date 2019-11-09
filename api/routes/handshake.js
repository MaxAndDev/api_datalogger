const express = require('express');
const fs = require('fs');
const router = express.Router();
const logger = require('../../logger/logger');
const mongoose = require('mongoose');

const Data = require('../models/data_model');

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
                    Data.find({})
                        .select('station_id')
                        .sort({'station_id': -1})
                        .limit(1)
                        .exec()
                        .then( doc => {
                            console.log(doc);
                            res.status(200).json({
                                public: data, // Achtung response enthält Zeilenumruch \n 
                                station_id: doc[0].station_id + 1
                            })
                        });                   
                }
            });
        }
    });

});

router.post('/postPublic', (req, res, next) => {
    public_client = req.body.public; // public client nehmen um secret zu verschlüsseln und als response zurück zu senden
});

module.exports = router;