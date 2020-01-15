const express = require('express');
const morgan = require('morgan');
const logger = require('./logger/logger');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const ip = require('ip');

// Express App
const app = express();

// Routes
const dataRoutes = require('./api/routes/data');
const userRoutes = require('./api/routes/user');
const addRoutes = require('./api/routes/addStation');
const numbersRoutes = require('./api/routes/numbers');

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/Seminar', { useNewUrlParser: true, useUnifiedTopology: true});
mongoose.connection.on('connected', () => {
    console.log("DB Connection Successful to API at " + new Date());
});
mongoose.connection.on('error',(err)=>{
    console.log('database error: '+err);
})

// IP Adress
console.log("Server IP: " + ip.address());

// Logger, BodyParser and CORS
logger.debug('Overriding Express logger');
app.use(morgan('combined', { stream: logger.stream }));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cors());

// URL Mapping
app.use('/data', dataRoutes);
app.use('/user', userRoutes);
app.use('/station', addRoutes);
app.use('/numbers', numbersRoutes);

// Not Found Fallback
app.use((req, res, next) => {
    const error = new Error('Not found');
    error.status = 404;
    next(error);
});

// Internal Server Error Fallback
app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: error.message
    });
});

module.exports = app;