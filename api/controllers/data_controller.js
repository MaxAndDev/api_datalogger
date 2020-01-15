const logger = require('../../logger/logger');
const mongoose = require('mongoose');
const crypto = require('crypto');
const apikey = require('uuid-apikey');

// Models
const Data = require('../models/data_model');
const Station = require('../models/station_model');

exports.data_post = (req, res, next) => {

    const station_id = req.body.station_id;
    const iv = req.body.iv;
    const encr_obj = req.body.encrypted;
    const algorithm = 'aes-256-cbc';

    Station.findById(station_id) // check if station exists
        .exec()
        .then(doc => {

            const api_key = doc.api_key; // get api key from db and secret
            const secret = doc.secret;
            logger.info("API_KEY: " + api_key);
            logger.info("Secret: " + secret);

            // decrypt encrypted
            var decipher = crypto.createDecipheriv(algorithm, secret, Buffer.from(iv, 'base64'));
            //decipher.setAutoPadding(false);
            var dec = decipher.update(encr_obj, 'base64', 'utf8'); // input enc = base64 and output = "utf8" Caution: Despends on the source where the package is comming from -> remember autoPadding see Stackoverflow
            dec += decipher.final('utf8');

            console.log(dec);
            
            // transform API Key
            const json_data = JSON.parse(dec); // transform string to json obj
            
            //alternative do this apikey.toUUID(json_data.api_key) and compare with api_key from above -> less queries
            //console.log(json_data);
            
            Station.find({ api_key: apikey.toUUID(json_data.api_key) }) // retransform api key to uuid because this one was savedind( {api_key: data.api_key})
                .exec()
                .then(doc => {
                    if (doc) { // if api_key match or if a document with this api exists save the data 
                        const data = new Data({
                            _id: new mongoose.Types.ObjectId,
                            station_id: station_id,
                            airpressure: json_data.airpressure,
                            humidity: json_data.humidity,
                            temperature: json_data.temperature,
                            timestamp: json_data.timestamp,
                        });
                        data.save().then(result => {
                            logger.info(result);
                            logger.info('Save success');
                            res.status(200).json({
                                message: 'Created data',
                                data: data
                            });
                        }).catch(err => {
                            logger.error(err);
                            res.status(409).json({
                                message: 'Wrong data format'
                            });
                        });
                    }
                }).catch( err => {
                    logger.info(err);
                    res.status(401).json({
                        error: err,
                        message: "Wrong API Permissons"
                    });
                });
        }).catch(err => {
            logger.error(err);
            res.status(404).json({
                error: err,
                message: 'Nothing found'
            });
        });

        exports.data_get_all = (req, res, next) => {
            Data.find()
                .select('_id station_id airpressure humidity temperature timestamp')
                .exec()
                .then(docs => {
                    const response = {
                        count: docs.length,
                        data: docs
                    };
                    if (docs.length > 0) {
                        res.status(200).json(response)
                    } else {
                        res.status(404).json({
                            message: 'Nothing found'
                        });
                    }
                }).catch(err => {
                    logger.error(err);
                    res.status(400).json({
                        message: 'Something went wrong!'
                    });
                });
        }
}

exports.data_get_byId = (req, res, next) => {
    const id = req.params.dataId;
    Data.findById(id)
        .exec()
        .then(doc => {
            logger.info("From DB: " + doc);
            if (doc) {
                res.status(200).json(doc);
            } else {
                res.status(404).json({
                    message: 'No valid entry for given ID'
                });
            }
        }).catch(err => {
            logger.error(err);
            res.status(500).json({
                message: 'Something went wrong'
            });
        });
}

exports.data_get_byStationId = (req, res, next) => {
    const id = req.params.stationId;
    Data.find({ station_id: id })
        .exec()
        .then(docs => {
            if (docs) {
                res.status(200).json(docs);
            } else {
                res.status(404).json({
                    message: 'No valid entriy for given stationId'
                });
            }
        }).catch(err => {
            logger.error(err);
            res.status(500).json({
                message: 'Something went wrong'
            });
        });
}