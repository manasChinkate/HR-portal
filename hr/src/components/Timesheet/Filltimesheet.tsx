import { Button } from "../ui/button";
import axios from "axios";
import { useForm, SubmitHandler } from "react-hook-form";
import { BASE_URL } from "../../constants";

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { date, z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { fetchProjects } from "@/components/ProjectMaster/OngoingProjects/services";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { addTimesheet } from "./services";
import { fetchTasks } from "../ProjectMaster/ProjectTask/services";
import { Input } from "../ui/input";

export type Inputs = z.infer<typeof TimesheetSchema>; 

const TimesheetSchema = z.object({
  projectId: z.string().min(1, "ProjectName is required"),
  taskId: z.string().min(1, "Task performed is required"),
  taskDesc: z.string().min(1, "required"),
  date: z.string().min(1, "Date is required"),
  startTime: z.string().min(1, "Start time is required"),
  endTime: z.string().min(1, "End time is required"),
  totalTime: z.string(),
});

const Filltimesheet = () => {
  const {
    register,
    handleSubmit ,
    watch,
    reset,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: zodResolver(TimesheetSchema),
  });

  const [totalTime, setTotalTime] = useState<string>("");

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
  // Calculate total time whenever start or end time changes
  useEffect(() => {
    if (startTime && endTime) {
      const start = new Date(`1970-01-01T${startTime}`);
      const end = new Date(`1970-01-01T${endTime}`);
      const diff = (end.getTime() - start.getTime()) / (1000 * 60 * 60); // Difference in hours

      if (diff > 0) {
        setTotalTime(diff.toFixed(2) + " hours");
      } else {
        setTotalTime("");
      }
    }
  }, [startTime, endTime]);

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const finalData = {
      ...data,
      totalTime,
    };

    mutation.mutate(finalData);
  };

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
           
                className="  dark:text-white"
                type="submit"
              >
                Timesheet History
              </Button>
            </Link>
          </div>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className=" grid md:grid-cols-3 sm:grid-cols-2  gap-4 mt-6 mb-5 ">
            <p className=" col-span-full border-b-2 pb-1 font-semibold">
              Project/Task Details
            </p>
            <div className=" flex flex-col gap-2">
              <label>Select Project</label>

              <select
                {...register("projectId", { required: true })}
                className={`hover:border-gray-400 dark:bg-secondary1 dark:border-primary1 ease-in-out duration-500 py-2 pl-3 border rounded-md border-gray-200 placeholder:text-sm  text-sm  `}
              >
                <option value="">Select</option>
                {projects.map((e: { _id: string; projectName: string }) => {
                  return <option value={e._id}>{e.projectName}</option>;
                })}
              </select>
              <p className=" pl-2 text-xs text-red-500 font-semibold">
                {errors.projectId?.message}
              </p>
            </div>
            <div className=" flex flex-col gap-2">
              <label>Select Task</label>

              <select
                {...register("taskId", { required: true })}
                className={`hover:border-gray-400 dark:bg-secondary1 dark:border-primary1 ease-in-out duration-500 py-2 pl-3 border rounded-md border-gray-200 placeholder:text-sm  text-sm  `}
              >
                <option value="">Select</option>
                {tasks.map((e: { _id: string; taskTitle: string }) => {
                  return <option value={e._id}>{e.taskTitle}</option>;
                })}
              </select>
              <p className=" pl-2 text-xs text-red-500 font-semibold">
                {errors.taskId?.message}
              </p>
            </div>

            <div className=" flex flex-col gap-2">
              <label>Date</label>
              <input
                {...register("date")}
                className=" hover:border-gray-400 dark:hover:border-gray-600  dark:border-primary1  dark:border-[0.2px] dark:bg-secondary1    ease-in-out duration-500 py-2 px-3 border rounded-md border-gray-200 placeholder:text-sm  text-sm"
                type="date"
                placeholder=" name"
              ></input>
              <p className=" pl-2 text-xs text-red-500 font-semibold">
                {errors.date?.message}
              </p>
            </div>
            <div className=" flex flex-col gap-2">
              <label>Start Time</label>
              <Input
                type="time"
                id="time"
                step="1"
                {...register("startTime")}
                defaultValue="10:00:00"
                className="bg-background dark:bg-secondary1 dark:border-primary1 appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none "
              />
              <p className=" pl-2 text-xs text-red-500 font-semibold">
                {errors.startTime?.message}
              </p>
            </div>
            <div className=" flex flex-col gap-2">
              <label>End Time</label>
              <Input
                type="time"
                id="time"
                step="1"
                {...register("endTime")}
                defaultValue="07:00:00"
                className="bg-background dark:bg-secondary1 dark:border-primary1 appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
              />
              <p className=" pl-2 text-xs text-red-500 font-semibold">
                {errors.endTime?.message}
              </p>
            </div>
            <div className=" flex flex-col gap-2">
              <label>Total time (In Hours) </label>
              <input
                {...register("totalTime")}
                value={totalTime}
                readOnly
                className=" hover:border-gray-400 dark:hover:border-gray-600  dark:border-primary1  dark:border-[0.2px] dark:bg-secondary1    ease-in-out duration-500 py-2 px-3 border rounded-md border-gray-200 placeholder:text-sm  text-sm"
                type="text"
                placeholder=" start time"
              ></input>
              <p className=" pl-2 text-xs text-red-500 font-semibold">
                {errors.totalTime?.message}
              </p>
            </div>
            <div className=" flex flex-col gap-2 col-span-3">
              <label>What you performed today? </label>
              <textarea
                {...register("taskDesc")}
                className=" hover:border-gray-400 dark:hover:border-gray-600  dark:border-primary1  dark:border-[0.2px] dark:bg-secondary1    ease-in-out duration-500 py-2 px-3 border rounded-md border-gray-200 placeholder:text-sm  text-sm"
                placeholder=" "
              ></textarea>
              <p className=" pl-2 text-xs text-red-500 font-semibold">
                {errors.taskDesc?.message}
              </p>
            </div>
          </div>
          <Button className="  dark:text-white" type="submit">
            Save
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Filltimesheet;
