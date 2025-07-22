import { Button } from "@/components/ui/button";
import { useForm, SubmitHandler } from "react-hook-form";
import { useSelector } from "react-redux";
import { RootState } from "../../../app/store";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchDesignation } from "@/components/MainMaster/services/masterServices";
import { addEmployee, fetchEmployees, getCountries } from "./services";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { Textarea } from "@/components/ui/textarea";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const EmployeeSchema = z.object({
  // Personal Details
  fullname: z.string().min(1, "Employee name is required"),
  email: z.string().email().min(1, "Email is required"),
  mobileNo: z.string().min(1, "Mobile No. is required"),
  gender: z.string().min(1, "gender is required"),
  maritialStatus: z.string().min(1, "Maritial status is required"),
  adhaarNo: z.string().min(1, "Aadhaar No. is required"),
  panNo: z.string().optional(),
  dob: z.string().min(1, "Dob is required"),

  // Employment Details
  joiningDate: z.string().min(1, "Joining Date is required"),
  probationPeriod: z.string().optional(),
  authority: z.string().min(1, "authority is required"),
  designation: z.string().min(1, "designation is required"),
  reportingManager: z.string().optional(),

  //Address
  city: z.string().min(1, "City is required"),
  state: z.string().min(1, "State is required"),
  country: z.string().min(1, "Country is required"),
  pincode: z.string().min(1, "Pincode is required"),
  address: z.string().optional(),
});

export type Inputs = z.infer<typeof EmployeeSchema>;

