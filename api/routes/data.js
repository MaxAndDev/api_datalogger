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

router.get('/', (req, res, next) => {
    console.log('get req');
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
    }).catch( err => {
        logger.error(err);
        res.status(400).json({
            message: 'Something went wrong!'
        });
    });
});

router.get('/findById/:dataId', (req, res, next) => {
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
    }).catch( err => {
        logger.error(err);
        res.status(500).json({
            message: 'Something went wrong'
        });
    });
});

router.get('/findByStationId/:stationId', (req, res, next) => {
    const id = req.params.stationId;
    Data.find( { station_id : id})
    .exec()
    .then( docs => {
        if (docs) {
            res.status(200).json(docs);
        } else {
            res.status(404).json({
                message: 'No valid entriy for given stationId'
            });
        }
    }).catch( err => {
        logger.error(err);
        res.status(500).json({
            message: 'Something went wrong'
        });
    });
});

router.get('/hello', (req, res, next) => {
    
   

});

function createKeys(callback) {

    fs.access("keys.txt", fs.F_OK, (err)=> {
        if (err) {
            const { generateKeyPair } = require('crypto');
            generateKeyPair('rsa', {
            modulusLength: 4096,
            publicKeyEncoding: {
                type: 'spki',
                format: 'pem'
            },
            privateKeyEncoding: {
                type: 'pkcs8',
                format: 'pem',
                cipher: 'aes-256-cbc',
                passphrase: 'top secret'
            }
            }, (err, publicKey, privateKey) => {
                if (err) {
                    logger.err(err);
                    return callback(err, {}, {});
                } else {
                    public = publicKey;
                    private = privateKey;
        
                    fs.writeFile("keys.txt", public + "\n" + private, function(err){
                        if (err) {
                           logger.err(err);
                        }
                    });
            
                    return callback(public, private);
                }
            });
        } else {

            return callback("file already exists");
        
        };


    });

   

}

module.exports = router;