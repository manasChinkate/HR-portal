import { convertDate } from "@/utils/dateHelper";
import { ColumnDef } from "@tanstack/react-table";

export interface Account {
  designation: string;
  createdAt: string;
}

export const COLUMNS: ColumnDef<Account>[] = [
  {
    id: "designation",
    accessorKey: "designation",
    header: "Designation",
  },
  {
    id: "createdAt",
    accessorKey: "createdAt",
    header: "Created Date",
    cell: ({ getValue }) => {
      const rawDate = getValue() as string;
      return <span>{convertDate(rawDate)}</span>;
    },
  },
];
