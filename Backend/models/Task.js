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
        ref: "Employee",
        required: true,
      },
    ],
    taskDesc: String,
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
  { collection: "Task" }
);

const TaskModel = mongoose.model("Task", TaskSchema);

module.exports = TaskModel;
