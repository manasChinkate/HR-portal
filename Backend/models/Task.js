const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema(
  {
    projectId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Projects",
    },
    dueDate: String,
    priority: String,
    status:String,
    taskTitle:String,
    assignees: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "newEmployee",
        required: true,
      },
    ],
    taskDesc: String,
    companyId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "addcompnany",
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { collection: "Tasks" }
);

const TaskModel = mongoose.model("Tasks", TaskSchema);

module.exports = TaskModel;
