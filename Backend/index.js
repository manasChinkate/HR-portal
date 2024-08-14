const express = require('express');
const app = express();
const port = 3000;
const cors = require('cors')
app.use(express.json());
const mongoose = require('mongoose');

//Module Imports 
const login = require('./controller/logincontrol');
const AddnewCompany = require('./controller/NewCompanyController')
const AddnewEmployee = require('./controller/NewEmployeeController')
const ReportingManager = require('./controller/ReportingManager')


app.use(cors({
  origin: 'http://localhost:5173', // Allow requests from this origin
  methods: ['GET', 'POST', 'DELETE', 'PUT'],
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
app.post('/addnewcompany', AddnewCompany);
app.post('/addnewemployee', AddnewEmployee);
app.get('/reportingmanager/:companyname', ReportingManager);
// app.get('/protected',protected)

// Start server
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
