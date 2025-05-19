import { Button } from "../../ui/button";
import axios from "axios";
import { useForm, SubmitHandler } from "react-hook-form";
import { BASE_URL } from "../../../constants";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../app/store";
import { useEffect, useMemo } from "react";


import "../../table.css";



import { COLUMNS } from "./columns";

import toast from "react-hot-toast";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { fetchClients } from "./clientSlice";
import TableWrapper from "@/components/ui/TableWrapper";

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
  const dispatch = useDispatch<AppDispatch>();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: zodResolver(ClientSchema),
  });

  const columns: any = useMemo(() => COLUMNS, []);
  const { data, loading, error } = useSelector(
    (state: RootState) => state.client
  );

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    console.log(data);

    try {
      const res = await axios.post(`${BASE_URL}/client`, data);

      if (res.status === 201) {
        reset();
        dispatch(fetchDesignations());
        toast.success("Added Successfully");
      }
    } catch (error) {
      toast.error("Failed adding client");
    }
  };

  useEffect(() => {
    if (data.length == 0) {
      dispatch(fetchClients());
    }
  }, [dispatch]);

  return (
    <div className="w-full max-h-[90vh] bg-background2 flex flex-col gap-2 dark:bg-primary1 py-2 pr-2 overflow-y-auto">
      <div className=" bg-background1 dark:bg-secondary1  rounded-lg w-full p-4 text-sm">
        <div className=" border-b border-gray-200 pb-2">
          <h1 className=" text-2xl font-bold     ">Add Client</h1>
          <p className=" text-gray-500 text-sm">
            Add new clients for your company
          </p>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className=" grid md:grid-cols-3 sm:grid-cols-2  gap-4 mt-4 mb-5 ">
            {/* <p className=' col-span-full border-b-2 pb-1 font-semibold'>Add Details</p> */}
            <div className=" flex flex-col gap-2">
              <label>Client Name *</label>
              <input
                {...register("clientName")}
                className=" hover:border-gray-400 dark:hover:border-gray-600  dark:border-primary1  dark:border-[0.2px] dark:bg-secondary1    ease-in-out duration-500 py-2 px-3 border rounded-md border-gray-200 placeholder:text-sm  text-sm"
                placeholder="Tata Consultancy Services"
              />
              <p className=" pl-2 text-xs text-red-500 font-semibold">
                {errors.clientName?.message}
              </p>
            </div>
            <div className=" flex flex-col gap-2">
              <label>Contact Person *</label>
              <input
                {...register("contactPerson")}
                className=" hover:border-gray-400 dark:hover:border-gray-600  dark:border-primary1  dark:border-[0.2px] dark:bg-secondary1    ease-in-out duration-500 py-2 px-3 border rounded-md border-gray-200 placeholder:text-sm  text-sm"
                placeholder="John Doe"
              />
              <p className=" pl-2 text-xs text-red-500 font-semibold">
                {errors.contactPerson?.message}
              </p>
            </div>
            <div className=" flex flex-col gap-2">
              <label>Contact Person Phone *</label>
              <input
                {...register("contactPersonPhone")}
                className=" hover:border-gray-400 dark:hover:border-gray-600  dark:border-primary1  dark:border-[0.2px] dark:bg-secondary1    ease-in-out duration-500 py-2 px-3 border rounded-md border-gray-200 placeholder:text-sm  text-sm"
                placeholder=""
              />
              <p className=" pl-2 text-xs text-red-500 font-semibold">
                {errors.contactPersonPhone?.message}
              </p>
            </div>
            <div className=" flex flex-col gap-2">
              <label>state *</label>
              <input
                {...register("state")}
                className=" hover:border-gray-400 dark:hover:border-gray-600  dark:border-primary1  dark:border-[0.2px] dark:bg-secondary1    ease-in-out duration-500 py-2 px-3 border rounded-md border-gray-200 placeholder:text-sm  text-sm"
                type="text"
                placeholder="Maharashtra"
              />
              <p className=" pl-2 text-xs text-red-500 font-semibold">
                {errors.state?.message}
              </p>
            </div>
            <div className=" flex flex-col gap-2">
              <label>Country *</label>
              <input
                {...register("country")}
                className=" hover:border-gray-400 dark:hover:border-gray-600  dark:border-primary1  dark:border-[0.2px] dark:bg-secondary1    ease-in-out duration-500 py-2 px-3 border rounded-md border-gray-200 placeholder:text-sm  text-sm"
                type="text"
                placeholder="India"
              />
              <p className=" pl-2 text-xs text-red-500 font-semibold">
                {errors.country?.message}
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
        loading={loading}
        columns={columns}
        description="Here's a list of Clients."
        title="Clients"
      />
    </div>
  );
};

export default AddClient;
