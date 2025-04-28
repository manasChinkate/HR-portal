const express = require("express")
const { handleGetClient, handleAddClient } = require("../controller/ClientController")

const clientRouter = express.Router()

clientRouter.get('/',handleGetClient)
clientRouter.post('/',handleAddClient)

module.exports = { clientRouter}