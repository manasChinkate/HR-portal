const express = require("express");
const login = require("../controllers/loginController");
const app = express();
const router = express.Router()

router.post('/',login)

module.exports = router