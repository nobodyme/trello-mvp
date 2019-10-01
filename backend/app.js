require("./settings");
const db = require("./database/connection");
const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const boardController = require("./controller/board");
const listController = require("./controller/list");
const cardController = require("./controller/card");
const commentController = require("./controller/comment");

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// custom routers
app.use("/board", boardController);
app.use("/list", listController);
app.use("/card", cardController);
app.use("/comment", commentController);

app.listen(3001, () => {
  console.log("Server running on port 3001");
});
