import { Column } from "react-table";
import { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../../../constants";
import toast from "react-hot-toast";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Ellipsis } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "app/store";

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
    accessor: "taskTitle", // Still the same accessor
  },
  {
    Header: "Due Date",
    accessor: "dueDate", // Still the same accessor
  },
  // {
  //   Header: "Status",
  //   accessor: "status", // Still the same accessor
  // },
  {
    Header: "Status",
    Cell: ({ row, updater }) => {
      const { status, projectId, _id } = row.original;
      const [data, setData] = useState(status);

      useEffect(() => {
        setData(status); // Keep in sync with row data
      }, [status]);

      const handleChange = async (e) => {
        const newStatus = e.target.value;
        setData(newStatus);

        try {
          const body = { projectId, _id, status: newStatus };
          const response = await axios.post(`${BASE_URL}/tasks/update`, body);

          if (response.status === 200) {
            toast.success("Status updated");
            updater(projectId); // refresh data
          } else {
            toast.error("Failed to update status");
          }
        } catch (error) {
          console.error("Update error:", error);
          toast.error("Something went wrong");
        }
      };

      return (
        <select
          value={data}
          onChange={handleChange}
          className=" dark:bg-primary1  rounded-sm px-2 py-1"
        >
          <option value="Not Started">Not Started</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>
      );
    },
  },

  {
    Header: "Actions",
    Cell: ({ row }) => {
      const navigate = useNavigate();
  const authority = useSelector((state: RootState) => state.auth.authority);
      return (
        <div className=" flex items-center justify-start">
          <DropdownMenu>
            <DropdownMenuTrigger className="  p-1 rounded-lg dark:hover:bg-zinc-900  ">
              <Ellipsis size={20} />
            </DropdownMenuTrigger>
            <DropdownMenuContent className=" dark:bg-secondary1">
              {/* <DropdownMenuLabel>My Account</DropdownMenuLabel> */}
              {/* <DropdownMenuSeparator /> */}
              
              <DropdownMenuItem
                onClick={() =>
                  navigate("/add-task", {
                    state: { mode: "view", data: row.original },
                  })
                }
                className=" hover:bg-zinc-900"
              >
                View
              </DropdownMenuItem>
              {
                authority !== "Employee" && (

              <DropdownMenuItem
                onClick={() =>
                  navigate("/add-task", {
                    state: { mode: "edit", data: row.original },
                  })
                }
                className=" hover:bg-zinc-900"
              >
                Edit
              </DropdownMenuItem>
                )
              }
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      );
    },
  },
];
