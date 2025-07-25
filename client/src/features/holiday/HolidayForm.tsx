import { Button } from "@/components/ui/button";
import axios from "axios";
import { useForm, SubmitHandler } from "react-hook-form";
import { BASE_URL } from "@/constants";
import { useEffect, useMemo } from "react";
import { COLUMNS } from "./columns";
import toast from "react-hot-toast";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import TableWrapper from "@/components/ui/TableWrapper";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchHoliday } from "@/services/masterServices";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon, Loader2, Plus } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";

type Inputs = {
  holiday: string;
  fromDate: string;
  toDate: string;
  holidayType: "single" | "multiple";
};

const HolidaySchema = z
  .object({
    holiday: z.string().min(1, { message: "Holiday is required" }),
    fromDate: z.string().min(1, { message: "From Date is required" }),
    toDate: z.string().optional(),
    holidayType: z.enum(["single", "multiple"]),
  })
  .refine(
    (data) => {
      if (data.holidayType === "multiple") {
        return !!data.toDate;
      }
      return true;
    },
    {
      message: "To Date is required for multiple-day holidays",
      path: ["toDate"],
    }
  )
  .refine(
    (data) => {
      if (data.holidayType === "multiple") {
        const from = new Date(data.fromDate);
        const to = new Date(data.toDate || "");
        return to >= from;
      }
      return true;
    },
    {
      message: "To Date must be the same or after From Date",
      path: ["toDate"],
    }
  );

const HolidayForm = () => {
  const form = useForm<Inputs>({
    resolver: zodResolver(HolidaySchema),
    defaultValues: {
      holiday: "",
      fromDate: "",
      toDate: "",
      holidayType: "single",
    },
  });

  const { setValue } = form;

  const {
    handleSubmit,
    reset,
    watch,
    formState: { isSubmitting },
  } = form;

  const holidayType = watch("holidayType");
  const queryClient = useQueryClient();

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["holiday"],
    queryFn: fetchHoliday,
    staleTime: Infinity,
  });

  const columns: any = useMemo(() => COLUMNS, []);

  const addHoliday = async (data: any) => {
    return axios.post(`${BASE_URL}/holiday`, data);
  };

  const mutation = useMutation({
    mutationFn: addHoliday,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["holiday"] });
      toast.success("Holiday added successfully");
      reset({ holidayType: "single" });
    },
    onError: () => {
      toast.error("Failed to add holiday");
    },
  });
  console.log(watch());

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    mutation.mutate(data);
  };

  useEffect(() => {
    setValue("toDate", "");
  }, [watch("holidayType")]);

  return (
    <div className="w-full max-h-[90vh] bg-background2 flex flex-col gap-2 dark:bg-primary1 py-2 pr-2 overflow-auto">
      <div className="bg-background1 divide-y divide-gray-200 dark:divide-gray-600 dark:bg-secondary1 rounded-lg w-full p-4 text-sm">
        <div className=" pb-2">
          <h1 className="text-2xl font-bold">Add Holiday</h1>
          <p className="text-gray-500 text-sm">
            Add new Holiday for your employees
          </p>
        </div>

        <Form {...form}>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className=" flex flex-col gap-3 py-3"
          >
            {/* Holiday Type Selector */}
            <FormField
              control={form.control}
              name="holidayType"
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormLabel>Holiday Type </FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className=" flex py-4 gap-4"
                    >
                      <FormItem className="flex items-center gap-2">
                        <FormControl>
                          <RadioGroupItem value="single" />
                        </FormControl>
                        <FormLabel className="font-normal">
                          Single day
                        </FormLabel>
                      </FormItem>
                      <FormItem className=" flex items-center gap-2">
                        <FormControl>
                          <RadioGroupItem value="multiple" />
                        </FormControl>
                        <FormLabel className="font-normal">
                          Multiple Days
                        </FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-3">
              <FormField
                control={form.control}
                name="holiday"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormLabel>Holiday</FormLabel>
                    <FormControl>
                      <Input placeholder="Holiday name" {...field} />
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

              {holidayType === "multiple" && (
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
                            disabled={(date) =>
                              date > new Date() || date < new Date("1900-01-01")
                            }
                            captionLayout="dropdown"
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
            </div>
            {/* </div> */}

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
        data={data || []}
        loading={isLoading}
        columns={columns}
        description="Here's a list of Holidays."
        title="Holidays"
        refetch={refetch}
      />
    </div>
  );
};

export default HolidayForm;
