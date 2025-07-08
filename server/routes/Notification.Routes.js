const express = require("express")
const handleLogin = require("../controller/logincontrol")
const { handleGetNotification } = require("../controller/NotificationController")


const notificationRouter = express.Router()

notificationRouter.get('/',handleGetNotification)



module.exports = { notificationRouter}