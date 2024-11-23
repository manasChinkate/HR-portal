const mongoose = require('mongoose')

const projectSchema = new mongoose.Schema({
    projectName:String,
    clientName:String,
    projectManager:String,
    startDate:String,
    deadline:String,
    priority:String,
    description:String,
    companyName:String,
    tasks: [
        {
            taskName: { type: String, required: true },
            status: { type: String, enum: ["Pending", "In Progress", "Completed"], default: "Pending" },
        },
    ],
    createdAt:{
        type:Date,
        default:Date.now
    }

},{collection:'Projects'})

const ProjectModel = mongoose.model('project', projectSchema)

module.exports = ProjectModel