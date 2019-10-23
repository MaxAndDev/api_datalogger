const express = require('express');
const morgan = require('morgan');
const logger = require('./logger/logger');
const bodyParser = require('body-parser');

const app = express();

const dataRoutes = require('./api/routes/data');
const userRoutes = require('./api/routes/user');

logger.debug('Overriding Express logger');
app.use(morgan('combined', { stream: logger.stream }));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use('/data', dataRoutes);
app.use('/user', userRoutes);

app.use((req, res, next) => {
    res.header('Access-Controll-Allow-Origin', '*');
    res.header('Access-Controll-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    if (req.method === 'OPTIONS') {
        res.header('Access-Controll-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET')
        return res.status(200).json({});
    }
});

app.use((req, res, next) => {
    const error = new Error('Not found');
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: error.message
    });
});

module.exports = app;