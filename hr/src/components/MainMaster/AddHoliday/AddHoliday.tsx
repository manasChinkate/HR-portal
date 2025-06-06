import { Button } from "../../ui/button";
import axios from "axios";
import { useForm, SubmitHandler } from "react-hook-form";
import { BASE_URL } from "../../../constants";

import {  useMemo } from "react";

import "../../table.css";

import { COLUMNS } from "./columns";

import toast from "react-hot-toast";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import TableWrapper from "@/components/ui/TableWrapper";
import {  useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchHoliday } from "@/components/MainMaster/services/masterServices";

type Inputs = {
  holiday: string;
  fromDate: string;
  toDate: string;
};

const HolidaySchema = z
  .object({
    holiday: z.string().min(1, { message: "Holiday is required" }),
    fromDate: z.string().min(1, { message: "From Date is required" }),
    toDate: z.string().min(1, { message: "To Date is required" }),
  })
  .refine(
    (data) => {
      const from = new Date(data.fromDate);
      const to = new Date(data.toDate);
      return to > from;
    },
    {
      message: "To Date must be after From Date",
      path: ["toDate"], // this tells Zod where the error should appear
    }
  );

const AddDesignation = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: zodResolver(HolidaySchema),
  });
  const queryClient = useQueryClient()

 

  const { data, isLoading } = useQuery({
    queryKey: ["holiday"],
    queryFn: fetchHoliday,
    staleTime: Infinity,
  });
  const columns: any = useMemo(() => COLUMNS, []);

  const addHoliday = async (data: any) => {
    return axios.post(`${BASE_URL}/holiday`, data);
  };

  const mutation = useMutation({
    mutationFn: addHoliday,
    onSuccess:()=>{
      queryClient.invalidateQueries({queryKey:["holiday"]})
      toast.success("Fetched Successfully")
      reset()
    },
    onError:()=>{
      toast.error("Failed fetching data")
    }
  });

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    mutation.mutate(data)
  };


  return (
    <div className="w-full max-h-[90vh] bg-background2 flex flex-col gap-2  dark:bg-primary1 py-2 pr-2 overflow-y-auto">
      <div className=" bg-background1 dark:bg-secondary1  rounded-lg w-full p-4 text-sm">
        <div className=" border-b border-gray-200 pb-2">
          <h1 className=" text-2xl font-bold     ">Add Holiday</h1>
          <p className=" text-gray-500 text-sm">
            Add new Holiday for your employees
          </p>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className=" grid md:grid-cols-3 sm:grid-cols-2  gap-4 mt-4 mb-5 ">
            {/* <p className=' col-span-full border-b-2 pb-1 font-semibold'>Add Details</p> */}
            <div className=" flex flex-col gap-2">
              <label>Add Holiday</label>
              <input
                {...register("holiday")}
                className=" hover:border-gray-400 dark:hover:border-gray-600 dark:border-black dark:border-[0.2px] dark:bg-secondary1    ease-in-out duration-500 py-2 px-3 border rounded-md border-gray-200 placeholder:text-sm  text-sm"
                type="text"
                placeholder="holiday"
              />
              <p className=" pl-2 text-xs text-red-500 font-semibold">
                {errors.holiday?.message}
              </p>
            </div>
            <div className=" flex flex-col gap-2">
              <label>From Date</label>
              <input
                {...register("fromDate")}
                className=" hover:border-gray-400 dark:hover:border-gray-600 dark:border-black dark:border-[0.2px] dark:bg-secondary1    ease-in-out duration-500 py-2 px-3 border rounded-md border-gray-200 placeholder:text-sm  text-sm"
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
                className=" hover:border-gray-400 dark:hover:border-gray-600 dark:border-black dark:border-[0.2px] dark:bg-secondary1    ease-in-out duration-500 py-2 px-3 border rounded-md border-gray-200 placeholder:text-sm  text-sm"
                type="date"
                placeholder="holiday"
              />
              <p className=" pl-2 text-xs text-red-500 font-semibold">
                {errors.toDate?.message}
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
        description="Here's a list of Holidays."
        title="Holidays"
      />
    </div>
  );
};

export default AddDesignation;
