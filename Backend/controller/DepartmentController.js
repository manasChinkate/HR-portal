const mongoose = require('mongoose')
const DepartmentModel = require('../models/Department')
const jwt  = require('jsonwebtoken')

const Department = async(req,res)=>{
    const department = req.body

    if(department){
       const data =  await DepartmentModel.create(department) 
        // console.log(data)
        res.status(201).json('Created successfully')
    }else{
        res.status(500).json('Error Creating ')
        console.log('error')

    }
}

const GetDepartment = async(req,res)=>{
    try {
        // Extract companyName from URL parameters
        // const  companyName  =  req.params.companyname;
        const token = req.headers.token;
        if (!token) {
            return res.status(401).json({ message: 'No token provided' });
        }

        // Verify and decode the token to get the companyName
        const decodedToken = jwt.verify(token, 'jwt-secret-key'); // Replace 'jwt-secret-key' with your actual secret key
        // console.log(decodedToken)
        const companyName = decodedToken.companyName; // Assuming companyName is stored in the token payload
        // console.log('decoded companyName:', companyName);
        // console.log('companyName :',companyName)

        // Query the database to find reporting managers for the given company€
        const departments = await DepartmentModel.find({ companyName });
        // console.log(designations)

        
        if (departments.length === 0) {
            return res.status(404).json({ message: 'No departments found for this company.' });
        }

        // Send the found reporting managers as the response
        res.status(200).json(departments);
    } catch (error) {
        // Handle any errors that occur during the query
        res.status(500).json({ message: 'Error fetching departments', error: error.message });
    }
}

module.exports = {Department,GetDepartment}