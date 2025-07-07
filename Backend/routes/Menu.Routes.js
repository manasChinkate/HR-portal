const express = require("express");
const {
  handleGetMenu,
  handleCreateMenu,
  handleDeleteMenu,
} = require("../controller/MenuController");

const menuRouter = express.Router();

menuRouter.get("/", handleGetMenu);
menuRouter.post("/", handleCreateMenu);
menuRouter.get("/:id", handleDeleteMenu);

module.exports = { menuRouter };
