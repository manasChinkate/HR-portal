const express = require("express");
const {
  handleGetMenu,
  handleCreateMenu,
} = require("../controller/MenuController");

const menuRouter = express.Router();

menuRouter.get("/", handleGetMenu);
menuRouter.get("/", handleCreateMenu);

module.exports = { menuRouter };
