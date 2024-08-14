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

module.exports = AddnewEmployee