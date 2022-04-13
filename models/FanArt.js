const mongoose = require('mongoose');

const FanArtSchema = new mongoose.Schema({
    handle: { type: String, required: true },
    name: { type: String },
    artSrc: { type: String, required: true },
    mimetype: { type: String },
}, { timestamps: true });

const FanArtModel = mongoose.model('FanArt', FanArtSchema);

module.exports = FanArtModel;