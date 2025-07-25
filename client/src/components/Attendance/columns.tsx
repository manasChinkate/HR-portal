// column.tsx

import { convertDate } from "@/utils/dateHelper";
import { Row } from "@tanstack/react-table";
import { Column } from "react-table";

interface AttendanceRecord {
  _id: string;
  companyName: string;
  email: string;
  date: string; // ISO date format (YYYY-MM-DD)
  status: "Present" | "Absent";
  checkInTime: string; // Time in 12-hour format with AM/PM
  checkOutTime?: string; // Optional, as it might not be available if the user hasn't checked out
  totalhours?: string; // Optional, as it might not be calculated for partial attendance
  __v: number;
}

export const COLUMNS: Column<AttendanceRecord>[] = [
  {
    Header: "Date",
    accessor: "date",
    // Cell: ({ value }: { value: string }) => {
    //   return <span>{convertDate(value)}</span>;
    // },
  },
  {
    Header: "Status",
    accessor: "status",
    Cell: ({ row }: { row: Row<AttendanceRecord> }) => {
      return (
        <>
          {row.original.status === "Present" ? (
            <p className="bg-cyan-100 mx-auto cursor-pointer font-semibold text-center py-0 px-1 lg:py-0.5 lg:px-2 rounded-lg dark:bg-secondary1 dark:border-blue-600 dark:border text-blue-600 w-fit text-xs">
              {row.original.status}
            </p>
          ) : (
            <p className="bg-cyan-100 mx-auto cursor-pointer font-semibold text-center py-0 px-1 lg:py-0.5 lg:px-2 rounded-lg dark:bg-secondary1 dark:border-red-600 dark:border text-red-600 w-fit text-xs">
              {row.original.status}
            </p>
          )}
        </>
      );
    },
  },
  {
    Header: "CheckIn Time",
    accessor: "checkInTime",
  },
  {
    Header: "CheckOut Time",
    accessor: "checkOutTime",
  },
  {
    Header: "Total Hours",
    accessor: "totalHours",
  },
];
