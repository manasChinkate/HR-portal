const express = require("express")
const { handleGetTimesheets, handleCreateTimesheet } = require("../controller/TimesheetController")

const timesheetRouter = express.Router()

timesheetRouter.get('/',handleGetTimesheets)
timesheetRouter.post('/',handleCreateTimesheet)

module.exports = { timesheetRouter}