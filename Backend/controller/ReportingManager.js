const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');  // Ensure jwt is required
const LoginSchema = require('../models/Login');
const {EmployeeModel} = require('../models/NewEmployee');
const extractToken = require('../db');

const handleReportingPerson = async (req, res) => {
    console.log(req.headers.token)
    try {
        // Extract the token from the Authorization header
        
      const decodedToken = extractToken(req)
      const companyId = decodedToken.companyId

        // Query the database to find reporting managers for the given company
        const reportingManagers = await EmployeeModel.find({ companyId });

        if (reportingManagers.length === 0) {
            return res.status(404).json({ message: 'No reporting managers found for this company.' });
        }

        // Send the found reporting managers as the response
        res.status(200).json({data:reportingManagers,message:'Fetched successfully'});
    } catch (error) {
        // Handle any errors that occur during the query or token verification
        res.status(500).json({ message: 'Error fetching reporting managers', error: error.message });
    }
};

module.exports = handleReportingPerson;
