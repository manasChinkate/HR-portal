// column.tsx

import { Column } from "react-table";

import toast from "react-hot-toast";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Ellipsis } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { handleAcceptLeave, handleRejectLeave } from "./services";
import { convertDate } from "@/utils/dateHelper";
import { Row } from "@tanstack/react-table";

export interface LeaveData {
  _id: string;
  name: string;
  email: string;
  leaveType: leaveType;
  count: string;
  department: string;
  fromDate: string;
  toDate: string;
  reason: string;
  employeeId: employeeSchema;
  status: string;
  companyName: string;
  createdAt: string;
  __v: number;
}
interface employeeSchema {
  id: string;
  fullname: string;
}

interface leaveType {
  id: string;
  leaveType: string;
}

export const COLUMNS: Column<LeaveData>[] = [
  {
    Header: "Employee Name",
    accessor: (row: LeaveData) => row.employeeId?.fullname,
  },

  {
    Header: "Leave Type",
    accessor: (row: LeaveData) => row.leaveType?.leaveType,
  },
  {
    Header: "Days",
    accessor: "count",
  },
  {
    Header: "From Date",
    accessor: "fromDate",
    Cell: ({ value }: { value: string }) => {
      return <span>{convertDate(value)}</span>;
    },
  },
  {
    Header: "To Date",
    accessor: "toDate",
    Cell: ({ value }: { value: string }) => {
      return <span>{convertDate(value)}</span>;
    },
  },
  {
    Header: "Reason",
    accessor: "reason",
  },

  {
    Header: "Status",
    accessor: "status",
    Cell: ({ row }: { row: Row<LeaveData> }) => {
      return (
        <>
          {row.original.status === "Accepted" ? (
            <p className="bg-cyan-100 mx-auto cursor-pointer font-semibold text-center py-0 px-1 lg:py-0.5 lg:px-2 rounded-lg dark:bg-secondary1 dark:border-blue-600 dark:border text-blue-600 w-fit text-xs">
              {row.original.status}
            </p>
          ) : row.original.status === "Rejected" ? (
            <p className="bg-cyan-100 mx-auto cursor-pointer font-semibold text-center py-0 px-1 lg:py-0.5 lg:px-2 rounded-lg dark:bg-secondary1 dark:border-red-600 dark:border text-red-600 w-fit text-xs">
              {row.original.status}
            </p>
          ) : row.original.status === "pending" ? (
            <p className="bg-cyan-100 mx-auto cursor-pointer font-semibold text-center py-0 px-1 lg:py-0.5 lg:px-2 rounded-lg dark:bg-secondary1 dark:border-yellow-400 dark:border text-yellow-500 w-fit text-xs">
              Pending
            </p>
          ) : (
            <></>
          )}
        </>
      );
    },
  },
  {
    Header: "Created At",
    accessor: "createdAt",
    Cell: ({ value }: { value: string }) => {
      return <span>{convertDate(value)}</span>;
    },
  },
  {
    Header: "Action", // Column header for actions (e.g., Accept/Reject leave)
    accessor: "action", // Accessor key for this column
    Cell: ({ row }: { row: Row<LeaveData> }) => {
      const queryClient = useQueryClient(); // To interact with TanStack Query client

      // Mutation for accepting a leave request
      const acceptMutation = useMutation({
        mutationFn: handleAcceptLeave, // Function to handle the acceptance logic
        onSuccess: () => {
          toast.success("Leave Accepted"); // Success message on successful leave acceptance
          queryClient.invalidateQueries({ queryKey: ["manageleave"] }); // Invalidate the "manageleave" query to refresh the data
        },
        onError: () => {
          toast.error("Something went wrong"); // Error message if mutation fails
        },
      });

      // Mutation for rejecting a leave request
      const rejectMutation = useMutation({
        mutationFn: handleRejectLeave, // Function to handle the rejection logic
        onSuccess: () => {
          toast.success("Leave Rejected"); // Success message on successful leave rejection
          queryClient.invalidateQueries({ queryKey: ["manageleave"] }); // Invalidate the "manageleave" query to refresh the data
        },
        onError: () => {
          toast.error("Something went wrong"); // Error message if mutation fails
        },
      });

      return (
        <>
          {/* Conditionally render the action buttons if the leave status is "pending" */}
          {row.original.status === "pending" && (
            <div className="flex items-center justify-start">
              {/* Dropdown menu for actions */}
              <DropdownMenu>
                <DropdownMenuTrigger className="p-1 rounded-lg dark:hover:bg-zinc-900">
                  <Ellipsis size={20} /> {/* Ellipsis icon for dropdown */}
                </DropdownMenuTrigger>
                <DropdownMenuContent className="dark:bg-secondary1">
                  {/* Accept button - triggers accept mutation */}
                  <DropdownMenuItem
                    className="pl-4"
                    onClick={() => acceptMutation.mutate(row.original)} // Trigger accept mutation
                  >
                    Accept
                  </DropdownMenuItem>

                  {/* Reject button - triggers reject mutation */}
                  <DropdownMenuItem
                    className="pl-4"
                    onClick={() => rejectMutation.mutate(row.original)} // Trigger reject mutation
                  >
                    Reject
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          )}
        </>
      );
    },
  },

  //   {
  //     Header: "Edit",
  //     Cell: ({ row, setaddCategory }) => {
  //       // const dispatch = useDispatch<any>();
  //       // const { category, id } = row.original;
  //       const [data, setData] = useState(row.original.category);
  //       const [edit, setEdit] = useState(false);
  //       useEffect(() => {
  //         setData(row.original.category);
  //       }, [edit,row]);

  //       const handleUpdate = async (e: any) => {
  //         e.preventDefault();
  //         try {
  //           const body = {
  //             id: row.original.id,
  //             category_name: data,
  //           };
  //           const response = await axios.post(
  //             BASE_URL + "HR/Portal/update/add_category",
  //             body
  //           );
  //           if (response.status === 200) {
  //             const res = await axios.get(
  //               BASE_URL + "HR/Portal/add_category"
  //             );
  //             setaddCategory(res.data);
  //             toast.success("Updated");
  //           } else toast.error("not Updated");
  //         } catch (error) {
  //           toast.error("Something went wrong");
  //         }
  //         setEdit(false);
  //       };

  //       return (
  //         <>
  //           <form onSubmit={handleUpdate} className="flex gap-4">
  //             <input
  //               required
  //               type="text"
  //               disabled={!edit}
  //               value={data}
  //               onChange={(e: any) => setData(e.target.value)}
  //               className="border border-black rounded-sm px-1  disabled:text-gray-500 disabled:border-gray-500 disabled:cursor-not-allowed"
  //             />
  //             {edit ? (
  //               <button
  //                 type="submit"
  //                 className="bg-green-500 w-16 py-1 rounded-md text-white"
  //               >
  //                 Update
  //               </button>
  //             ) : (
  //               <div
  //                 onClick={() => setEdit(true)}
  //                 className="text-center bg-green-500 w-16 py-1 rounded-md cursor-pointer text-white"
  //               >
  //                 Edit
  //               </div>
  //             )}
  //           </form>
  //         </>
  //       );
  //     },
  //   },
];
