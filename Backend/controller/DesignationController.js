const mongoose = require('mongoose')
const DesignationModel = require('../models/Designation')

const Designation = async(req,res)=>{
    const designation = req.body

    if(designation){
       const data =  await DesignationModel.create(designation) 
        console.log(data)
        res.status(201).json('Created successfully')
    }else{
        res.status(500).json('Error Creating ')
        console.log('error')

    }
}

const GetDesignation = async(req,res)=>{
    try {
        // Extract companyName from URL parameters
        const  companyName  =  req.params.companyname;
        // console.log('companyName :',companyName)

        // Query the database to find reporting managers for the given company€
        const designations = await DesignationModel.find({ companyName });
        // console.log(designations)

        
        if (designations.length === 0) {
            return res.status(404).json({ message: 'No designations found for this company.' });
        }

        // Send the found reporting managers as the response
        res.status(200).json(designations);
    } catch (error) {
        // Handle any errors that occur during the query
        res.status(500).json({ message: 'Error fetching designations', error: error.message });
    }
}

module.exports = {Designation,GetDesignation}