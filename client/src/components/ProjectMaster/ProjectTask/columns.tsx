import { ColumnDef, Row } from "@tanstack/react-table";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "app/store";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Ellipsis } from "lucide-react";
import { handleChangeStatus } from "./services";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import toast from "react-hot-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TaskInputs } from "./TaskForm";

export const COLUMNS: ColumnDef<TaskInputs>[] = [
  {
    header: "Task Name",
    accessorKey: "taskTitle",
  },
  {
    header: "Due Date",
    accessorKey: "dueDate",
  },
  {
    header: "Status",
    cell: ({ row }) => <StatusSelector row={row} />,
  },
  {
    header: "Actions",
    cell: ({ row }) => {
      const navigate = useNavigate();
      const authority = useSelector((state: RootState) => state.auth.authority);

      return (
        <div className="flex items-center justify-start">
          <DropdownMenu>
            <DropdownMenuTrigger className="p-1 rounded-lg dark:hover:bg-zinc-900">
              <Ellipsis size={20} />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="dark:bg-secondary1">
              <DropdownMenuItem
                onClick={() =>
                  navigate("/add-task", {
                    state: { mode: "view", data: row.original },
                  })
                }
                className="hover:bg-zinc-900"
              >
                View
              </DropdownMenuItem>
              {authority !== "Employee" && (
                <DropdownMenuItem
                  onClick={() =>
                    navigate("/add-task", {
                      state: { mode: "edit", data: row.original },
                    })
                  }
                  className="hover:bg-zinc-900"
                >
                  Edit
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      );
    },
  },
];

const StatusSelector = ({ row }: { row: Row<TaskInputs> }) => {
  const { status, projectId, _id } = row.original;
  const [newStatus, setStatus] = useState(status);
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: handleChangeStatus,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["task"] });
      toast.success("Status changed");
    },
  });

  const handleChange = (value: string) => {
    setStatus(value);
    mutation.mutate({ projectId, _id: _id!, status: value });
  };

  return (
    <>
      <Select value={newStatus} onValueChange={handleChange}>
        <SelectTrigger className="w-[160px] dark:bg-primary1 text-sm">
          <SelectValue placeholder="Select status" />
        </SelectTrigger>
        <SelectContent className="dark:bg-secondary1">
          <SelectItem value="Not Started">Not Started</SelectItem>
          <SelectItem value="In Progress">In Progress</SelectItem>
          <SelectItem value="Completed">Completed</SelectItem>
        </SelectContent>
      </Select>
    </>
  );
};
