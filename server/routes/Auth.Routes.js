const express = require("express");
const handleLogin = require("../controller/loginController");
const {
  checkCompanySubsciption,
} = require("../middlewares/checkCompanySubscription");
const handleRefresh = require("../controller/RefreshController");

const authRouter = express.Router();

authRouter.post("/login", handleLogin);
authRouter.get("/refresh", checkCompanySubsciption, handleRefresh);
// authRouter.get("/checking", handleChecking);

module.exports = { authRouter };
