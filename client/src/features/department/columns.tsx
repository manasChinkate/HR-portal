import { convertDate } from "@/utils/dateHelper";
import { ColumnDef } from "@tanstack/react-table";

export interface Department {
  department: string;
}

export const COLUMNS: ColumnDef<Department>[] = [
  {
    accessorKey: "department",
    header: "Department",
  },
  {
    accessorKey: "createdAt",
    header: "Created At",
    cell: ({ getValue }) => {
      const value = getValue<string>();
      return <span>{convertDate(value)}</span>;
    },
  },
];
