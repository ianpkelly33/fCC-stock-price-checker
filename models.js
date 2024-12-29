let mongoose = require('mongoose');

let stockSchema = new mongoose.Schema({
    symbol: { type: String, required: true },
    likes: { type: [String], default: [] }
});

let Stock = mongoose.model('Stock', stockSchema);

exports.Stock = Stock;
