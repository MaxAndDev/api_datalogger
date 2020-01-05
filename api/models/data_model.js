const mongoose = require('mongoose');

const dataSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    station_id: { type: String },
    airpressure: { type: Number},
    humidity: { type: Number},
    temperature: { type: Number},
    timestamp: { type: Number}
});

module.exports = mongoose.model('Data', dataSchema);
