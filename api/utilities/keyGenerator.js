const logger = require('../../logger/logger');
const fs = require('fs');

module.exports = function createKeys(callback) {

    fs.access("public.txt", fs.F_OK, (err)=> {
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
        
                    fs.writeFile("private.txt", private, function(err){
                        if (err) {
                           logger.err(err);
                        }
                    });

                    fs.writeFile("public.txt", public, function(err){
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

