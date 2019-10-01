const mongoose = require("mongoose");
const Card = require("./cardSchema");
const List = require("./listSchema");
const Board = require("./boardSchema");

const commentSchema = mongoose.Schema({
  board: {
    type: mongoose.Schema.Types.ObjectId,
    ref: Board
  },
  list: {
    type: mongoose.Schema.Types.ObjectId,
    ref: List
  },
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

const Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;
