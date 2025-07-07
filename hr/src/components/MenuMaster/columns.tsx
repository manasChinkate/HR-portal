import { ColumnDef } from "@tanstack/react-table";
import { convertDate } from "@/utils/dateHelper";
import { iconMapping } from "../Sidebar/AppSidebar";
import { SquarePen, Trash2 } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import axios from "axios";
import { BASE_URL } from "@/constants";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";

type Inputs = {
  menuName: string;
  parentId?: {
    _id: string;
    menuName: string;
  } | null;
  logo: string;
  path: string | null;
};

export const COLUMNS: ColumnDef<Inputs>[] = [
  {
    id: "logo",
    accessorKey: "logo",
    header: "Logo",
    cell: ({ getValue }) => {
      const Icon = iconMapping[getValue() as keyof typeof iconMapping];
      return <>{Icon && <Icon className="w-5 h-5" />}</>;
    },
  },
  {
    id: "menuName",
    accessorKey: "menuName",
    header: "Menu Name",
  },
  {
    id: "parentId",
    accessorKey: "parentId",
    header: "Parent Menu",
    accessorFn: (row) => row.parentId?.menuName ?? "-",
  },
  {
    id: "path",
    accessorKey: "path",
    header: "Path",
  },
  {
    id: "createdAt",
    accessorKey: "createdAt",
    header: "Created Date",
    cell: ({ getValue }) => <span>{convertDate(getValue() as string)}</span>,
  },
  {
    id: "actions",
    // accessorKey: "createdAt",
    header: "Actions",
    cell: ({ row }) => {
      return (
        <div className=" flex gap-4">
          <SquarePen className=" size-4 text-gray-500 cursor-pointer hover:text-green-600" />
          <Delete row={row.original} />
        </div>
      );
    },
  },
];

const Delete = ({ row }) => {

  const queryClient = useQueryClient()
  const handleDelete = async () => {
    const res = await axios.get(`${BASE_URL}/menu/${row._id}`);
    if (res.status == 200) {
      toast.success("Deleted Successfully");
      queryClient.invalidateQueries({queryKey:["menu"]})
    }
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Trash2 className=" size-4 cursor-pointer text-gray-500 hover:text-red-600" />
      </AlertDialogTrigger>
      <AlertDialogContent className=" dark:bg-primary1 bg-background2">
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete Menu data
            from our servers.{" "}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className=" bg-background1 dark:bg-primary1 dark:text-white">
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            className="bg-red-600 dark:text-white dark:hover:bg-red-600 "
            onClick={handleDelete}
          >
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
