import { convertDate } from "@/utils/dateHelper";
import { ColumnDef } from "@tanstack/react-table";

interface LeaveType {
  id: string;
  leaveType: string;
}

interface LeaveRecord {
  _id: string;
  leaveType: LeaveType;
  count: string;
  fromDate: string;
  toDate: string;
  department: string;
  reason: string;
  createdAt: string;
  status: string;
  __v: number;
}

export const COLUMNS: ColumnDef<LeaveRecord>[] = [
  {
    header: "Leave type",
    accessorFn: (row) => row.leaveType?.leaveType,
  },
  {
    header: "Count",
    accessorKey: "count",
  },
  {
    header: "From Date",
    accessorKey: "fromDate",
    cell: ({ getValue }) => <span>{convertDate(getValue<string>())}</span>,
  },
  {
    header: "To Date",
    accessorKey: "toDate",
    cell: ({ getValue }) => <span>{convertDate(getValue<string>())}</span>,
  },
  {
    header: "Reason",
    accessorKey: "reason",
  },
  {
    header: "Applied Date",
    accessorKey: "createdAt",
    cell: ({ getValue }) => <span>{convertDate(getValue<string>())}</span>,
  },
  {
    header: "Approval Status",
    accessorKey: "status",
    cell: ({ row }) => {
      const status = row.original.status;
      const isAccepted = status === "Accepted";
      return (
        <p
          className={`mx-auto text-xs w-fit cursor-pointer font-semibold text-center py-0 px-1 lg:py-0.5 lg:px-2 rounded-lg dark:bg-secondary1 border ${
            isAccepted
              ? "bg-cyan-100 text-blue-600 dark:border-blue-600"
              : "bg-cyan-100 text-red-600 dark:border-red-600"
          }`}
        >
          {status}
        </p>
      );
    },
  },
];
