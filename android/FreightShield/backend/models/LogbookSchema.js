const mongoose = require('mongoose');

const LogbookSchema = new mongoose.Schema({
    inspectionStarted: Boolean,
    startTime: String,
});

module.exports = mongoose.model('Logbook', LogbookSchema);