import { ColumnDef, Row } from "@tanstack/react-table";
import { convertDate } from "@/utils/dateHelper";
import { SquarePen } from "lucide-react";

import { CellContext } from "@tanstack/react-table";

export type Company = {
  _id: string;
  fromdate: string;
  todate: string;
  fullname: string;
  email: string;
  MobileNo: string;
  Gender: string;
  AadharNumber: number;
  PanNumber: string;
  CompanyName: string;
  CompanyPrefix: string;
  NoofEmployee: number;
  city: string;
  state: string;
  country: string;
  pincode: number;
  address: string;
  authority: string;
  createdDate: string;
  __v: number;
};

export const COLUMNS: ColumnDef<Company>[] = [
  {
    accessorKey: "companyName",
    header: "Company Name",
  },
  {
    accessorKey: "noOfEmployee",
    header: "No. of Employees",
  },
  {
    accessorKey: "ownerName",
    header: "Admin Name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "mobileNo",
    header: "Mobile No.",
  },
  {
    accessorKey: "gender",
    header: "Gender",
  },
  {
    accessorKey: "aadharNumber",
    header: "Aadhaar No.",
  },
  {
    accessorKey: "panNumber",
    header: "Pan No.",
  },
  {
    accessorKey: "companyPrefix",
    header: "Company Prefix",
  },
  {
    accessorKey: "fromDate",
    header: "From Date",
    cell: (info: CellContext<Company, unknown>) => (
      <span>{convertDate(info.getValue() as string)}</span>
    ),
  },
  {
    accessorKey: "toDate",
    header: "To Date",
    cell: (info: CellContext<Company, unknown>) => (
      <span>{convertDate(info.getValue() as string)}</span>
    ),
  },
  {
    accessorKey: "authority",
    header: "Authority",
  },
  {
    accessorKey: "city",
    header: "City",
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
    accessorKey: "pincode",
    header: "Pincode",
  },
  {
    accessorKey: "address",
    header: "Company Address",
  },
  {
    accessorKey: "createdDate",
    header: "Created At",
    cell: (info: CellContext<Company, unknown>) => (
      <span>{convertDate(info.getValue() as string)}</span>
    ),
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }: { row: Row<Company> }) => {
      return (
        <div className=" flex gap-4">
          <SquarePen className=" size-4 text-gray-500 cursor-pointer hover:text-green-600" />
          {/* <Delete row={row} /> */}
        </div>
      );
    },
  },
];

// const Delete = ({ row }: { row: Row<Company> }) => {
// //   const { _id, parentId } = row.original;
// //   const queryClient = useQueryClient();
//   const handleDelete = async () => {
//     // const res = await axios.get(`${BASE_URL}/menu/${_id}`);
//     // if (res.status == 200) {
//       toast.success("Deleted Successfully");
//     //   queryClient.invalidateQueries({ queryKey: ["menu"] });
//     // }
//   };
//   return (
//     <AlertDialog>
//       <AlertDialogTrigger asChild>
//         <Tooltip>
//           <TooltipTrigger asChild>
//             <Button
//               className="bg-transparent p-0 h-fit hover:bg-transparent size-4 cursor-pointer text-gray-500 hover:text-red-600"
//             >
//               <Trash2 />
//             </Button>
//           </TooltipTrigger>
//           <TooltipContent>
//             <p>Delete</p>
//           </TooltipContent>
//         </Tooltip>
//       </AlertDialogTrigger>
//       <AlertDialogContent className=" dark:bg-primary1 bg-background2">
//         <AlertDialogHeader>
//           <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
//           <AlertDialogDescription>
//             This action cannot be undone. This will permanently delete Menu data
//             from our servers.{" "}
//           </AlertDialogDescription>
//         </AlertDialogHeader>
//         <AlertDialogFooter>
//           <AlertDialogCancel className=" bg-background1 dark:bg-primary1 dark:text-white">
//             Cancel
//           </AlertDialogCancel>
//           <AlertDialogAction
//             className="bg-red-600 dark:text-white dark:hover:bg-red-600 "
//             onClick={handleDelete}
//           >
//             Continue
//           </AlertDialogAction>
//         </AlertDialogFooter>
//       </AlertDialogContent>
//     </AlertDialog>
//   );
// };
