const AttendanceModel = require("../models/Attendance");
const jwt = require("jsonwebtoken")

const CheckIn = async(req,res)=>{


    try {
        const token = req.headers.token;
        if (!token) {
            return res.status(401).json({ message: 'No token provided' });
        }

        // Verify and decode the token to get the companyName
        const decodedToken = jwt.verify(token, 'jwt-secret-key'); // Replace 'jwt-secret-key' with your actual secret key
        // console.log(decodedToken)
        const email = decodedToken.email;
        const companyName = decodedToken.companyName; // Assuming companyName is stored in the token payload
        // console.log('decoded email:', email);
        const data = {
            ...req.body,
            status:"Present",
            email,
            companyName,
             
        }


        const CheckIn = await AttendanceModel.create(data)
        res.status(201).json("Marked In successfully")
        console.log('Marked In ', CheckIn)



    } catch (error) {
        console.log(error)
        res.status(500).json('Internal server error')
    }
}


const CheckOut = async (req, res) => {
    try {
      // Extract token from headers
      const token = req.headers.token;
      if (!token) {
        console.error("No token provided");
        return res.status(401).json({ message: "No token provided" });
      }
  
      // Decode the token
      const decodedToken = jwt.verify(token, "jwt-secret-key");
      const email = decodedToken.email;
      const companyName = decodedToken.companyName;
      const currentDate = new Date().toISOString().split("T")[0]; // YYYY-MM-DD
  
      // Get checkOutTime from request body
      const { checkOutTime } = req.body;
      if (!checkOutTime) {
        console.error("Check-out time is missing");
        return res.status(400).json({ message: "Check-out time is required" });
      }
  
      // Fetch today's attendance record
      const attendanceRecord = await AttendanceModel.findOne({
        email,
        companyName,
        date: currentDate,
      });
      if (!attendanceRecord) {
        console.error("Attendance record not found for today");
        return res.status(404).json({ message: "Attendance record not found for today" });
      }
  
      console.log("Raw Check-In Time:", attendanceRecord.checkInTime);
      console.log("Raw Check-Out Time:", checkOutTime);
  
      // Convert time from 12-hour to 24-hour format
      const convertTo24HourFormat = (timeString) => {
        const [time, modifier] = timeString.split(" ");
        if (!time || !modifier) {
          throw new Error(`Invalid time format: ${timeString}`);
        }
  
        let [hours, minutes, seconds] = time.split(":");
        if (modifier === "PM" && hours !== "12") {
          hours = parseInt(hours) + 12;
        }
        if (modifier === "AM" && hours === "12") {
          hours = "00";
        }
  
        return `${hours}:${minutes}:${seconds || "00"}`;
      };
  
      let checkInTimeStandardized, checkOutTimeStandardized;
  
      try {
        checkInTimeStandardized = convertTo24HourFormat(attendanceRecord.checkInTime);
        checkOutTimeStandardized = convertTo24HourFormat(checkOutTime);
      } catch (formatError) {
        console.error("Time format error:", formatError.message);
        return res.status(400).json({ message: formatError.message });
      }
  
      console.log("Standardized Check-In Time:", checkInTimeStandardized);
      console.log("Standardized Check-Out Time:", checkOutTimeStandardized);
  
      // Parse check-in and check-out times into Date objects
      const checkInTimeParsed = new Date(`${currentDate}T${checkInTimeStandardized}`);
      const checkOutTimeParsed = new Date(`${currentDate}T${checkOutTimeStandardized}`);
  
      // Validate parsed times
      if (isNaN(checkInTimeParsed.getTime()) || isNaN(checkOutTimeParsed.getTime())) {
        console.error("Parsed time is invalid");
        return res.status(400).json({ message: "Invalid time format" });
      }
  
      // Ensure check-out time is after check-in time
      if (checkOutTimeParsed <= checkInTimeParsed) {
        console.error("Check-out time must be after check-in time");
        return res.status(400).json({ message: "Check-out time must be after check-in time" });
      }
  
      // Calculate total hours worked
      const timeDiffMs = checkOutTimeParsed - checkInTimeParsed; // Difference in milliseconds
      const totalhours = (timeDiffMs / (1000 * 60 * 60)).toFixed(2); // Convert to hours with 2 decimal places
  
      console.log("Total Hours Calculated:", totalhours);
  
      // Update the attendance record with check-out time and total hours
      const updatedAttendance = await AttendanceModel.findOneAndUpdate(
        { email, companyName, date: currentDate },
        { checkOutTime, totalhours },
        { new: true } // Return the updated document
      );
  
      if (!updatedAttendance) {
        console.error("Failed to update attendance");
        return res.status(500).json({ message: "Failed to update attendance" });
      }
  
      res.status(201).json({
        message: "Checked out successfully",
        attendance: updatedAttendance,
      });
  
      console.log("Checked Out successfully", updatedAttendance);
    } catch (error) {
      console.error("Error during CheckOut:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  };
  
  
  
  
  

module.exports = {CheckIn , CheckOut}