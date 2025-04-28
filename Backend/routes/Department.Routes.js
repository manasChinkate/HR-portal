const express = require("express")
const { handleGetDepartment, handleCreateDepartment } = require("../controller/DepartmentController")

const departmentRouter = express.Router()

departmentRouter.get('/',handleGetDepartment)
departmentRouter.post('/',handleCreateDepartment)

module.exports = { departmentRouter}