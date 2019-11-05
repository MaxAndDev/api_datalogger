const mongoose = require('mongoose');

const dataSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    station_id: { type: Number, required: true},
    airpressure: { type: Number, required: true},
    humidity: { type: Number, required: true},
    temperature: { type: Number, required: true},
    timestamp: { type: Number, required: true},
    latitude: { type: Number, required: true},
    longitude: { type: Number, required: true},
    position_tag: { type: String, required: true},
});

module.exports = mongoose.model('Data', dataSchema);
