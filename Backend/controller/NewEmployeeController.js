const EmployeeModel = require('../models/NewEmployee')
const LoginSchema = require('../models/Login')
const jwt = require('jsonwebtoken')


const  generateUserId = (companyName) => {
    const prefix = companyName.slice(0, 3).toUpperCase(); // Get first 3 letters and convert to uppercase
    const randomNumber = Math.floor(100000 + Math.random() * 9000); // Generates a random 4-digit number
    const userId = `${prefix}${randomNumber}`; // Combines prefix and random number
    return userId;
};

// Example usage
const userId = generateUserId("Accenture");
console.log(userId); // Output: ACC1234


const AddnewEmployee = async (req, res) => {
    const userId = await generateUserId(req.body.companyName)
    const {fullname} = req.body
    const loginData = {
        name: req.body.fullname,
        email: req.body.email,
        authority: req.body.authority,
        password: req.body.authority === 'ProjectManager' ? `${fullname.slice(0,3)}@123` : '123456',
        companyName: req.body.companyName,
        employeeId:userId
    };
    


    const employeeData = {
        ...req.body,
        employeeId:userId
    }


   
    try {

        await EmployeeModel.create(employeeData)
        await LoginSchema.create(loginData)

        res.status(201)
        res.json("Employee Creted successfully")
        console.log(employee)

    } catch (error) {
        res.status(500)
        res.json("Failed creting Employee")
        console.log("error creating employee")
    }
}


const getEmployeeData = async(req,res)=>{
    try {
    
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
        res.status(500).json({ message: 'Error fetching Employees', error: error.message });
    }
}

module.exports = {AddnewEmployee,getEmployeeData, generateUserId}