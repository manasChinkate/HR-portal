const express = require('express');
const app = express();
const port = 3000;
const cors = require('cors')
app.use(express.json());
const mongoose = require('mongoose');

//Module Imports 
const login = require('./controller/logincontrol');
const {AddnewCompany,GetCompany} = require('./controller/NewCompanyController')
const {AddnewEmployee,getEmployeeData} = require('./controller/NewEmployeeController')
const ReportingManager = require('./controller/ReportingManager')
const {Designation,GetDesignation} = require('./controller/DesignationController');
const { Holiday, GetHoliday } = require('./controller/HolidayController');
const { AddClient, GetClient } = require('./controller/ClientController');
const { LeaveType, getLeaveType } = require('./controller/LeaveTypeController');
const { AddLeave, GetLeaveData, StatusChange, GetManageLeave } = require('./controller/LeaveController');
const { Department, GetDepartment } = require('./controller/DepartmentController');
const { CreateProject, getProjects, AddTask, getTask, UpdateTaskStatus } = require('./controller/ProjectController');
const { AddTimesheet, getTimesheet } = require('./controller/TimesheetController');
const { CheckIn, CheckOut, GetAttendance } = require('./controller/AttendanceController');
const Checking = require('./controller/Checking');
const { getNotifications } = require('./controller/NotificationController');
// const GetDesignation = require('./controller/DesignationController')


app.use(cors({
  origin: 'http://localhost:5173', // Allow requests from this origin
  methods: ['GET', 'POST', 'DELETE', 'PUT', 'PATCH'],
  credentials: true // Allow cookies to be sent cross-origin
}));

// Connect to MongoDB
mongoose.connect('mongodb+srv://ManasDeveloper:manas14@cluster0.lck1f65.mongodb.net/Hr-Portal')
  .then(() => console.log("Database connected"))
  .catch(err => console.log("Failed to connect to the database", err));

// Routes
app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.post('/login', login);
app.post('/checking', Checking);
app.get('/notifications', getNotifications);

app.post('/addnewcompany', AddnewCompany);
app.get('/getcompanies', GetCompany);
app.post('/addnewemployee', AddnewEmployee);
app.get('/employee', getEmployeeData);
app.get('/reportingmanager', ReportingManager);
app.post('/designation', Designation);
app.get('/designation', GetDesignation);
app.post('/holiday', Holiday);
app.get('/holiday', GetHoliday);
app.post('/addclient', AddClient);
app.get('/getclient', GetClient);
app.post('/addleavetype', LeaveType);
app.get('/getleavetype', getLeaveType);
app.post('/applyleave', AddLeave);
app.get('/getapplyleave', GetLeaveData);
app.get('/getmanageleave', GetManageLeave);

app.patch('/leaves/:status/:id', StatusChange);


app.post('/department', Department);
app.get('/getdepartment', GetDepartment);



app.post('/projects', CreateProject);
app.get('/getprojects', getProjects);
app.post('/addtask', AddTask);
app.get('/gettask', getTask);
app.post('/updatetask', UpdateTaskStatus);

app.post('/addtimesheet', AddTimesheet)
app.get('/gettimesheet', getTimesheet)


app.post('/mark-in', CheckIn)
app.post('/mark-out', CheckOut)
app.get('/getAttendance', GetAttendance)

// app.get('/protected',protected)

// Start server
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
