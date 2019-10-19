const express = require('express');
const router = express.Router();
const logger = require('../../logger/logger');

router.get('/', (req, res, next) => {
    logger.info('Server success');
    res.status(200).json({
        message: 'Handling GET requests to /data'
    });
});

module.exports = router;