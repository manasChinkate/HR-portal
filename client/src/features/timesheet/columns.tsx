import { ColumnDef } from "@tanstack/react-table";
import { convertDate } from "@/utils/dateHelper";

interface Timesheet {
  employeeId: {
    _id: string;
    fullname: string;
  };
  projectId: {
    projectName: string;
  };
  taskId: {
    taskTitle: string;
  };
  date: string;
  startTime: string;
  endTime: string;
  totalTime: string;
  taskDesc: string;
}

export const COLUMN1: ColumnDef<Timesheet>[] = [
  {
    header: "Full Name",
    accessorFn: (row) => row.employeeId.fullname,
    cell: ({ getValue }) => <span>{getValue<string>()}</span>,
  },
  {
    header: "Date",
    accessorKey: "date",
    cell: ({ getValue }) => (
      <span>{convertDate(getValue<string>())}</span>
    ),
  },
  {
    header: "Project Name",
    accessorFn: (row) => row.projectId.projectName,
    cell: ({ getValue }) => <span>{getValue<string>()}</span>,
  },
  {
    header: "Task",
    accessorFn: (row) => row.taskId.taskTitle,
    cell: ({ getValue }) => <span>{getValue<string>()}</span>,
  },
  {
    header: "Start Time",
    accessorKey: "startTime",
  },
  {
    header: "End Time",
    accessorKey: "endTime",
  },
  {
    header: "Total Time",
    accessorKey: "totalTime",
  },
  {
    header: "Remarks",
    accessorKey: "taskDesc",
  },
];
