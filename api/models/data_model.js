const mongoose = require('mongoose');

const dataSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    station_id: Number,
    airpressure: Number,
    humidity: Number,
    temperature: Number,
    timestamp: Number,
    latitude: Number,
    longitude: Number,
    position_tag: String
});

module.exports = mongoose.model('Data', dataSchema);
