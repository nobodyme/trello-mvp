const express = require("express");
const router = express.Router();
const List = require("../models/listSchema");
const Board = require("../models/boardSchema");

router.post("/addboardlist", async (req, res) => {
  const boardId = req.body.boardId;
  const title = req.body.title;

  if (!boardId || !title) {
    return res.status(400).json({ error: "Insufficient Data" });
  }
  try {
    // check if board exists
    const board = await Board.findOne({ _id: boardId });
    if (!board) {
      return res.status(404).json({ error: "board not found" });
    } else {
      const newList = new List({ board, title });
      const savedList = await newList.save();
      return res.status(200).json(savedList);
    }
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

router.get("/getboardlists", async (req, res) => {
  const boardId = req.query.boardId;

  if (!boardId) {
    return res.status(400).json({ error: "Insufficient Data" });
  }
  try {
    const lists = await List.find({ board: boardId });
    return res.status(200).json(lists);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

router.post("/deletelist", async (req, res) => {
  const listId = req.body.listId;
  if (!listId) {
    return res.status(400).json({ error: "Insufficient data" });
  }
  try {
    const list = await List.deleteMany({ _id: listId });
    const card = await Card.deleteMany({ list: listId });
    const comment = await Comment.deleteMany({ list: listId });
    return res.status(200).json({ status: "deleted" });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

module.exports = router;
