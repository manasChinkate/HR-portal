import { Button } from "@/components/ui/button";
import axios from "axios";
import { useForm, SubmitHandler } from "react-hook-form";
import { BASE_URL } from "../../constants";
import { Link } from "react-router-dom";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

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
import { useQuery } from "@tanstack/react-query";
import { getCountries } from "@/features/employee/services";

export const CompanySchema = z.object({
  fromDate: z.string().min(1, "From date is required"),
  toDate: z.string().min(1, "To date is required"),
  ownerName: z.string().min(1, "Full name is required"),
  email: z.string().email("Invalid email address"),
  mobileNo: z
    .string()
    .min(10, "Mobile number must be at least 10 digits")
    .max(15, "Mobile number can't be more than 15 digits"),
  gender: z.enum(["male", "female", "other"]),
  aadharNumber: z.string().min(12, "Aadhar number must be 12 digits"),
  panNumber: z.string().regex(/^[A-Z]{5}[0-9]{4}[A-Z]$/, "Invalid PAN format"),
  companyName: z.string().min(1, "Company name is required"),
  companyPrefix: z.string(),
  noOfEmployee: z.string().min(1, "Total number of Employees required"),
  city: z.string().min(1, "City is required"),
  state: z.string().min(1, "State is required"),
  country: z.string().min(1, "Country is required"),
  pincode: z.string().min(6, "Pincode must be 6 digits"),
  address: z.string().min(1, "Address is required"),
  authority: z.string().optional(),
});

type Inputs = z.infer<typeof CompanySchema>;

const CompanyForm = () => {
  const form = useForm<Inputs>({
    resolver: zodResolver(CompanySchema),
    defaultValues: {
      fromDate: "",
      toDate: "",
      ownerName: "",
      email: "",
      mobileNo: "",
      gender: "male",
      aadharNumber: "",
      panNumber: "",
      companyName: "",
      companyPrefix: "",
      noOfEmployee: "",
      city: "",
      state: "",
      country: "",
      pincode: "",
      address: "",
    
    },
  });
  const {
    handleSubmit,
    reset,
    formState: { errors },
  } = form;

  console.log(errors);

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      console.log(data);
      const res = await axios.post(`${BASE_URL}/company`, data);

      if (res.status === 201) {
        reset();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const { data: countries = [] } = useQuery({
    queryKey: ["countries"],
    queryFn: getCountries,
    staleTime: Infinity,
  });

  return (
    <div className="w-full  bg-background2 flex flex-col gap-2 dark:bg-primary1 py-2 pr-2 overflow-y-auto">
      <div className=" bg-background1 dark:bg-secondary1  rounded-lg w-full p-4 text-sm">
        <div className=" flex justify-between">
          <div className=" ">
            <h1 className=" text-2xl font-bold     ">Add Company</h1>
            <p className=" text-gray-500 text-sm">Add new company</p>
          </div>
          <div className="flex justify-end mt-4">
            <Link
              to={"/company/view"}
              // className="inline-block bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-200 shadow-md"
            >
              <Button
                variant="outline"
                className="dark:bg-black dark:hover:bg-gray-600/50 transition-colors dark:text-[#ffffff] dark:shadow-[#1f1f1f] w-fit"
                type="button"
              >
                Company Table
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
                Duration of Company
              </p>
              {/*Form Date */}
              <FormField
                control={form.control}
                name="fromDate"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormLabel>From Date</FormLabel>
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
              {/*To Date */}
              <FormField
                control={form.control}
                name="toDate"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormLabel>To Date</FormLabel>
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
            </div>
            <div className=" grid md:grid-cols-3 sm:grid-cols-2  gap-4 mt-6 ">
              <p className=" col-span-full border-b-2 pb-3 font-semibold">
                Owner Details
              </p>
              {/* Owner Name */}
              <FormField
                control={form.control}
                name="ownerName"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input {...field} value={field.value} />
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
                      <Input {...field} value={field.value} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* Mobile No */}
              <FormField
                control={form.control}
                name="mobileNo"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormLabel>Mobile No.</FormLabel>
                    <FormControl>
                      <Input {...field} value={field.value} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* gender */}
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
                          <SelectValue placeholder="Select gender" />
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

              {/* Adhaar No. */}
              <FormField
                control={form.control}
                name="aadharNumber"
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
                name="panNumber"
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
            </div>
            <div className=" grid md:grid-cols-3 sm:grid-cols-2  gap-4 mt-6 ">
              <p className=" col-span-full border-b-2 pb-1 font-semibold">
                Company Details
              </p>
              {/* Company Name. */}
              <FormField
                control={form.control}
                name="companyName"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormLabel>Company Name</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* Company Prefix. */}
              <FormField
                control={form.control}
                name="companyPrefix"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormLabel>Company Prefix</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              {/*Employee Count */}
              <FormField
                control={form.control}
                name="noOfEmployee"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormLabel>Employee Count</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>

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
              variant="outline"
              className="dark:bg-black dark:hover:bg-gray-600/50 transition-colors dark:text-[#ffffff] dark:shadow-[#1f1f1f] w-fit"
              type="submit"
            >
              Create Company
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default CompanyForm;
