import { Button } from "../../ui/button";
import axios from "axios";
import { useForm, SubmitHandler } from "react-hook-form";
import { BASE_URL } from "../../../constants";

import { useMemo } from "react";
// import "../../table.css";
import { COLUMNS } from "./columns";
import toast from "react-hot-toast";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import TableWrapper from "@/components/ui/TableWrapper";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchDepartment } from "@/components/MainMaster/services/masterServices";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

type Inputs = z.infer<typeof departmentSchema>;
const departmentSchema = z.object({
  department: z.string().min(1, { message: "Department is required" }),
});

const AddDepartment = () => {
  const form = useForm<Inputs>({
    resolver: zodResolver(departmentSchema),
    defaultValues: {
      department: "",
    },
  });
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = form;

  const columns: any = useMemo(() => COLUMNS, []);
  const addDepartment = async (data: Inputs) => {
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

  const { data, isLoading, refetch } = useQuery({
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
        <Form {...form}>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className=" flex flex-col gap-3 py-3"
          >
            {" "}
            <div className=" grid md:grid-cols-3 sm:grid-cols-2  gap-4 mt-4 mb-5 ">
             <FormField
                control={form.control}
                name="department"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormLabel>Department</FormLabel>
                    <FormControl>
                      <Input placeholder="Accounts.." {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button
              className="dark:bg-black dark:text-[#ffffff] dark:shadow-[#1f1f1f] dark:shadow-md w-fit"
              type="submit"
            >
              Add
            </Button>
          </form>
        </Form>
      </div>

      <TableWrapper
        columns={columns}
        data={data || []}
        description="Here's a list of Departments."
        title="Departments"
        loading={isLoading}
        refetch={refetch}
      />
      {/* <DataTable columns={columns} data={data || []} /> */}
    </div>
  );
};

export default AddDepartment;
