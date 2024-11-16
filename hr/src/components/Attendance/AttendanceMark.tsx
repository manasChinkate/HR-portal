

import { useEffect, useMemo, useState } from 'react';
import { BASE_URL } from '../../constants';
import axios from 'axios';
import toast from 'react-hot-toast';




const AttendanceMark = () => {

    const [status, setStatus] = useState("Not Checked In");
    const [checkInTime, setCheckInTime] = useState(null);
    const [checkOutTime, setCheckOutTime] = useState(null);

    const [isModalOpen, setIsModalOpen] = useState(false);


    const handleCheckIn = async () => {
        const now = new Date(); // Current date and time
        setCheckInTime(now);
        setStatus("Present");

        // Format the date to YYYY-MM-DD
        const formattedDate = now.toISOString().split("T")[0];

        const data = {
            checkInTime: now.toLocaleTimeString(), // Include the check-in time in HH:MM:SS format
            date: formattedDate, // Include today's date
        };

        console.log(data)

        try {
          const res = await axios.post(`${BASE_URL}/mark-in`, data)
          
          if(res.status === 400){
            // toast.success(res.data)
            setStatus('Already Checked In')  
          }else{
            toast.success("Successfully Checked In")
          }
          
        } catch (error) {
          toast.error("Already Checked In")
        }
       

        // API call to save check-in
    };

    const handleCheckOut = async() => {
        setIsModalOpen(true)
    };

    const confirmCheckOut = async() => {
        setIsModalOpen(false); // Close the modal
        // Perform the check-out logic here

        const now = new Date();
        setCheckOutTime(now);
        setStatus("Checked Out");
        // API call to save check-out

        const formattedDate = now.toISOString().split("T")[0];


        const data = {
            checkOutTime: now.toLocaleTimeString(), // Include the check-in time in HH:MM:SS format
            date: formattedDate, // Include today's date
        };

        const res = await axios.post(`${BASE_URL}/mark-out`, data)

        console.log("Checked out successfully!");
      };
    
      const cancelCheckOut = () => {
        setIsModalOpen(false); // Close the modal without checking out
      };
    return (


        <div className='w-full h-[90vh] dark:bg-primary1 bg-background2 py-2 overflow-y-auto'>
            <div className="bg-background1 md:p-4 p-2 rounded-md  dark:bg-secondary1 shadow-lg">

            {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-md shadow-md">
            <h2 className="text-lg font-bold mb-4">Confirm Check Out</h2>
            <p>Are you sure you want to check out for the day?</p>
            <div className="mt-4 flex justify-end">
              <button
                onClick={cancelCheckOut}
                className="px-4 py-2 bg-gray-300 text-black rounded-md mr-2"
              >
                Cancel
              </button>
              <button
                onClick={confirmCheckOut}
                className="px-4 py-2 bg-red-500 text-white rounded-md"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}


                <h2 className="text-lg font-bold">Daily Attendance</h2>
                <p>Status: {status}</p>
                <div className="mt-4">
                    <button
                        onClick={handleCheckIn}
                        className="px-4 py-2 bg-green-500 text-white rounded-md mr-2 disabled:opacity-45"
                        disabled={status === "Present" || status === "Already Checked In"}
                    >
                        Check In
                    </button>
                    <button
                        onClick={handleCheckOut}
                        className="px-4 py-2 bg-blue-500 text-white rounded-md disabled:opacity-45"
                        disabled={!checkInTime || status === "Checked Out" || status === "Present"}
                    >
                        Check Out
                    </button>
                </div>
            </div>
        </div>

    )
}

export default AttendanceMark