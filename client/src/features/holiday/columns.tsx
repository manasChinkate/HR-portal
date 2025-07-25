// column.tsx
import { convertDate } from "@/utils/dateHelper";
import { ColumnDef } from "@tanstack/react-table";

export type Designation = {
  holiday: string;
  fromDate: string;
  toDate: string;
  holidayType: "single" | "multiple";
};

export const COLUMNS: ColumnDef<Designation>[] = [
  {
    accessorKey: "holiday",
    header: "Occasion",
  },
  {
    accessorKey: "fromDate",
    header: "From Day",
    cell: ({ getValue }) => {
      const value = getValue<string>();
      return <span>{convertDate(value)}</span>;
    },
  },
  {
    accessorKey: "toDate",
    header: "To Day",
    cell: ({ getValue }) => {
      const value = getValue<string>();
      return <span>{value === "" ? "-" : convertDate(value)}</span>;
    },
  },
  {
    accessorKey: "holidayType",
    header: "Holiday Type",
  },

  // Uncomment and use if you want to show createdAt
  {
    accessorKey: "createdAt",
    header: "Created Date",
    cell: ({ getValue }) => {
      const value = getValue<string>();
      return <span>{convertDate(value)}</span>;
    },
  },
];
