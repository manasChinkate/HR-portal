const LeaveModel = require("../models/Leave");
const jwt = require("jsonwebtoken");
const EmployeeModel = require("../models/NewEmployee");

const AddLeave = async (req, res) => {
  try {
    const token = req.headers.token;
    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }

    // Verify and decode the token to get the companyName
    const decodedToken = jwt.verify(token, "jwt-secret-key"); // Replace 'jwt-secret-key' with your actual secret key
    // console.log(decodedToken)
    const email = decodedToken.email;
    const name = decodedToken.username; // Assuming companyName is stored in the token payload
    const companyName = decodedToken.companyName; // Assuming companyName is stored in the token payload
    const employeeId = decodedToken.userId; // Assuming companyName is stored in the token payload
    // console.log('decoded email:', email);
    const data = {
      ...req.body,
      name,
      email,
      companyName,
      status: "pending",
      employeeId,
    };

    const AddData = await LeaveModel.create(data);
    res.status(201).json("Leave applied successfully");
    console.log("leave appplied", AddData);
  } catch (error) {
    console.log(error);
    res.status(500).json("Internal server error");
  }
};

const GetLeaveData = async (req, res) => {
  try {
    const token = req.headers.token;
    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }

    const decodedToken = jwt.verify(token, "jwt-secret-key");

    console.log("decodedToken :", decodedToken);
    const email = decodedToken.email;
    const companyName = decodedToken.companyName;
    // const authority =  decodedToken.authority;

    let getData;

    // Fetch all leaves for the company

    // If the user is an Employee, fetch leave data for that specific user in the company
    getData = await LeaveModel.find({ companyName, email });
    console.log("employee one generated");

    // For HiringManager or any other role, fetch all leave data for the company

    // If no leave data is found
    if (getData.length === 0) {
      return res
        .status(404)
        .json({
          message: "No leave data found for this user in the specified company",
        });
    }

    // Send the data as response
    res.status(200).json(getData);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};

const GetManageLeave = async (req, res) => {
  try {
    const token = req.headers.token;
    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }

    const decodedToken = jwt.verify(token, "jwt-secret-key");

    console.log("decodedToken :", decodedToken);
    const email = decodedToken.email;
    const companyName = decodedToken.companyName;

    const getData = await LeaveModel.find({ companyName });

    if (getData.length === 0) {
      return res
        .status(404)
        .json({
          message: "No leave data found for this user in the specified company",
        });
    }

    // Send the data as response
    res.status(200).json(getData);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};

const StatusChange = async (req, res) => {
  const status = req.params.status;
  const employeeId = req.params.id;
  const { data } = req.body;

  const token = req.headers.token;
  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  const decodedToken = jwt.verify(token, "jwt-secret-key");
  // console.log(decodedToken)
  console.log("BODYYYYY", data);

  try {
    if(status === "Accepted"){
        await decreaseCount(employeeId,data.count,data.leaveType)
    }
    const statusChange = await LeaveModel.findOneAndUpdate(
      { employeeId: employeeId }, // Find leave record by ID and companyName
      { status: status }, // Update the status field
      { new: true } // Return the updated document
    );

    if (!statusChange) {
      return res.status(404).json({ message: "Leave record not found" });
    }

    res
      .status(200)
      .json({ message: "Status updated successfully", statusChange });
  } catch (error) {
    console.log(error);
  }
};

const decreaseCount =async(employeeId,count,leaveType)=>{
    const employee = await EmployeeModel.findOne({ employeeId });
    console.log("Employee-------------------------", employee);
    console.log(
      "PendingLEAVE-------------------------",
      employee?.pendingLeave
    );

    if (!employee) {
      console.log("NO employee found");
    }
    const leave = employee.pendingLeave.find(
      (e) => e.leaveType == leaveType
    );

    if (!leave) {
      console.log("No leave found");
    }
    const newCount = +leave.count - +count;

    if (newCount < 0) {
      console.log("Not enough Leaves");
      
    }
    const result = await EmployeeModel.findOneAndUpdate(
      { employeeId, "pendingLeave.leaveType": leaveType },
      {
        $set: {
          "pendingLeave.$.count": newCount,
        },
      },
      { new: true }
    );
    if (result) {
      console.log("COunt updated successfulyy");
    }

} 

module.exports = { AddLeave, GetLeaveData, StatusChange, GetManageLeave };
