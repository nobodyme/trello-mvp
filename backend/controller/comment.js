const express = require('express');
const router = express.Router();
const Card = require('../models/cardSchema');
const Comment = require('../models/commentSchema');

router.post('/addcardcomment', async (req, res) => {
	const cardId = req.body.cardId;
	const comment = req.body.comment;

	if (!cardId) {
		return res.status(400).json({ error: 'Insufficient Data' });
	}
	try {
		// check if card exists
		const card = await Card.findOne({ _id: cardId });
		if (!card) {
			return res.status(404).json({ error: 'card not found' });
		} else {
			const newComment = new Comment({ card, body: comment });
			const savedComment = await newComment.save();
			return res.status(200).json(savedComment);
		}
	} catch (err) {
		return res.status(500).json({ error: err.message });
	}
});

router.get('/getcardcomments', async (req, res) => {
	const cardId = req.query.cardId;

	if (!cardId) {
		return res.status(400).json({ error: 'Insufficient Data' });
	}
	try {
		const comments = await Comment.find({ card: cardId });
		return res.status(200).json(comments);
	} catch (err) {
		return res.status(500).json({ error: err.message });
	}
});

module.exports = router;
