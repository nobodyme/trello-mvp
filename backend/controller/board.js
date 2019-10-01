const express = require("express");
const router = express.Router();
const Board = require("../models/boardSchema");
const List = require("../models/listSchema");
const Card = require("../models/cardSchema");
const Comment = require("../models/commentSchema");

router.post("/addboard", async (req, res) => {
  const title = req.body.title;
  if (!title) {
    return res.status(400).json({ error: "Insufficient Data" });
  }
  try {
    const newBoard = new Board({ title });
    const savedBoard = await newBoard.save();
    return res.status(200).json(savedBoard);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

router.get("/getboards", async (req, res) => {
  try {
    const boards = await Board.find({});
    return res.status(200).json(boards);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

router.post("/deleteboard", async (req, res) => {
  const boardId = req.body.boardId;
  if (!boardId) {
    return res.status(400).json({ error: "Insufficient Data" });
  }
  try {
    const board = await Board.deleteOne({ _id: boardId });
    const list = await List.deleteMany({ board: boardId });
    const card = await Card.deleteMany({ board: boardId });
    const comment = await Comment.deleteMany({ board: boardId });
    return res.status(200).json({ status: "deleted" });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

module.exports = router;
