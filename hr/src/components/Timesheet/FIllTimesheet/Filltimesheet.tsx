import { Button } from "../../ui/button";
import axios from "axios";
import { useForm, SubmitHandler } from "react-hook-form";
import { BASE_URL } from "../../../constants";
import { useSelector } from "react-redux";
import { RootState } from "../../../app/store";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import toast from "react-hot-toast";
import { date, z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

type Inputs = z.infer<typeof TimesheetSchema>;

const TimesheetSchema = z.object({
  projectName: z.string().min(1, "ProjectName is required"),
  task: z.string().min(1, "Task performed is required"),
  date: z.string().min(1, "Date is required"),
  startTime: z.string().min(1, "Start time is required"),
  endTime: z.string().min(1, "End time is required"),
  totalTime: z.string(),
  remarks: z.string(),
});

const Filltimesheet = () => {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: zodResolver(TimesheetSchema),
  });

  const [totalTime, setTotalTime] = useState<string>("");
  const [loading, setloading] = useState(false);
  const [projects, setProjects] = useState<Inputs[]>([]);

  const startTime = watch("startTime");
  const endTime = watch("endTime");

  const getProjects = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/projects`);
      setProjects(res.data); // Keep original dates for calculations
      setloading(false);
    } catch (error) {
      console.error("Error fetching Projects:", error);
    }
  };

  useEffect(() => {
    getProjects();
  }, []);

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
    // console.log(data)
    const convertTo12HourFormat = (time: string) => {
      const date = new Date(`1970-01-01T${time}`);
      return format(date, "hh:mm a"); // Format as 12-hour with AM/PM
    };

    const formattedStartTime = convertTo12HourFormat(data.startTime);
    const formattedEndTime = convertTo12HourFormat(data.endTime);

    const formdata = {
      ...data,
      startTime: formattedStartTime,
      endTime: formattedEndTime,
      totaltime: totalTime,
    };

    console.log(formdata);
    const res = await axios.post(`${BASE_URL}/timesheet`, formdata);

    if (res.status === 201) {
      reset();
      toast.success("Added Successfully");
    } else {
      toast.error("Failed adding Timesheet");
    }
  };

  return (
    <div className="w-full h-[90vh] dark:bg-primary1 bg-background2 p-2 overflow-y-auto">
      <div className=" bg-background1  rounded-lg w-full p-4 text-sm dark:bg-secondary1">
        <div className="flex items-start justify-between">
          <div>
            <h1 className=" text-2xl font-bold     ">Fill Timesheet</h1>
            <p className=" text-gray-500 text-sm">Add your daily activity</p>
          </div>
          <div className="flex justify-end mt-4">
            <Link to={"/timesheet/view"}>
              <Button
                className=" dark:bg-blue-600 dark:text-white"
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
                {...register("projectName", { required: true })}
                id="clientname"
                className={`hover:border-gray-400 dark:bg-secondary1 dark:border-primary1 ease-in-out duration-500 py-2 pl-3 border rounded-md border-gray-200 placeholder:text-sm  text-sm  `}
              >
                <option value="">Select</option>
                {projects.map((e) => {
                  return <option value={e.projectName}>{e.projectName}</option>;
                })}
              </select>
              <p className=" pl-2 text-xs text-red-500 font-semibold">
                {errors.projectName?.message}
              </p>
            </div>
            <div className=" flex flex-col gap-2">
              <label>Task performed</label>
              <textarea
                {...register("task")}
                className=" hover:border-gray-400 dark:hover:border-gray-600  dark:border-primary1  dark:border-[0.2px] dark:bg-secondary1    ease-in-out duration-500 py-2 px-3 border rounded-md border-gray-200 placeholder:text-sm  text-sm"
                placeholder=" Task performed by you today"
              ></textarea>
              <p className=" pl-2 text-xs text-red-500 font-semibold">
                {errors.task?.message}
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
              <input
                {...register("startTime")}
                className=" hover:border-gray-400 dark:hover:border-gray-600  dark:border-primary1  dark:border-[0.2px] dark:bg-secondary1    ease-in-out duration-500 py-2 px-3 border rounded-md border-gray-200 placeholder:text-sm  text-sm"
                type="time"
                placeholder=" start time"
              ></input>
              <p className=" pl-2 text-xs text-red-500 font-semibold">
                {errors.startTime?.message}
              </p>
            </div>
            <div className=" flex flex-col gap-2">
              <label>End Time</label>
              <input
                {...register("endTime")}
                className=" hover:border-gray-400 dark:hover:border-gray-600  dark:border-primary1  dark:border-[0.2px] dark:bg-secondary1    ease-in-out duration-500 py-2 px-3 border rounded-md border-gray-200 placeholder:text-sm  text-sm"
                type="time"
                placeholder=" end time"
              ></input>
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
              <label>Additional Remarks</label>
              <textarea
                {...register("remarks")}
                className=" hover:border-gray-400 dark:hover:border-gray-600  dark:border-primary1  dark:border-[0.2px] dark:bg-secondary1    ease-in-out duration-500 py-2 px-3 border rounded-md border-gray-200 placeholder:text-sm  text-sm"
                placeholder=" any remarks"
              ></textarea>
              <p className=" pl-2 text-xs text-red-500 font-semibold">
                {errors.remarks?.message}
              </p>
            </div>
          </div>
          <Button className=" dark:bg-blue-600 dark:text-white" type="submit">
            Save
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Filltimesheet;
