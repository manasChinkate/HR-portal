const express = require("express");
const handleLogin = require("../controller/loginController");
const handleChecking = require("../controller/Checking");
const {
  checkCompanySubsciption,
} = require("../middlewares/checkCompanySubscription");

const authRouter = express.Router();

authRouter.post("/login", checkCompanySubsciption, handleLogin);
authRouter.get("/checking", handleChecking);

module.exports = { authRouter };
