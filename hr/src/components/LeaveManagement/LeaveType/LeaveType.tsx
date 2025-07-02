import { Button } from "../../ui/button";
import { useForm, SubmitHandler } from "react-hook-form";
import { useMemo } from "react";

import { COLUMNS } from "./columns";

import toast from "react-hot-toast";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import TableWrapper from "@/components/ui/TableWrapper";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { addLeaveType, fetchLeaveType } from "./services";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

export type Inputs = z.infer<typeof leaveTypeZodSchema>;
const leaveTypeZodSchema = z.object({
  leaveType: z.string().min(1, "Leave Type is required"),
  count: z.string().min(1, "Count is required"),
});

const LeaveType = () => {
  const form = useForm({
    resolver: zodResolver(leaveTypeZodSchema),
  });
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = form;

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

  const { data, isLoading, refetch } = useQuery({
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
        <Form {...form}>
          <form
            className=" flex flex-col gap-3 py-3"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="grid grid-cols-3 gap-3">
              <FormField
                control={form.control}
                name="leaveType"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormLabel>Leave Type</FormLabel>
                    <FormControl>
                      <Input placeholder="Leave type" {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="count"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormLabel>Count</FormLabel>
                    <FormControl>
                      <Input placeholder="Leave count" {...field} />
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
