const express = require('express');

const app = express();

const dataRoutes = require('./api/routes/data');
const userRoutes = require('./api/routes/user');

app.use('/data', dataRoutes);
app.use('/user', userRoutes);

module.exports = app;