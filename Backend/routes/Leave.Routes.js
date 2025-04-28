const express = require("express")
const { handleGetLeaves, handleCreateLeave, handleGetManageLeaves, handleLeaveStatusChange, handleGetPendingLeaves } = require("../controller/LeaveController")

const leaveRouter = express.Router()

leaveRouter.get('/',handleGetLeaves)
leaveRouter.post('/',handleCreateLeave)
leaveRouter.get('/manage',handleGetManageLeaves)
leaveRouter.patch('/:status/:id',handleLeaveStatusChange)
leaveRouter.get('/pending',handleGetPendingLeaves)


module.exports = { leaveRouter}