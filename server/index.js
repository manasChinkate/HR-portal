const express = require("express");
const app = express();
const port = 3000;
const cors = require("cors");
app.use(express.json());
const mongoose = require("mongoose");

//Module Imports

const { designationRouter } = require("./routes/Designation.Routes");
const { clientRouter } = require("./routes/Client.Routes");
const { leaveTypeRouter } = require("./routes/LeaveType.Routes");
const { holidayRouter } = require("./routes/Holiday.Routes");
const { departmentRouter } = require("./routes/Department.Routes");
const { projectRouter } = require("./routes/Project.Routes");
const { taskRouter } = require("./routes/Task.Routes");
const { timesheetRouter } = require("./routes/Timesheet.Routes");
const { leaveRouter } = require("./routes/Leave.Routes");
const { employeeRouter } = require("./routes/Employee.Routes");
const { companyRouter } = require("./routes/Company.Routes");
const { attendanceRouter } = require("./routes/Attendance.Routes");
const { authRouter } = require("./routes/Auth.Routes");
const { notificationRouter } = require("./routes/Notification.Routes");
const { EmployeeModel } = require("./models/NewEmployee");
const { AttendanceModel } = require("./models/Attendance");
const Clientmodel = require("./models/Client");
const DepartmentModel = require("./models/Department");
const DesignationModel = require("./models/Designation");
const HolidayModel = require("./models/Holiday");
const { LeaveModel } = require("./models/Leave");
const { leaveTypeModel } = require("./models/LeaveType");
const NotificationModel = require("./models/Notifications");
const pendingLeavesModel = require("./models/PendingLeaves");
const ProjectModel = require("./models/Project");
const TaskModel = require("./models/Task");
const Timesheetmodel = require("./models/Timesheet");
const LoginSchema = require("./models/Login");
const { CompanyModel } = require("./models/Company");
const { menuRouter } = require("./routes/Menu.Routes");
const router = express.Router();
// const GetDesignation = require('./controller/DesignationController')

app.use(
  cors({
    origin: "http://localhost:5173", // Allow requests from this origin
    methods: "*", // Include PATCH and OPTIONS
    credentials: true, // Allow cookies to be sent cross-origin
  })
);

// Connect to MongoDB
mongoose
  .connect(
    "mongodb+srv://ManasDeveloper:manas14@cluster0.lck1f65.mongodb.net/Hr-Portal"
  )
  .then(async () => {
    console.log("Database Connected");

    // const companyId = "681f7e26408f654eba824819";

    // // Delete all company-related data
    // await Promise.all([
    // EmployeeModel.deleteMany({ companyId }),
    // AttendanceModel.deleteMany({ companyId }),
    // Clientmodel.deleteMany({ companyId }),
    // DepartmentModel.deleteMany({ companyId }),
    // DesignationModel.deleteMany({ companyId }),
    // LeaveModel.deleteMany({ companyId }),
    // leaveTypeModel.deleteMany({ companyId }),
    // NotificationModel.deleteMany({ companyId }),
    // pendingLeavesModel.deleteMany({ companyId }),
    // ProjectModel.deleteMany({ companyId }),
    // TaskModel.deleteMany({ companyId }),
    // LoginSchema.deleteMany({ companyId }),
    // Timesheetmodel.deleteMany({ companyId }),
    // HolidayModel.deleteMany({ companyId }),
    // Clientmodel.deleteMany({ companyId }),
    // CompanyModel.deleteMany({ _id:companyId }),
    // ]);

    // console.log("All related data deleted for company ID:", companyId);
  })
  .catch((err) => console.log("Failed to connect to the database", err));

// Routes
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/api/v0/designation", designationRouter);
app.use("/api/v0/client", clientRouter);
app.use("/api/v0/leavetype", leaveTypeRouter);
app.use("/api/v0/holiday", holidayRouter);
app.use("/api/v0/department", departmentRouter);
app.use("/api/v0/projects", projectRouter);
app.use("/api/v0/tasks", taskRouter);
app.use("/api/v0/timesheet", timesheetRouter);
app.use("/api/v0/leaves", leaveRouter);
app.use("/api/v0/employee", employeeRouter);
app.use("/api/v0/company", companyRouter);
app.use("/api/v0/attendance", attendanceRouter);
app.use("/api/v0/auth", authRouter);
app.use("/api/v0/notification", notificationRouter);
app.use("/api/v0/menu", menuRouter);



// Start server
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
