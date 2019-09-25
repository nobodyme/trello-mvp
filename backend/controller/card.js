const express = require('express');
const router = express.Router();
const List = require('../models/listSchema');
const Card = require('../models/cardSchema');

router.post('/addlistcard', async (req, res) => {
	const listId = req.body.listId;
	const title = req.body.title;

	if (!listId) {
		return res.status(400).json({ error: 'Insufficient Data' });
	}
	try {
		// check if list exists
		const list = await List.findOne({ _id: listId });
		if (!list) {
			return res.status(404).json({ error: 'board not found' });
		} else {
			const newCard = new Card({ list, title });
			const savedCard = await newCard.save();
			return res.status(200).json(savedCard);
		}
	} catch (err) {
		return res.status(500).json({ error: err.message });
	}
});

router.post('/addcarddescription', async (req, res) => {
	const cardId = req.body.cardId;
	const description = req.body.description;

	if (!description) {
		return res.status(400).json({ error: 'Insufficient Data' });
	}
	try {
		// check if card exists to add description
		const card = await Card.findOne({ _id: cardId });
		if (!card) {
			return res.status(404).json({ error: 'board not found' });
		}
		card.description = description;
		const savedCard = await card.save();
		return res.status(200).json(savedCard);
	} catch (err) {
		return res.status(500).json({ error: err.message });
	}
});

router.get('/getlistcards', async (req, res) => {
	const listId = req.query.listId;

	if (!listId) {
		return res.status(400).json({ error: 'Insufficient Data' });
	}
	try {
		const cards = await Card.find({ list: listId });
		return res.status(200).json(cards);
	} catch (err) {
		return res.status(500).json({ error: err.message });
	}
});

module.exports = router;
