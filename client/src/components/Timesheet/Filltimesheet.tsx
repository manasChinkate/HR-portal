//@collapse
import { Button } from "../ui/button";
import { useForm, SubmitHandler } from "react-hook-form";

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { fetchProjects } from "@/components/ProjectMaster/OngoingProjects/services";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { addTimesheet } from "./services";
import { fetchTasks } from "../ProjectMaster/ProjectTask/services";

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
import { getTotalTime } from "../ProjectMaster/OngoingProjects/helper";

export type Inputs = z.infer<typeof TimesheetSchema>;

const TimesheetSchema = z.object({
  projectId: z.string().min(1, "ProjectName is required"),
  taskId: z.string(),
  taskDesc: z.string().min(1, "required"),
  date: z.string().min(1, "Date is required"),
  startTime: z.string().min(1, "Start time is required"),
  endTime: z.string().min(1, "End time is required"),
  totalTime: z.string(),
});

const Filltimesheet = () => {
  const form = useForm<Inputs>({
    resolver: zodResolver(TimesheetSchema),
    defaultValues: {
      projectId: "",
      taskId: "",
      taskDesc: "",
      date: "",
      startTime: "",
      endTime: "",
      totalTime: "",
    },
  });

  const { handleSubmit, watch, reset, setValue } = form;

  const startTime = watch("startTime");
  const endTime = watch("endTime");
  const queryClient = useQueryClient();
  const selectedProject = watch("projectId");

  const { data: projects = [] } = useQuery({
    queryKey: ["project"],
    queryFn: fetchProjects,
    staleTime: Infinity,
  });
  const { data: tasks = [] } = useQuery({
    queryKey: ["task", selectedProject],
    queryFn: () => fetchTasks(selectedProject),
    enabled: !!selectedProject,
    staleTime: Infinity,
  });

  const mutation = useMutation({
    mutationFn: addTimesheet,
    onSuccess: () => {
      toast.success("Created Successfully");
      queryClient.invalidateQueries({ queryKey: ["timesheet"] });
      reset();
    },
  });

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const finalData = {
      ...data,
      taskId: data.taskId == "" ? null : data.taskId,
      totalTime: getTotalTime(data.startTime, data.endTime),
    };

    mutation.mutate(finalData);
  };

  useEffect(() => {
    if (startTime && endTime) {
      setValue("totalTime", getTotalTime(startTime, endTime));
    }
  }, [startTime, endTime]);

  console.log(watch());

  return (
    <div className="w-full h-[90vh] dark:bg-primary1 bg-background2 py-2 pr-2 overflow-y-auto">
      <div className=" bg-background1  rounded-lg w-full p-4 text-sm dark:bg-secondary1">
        <div className="flex items-start justify-between">
          <div>
            <h1 className=" text-2xl font-bold     ">Fill Timesheet</h1>
            <p className=" text-gray-500 text-sm">Add your daily activity</p>
          </div>
          <div className="flex justify-end mt-4">
            <Link to={"/timesheet/view"}>
              <Button
                className="dark:bg-black dark:text-[#ffffff] dark:shadow-[#1f1f1f] dark:shadow-md w-fit"
                type="button"
              >
                Timesheet History
              </Button>
            </Link>
          </div>
        </div>
        <Form {...form}>
          <form
            className=" flex flex-col gap-3 py-3"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {/* Project Name  */}
              <FormField
                control={form.control}
                name="projectId"
                render={({ field }) => (
                  <FormItem className=" space-y-2">
                    <FormLabel>Project</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select Project" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {projects.map(
                          (e: { projectName: string; _id: string }) => {
                            return (
                              <SelectItem value={e._id}>
                                {e.projectName}
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
              {/* Task Name  */}
              <FormField
                control={form.control}
                name="taskId"
                render={({ field }) => (
                  <FormItem className=" space-y-2">
                    <FormLabel>Task Name</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select Task" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {tasks.map((e: { _id: string; taskTitle: string }) => {
                          return (
                            <SelectItem value={e._id}>{e.taskTitle}</SelectItem>
                          );
                        })}
                      </SelectContent>
                    </Select>

                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Date */}
              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormLabel>Date</FormLabel>
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

              {/* Start Time */}
              <FormField
                control={form.control}
                name="startTime"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormLabel>Start Time</FormLabel>
                    <FormControl>
                      <Input
                        type="time"
                        id="time-picker"
                        step="1"
                        {...field}
                        // defaultValue="10:30:00"
                        className="bg-background appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* End Time */}
              <FormField
                control={form.control}
                name="endTime"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormLabel>End Time</FormLabel>
                    <FormControl>
                      <Input
                        type="time"
                        id="time-picker"
                        step="1"
                        {...field}
                        // defaultValue="10:30:00"
                        className="bg-background appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* Total Time */}
              <FormField
                control={form.control}
                name="totalTime"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormLabel>Total Time</FormLabel>
                    <FormControl>
                      <Input {...field} value={field.value} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* Text Area */}
              <FormField
                control={form.control}
                name="taskDesc"
                render={({ field }) => (
                  <FormItem className="space-y-2 col-span-3">
                    <FormLabel>What you performed today? </FormLabel>
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

export default Filltimesheet;
