const express = require('express');
const router = express.Router();
const Board = require('../models/boardSchema');

router.post('/addboard', async (req, res) => {
	const title = req.body.title;
	if (!title) {
		return res.status(400).json({ error: 'Insufficient Data' });
	}
	try {
		const newBoard = new Board({ title });
		const savedBoard = await newBoard.save();
		return res.status(200).json(savedBoard);
	} catch (err) {
		return res.status(500).json({ error: err.message });
	}
});

router.get('/getboards', async (req, res) => {
	try {
		const boards = await Board.find({});
		return res.status(200).json(boards);
	} catch (err) {
		return res.status(500).json({ error: err.message });
	}
});

module.exports = router;
