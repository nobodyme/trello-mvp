const express = require("express");
const router = express.Router();
const List = require("../models/listSchema");
const Card = require("../models/cardSchema");
const Comment = require("../models/commentSchema");

router.post("/addlistcard", async (req, res) => {
  const listId = req.body.listId;
  const title = req.body.title;
  let order = 18700;

  if (!listId) {
    return res.status(400).json({ error: "Insufficient Data" });
  }
  try {
    // check if list exists
    const list = await List.findOne({ _id: listId });
    if (!list) {
      return res.status(404).json({ error: "board not found" });
    } else {
      // find the highest card no and increment it with the const
      const lastCard = await Card.find({ list: list })
        .sort({ order: 1 })
        .limit(1);

      if (lastCard[0]) {
        order = lastCard[0].order + order;
      }
      const newCard = new Card({ board: list.board, list, title, order });
      const savedCard = await newCard.save();
      return res.status(200).json(savedCard);
    }
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

router.post("/addcarddescription", async (req, res) => {
  const cardId = req.body.cardId;
  const description = req.body.description;

  if (!description) {
    return res.status(400).json({ error: "Insufficient Data" });
  }
  try {
    // check if card exists to add description
    const card = await Card.findOne({ _id: cardId });
    if (!card) {
      return res.status(404).json({ error: "board not found" });
    }
    card.description = description;
    const savedCard = await card.save();
    return res.status(200).json(savedCard);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

router.get("/getlistcards", async (req, res) => {
  const listId = req.query.listId;

  if (!listId) {
    return res.status(400).json({ error: "Insufficient Data" });
  }
  try {
    const cards = await Card.find({ list: listId }).sort({ order: 1 });
    return res.status(200).json(cards);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

router.get("/getcard", async (req, res) => {
  const cardId = req.query.cardId;
  if (!cardId) {
    return res.status(400).json({ error: "Insufficient data" });
  }
  try {
    const card = await Card.findOne({ _id: cardId });
    return res.status(200).json(card);
  } catch (err) {
    return res.status(500).json({ err: err.message });
  }
});

router.post("/updatecard", async (req, res) => {
  const cardId = req.body.id;
  const title = req.body.title;
  const description = req.body.description;

  const updateObj = {};
  if (title) {
    updateObj.title = title;
  }
  if (description) {
    updateObj.description = description;
  }

  if (!cardId) {
    return res.status(400).json({ error: "Insufficient data" });
  }
  try {
    const card = await Card.findOneAndUpdate({ _id: cardId }, updateObj, {
      new: true
    });
    if (!card) {
      return res.status(404).json({ error: "card not found" });
    }
    return res.status(200).json(card);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

router.post("/deletecard", async (req, res) => {
  const cardId = req.body.cardId;
  if (!cardId) {
    return res.status(400).json({ error: "Insufficient data" });
  }
  try {
    const card = await Card.deleteOne({ _id: cardId });
    const comment = await Comment.deleteMany({ card: cardId });
    return res.status(200).json({ status: "deleted" });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

router.post("/updatecardorder", async (req, res) => {
  const destinationlistId = req.body.destinationlistId;
  const destinationIndex = req.body.destinationIndex;
  const cardId = req.body.cardId;
  let defaultOrder = 18700;

  try {
    let card = await Card.findOne({ _id: cardId });
    card.list = destinationlistId;
    let cardsArray = await Card.find({ list: destinationlistId }).sort({
      order: 1
    });
    //empty list
    if (cardsArray.length === 0) {
      card.order = defaultOrder;
    }
    // non empty lists and 3 cases below
    else {
      // last card
      if (destinationIndex === cardsArray.length) {
        card.order = cardsArray[cardsArray.length - 1].order + defaultOrder;
      }
      // first card
      else if (destinationIndex === 0) {
        card.order = cardsArray[0].order / 2;
      }
      // middle card
      else {
        card.order =
          (cardsArray[destinationIndex - 1].order +
            cardsArray[destinationIndex + 1].order) /
          2;
      }
    }
    const savedCard = await card.save();
    return res.status(200).json({ success: true });
  } catch (err) {
    return res.status(500).json({ err: err.message });
  }
});

module.exports = router;
