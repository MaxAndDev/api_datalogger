const mongoose = require('mongoose');

const stationSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    station_id: { type: String},
    public: { type: String},
    secret: { type: Buffer},
});

module.exports = mongoose.model('Station', stationSchema);
