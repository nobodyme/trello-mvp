const mongoose = require('mongoose');
const Board = require('./boardSchema');

const listSchema = mongoose.Schema({
	board: {
		type: mongoose.Schema.Types.ObjectId,
		ref: Board
	},
	title: {
		type: String,
		trim: true,
		required: true
	}
});

const List = mongoose.model('List', listSchema);

module.exports = List;
