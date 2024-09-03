const Clientmodel = require("../models/Client")
const jwt = require('jsonwebtoken')

const AddClient = async(req,res)=>{
    const data = req.body

    try {
        const client = await Clientmodel.create(data)
        res.status(201).json({message:"Client Added",client:client})
        console.log(client)
    } catch (error) {
        console.log(error)
        res.status(500).json({message:"Error creating client"})
    }
}

const GetClient = async(req,res)=>{
    const token = req.headers.token;
        if (!token) {
            return res.status(401).json({ message: 'No token provided' });
        }

        // Verify and decode the token to get the companyName
        const decodedToken = jwt.verify(token, 'jwt-secret-key'); // Replace 'jwt-secret-key' with your actual secret key
        console.log(decodedToken)
        const companyName = decodedToken.companyName; // Assuming companyName is stored in the token payload
        console.log('decoded companyName:', companyName);


        try {
            const getdata = await Clientmodel.find({companyName})
            console.log(getdata)
            res.status(200).json({message:"Client fetched",clients:getdata})
        } catch (error) {
            console.log(error)
            res.status(500).json({message:"Error fetching client"})
        }
}


module.exports = {AddClient,GetClient}