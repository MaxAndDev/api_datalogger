const express = require('express');
const morgan = require('morgan');
const logger = require('./logger/logger');

const app = express();

const dataRoutes = require('./api/routes/data');
const userRoutes = require('./api/routes/user');

logger.debug('Overriding Express logger');
app.use(morgan('combined', { stream: logger.stream }));
app.use('/data', dataRoutes);
app.use('/user', userRoutes);

module.exports = app;