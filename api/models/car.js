const mongoose = require('mongoose');

const carSchema = new mongoose.Schema({
    station_id: Number,
    name: String,
    available: Boolean,
})

module.exports = mongoose.model('Car', carSchema);