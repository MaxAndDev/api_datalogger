const mongoose = require('mongoose');

const stationSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    latitude: { type: Number},
    longitude: { type: Number},
    description: { type: String},
    position_tag: { type: String},
    created_at: { type: Number},
    soft_delete: { type: Boolean, default: false}
});

module.exports = mongoose.model('Station', stationSchema);
