const jwt = require("jsonwebtoken");
const ProjectModel = require("../models/Project");
const { sendNotifications } = require("./NotificationController");


const CreateProject = async (req, res) => {
    try {
        const project = req.body;

        if (project) {
            const data = await ProjectModel.create(project)
            // console.log(data)
            res.status(201).json('Created successfully')
        } else {
            res.status(500).json('Error Creating ')
            console.log('error')

        }
    } catch (error) {
        res.status(500).json('Internal Server Error')
        console.log('Internal Server Error')
    }
}
const AddTask = async (req, res) => {

    const { projectName, tasks } = req.body
    try {
        const token = req.headers.token;

        if (!token) {
            return res.status(401).json({ message: 'No token provided' });
        }

        const decodedtoken = jwt.verify(token, 'jwt-secret-key')

        const companyName = decodedtoken.companyName;

        const updateProject = await ProjectModel.findOneAndUpdate({ companyName, projectName },
            { $push: { tasks: { $each: tasks } } }, // Replace the tasks array with the new array from the request
            { new: true })

        await sendNotifications(companyName,`A new set of tasks has been added to the project ${projectName} `)

        if (!updateProject) {
            return res.status(404).json({ message: "Project not found" });
        }

        return res.status(200).json({ message: "Tasks updated successfully", updateProject });

    } catch (error) {
        console.error("Error updating tasks:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}

const getTask = async(req,res)=>{
    const { projectName } = req.query;
    
    const token = req.headers.token;

        if (!token) {
            return res.status(401).json({ message: 'No token provided' });
        }

        const decodedtoken = jwt.verify(token, 'jwt-secret-key')

        const companyName = decodedtoken.companyName;// Get the project name from query parameters

    if (!projectName) {
        return res.status(400).json({ message: "Project name is required" });
    }

    try {
        const tasks = await ProjectModel.find({ projectName,companyName });
        res.status(200).json(tasks);
    } catch (error) {
        console.error("Error fetching tasks:", error);
        res.status(500).json({ message: "Error fetching tasks" });
    }        
}


const getProjects = async (req, res) => {
    try {
        const token = req.headers.token;

        if (!token) {
            return res.status(401).json({ message: 'No token provided' });
        }

        const decodedtoken = jwt.verify(token, 'jwt-secret-key')

        const companyName = decodedtoken.companyName;


        const Projects = await ProjectModel.find({ companyName })
        if (Projects.length === 0) {
            return res.status(404).json({ message: 'No projects found for this company.' });
        }

        res.status(200).json(Projects);
    } catch (error) {
        res.status(500).json('Internal Server Error');
    }
}

const UpdateTaskStatus = async (req, res) => {
    const {  projectName, taskName, status } = req.body;

    try {
        const token = req.headers.token;

        if (!token) {
            return res.status(401).json({ message: 'No token provided' });
        }

        const decodedtoken = jwt.verify(token, 'jwt-secret-key');
        const companyName = decodedtoken.companyName;
        

        // Update the status of the specific task
        const updatedProject = await ProjectModel.findOneAndUpdate(
            { companyName, projectName, "tasks.taskName": taskName }, // Match the project and task
            { $set: { "tasks.$.status": status } }, // Update the status of the matched task
            { new: true } // Return the updated document
        );

        if (!updatedProject) {
            return res.status(404).json({ message: "Project or Task not found" });
        }

        return res.status(200).json({ message: "Task status updated successfully", updatedProject });
    } catch (error) {
        console.error("Error updating task status:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};



module.exports = { CreateProject, getProjects, AddTask, getTask, UpdateTaskStatus }