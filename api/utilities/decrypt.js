const crypto = require('crypto');
const fs = require('fs');

module.exports = function(data, callback) {

    let iv = Buffer.from(data.iv, 'hex'); // data muss so aussehen { iv: iv.toString('hex'), encryptedData: encrypted.toString('hex') };
    let encryptedText = Buffer.from(text.encryptedData, 'hex');
    let decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(key), iv);
    let decrypted = decipher.update(encryptedText);
    decrypted = Buffer.concat([decrypted, decipher.final()]);

    return decrypted.toString();
}