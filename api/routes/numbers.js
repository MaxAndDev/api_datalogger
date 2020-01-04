const express = require('express');
const router = express.Router();
const logger = require('../../logger/logger');
const mongoose = require('mongoose');


const Data = require('../models/data_model');


router.post('/max', (req, res, next) =>{
    const parameter = req.body.parameter;

    Data.find().sort({[parameter]: -1}).limit(1) //ES6 [] convention to replace key by variable value
    .exec()
    .then( doc => {
        logger.info(doc);
        res.status(200).json({
            max_item: doc
        });
    }).catch( err => {
        logger.error(err);
        res.status(500).json({
            error: err
        });
    });
});

router.post('/min', (req, res, next) =>{
    const parameter = req.body.parameter;

    Data.find().sort({[parameter]: +1}).limit(1)
    .exec()
    .then( doc => {
        logger.info(doc);
        res.status(200).json({
            min_item: doc
        });
    }).catch( err => {
        logger.error(err);
        res.status(500).json({
            error: err
        });
    });
});

router.post('/avg', (req, res, next) =>{
    const parameter = req.body.parameter;

    Data.aggregate(
        [
            {
                "$group": {
                    "_id": null,
                    "avg": {"$avg": "$" + [parameter]}
                }
            }
        ]
    ).exec().then( result => {
        logger.info(result);
        res.status(200).json({
            avg: result
        });
    }).catch( err => {
        logger.error(err);
        res.status(500).json({
            error: err
        });
    });
});

module.exports = router;