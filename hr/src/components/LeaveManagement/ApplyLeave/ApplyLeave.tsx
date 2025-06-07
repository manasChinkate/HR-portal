import { Button } from "../../ui/button";
import axios from "axios";
import { useForm, SubmitHandler } from "react-hook-form";
import { BASE_URL } from "../../../constants";

import { useMemo, useState } from "react";

import "../../table.css";

import { COLUMNS } from "./columns";

import toast from "react-hot-toast";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import TableWrapper from "@/components/ui/TableWrapper";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { applyLeave, fetchLeaves } from "./services";
import { fetchDepartment } from "@/components/MainMaster/services/masterServices";
import { fetchLeaveType } from "../LeaveType/services";

type Inputs = z.infer<typeof LeaveSchema>;

export const LeaveSchema = z
  .object({
    leaveType: z.string().min(1, "Leave type required"),
    department: z.string().min(1, "department is required"),
    count: z.string().min(1, "Count is required"),
    fromDate: z.string().min(1, { message: "From Date is required" }),
    toDate: z.string().min(1, { message: "To Date is required" }),
    reason: z.string().min(1, "Must be any reason"),
  })
  .refine(
    (data) => {
      const from = new Date(data.fromDate);
      const to = new Date(data.toDate);
      return to > from;
    },
    {
      message: "To Date must be after From Date",
      path: ["toDate"],
    }
  );

const ApplyLeave = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: zodResolver(LeaveSchema),
  });

  const columns: any = useMemo(() => COLUMNS, []);
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: applyLeave,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["leave"] });
   
      toast.success("Created Successfully");
      reset();
    },
  });

  const { data, isLoading } = useQuery({
    queryKey: ["leave"],
    queryFn: fetchLeaves,
    staleTime: Infinity,
  });
  const { data: department = [] } = useQuery({
    queryKey: ["department"],
    queryFn: fetchDepartment,
    staleTime: Infinity,
  });
  const { data: leaveType = [] } = useQuery({
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
          <h1 className=" text-2xl font-bold      ">Apply Leave</h1>
          <p className=" text-gray-500 text-sm">Apply for leaves here</p>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className=" grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1  gap-4 mt-4 mb-5 ">
            <div className=" flex flex-col gap-2 ">
              <label>Leave Type</label>
              <select
                {...register("leaveType")}
                id="clientname"
                className={` hover:border-gray-400 dark:bg-secondary1 dark:border-primary1 ease-in-out duration-500 py-2 pl-3 border rounded-md border-gray-200 placeholder:text-sm  text-sm  `}
              >
                <option value="">Select</option>
                {leaveType.map((e) => {
                  return <option value={e._id}>{e.leaveType}</option>;
                })}
              </select>
              <p className=" pl-2 text-xs text-red-500 font-semibold">
                {errors.leaveType?.message}
              </p>
            </div>
            <div className=" flex flex-col gap-2">
              <label>Department</label>
              <select
                {...register("department", { required: true })}
                className={`hover:border-gray-400 dark:bg-secondary1 dark:border-primary1 ease-in-out duration-500 py-2 pl-3 border rounded-md border-gray-200 placeholder:text-sm  text-sm  `}
              >
                <option className="dark:text-white" value="">
                  Select
                </option>
                {department.map((e) => {
                  return <option value={e._id}>{e.department}</option>;
                })}
              </select>
              <p className=" pl-2 text-xs text-red-500 font-semibold">
                {errors.department?.message}
              </p>
            </div>
            <div className=" flex flex-col gap-2">
              <label>Count</label>
              <input
                {...register("count", { required: true })}
                className=" hover:border-gray-400 dark:hover:border-gray-600 dark:border-primary1 dark:border-[0.2px] dark:bg-secondary1    ease-in-out duration-500 py-2 px-3 border rounded-md border-gray-200 placeholder:text-sm  text-sm"
                type="text"
                placeholder="days"
              />
              <p className=" pl-2 text-xs text-red-500 font-semibold">
                {errors.count?.message}
              </p>
            </div>
            <div className=" flex flex-col gap-2">
              <label>From Date</label>
              <input
                {...register("fromDate")}
                className=" hover:border-gray-400 dark:hover:border-gray-600 dark:border-primary1 dark:border-[0.2px] dark:bg-secondary1    ease-in-out duration-500 py-2 px-3 border rounded-md border-gray-200 placeholder:text-sm  text-sm"
                type="date"
                placeholder="holiday"
              />
              <p className=" pl-2 text-xs text-red-500 font-semibold">
                {errors.fromDate?.message}
              </p>
            </div>
            <div className=" flex flex-col gap-2">
              <label>To Date</label>
              <input
                {...register("toDate")}
                className=" hover:border-gray-400 dark:hover:border-gray-600 dark:border-primary1 dark:border-[0.2px] dark:bg-secondary1    ease-in-out duration-500 py-2 px-3 border rounded-md border-gray-200 placeholder:text-sm  text-sm"
                type="date"
                placeholder="holiday"
              />
              <p className=" pl-2 text-xs text-red-500 font-semibold">
                {errors.toDate?.message}
              </p>
            </div>
            <div className=" flex flex-col gap-2 col-span-2">
              <label>Reason</label>
              <textarea
                {...register("reason")}
                className=" dark:hover:border-gray-600 dark:border-primary1 dark:border-[0.2px] dark:bg-secondary1 hover:border-gray-400 ease-in-out duration-500 py-2 pl-3 border rounded-md border-gray-200 text-sm placeholder:text-sm  "
                placeholder=" address"
              />
              <p className=" pl-2 text-xs text-red-500 font-semibold">
                {errors.reason?.message}
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
        description="Here's a list of Leaves."
        title="Applied Leaves"
      />
    </div>
  );
};

export default ApplyLeave;
