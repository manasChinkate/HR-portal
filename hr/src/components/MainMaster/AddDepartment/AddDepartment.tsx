import { Button } from "../../ui/button";
import axios from "axios";
import { useForm, SubmitHandler } from "react-hook-form";
import { BASE_URL } from "../../../constants";

import {  useMemo } from "react";
// import "../../table.css";
import {  COLUMNS } from "./columns";
import toast from "react-hot-toast";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import TableWrapper from "@/components/ui/TableWrapper";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchDepartment } from "@/components/MainMaster/services/masterServices";

type Inputs = z.infer<typeof departmentSchema>;
const departmentSchema = z.object({
  department: z.string().min(1, { message: "Department is required" }),
});

const AddDepartment = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: zodResolver(departmentSchema),
  });
 

  const columns: any = useMemo(() => COLUMNS, []);
  const addDepartment = async (data:Inputs) => {
    return await axios.post(`${BASE_URL}/department`, data);
  };
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: addDepartment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["department"] });
      toast.success("Created Successfully");
      reset();
    },
    onError: () => {
      toast.error("Failed");
    },
  });

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    console.log("data", data);
    mutation.mutate(data);
  };

 
  const { data, isLoading } = useQuery({
    queryKey: ["department"],
    queryFn: fetchDepartment,
    staleTime: Infinity,
  });

  return (
    <div className="w-full h-full bg-background2 flex flex-col gap-2 dark:bg-primary1 py-2 pr-2 overflow-y-auto">
      <div className=" bg-background1 dark:bg-secondary1  rounded-lg w-full p-4 text-sm">
        <div className=" border-b border-gray-200 dark:border-0 pb-2">
          <h1 className=" text-2xl font-bold dark:text-gray-100     ">
            Add Department
          </h1>
          <p className=" text-gray-500 text-sm">
            Add new departments for your employees
          </p>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className=" grid md:grid-cols-3 sm:grid-cols-2  gap-4 mt-4 mb-5 ">
            {/* <p className=' col-span-full border-b-2 pb-1 font-semibold'>Add Details</p> */}
            <div className=" flex flex-col gap-2">
              <label>Add Department</label>
              <input
                {...register("department")}
                className=" hover:border-gray-400 dark:hover:border-gray-600  dark:border-primary1  dark:border-[0.2px] dark:bg-secondary1    ease-in-out duration-500 py-2 px-3 border rounded-md border-gray-200 placeholder:text-sm  text-sm"
                type="text"
                placeholder="for eg: HR, IT, Finance"
              />
              <p className=" pl-2 text-xs text-red-500 font-semibold">
                {errors.department?.message}
              </p>
            </div>
          </div>
          <Button
            className=" dark:bg-[#000000] dark:text-[#ffffff] dark:shadow-[#1f1f1f] dark:shadow-md  "
            type="submit"
          >
            Add
          </Button>
        </form>
      </div>

      <TableWrapper
        columns={columns}
        data={data || []}
        description="Here's a list of Departments."
        title="Departments"
        loading={isLoading}
      />
      {/* <DataTable columns={columns} data={data || []} /> */}
    </div>
  );
};

export default AddDepartment;
