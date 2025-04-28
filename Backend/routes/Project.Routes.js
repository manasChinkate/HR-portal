const express = require("express")
const { handleGetProjects, handleCreateProject } = require("../controller/ProjectController")

const projectRouter = express.Router()

projectRouter.get('/',handleGetProjects)
projectRouter.post('/',handleCreateProject)

module.exports = { projectRouter}