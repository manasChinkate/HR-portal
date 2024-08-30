const EmployeeModel = require('../models/NewEmployee')
const LoginSchema = require('../models/Login')

const AddnewEmployee = async (req, res) => {

    loginemployee = {
        name:req.body.fullname,
        email:req.body.email,
        authority:req.body.authority,
        password:"123456",
        companyName:req.body.companyName
    }

    const employee = req.body;
    try {

        await EmployeeModel.create(employee)
        await LoginSchema.create(loginemployee)

        res.status(201)
        res.json("Employee Creted successfully")
        console.log(employee)

    } catch (error) {
        res.status(500)
        res.json("Failed creting Employee")
        console.log("error creating employee")
    }
}


const getEmployeeData = async()=>{
    try {
        // Extract companyName from URL parameters
        // const  companyName  =  req.params.companyname;
        // console.log('companyName :',companyName)


        const token = req.headers.token;
        if (!token) {
            return res.status(401).json({ message: 'No token provided' });
        }

        // Verify and decode the token to get the companyName
        const decodedToken = jwt.verify(token, 'jwt-secret-key'); // Replace 'jwt-secret-key' with your actual secret key
        console.log(decodedToken)
        const companyName = decodedToken.companyName; // Assuming companyName is stored in the token payload
        console.log('decoded companyName:', companyName);

        // Query the database to find reporting managers for the given company€
        const Employee = await EmployeeModel.find({ companyName });
        console.log(Employee)

        
        if (Employee.length === 0) {
            return res.status(404).json({ message: 'No Employee found for this company.' });
        }

        // Send the found reporting managers as the response
        res.status(200).json(Employee);
    } catch (error) {
        // Handle any errors that occur during the query
        res.status(500).json({ message: 'Error fetching designations', error: error.message });
    }
}

module.exports = {AddnewEmployee,getEmployeeData}