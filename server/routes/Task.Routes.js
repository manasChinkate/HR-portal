const express = require("express")
const { handleGetTasks, handleCreateTask, handleUpdateTaskStatus } = require("../controller/ProjectController")

const taskRouter = express.Router()

taskRouter.get('/',handleGetTasks)
taskRouter.post('/',handleCreateTask)
taskRouter.post('/update',handleUpdateTaskStatus)

module.exports = { taskRouter}