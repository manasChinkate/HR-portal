const jwt = require("jsonwebtoken");
const ProjectModel = require("../models/Project");
const { sendNotifications } = require("./NotificationController");
const TaskModel = require("../models/Task");
const extractToken = require("../utils/ExtractToken");

const handleCreateProject = async (req, res) => {
  try {
    const decodedToken = extractToken(req);
    const companyId = decodedToken.companyId;

    const projectDetails = {
      ...req.body,
      companyId: companyId,
    };

    if (projectDetails) {
      const data = await ProjectModel.create(projectDetails);
      res.status(201).json("Created successfully");
    } else {
      res.status(500).json("Error Creating");
      console.log("error");
    }
  } catch (error) {
    res.status(500).json("Internal Server Error");
    console.log("Internal Server Error");
  }
};

const handleGetProjects = async (req, res) => {
  try {
    const decodedToken = extractToken(req);
    const companyId = decodedToken.companyId;

    const Projects = await ProjectModel.find({ companyId })
      .populate("projectManager")
      .populate("clientName");
    if (Projects.length === 0) {
      return res
        .status(200)
        .json({ message: "No projects found for this company.", data: [] });
    }

    res.status(200).json({ data: Projects, message: "Fetched Successfully" });
  } catch (error) {
    res.status(500).json("Internal Server Error");
  }
};
const handleCreateTask = async (req, res) => {
  try {
    const decodedToken = extractToken(req);
    const companyId = decodedToken.companyId;

    const data = {
      ...req.body,
      companyId: companyId,
    };

    const task = await TaskModel.create(data);
    res.status(201).json({ data: data, mesage: "Created successfully" });

    // await sendNotifications(
    //   companyName,
    //   `A new set of tasks has been added to the project ${projectName} `
    // );

    if (!task) {
      return res.status(404).json({ message: "Error creating task" });
    }
  } catch (error) {
    console.error("Error updating tasks:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const handleGetTasks = async (req, res) => {
  const { projectId } = req.query;
  const decodedToken = extractToken(req);
  const companyId = decodedToken.companyId;
  const employeeId = decodedToken.userId?._id;
  const authority = decodedToken.authority;

  if (!projectId) {
    return res.status(400).json({ message: "Project name is required" });
  }
  if (authority == "Admin" || authority == "ProjectManager") {
    try {
      const tasks = await TaskModel.find({ projectId, companyId });
      res.status(200).json({ data: tasks, message: "Fetched Succesfully" });
    } catch (error) {
      console.error("Error fetching tasks:", error);
      res.status(500).json({ message: "Error fetching tasks" });
    }
  } else {
    try {
      const tasks = await TaskModel.find({
        projectId,
        companyId,
        assignees: employeeId,
      });
      res.status(200).json({ data: tasks, message: "Fetched Succesfully" });
    } catch (error) {
      console.error("Error fetching tasks:", error);
      res.status(500).json({ message: "Error fetching tasks" });
    }
  }
};

const handleUpdateTaskStatus = async (req, res) => {
  try {
    const token = req.headers.token;

    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }

    const { _id, status } = req.body;

    if (!_id || !status) {
      return res
        .status(400)
        .json({ message: "Task ID and status are required" });
    }

    const updatedTask = await TaskModel.findByIdAndUpdate(
      _id,
      { status },
      { new: true } // returns the updated document
    );

    if (!updatedTask) {
      return res.status(404).json({ message: "Task not found" });
    }

    return res.status(200).json({
      message: "Task status updated successfully",
      task: updatedTask,
    });
  } catch (error) {
    console.error("Error updating task status:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  handleCreateProject,
  handleGetProjects,
  handleCreateTask,
  handleGetTasks,
  handleUpdateTaskStatus,
};
