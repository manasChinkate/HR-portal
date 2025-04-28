const express = require("express")
const { handleGetDesignation, handleCreateDesignation } = require("../controller/DesignationController")

const designationRouter = express.Router()

designationRouter.get('/',handleGetDesignation)
designationRouter.post('/',handleCreateDesignation)

module.exports ={designationRouter}