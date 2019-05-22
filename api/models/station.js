const mongoose = require('mongoose');

const stationSchema = mongoose.Schema({
    _id: mongoose.Types.ObjectId,
    name: String,
})

module.exports = mongoose.model('Station', stationSchema);