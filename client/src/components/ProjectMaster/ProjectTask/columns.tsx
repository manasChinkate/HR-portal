import { Column } from "react-table";
import { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../../../constants";
import toast from "react-hot-toast";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Ellipsis } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "app/store";
import { Row } from "@tanstack/react-table";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { handleChangeStatus } from "./services";

interface Task {
  _id: string;
  taskName: string;
  status: string;
  projectId: string;
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

  {
    Header: "Status",
    Cell: ({ row }: { row: Row<Task> }) => {
      const { status, projectId, _id } = row.original;
      const [newStatus, setStatus] = useState(status);
      const queryClient = useQueryClient();

      // useEffect(() => {
      //   setStatus(status); // Keep in sync with row data
      // }, [status]);

      const body = { projectId, _id, status: newStatus };
      const mutation = useMutation({
        mutationFn: handleChangeStatus,
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["task"] });
          toast.success("Status changed");
        },
      });
      const handleChange = async (value: string) => {
        setStatus(value);
        mutation.mutate(body);
      };

      return (
        <select
          value={newStatus}
          onChange={(e) => handleChange(e.target.value)}
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
    Cell: ({ row }: { row: Row<Task> }) => {
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
              {authority !== "Employee" && (
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
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      );
    },
  },
];
