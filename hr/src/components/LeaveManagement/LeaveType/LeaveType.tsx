import { Button } from "../../ui/button";
import axios from "axios";
import { useForm, SubmitHandler } from "react-hook-form";
import { BASE_URL } from "../../../constants";
import { useMemo } from "react";

import { COLUMNS } from "./columns";

import toast from "react-hot-toast";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import TableWrapper from "@/components/ui/TableWrapper";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { addLeaveType, fetchLeaveType } from "./services";

export type Inputs = z.infer<typeof leaveTypeZodSchema>;
const leaveTypeZodSchema = z.object({
  leaveType: z.string().min(1, "Leave Type is required"),
  count: z.string().min(1, "Count is required"),
});

const LeaveType = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: zodResolver(leaveTypeZodSchema),
  });

  const columns: any = useMemo(() => COLUMNS, []);
  const queryClient = useQueryClient();



  const mutation = useMutation({
    mutationFn: addLeaveType,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["leavetype"] });
      toast.success("Create Successfully");
      reset();
    },
    onError: () => toast.error("Failed"),
  });

  const { data, isLoading,refetch } = useQuery({
    queryKey: ["leavetype"],
    queryFn: fetchLeaveType,
    staleTime: Infinity,
  });

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    mutation.mutate(data);
  };

  return (
    <div className="w-full max-h-[90vh] bg-background2 flex flex-col gap-2 dark:bg-primary1 py-2 pr-2 overflow-y-auto">
      <div className=" bg-background1 dark:bg-secondary1  rounded-lg w-full p-4 text-sm">
        <div className=" border-b border-gray-200 pb-2">
          <h1 className=" text-2xl font-bold     ">Leave Type</h1>
          <p className=" text-gray-500 text-sm">
            Add leave types for your employees
          </p>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className=" grid md:grid-cols-3 sm:grid-cols-2  gap-4 mt-4 mb-5 ">
            {/* <p className=' col-span-full border-b-2 pb-1 font-semibold'>Add Details</p> */}
            <div className=" flex flex-col gap-2">
              <label>Leave Type</label>
              <input
                {...register("leaveType")}
                className=" hover:border-gray-400 dark:hover:border-gray-600 dark:border-black dark:border-[0.2px] dark:bg-secondary1    ease-in-out duration-500 py-2 px-3 border rounded-md border-gray-200 placeholder:text-sm  text-sm"
                type="text"
                placeholder="name"
              />
              <p className=" pl-2 text-xs text-red-500 font-semibold">
                {errors.leaveType?.message}
              </p>
            </div>
            <div className=" flex flex-col gap-2">
              <label>Count</label>
              <input
                {...register("count")}
                className=" hover:border-gray-400 dark:hover:border-gray-600 dark:border-black dark:border-[0.2px] dark:bg-secondary1    ease-in-out duration-500 py-2 px-3 border rounded-md border-gray-200 placeholder:text-sm  text-sm"
                type="text"
                placeholder="days"
              />
              <p className=" pl-2 text-xs text-red-500 font-semibold">
                {errors.count?.message}
              </p>
            </div>
          </div>
          <Button
            className=" dark:bg-[#3b5ae4] dark:text-[#ffffff] dark:shadow-[#1f1f1f] dark:shadow-md  "
            type="submit"
          >
            Add
          </Button>
        </form>
      </div>
      <TableWrapper
        data={data || []}
        loading={isLoading}
        columns={columns}
        description="Here's a list of Leave Types."
        title="Leave Types"
        refetch={refetch}
      />
    </div>
  );
};

export default LeaveType;
