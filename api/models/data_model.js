const mongoose = require('mongoose');

const dataSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    station_id: { type: Number},
    airpressure: { type: Number},
    humidity: { type: Number},
    temperature: { type: Number},
    timestamp: { type: Number},
    latitude: { type: Number},
    longitude: { type: Number},
    position_tag: { type: String},
});

module.exports = mongoose.model('Data', dataSchema);