const EmployeeForm = () => {
  const form = useForm<Inputs>({
    resolver: zodResolver(EmployeeSchema),
  });
  const { handleSubmit, reset } = form;

  const companyName = useSelector((state: RootState) => state.auth.companyName);
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: addEmployee,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["employees"] });
      queryClient.invalidateQueries({ queryKey: ["departments"] });
      toast.success("Created Successfully");
      reset();
    },
  });

  const { data: designations = [] } = useQuery({
    queryKey: ["designation"],
    queryFn: fetchDesignation,
    staleTime: Infinity,
  });
  const { data: reportingManager = [] } = useQuery({
    queryKey: ["employees"],
    queryFn: fetchEmployees,
    staleTime: Infinity,
  });
  const { data: countries = [] } = useQuery({
    queryKey: ["countries"],
    queryFn: getCountries,
    staleTime: Infinity,
  });

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const formData = {
      ...data,
      companyName: companyName,
    };
    mutation.mutate(formData);
  };

  return (
    <div className="w-full h-full  bg-background2 flex flex-col gap-2 dark:bg-primary1 py-2 pr-2 ">
      <div className=" bg-background1 dark:bg-secondary1  rounded-lg w-full p-4 text-sm">
        <div className=" flex justify-between">
          <div className=" ">
            <h1 className=" text-2xl font-bold     ">Add Employee</h1>
            <p className=" text-gray-500 text-sm">
              Add new employees to your company
            </p>
          </div>
          <div className="flex justify-end mt-4">
            <Link
              to={"/employees/view"}
              // className="inline-block bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-200 shadow-md"
            >
              <Button
                className="dark:bg-black dark:text-[#ffffff] dark:shadow-[#1f1f1f] dark:shadow-md w-fit"
                type="button"
              >
                Employees List
              </Button>
            </Link>
          </div>
        </div>
        <Form {...form}>
          <form
            className=" flex flex-col gap-3 py-3"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className=" grid md:grid-cols-3 sm:grid-cols-2  gap-4 mt-6 mb-5 ">
              <p className=" col-span-full border-b-2 pb-1 font-semibold">
                Personal Details
              </p>
              {/* Name */}
              <FormField
                control={form.control}
                name="fullname"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormLabel>Full name</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* Email */}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* Mobile No. */}
              <FormField
                control={form.control}
                name="mobileNo"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormLabel>Mobile No.</FormLabel>
                    <FormControl>
                      <Input placeholder="+91 234********" {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* Gender */}
              <FormField
                control={form.control}
                name="gender"
                render={({ field }) => (
                  <FormItem className=" space-y-2">
                    <FormLabel>Gender</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select Gender" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="male">Male</SelectItem>
                        <SelectItem value="female">Female</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>

                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* Maritial Status */}
              <FormField
                control={form.control}
                name="maritialStatus"
                render={({ field }) => (
                  <FormItem className=" space-y-2">
                    <FormLabel>Maritial Status</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="married">Married</SelectItem>
                        <SelectItem value="unmarried">Unmarried</SelectItem>
                      </SelectContent>
                    </Select>

                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* Adhaar No. */}
              <FormField
                control={form.control}
                name="adhaarNo"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormLabel>Adhaar No.</FormLabel>
                    <FormControl>
                      <Input placeholder="234********" {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* Pan No. */}
              <FormField
                control={form.control}
                name="panNo"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormLabel>Pan No.</FormLabel>
                    <FormControl>
                      <Input placeholder="CMIPC****" {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              {/*Dob*/}
              <FormField
                control={form.control}
                name="dob"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormLabel>Date of Birth</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-full pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              format(new Date(field.value), "PPP")
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          disabled={(date) =>
                            date > new Date() || date < new Date("1900-01-01")
                          }
                          mode="single"
                          selected={
                            field.value ? new Date(field.value) : undefined
                          }
                          onSelect={(date) => {
                            field.onChange(
                              date ? format(date, "yyyy-MM-dd") : ""
                            );
                          }}
                          captionLayout="dropdown"
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className=" grid md:grid-cols-3 sm:grid-cols-2  gap-4 mt-6 mb-5 ">
              <p className=" col-span-full border-b-2 pb-1 font-semibold">
                Employeement Details
              </p>

              {/*Joining Date*/}
              <FormField
                control={form.control}
                name="joiningDate"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormLabel>Joining Date </FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-full pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              format(new Date(field.value), "PPP")
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={
                            field.value ? new Date(field.value) : undefined
                          }
                          onSelect={(date) => {
                            field.onChange(
                              date ? format(date, "yyyy-MM-dd") : ""
                            );
                          }}
                          captionLayout="dropdown"
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* Probation Period  */}
              <FormField
                control={form.control}
                name="probationPeriod"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormLabel>Probation Period </FormLabel>
                    <FormControl>
                      <Input placeholder="In months" {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* Authority */}
              <FormField
                control={form.control}
                name="authority"
                render={({ field }) => (
                  <FormItem className=" space-y-2">
                    <FormLabel>Authority</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select Authority" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Employee">Employee</SelectItem>
                        <SelectItem value="ProjectManager">
                          Project Manager
                        </SelectItem>
                        <SelectItem value="HiringMAnager">
                          Hiring Manager
                        </SelectItem>
                      </SelectContent>
                    </Select>

                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* Designation  */}
              <FormField
                control={form.control}
                name="designation"
                render={({ field }) => (
                  <FormItem className=" space-y-2">
                    <FormLabel>Project</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select Designation" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {designations.map(
                          (e: { designation: string; _id: string }) => {
                            return (
                              <SelectItem value={e.designation}>
                                {e.designation}
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

              {/* Reporting Manager  */}
              <FormField
                control={form.control}
                name="reportingManager"
                render={({ field }) => (
                  <FormItem className=" space-y-2">
                    <FormLabel>Reporting Manager</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select Reporting Manager" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {reportingManager.map(
                          (e: { fullname: string; _id: string }) => {
                            return (
                              <SelectItem value={e.fullname}>
                                {e.fullname}
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
            </div>
            <div className=" grid md:grid-cols-3 sm:grid-cols-2  gap-4 mt-6 mb-5 ">
              <p className=" col-span-full border-b-2 pb-1 font-semibold">
                Address Details
              </p>

              {/* City  */}
              <FormField
                control={form.control}
                name="city"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormLabel>City </FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* State  */}
              <FormField
                control={form.control}
                name="state"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormLabel>State </FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

              {/*Country  */}
              <FormField
                control={form.control}
                name="country"
                render={({ field }) => (
                  <FormItem className=" space-y-2">
                    <FormLabel>Country</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select Country" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {countries.map((e: { name: { common: string } }) => {
                          return (
                            <SelectItem value={e.name.common}>
                              {e.name.common}
                            </SelectItem>
                          );
                        })}
                      </SelectContent>
                    </Select>

                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* Pincode  */}
              <FormField
                control={form.control}
                name="pincode"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormLabel>Pincode </FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* Text Area */}
              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem className="space-y-2 col-span-3">
                    <FormLabel>Address</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder=""
                        className="resize-none"
                        {...field}
                      />
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
    </div>
  );
};

export default EmployeeForm;
