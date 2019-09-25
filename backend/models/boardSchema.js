const mongoose = require('mongoose');

const boardSchema = mongoose.Schema({
	title: {
		type: String,
		trim: true,
		required: true
	}
});

const Board = mongoose.model('Board', boardSchema);

module.exports = Board;
