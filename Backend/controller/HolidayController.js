const mongoose = require('mongoose')
const HolidayModel = require('../models/Holiday')

const Holiday = async(req,res)=>{
    const holiday = req.body

    if(holiday){
       const data =  await HolidayModel.create(holiday) 
        console.log(data)
        res.status(201).json('Created successfully')
    }else{
        res.status(500).json('Error Creating ')
        console.log('error')

    }
}

const GetHoliday = async(req,res)=>{
    try {
        // Extract companyName from URL parameters
        const  companyName  =  req.params.companyname;
        console.log('companyName :',companyName)

        // Query the database to find reporting managers for the given company€
        const holiday = await HolidayModel.find({ companyName });
        console.log(holiday)

        
        if (holiday.length === 0) {
            return res.status(404).json({ message: 'No holidays found for this company.' });
        }

        // Send the found reporting managers as the response
        res.status(200).json(holiday);
    } catch (error) {
        // Handle any errors that occur during the query
        res.status(500).json({ message: 'Error fetching designations', error: error.message });
    }
}

module.exports = {Holiday,GetHoliday}