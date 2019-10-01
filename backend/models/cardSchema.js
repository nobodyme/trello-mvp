const mongoose = require("mongoose");
const List = require("./listSchema");
const Board = require("./boardSchema");

const cardSchema = mongoose.Schema({
  board: {
    type: mongoose.Schema.Types.ObjectId,
    ref: Board
  },
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
  },
  order: {
    type: Number
  }
});

const Card = mongoose.model("Card", cardSchema);

module.exports = Card;
