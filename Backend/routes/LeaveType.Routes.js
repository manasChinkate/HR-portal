const express = require("express")
const { handleGetLeaveType, handleCreateLeaveType } = require("../controller/LeaveTypeController")

const leaveTypeRouter = express.Router()

leaveTypeRouter.get('/',handleGetLeaveType)
leaveTypeRouter.post('/',handleCreateLeaveType)

module.exports = { leaveTypeRouter}