const express = require('express');
const morgan = require('morgan');
const logger = require('./logger/logger');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const ip = require('ip');

const app = express();

const dataRoutes = require('./api/routes/data');
const userRoutes = require('./api/routes/user');

mongoose.connect('mongodb://localhost:27017/Seminar', { useNewUrlParser: true, useUnifiedTopology: true});
mongoose.connection.on('connected', () => {
    console.log("DB Connection Successful to API at " + new Date());
});
mongoose.connection.on('error',(err)=>{
    console.log('database error: '+err);
})

console.log("Server IP: " + ip.address());

logger.debug('Overriding Express logger');
app.use(morgan('combined', { stream: logger.stream }));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cors());

app.use('/data', dataRoutes);
app.use('/user', userRoutes);


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