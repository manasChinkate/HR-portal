import axios from "axios";
import { BASE_URL } from "../../constants";
import { useMemo, useState } from "react";

import { COLUMNS } from "./columns";

import toast from "react-hot-toast";
import TableWrapper from "../ui/TableWrapper";
import { useQuery } from "@tanstack/react-query";
import { fetchData } from "./services";
import { Button } from "../ui/button";

const AttendanceMark = () => {
  const [status, setStatus] = useState("Not Checked In");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const columns: any = useMemo(() => COLUMNS, []);
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["attendance"],
    queryFn: fetchData,
  });

  const handleCheckIn = async () => {
    try {
      const res = await axios.post(`${BASE_URL}/attendance/check-in`);

      if (res.status === 400) {
        // toast.success(res.data)
        setStatus(res.data?.message);
      } else {
        setStatus("Present");
        toast.success("Successfully Checked In");
      }
    } catch (error) {
      toast.error("Already Checked In");
    }

    // API call to save check-in
  };

  const handleCheckOut = async () => {
    setIsModalOpen(true);
  };

  const confirmCheckOut = async () => {
    try {
      const res = await axios.post(`${BASE_URL}/attendance/check-out`);

      if (res.status === 200) {
        toast.success("Success CheckOut");
        setIsModalOpen(false); // Close the modal
      } else toast.error(res.data.message);
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }

    console.log("Checked out successfully!");
  };

  return (
    <div className="w-full max-h-[90vh] bg-background2 flex flex-col gap-2 dark:bg-primary1 py-2 pr-2 overflow-y-auto">
      <div className=" bg-background1 dark:bg-secondary1  rounded-lg w-full p-4 text-sm">
        {isModalOpen && (
          <div
            onClick={() => setIsModalOpen(false)}
            className="fixed top-0 left-0 z-50 h-full px-2 w-screen bg-[#000000b3] flex md:items-center items-center justify-center "
          >
            <div className="bg-white  overflow-y-scroll dark:bg-secondary1 overflow-auto p-6 rounded-sm w-full md:w-auto">
              <h2 className="text-lg font-bold mb-4">Confirm Check Out</h2>
              <p>Are you sure you want to check out for the day?</p>
              <div className="mt-4 flex justify-end">
                <button
                  onClick={() => setIsModalOpen(false)}
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
        <div className="mt-4 flex gap-2">
          <Button
            onClick={handleCheckIn}
            className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            // disabled={status === "Present"}
          >
            Check In
          </Button>
          <Button
            onClick={handleCheckOut}
            className="bg-gradient-to-r from-red-500 to-rose-600 hover:from-red-600 hover:to-rose-700 text-white shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            Check Out
          </Button>
        </div>
      </div>
      <TableWrapper
        data={data || []}
        loading={isLoading}
        columns={columns}
        description="Here's a list of Departments."
        title="Designations"
        refetch={refetch}
      />
    </div>
  );
};

export default AttendanceMark;
