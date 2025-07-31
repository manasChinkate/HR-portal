import { ColumnDef } from "@tanstack/react-table";
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

export interface LeaveType {
  _id: string;
  leaveType: string;
}

export interface Employee {
  _id: string;
  fullName: string;
}

export interface Leave {
  _id: string;
  leaveType: LeaveType;
  count: string; // Consider changing to number if it will always be numeric
  department: string;
  fromDate: string; // ISO date string
  toDate: string; // ISO date string
  reason: string;
  status: "pending" | "accepted" | "rejected"; // assuming only these values
  companyId: string;
  employeeId: Employee;
  createdAt: string; // ISO timestamp
  __v: number;
}

export const COLUMNS: ColumnDef<Leave>[] = [
  {
    header: "Employee Name",
    accessorFn: (row) => row.employeeId?.fullName,
    id: "employeeName",
  },
  {
    header: "Leave Type",
    accessorFn: (row) => row.leaveType?.leaveType,
    id: "leaveType",
  },
  {
    header: "Days",
    accessorKey: "count",
  },
  {
    header: "From Date",
    accessorKey: "fromDate",
    cell: ({ getValue }) => <span>{convertDate(getValue() as string)}</span>,
  },
  {
    header: "To Date",
    accessorKey: "toDate",
    cell: ({ getValue }) => <span>{convertDate(getValue() as string)}</span>,
  },
  {
    header: "Reason",
    accessorKey: "reason",
  },
  {
    header: "Status",
    accessorKey: "status",
    cell: ({ row }) => {
      const status = row.original.status;
      const baseClass =
        "mx-auto cursor-pointer font-semibold text-center py-0 px-1 lg:py-0.5 lg:px-2 rounded-lg w-fit text-xs";

      if (status === "accepted") {
        return (
          <p
            className={`${baseClass} bg-cyan-100 dark:bg-secondary1 dark:border-blue-600 dark:border text-blue-600`}
          >
            Accepted
          </p>
        );
      } else if (status === "rejected") {
        return (
          <p
            className={`${baseClass} bg-cyan-100 dark:bg-secondary1 dark:border-red-600 dark:border text-red-600`}
          >
            Rejected
          </p>
        );
      } else if (status === "pending") {
        return (
          <p
            className={`${baseClass} bg-cyan-100 dark:bg-secondary1 dark:border-yellow-400 dark:border text-yellow-500`}
          >
            Pending
          </p>
        );
      }

      return null;
    },
  },
  {
    header: "Created At",
    accessorKey: "createdAt",
    cell: ({ getValue }) => <span>{convertDate(getValue() as string)}</span>,
  },
  {
    header: "Action",
    id: "action",
    cell: ({ row }) => {
      const queryClient = useQueryClient();

      const acceptMutation = useMutation({
        mutationFn: handleAcceptLeave,
        onSuccess: () => {
          toast.success("Leave Accepted");
          queryClient.invalidateQueries({ queryKey: ["manageleave"] });
        },
        onError: () => {
          toast.error("Something went wrong");
        },
      });

      const rejectMutation = useMutation({
        mutationFn: handleRejectLeave,
        onSuccess: () => {
          toast.success("Leave Rejected");
          queryClient.invalidateQueries({ queryKey: ["manageleave"] });
        },
        onError: () => {
          toast.error("Something went wrong");
        },
      });

      const leave = row.original;

      return (
        leave.status === "pending" && (
          <DropdownMenu>
            <DropdownMenuTrigger className="p-1 rounded-lg dark:hover:bg-zinc-900">
              <Ellipsis size={20} />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="dark:bg-secondary1">
              <DropdownMenuItem onClick={() => acceptMutation.mutate(leave)}>
                Accept
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => rejectMutation.mutate(leave)}>
                Reject
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )
      );
    },
  },
];
