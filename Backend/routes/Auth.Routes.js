const express = require("express")
const handleLogin = require("../controller/logincontrol")
const handleChecking = require("../controller/Checking")


const authRouter = express.Router()

authRouter.post('/login',handleLogin)
authRouter.get('/checking',handleChecking)



module.exports = { authRouter}