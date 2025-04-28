const express = require("express")
const { handleGetEmployees, handleCreateEmployee } = require("../controller/NewEmployeeController")
const handleReportingPerson = require("../controller/ReportingManager")

const employeeRouter = express.Router()

employeeRouter.get('/',handleGetEmployees)
employeeRouter.post('/',handleCreateEmployee)
employeeRouter.get('/reporting',handleReportingPerson)



module.exports = { employeeRouter}