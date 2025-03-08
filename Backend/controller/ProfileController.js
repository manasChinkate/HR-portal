const EmployeeModel = require("../models/NewEmployee")


const getProfileDetails = async()=>{

    const employee = await EmployeeModel.findById()
    const profileDetails = {
        
    }



}