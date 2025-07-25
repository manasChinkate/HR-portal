const EmployeeModel = require("../models/Employee")


const getProfileDetails = async()=>{

    const employee = await EmployeeModel.findById()
    const profileDetails = {
        
    }



}