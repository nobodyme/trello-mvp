const mongoose = require('mongoose');

const commentSchema = mongoose.Schema({
	card: {
		type: mongoose.Schema.Types.ObjectId,
		ref: Card
	},
	body: {
		type: String,
		trim: true,
		required: true
	}
});

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;
