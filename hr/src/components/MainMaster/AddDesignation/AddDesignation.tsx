import { Button } from "../../ui/button";
import axios from "axios";
import { useForm, SubmitHandler } from "react-hook-form";
import { BASE_URL } from "../../../constants";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../app/store";
import { useEffect, useMemo } from "react";
import "../../table.css";
import toast from "react-hot-toast";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { fetchDesignations } from "./DesignationSlice";
import TableWrapper from "@/components/ui/TableWrapper";
import { COLUMNS } from "./columns";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchDesignation, getDesignation } from "@/components/MainMaster/services/masterServices";

const designationSchema = z.object({
  designation: z.string().min(1, { message: "Designation is required" }),
});
type Inputs = {
  designation: string;
};

const AddDesignation = () => {
  const dispatch = useDispatch<AppDispatch>();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: zodResolver(designationSchema),
  });
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ["designation"],
    queryFn: fetchDesignation,
    staleTime: Infinity,
  });
  const addDesignation = async (data: any) => {
    return axios.post(`${BASE_URL}/designation`, data);
  };

  const mutation = useMutation({
    mutationFn: addDesignation,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["designation"] });
      toast.success("Created Successfully");
      reset();
    },
  });

  const companyName = useSelector((state: RootState) => state.auth.companyName);

  const columns: any = useMemo(() => COLUMNS, []);

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const formData = {
      ...data,
      companyName,
    };
    mutation.mutate(formData);
  };

  return (
    <div className="w-full max-h-[90vh] bg-background2 flex flex-col gap-2 dark:bg-primary1 py-2 pr-2 overflow-y-auto">
      <div className=" bg-background1 dark:bg-secondary1  rounded-lg w-full p-4 text-sm">
        <div className=" border-b border-gray-200 dark:border-0 pb-2">
          <h1 className=" text-2xl font-bold dark:text-gray-100     ">
            Add Designation
          </h1>
          <p className=" text-gray-500 text-sm">
            Add new designations for your employees
          </p>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className=" grid md:grid-cols-3 sm:grid-cols-2  gap-4 mt-4 mb-5 ">
            {/* <p className=' col-span-full border-b-2 pb-1 font-semibold'>Add Details</p> */}
            <div className=" flex flex-col gap-2">
              <label>Add Designation</label>
              <input
                {...register("designation")}
                className=" hover:border-gray-400 dark:hover:border-gray-600  dark:border-primary1  dark:border-[0.2px] dark:bg-secondary1    ease-in-out duration-500 py-2 px-3 border rounded-md border-gray-200 placeholder:text-sm  text-sm"
                placeholder="designation"
              />
              <p className=" pl-2 text-xs text-red-500 font-semibold">
                {errors.designation?.message}
              </p>
            </div>
          </div>
          <Button
            className=" dark:bg-[#000000] dark:text-[#ffffff]   "
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
        description="Here's a list of Departments."
        title="Designations"
      />
    </div>
  );
};

export default AddDesignation;
