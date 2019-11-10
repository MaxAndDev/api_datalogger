const crypto = require('crypto');
const mongoose = require('mongoose');
const logger = require('../../logger/logger');

const Station = require('../models/station_model');

module.exports = function(station_id, callback){
    const key = crypto.randomBytes(32);
    Station.findOneAndUpdate({ station_id : station_id}, { secret: key}, { useFindAndModify :  false})
    .exec()
    .then( doc => {
        logger.info(doc);
        return callback(doc);
    }).catch( err => {
        logger.err( err );
        return callback(err);
    }); 
};