const mongoose = require('mongoose');

const stationSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    station_id: { type: String},
    public: { type: String}
});

module.exports = mongoose.model('Station', stationSchema);
