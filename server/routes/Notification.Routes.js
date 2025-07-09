const express = require("express")
const { handleGetNotification } = require("../controller/NotificationController")


const notificationRouter = express.Router()

notificationRouter.get('/',handleGetNotification)



module.exports = { notificationRouter}