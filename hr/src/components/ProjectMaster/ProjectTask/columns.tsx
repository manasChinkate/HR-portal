import { Column } from "react-table";
import { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../../../constants";
import toast from "react-hot-toast";

interface Task {
  _id: string;
  taskName: string;
  status: string;
}

interface Project {
  _id: string;
  projectName: string;
  clientName: string;
  projectManager: string;
  startDate: string;
  deadline: string;
  priority: string;
  description: string;
  companyName: string;
  createdAt: string;
  __v: number;
  tasks: Task[];
}

export const COLUMNS: Column<Project>[] = [
  {
    Header: "Task Name",
    accessor: "taskName", // Still the same accessor
    
  },
  {
    Header: "Status",
    accessor: "status", // Still the same accessor
    
  },
  {
    Header: "Edit",
    Cell: ({ row, updater }) => {
      const [data, setData] = useState(row.original.status); // Current status
      const [edit, setEdit] = useState(false);

      const {projectName} = row.original
  
      useEffect(() => {
        setData(row.original.status);
      }, [edit, row]);
  
      const handleUpdate = async (e) => {
        e.preventDefault();
        try {
          const body = {
            projectName: row.original.projectName, // Use projectName from row data
            taskName: row.original.taskName,
            status: data, // Send the updated status
          };
      
          const response = await axios.post(`${BASE_URL}/updatetask`, body);
      
          // Check if the response status is 200
          if (response.status === 200) {
            toast.success("Task updated successfully");
            await updater(row.original.projectName); // Refresh tasks using projectName
          } else {
            toast.error("Task update failed");
          }
        } catch (error) {
          console.error("Error during task update:", error); // Debug the error
          toast.error("Something went wrong");
        } finally {
          setEdit(false);
        }
      };
      
      
      
  
      return (
        <>
          <form onSubmit={handleUpdate} className="flex gap-4 items-center">
            <select
              disabled={!edit}
              value={data}
              onChange={(e) => setData(e.target.value)}
              className="border border-black rounded-sm px-2 py-1 disabled:text-gray-500 disabled:border-gray-500 disabled:cursor-not-allowed"
            >
              {/* Add your status options here */}
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
            {edit ? (
              <button
                type="submit"
                className="bg-green-500 w-16 py-1 rounded-md text-white"
              >
                Update
              </button>
            ) : (
              <div
                onClick={() => setEdit(true)}
                className="text-center bg-green-500 w-16 py-1 rounded-md cursor-pointer text-white"
              >
                Edit
              </div>
            )}
          </form>
        </>
      );
    },
  }
];
