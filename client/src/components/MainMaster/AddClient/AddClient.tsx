import { Button } from "../../ui/button";
import axios from "axios";
import { useForm, SubmitHandler } from "react-hook-form";
import { BASE_URL } from "../../../constants";
import { useMemo } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { COLUMNS } from "./columns";
import toast from "react-hot-toast";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import TableWrapper from "@/components/ui/TableWrapper";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchClient } from "@/components/MainMaster/services/masterServices";
import { Input } from "@/components/ui/input";

type Inputs = z.infer<typeof ClientSchema>;

const ClientSchema = z.object({
  clientName: z.string().min(1, { message: "Client Name is required" }),
  state: z.string().min(1, { message: "State is required" }),
  country: z.string().min(1, { message: "Country is required" }),
  contactPerson: z.string().min(1, { message: "Contact Person is required" }),
  contactPersonPhone: z
    .string()
    .min(1, { message: "Contact Person Phone is required" })
    .max(10, { message: "Contact Person Phone should be 10 digits" }),
});

const AddClient = () => {
  const form = useForm<Inputs>({
    resolver: zodResolver(ClientSchema),
    defaultValues: {
      clientName: "",
      state: "",
      country: "",
      contactPerson: "",
      contactPersonPhone: "",
    },
  });
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = form;

  const columns: any = useMemo(() => COLUMNS, []);
  const queryClient = useQueryClient();

  const addClient = async (data: Inputs) =>
    await axios.post(`${BASE_URL}/client`, data);

  const mutation = useMutation({
    mutationFn: addClient,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["client"] });
      toast.success("Create Successfully");
      reset();
    },
    onError: () => toast.error("Failed"),
  });

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["client"],
    queryFn: fetchClient,
    staleTime: Infinity,
  });

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    mutation.mutate(data);
  };

  return (
    <div className="w-full max-h-[90vh] bg-background2 flex flex-col gap-2 dark:bg-primary1 py-2 pr-2 overflow-y-auto">
      <div className=" bg-background1 dark:bg-secondary1  rounded-lg w-full p-4 text-sm">
        <div className=" border-b border-gray-200 pb-2">
          <h1 className=" text-2xl font-bold     ">Add Client</h1>
          <p className=" text-gray-500 text-sm">
            Add new clients for your company
          </p>
        </div>
        <Form {...form}>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className=" flex flex-col gap-3 py-3"
          >
            <div className=" grid md:grid-cols-3 sm:grid-cols-2  gap-4 mt-4 mb-5 ">
              <FormField
                control={form.control}
                name="clientName"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormLabel>Client Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Tata" {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="contactPerson"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormLabel>Contact Person</FormLabel>
                    <FormControl>
                      <Input placeholder="Person name" {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="contactPersonPhone"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormLabel>Contact Person Phone</FormLabel>
                    <FormControl>
                      <Input placeholder="98*******" {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="state"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormLabel>State</FormLabel>
                    <FormControl>
                      <Input placeholder="Maharashtra" {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="country"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormLabel>Country</FormLabel>
                    <FormControl>
                      <Input placeholder="India" {...field} />
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
        description="Here's a list of Clients."
        title="Clients"
        refetch={refetch}
      />
    </div>
  );
};

export default AddClient;
