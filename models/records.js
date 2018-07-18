'use strict';
var mongoose = require('mongoose');

var recordsSchema = mongoose.Schema({
	artist: String,
	album: String,
	images: String,
	price: Number
});

var Records = mongoose.model('Records', recordsSchema);
module.exports = Records;
