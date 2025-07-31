import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import TableWrapper from "@/components/ui/TableWrapper";
import { applyLeave, fetchLeaves } from "./services";
import { fetchDepartment } from "@/services/masterServices";
import { fetchLeaveType } from "@/features/leave/leaveType/services";
import { useMemo } from "react";
import { Loader2, Plus } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { COLUMNS } from "./columns";

export const LeaveSchema = z
  .object({
    leaveType: z.string().min(1, "Leave type required"),
    department: z.string().min(1, "Department is required"),
    count: z.string().min(1, "Count is required"),
    fromDate: z.string().min(1, "From Date is required"),
    toDate: z.string().min(1, "To Date is required"),
    reason: z.string().min(1, "Must provide a reason"),
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

type Inputs = z.infer<typeof LeaveSchema>;

const ApplyLeave = () => {
  const form = useForm<Inputs>({
    resolver: zodResolver(LeaveSchema),
    defaultValues: {
      leaveType: "",
      department: "",
      count: "",
      fromDate: "",
      toDate: "",
      reason: "",
    },
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = form;

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: applyLeave,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["leave"] });
      toast.success("Created Successfully");
      form.reset();
    },
  });

  const {
    data: leaveData,
    isLoading,
    refetch,
  } = useQuery({
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

  const onSubmit = async (values: Inputs) => {
    await mutation.mutateAsync(values);
  };

  const columns = useMemo(() => COLUMNS, []);

  return (
    <div className="w-full max-h-[90vh] bg-background2 flex flex-col gap-2 dark:bg-primary1 py-2 pr-2 overflow-y-auto">
      <div className="bg-background1 dark:bg-secondary1 rounded-lg w-full p-4 text-sm">
        <div className="border-b border-gray-200 pb-2">
          <h1 className="text-2xl font-bold">Apply Leave</h1>
          <p className="text-gray-500 text-sm">Apply for leaves here</p>
        </div>

        <Form {...form}>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className=" flex flex-col gap-3 py-3"
          >
            <div className=" grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1  gap-4 mt-4 mb-5 ">
              <FormField
                control={form.control}
                name="leaveType"
                render={({ field }) => (
                  <FormItem className=" space-y-2">
                    <FormLabel>Leave Type</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select leave type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {leaveType.map(
                          (e: { leaveType: string; _id: string }) => {
                            return (
                              <SelectItem value={e._id}>
                                {e.leaveType}
                              </SelectItem>
                            );
                          }
                        )}
                      </SelectContent>
                    </Select>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="department"
                render={({ field }) => (
                  <FormItem className=" space-y-2">
                    <FormLabel>Department</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select department" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {department.map(
                          (e: { department: string; _id: string }) => {
                            return (
                              <SelectItem value={e._id}>
                                {e.department}
                              </SelectItem>
                            );
                          }
                        )}
                      </SelectContent>
                    </Select>

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
                      <Input {...field} placeholder="days" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="fromDate"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormLabel>From Date</FormLabel>
                    <FormControl>
                      <Input {...field} type="date" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="toDate"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormLabel>To Date</FormLabel>
                    <FormControl>
                      <Input {...field} type="date" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="reason"
                render={({ field }) => (
                  <FormItem className="md:col-span-2 col-span-full">
                    <FormLabel>Reason</FormLabel>
                    <FormControl>
                      <Textarea {...field} placeholder="Your reason" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button
              type="submit"
              className="flex items-center gap-2 dark:bg-black dark:text-white dark:shadow-[#1f1f1f] dark:shadow-md w-fit"
              disabled={isSubmitting}
            >
              <>
                {isSubmitting ? (
                  <Loader2 className="animate-spin h-4 w-4" />
                ) : (
                  <Plus className="h-4 w-4" />
                )}
                Add
              </>
            </Button>
          </form>
        </Form>
      </div>

      <TableWrapper
        data={leaveData || []}
        loading={isLoading}
        refetch={refetch}
        columns={columns}
        description="Here's a list of Leaves."
        title="Applied Leaves"
      />
    </div>
  );
};

export default ApplyLeave;
