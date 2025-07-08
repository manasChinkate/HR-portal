const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema(
  {
    projectName: String,
    clientName: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Client",
    },
    projectManager: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Employee",
    },
    startDate: String,
    deadline: String,
    priority: String,
    description: String,
    companyId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Company",
    },

    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { collection: "Project" }
);

const ProjectModel = mongoose.model("Project", projectSchema);

module.exports = ProjectModel;
