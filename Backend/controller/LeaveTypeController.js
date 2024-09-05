const LeavetypeModel = require("../models/LeaveType")
const jwt = require('jsonwebtoken')

const LeaveType = async(req,res)=>{
    const data = req.body
    try {
        const leavetype = LeavetypeModel.create(data)
        res.status(201).json(data) 
    } catch (error) {
       console.log(error)
       res.status(500).json({message:"Error uploading leave type"}) 
    }
}

const getLeaveType = async(req,res)=>{
    const token = req.headers.token;
        if (!token) {
            return res.status(401).json({ message: 'No token provided' });
        }
        // Verify and decode the token to get the companyName
        const decodedToken = jwt.verify(token, 'jwt-secret-key'); // Replace 'jwt-secret-key' with your actual secret key
        const companyName = decodedToken.companyName; // Assuming companyName is stored in the token payload
        
        try {
            const getdata = await LeavetypeModel.find({companyName})
            console.log(getdata)
            res.status(200).json(getdata)
        } catch (error) {
            console.log(error)
            res.status(500).json({message:"Error fetching leavetypes"})
        }
}

module.exports = {LeaveType,getLeaveType}