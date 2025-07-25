import { convertDate } from "@/utils/dateHelper";
import { ColumnDef } from "@tanstack/react-table";

interface LeaveRecord {
  _id: string;
  leaveType: string;
  count: string;
  companyName: string;
  createdAt: string;
  __v: number;
}

export const COLUMNS: ColumnDef<LeaveRecord>[] = [
  {
    header: "Leave Type",
    accessorKey: "leaveType",
  },
  {
    header: "Count",
    accessorKey: "count",
  },
  {
    header: "Created At",
    accessorKey: "createdAt",
    cell: ({ getValue }) => {
      const value = getValue<string>();
      return <span>{convertDate(value)}</span>;
    },
  },
];
