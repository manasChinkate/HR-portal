const mongoose = require('mongoose')
const LoginSchema = require('../models/Login')
const EmployeeModel = require('../models/NewEmployee')

const ReportingManager = async (req, res) => {
    try {
        // Extract companyName from URL parameters
        const  companyName  =  req.params.companyname;
        console.log('companyName :',companyName)

        // Query the database to find reporting managers for the given company€
        const reportingManagers = await EmployeeModel.find({ companyName });
        console.log(reportingManagers)

        
        if (reportingManagers.length === 0) {
            return res.status(404).json({ message: 'No reporting managers found for this company.' });
        }

        // Send the found reporting managers as the response
        res.status(200).json(reportingManagers);
    } catch (error) {
        // Handle any errors that occur during the query
        res.status(500).json({ message: 'Error fetching reporting managers', error: error.message });
    }
};

module.exports = ReportingManager