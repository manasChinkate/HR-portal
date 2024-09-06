
const LeaveModel = require('../models/Leave')
const jwt = require('jsonwebtoken')

const AddLeave = async(req,res)=>{
    try {
        const token = req.headers.token;
        if (!token) {
            return res.status(401).json({ message: 'No token provided' });
        }

        // Verify and decode the token to get the companyName
        const decodedToken = jwt.verify(token, 'jwt-secret-key'); // Replace 'jwt-secret-key' with your actual secret key
        // console.log(decodedToken)
        const email = decodedToken.email;
        const name = decodedToken.username; // Assuming companyName is stored in the token payload
        const companyName = decodedToken.companyName; // Assuming companyName is stored in the token payload
        // console.log('decoded email:', email);
        const data = {
            ...req.body,
            name,
            email,
            companyName,
            status:'pending'
        }

  
            const AddData = await LeaveModel.create(data)
            res.status(201).json("Leave applied successfully")
            console.log('leave appplied',AddData)
       
     

    } catch (error) {
        console.log(error)
        res.status(500).json('Internal server error')
    }
}

const GetLeaveData = async (req,res)=>{

    try {
        const token = req.headers.token;
        if (!token) {
            return res.status(401).json({ message: 'No token provided' });
        }
        
        const decodedToken = jwt.verify(token, 'jwt-secret-key'); 
        // console.log(decodedToken)
        const email = decodedToken.email;
        const name = decodedToken.username; 
        const companyName = decodedToken.companyName; 
        const authority = decodedToken.authority
        
        const data = {
            companyName,
            email

        }      
        const getData = await LeaveModel.find(authority === 'Employee' ? { companyName, email } : authority === 'HiringManager' ? { companyName, email } :    { companyName });
        // console.log(getData)
        

        if (getData.length === 0) {
            return res.status(404).json({ message: 'No leave data found for this user in the specified company' });
        }

        res.status(200).json(getData)
        console.log(getData)
    } catch (error) {
        console.log(error)
        res.status(500)
    }
   

}

const StatusChange = async (req,res)=>{
    const status = req.params.status
    const id = req.params.id

    const token = req.headers.token;
        if (!token) {
            return res.status(401).json({ message: 'No token provided' });
        }
        
        const decodedToken = jwt.verify(token, 'jwt-secret-key'); 
        // console.log(decodedToken)
        const email = decodedToken.email;
        const name = decodedToken.username; 
        const companyName = decodedToken.companyName; 
        const authority = decodedToken.authority


        try {
            const statusChange = await LeaveModel.findOneAndUpdate(
                { _id: id, companyName: companyName }, // Find leave record by ID and companyName
                { status: status }, // Update the status field
                { new: true } // Return the updated document
            );
    
            if (!statusChange) {
                return res.status(404).json({ message: 'Leave record not found' });
            }
    
            res.status(200).json({ message: 'Status updated successfully', statusChange });
        } catch (error) {
            console.log(error)
        }

}

module.exports = {AddLeave, GetLeaveData, StatusChange}