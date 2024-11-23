import { Column } from "react-table";
import { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "@/components/Constants";

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
  // {
  //   Header: "Status",
  //   accessor: "tasks", // Same accessor for tasks
  //   Cell: ({ value }: { value: Task[] }) => (
  //     <div>
  //       {value.map((task) => (
  //         <div key={task._id}>
  //           <span>{task.status}</span>
  //         </div>
  //       ))}
  //     </div>
  //   ),
  // },
];
