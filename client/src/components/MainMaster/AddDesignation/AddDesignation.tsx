import { Button } from "../../ui/button";
import axios from "axios";
import { useForm, SubmitHandler } from "react-hook-form";
import { BASE_URL } from "../../../constants";
import { useSelector } from "react-redux";
import { RootState } from "../../../../app/store";
import { useMemo } from "react";
import toast from "react-hot-toast";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import TableWrapper from "@/components/ui/TableWrapper";
import { COLUMNS } from "./columns";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { fetchDesignation } from "@/components/MainMaster/services/masterServices";
import { Input } from "@/components/ui/input";

const DesignationSchema = z.object({
  designation: z.string().min(1, { message: "Designation is required" }),
});
type Inputs = {
  designation: string;
};

const AddDesignation = () => {
// Initialize form instance using React Hook Form and Zod schema validation
const form = useForm<Inputs>({
  resolver: zodResolver(DesignationSchema), // Validates form with Zod schema
  defaultValues: {
    designation: "", // Default field value
  },
});

// Destructure utilities from form
const {
  reset, // Resets the form to default values
  handleSubmit, // Handles form submission
  formState: { errors }, // Access validation errors
} = form;

// Get QueryClient instance to manually trigger query refetches or invalidation
const queryClient = useQueryClient();

// Fetch existing designations from the server
const { data, isLoading, refetch } = useQuery({
  queryKey: ["designation"], // Unique key for caching
  queryFn: fetchDesignation, // Function to call for data
  staleTime: Infinity, // Prevents auto-refetch unless manually triggered
});

// POST request to add a new designation
const addDesignation = async (data: any) => {
  return axios.post(`${BASE_URL}/designation`, data);
};

// Mutation for adding designation, and updating cache on success
const mutation = useMutation({
  mutationFn: addDesignation,
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ["designation"] }); // Refetch updated list
    toast.success("Created Successfully"); // Show success toast
    reset(); // Clear form fields
  },
});

// Get the company name from Redux store
const companyName = useSelector((state: RootState) => state.auth.companyName);

// Memoize column definitions to avoid unnecessary re-renders
const columns: any = useMemo(() => COLUMNS, []);

// Handle form submission
const onSubmit: SubmitHandler<Inputs> = async (data) => {
  const formData = {
    ...data,
    companyName, // Attach companyName from Redux
  };
  mutation.mutate(formData); // Trigger the mutation
};

console.log(errors); // Log form validation errors for debugging


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
        <Form {...form}>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className=" flex flex-col gap-3 py-3"
          >
            <div className="grid grid-cols-3 gap-3">
              <FormField
                control={form.control}
                name="designation"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormLabel>Designation</FormLabel>
                    <FormControl>
                      <Input placeholder="Designation" {...field} />
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
        description="Here's a list of Departments."
        title="Designations"
        refetch={refetch}
      />
    </div>
  );
};

export default AddDesignation;
