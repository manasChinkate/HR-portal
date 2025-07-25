import { convertDate } from "@/utils/dateHelper";
import { ColumnDef } from "@tanstack/react-table";

interface Client {
  _id: string;
  clientName: string;
  contactPerson: string;
  contactPersonPhone: string;
  state: string;
  country: string;
  companyName: string;
  createdAt: string;
  __v: number;
}

export const COLUMNS: ColumnDef<Client>[] = [
  {
    accessorKey: "clientName",
    header: "Client Name",
  },
  {
    accessorKey: "contactPerson",
    header: "Contact Person",
  },
  {
    accessorKey: "contactPersonPhone",
    header: "Contact",
  },
  {
    accessorKey: "state",
    header: "State",
  },
  {
    accessorKey: "country",
    header: "Country",
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
