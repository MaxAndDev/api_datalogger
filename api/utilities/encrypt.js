const crypto = require('crypto');

const Station = require('../models/station_model');
const logger = require('../../logger/logger');


module.exports = function (station_id, callback) {
    Station.findOne( {station_id: station_id})
    .exec()
    .then( doc => {
        const public_client = doc.public; // key should be 32chars long not longer
        const secret = doc.secret;
        console.log("Public: " + public_client);
        console.log("Secret: " + secret);
        const iv = crypto.randomBytes(16);
        const key = crypto.randomBytes(32);

        let cipher = crypto.createCipheriv('aes-256-cbc', public_client, iv);
        let encrypted = cipher.update(secret);
        encrypted = Buffer.concat([encrypted, cipher.final()]);

        let data = { iv: iv.toString('hex'), encryptedData: encrypted.toString('hex')};

        return callback(data)

    }).catch( err => {
        console.log(err);
        return callback(err);
    });
}