const mongoose = require('mongoose');
const List = require('./listSchema');

const cardSchema = mongoose.Schema({
	list: {
		type: mongoose.Schema.Types.ObjectId,
		ref: List
	},
	title: {
		type: String,
		required: true,
		trim: true
	},
	description: {
		type: String,
		trim: true
	}
});

const Card = mongoose.model('Card', cardSchema);

module.exports = Card;
