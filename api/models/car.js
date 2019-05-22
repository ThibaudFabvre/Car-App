const mongoose = require('mongoose');

const carSchema = mongoose.Schema({
    _id: mongoose.Types.ObjectId,
    station_id: Number,
    name: String,
    available: Boolean,
})

module.exports = mongoose.model('Car', carSchema);