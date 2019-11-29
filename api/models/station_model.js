const mongoose = require('mongoose');

const stationSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    secret: { type: String},
    api_key: { type: String},
    latitude: { type: Number},
    longitude: { type: Number},
    description: { type: String},
    position_tag: { type: String},
    created_at: { type: Date, default: Date.now()},
    soft_delete: { type: Boolean, default: false}
});

module.exports = mongoose.model('Station', stationSchema);
