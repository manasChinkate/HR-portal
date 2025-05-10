import { useEffect, useMemo, useState } from "react";
import { Button } from "../../ui/button";
import { BASE_URL } from "../../../constants";
import axios from "axios";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { RootState } from "../../../../app/store";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

import {
  useTable,
  useSortBy,
  useGlobalFilter,
  useFilters,
  usePagination,
} from "react-table";

import "../../table.css";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@radix-ui/react-popover";

import { COLUMNS } from "./columns";
import ColumnFiltering from "../../ColumnFiltering";
import GlobalFiltering from "../../GlobalFiltering";
import { FaFileExcel } from "react-icons/fa";
import {
  RxChevronLeft,
  RxChevronRight,
  RxDoubleArrowLeft,
  RxDoubleArrowRight,
  RxMixerHorizontal,
} from "react-icons/rx";
import { exportToExcel } from "../../xlsx";
import Checkbox from "../../Checkbox";
import MultiSelectComboBox from "@/components/ui/MultiSelectCombobox";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useLocation } from "react-router-dom";

type Task = {
  id: number;
  value: string;
  status: "Pending";
};

type Inputs = z.infer<typeof TaskSchema>;

const TaskSchema = z.object({
  projectId: z.string().min(1, "Please select project"),
  dueDate: z.string().min(1, "Due date is required"),
  priority: z.string().min(1, "Priority required"),
  taskDesc: z.string(),
  taskTitle: z.string().min(1, "TItle is required"),
  assignees: z.array(z.string()).min(1, "Please select at least one assignee"),
});

const AddTask = () => {
  const location = useLocation();
  const [tasks, setTasks] = useState<Task[]>([
    { id: 1, value: "", status: "Pending" },
  ]); // State to manage tasks
  const [projects, setProjects] = useState<Inputs[]>([]);
  const [fiteredEmployees, setFilteredEmployees] = useState<Inputs[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);

  const authority = useSelector((state: RootState) => state.auth.authority);

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    watch,
    trigger,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: zodResolver(TaskSchema),
    defaultValues: {
      taskDesc: "",
      assignees: [],
    },
  });

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const formattedData = {
      ...data,
      status: "Not Started",
    };

    try {
      const response = await axios.post(`${BASE_URL}/tasks`, formattedData);
      console.log("Task added successfully:", response.data.data);
      toast.success("Task added successfully");
      reset();
    } catch (error) {
      console.error("Error adding tasks:", error);
      toast.error("Error adding tasks");
    }
  };

  const getProjects = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/projects`);
      setProjects(res.data.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching Projects:", error);
    }
  };
  const getPm = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/employee/reporting`);

      const filtered = res.data.data.filter(
        (e: Inputs) => e.authority !== "ProjectManager"
      );
      setFilteredEmployees(filtered);
    } catch (error) {
      console.error("Error fetching project managers:", error);
    }
  };

  const rowData = location.state?.data;
  const pageType = location.state?.mode;

  useEffect(() => {
    if (pageType !== "Add" && rowData) {
      reset(rowData);
      setSelectedUsers(rowData.assignees);
    }
  }, [pageType, rowData]);

  useEffect(() => {
    getProjects();
    getPm();
  }, []);

  console.log(watch());
  console.log(errors);


  return (
    <div className="w-full h-[90vh] bg-background2 dark:bg-primary1 py-2 pr-2   overflow-y-auto">
      <div className="bg-background1 dark:bg-secondary1 rounded-lg w-full p-4 text-sm">
        <div className="border-b border-gray-200 pb-2">
          <h1 className="text-2xl font-bold">Add Tasks</h1>
          <p className="text-gray-500 text-sm">Add tasks here</p>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="">
          <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-2 pt-4">
            <div className="flex flex-col gap-2">
              <label>Select Project</label>
              <select
                {...register("projectId", { required: true })}
                disabled={pageType == "view"}
                className="hover:border-gray-400 dark:bg-secondary1 dark:border-primary1 ease-in-out duration-500 py-2 pl-3 border rounded-md border-gray-200 placeholder:text-sm text-sm"
              >
                <option value="">Select</option>
                {projects.map((e) => (
                  <option key={e._id} value={e._id}>
                    {e.projectName}
                  </option>
                ))}
              </select>
              {errors.projectId && (
                <p className="text-red-500 text-sm">Project is required</p>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <label>Assign</label>
              <input type="hidden" {...register("assignees")} />
              <MultiSelectComboBox
                disabled={pageType == "view"}
                options={fiteredEmployees}
                selectedValues={selectedUsers}
                setSelectedValues={setSelectedUsers}
                placeholder="Select team members"
                setFormValue={(val) => setValue("assignees", val)}
              />
            </div>
            <div className=" flex flex-col gap-2">
              <label>Priority</label>
              <select
                {...register("priority")}
                id="clientname"
                disabled={pageType == "view"}
                className={`hover:border-gray-400 dark:bg-secondary1 dark:border-primary1 ease-in-out duration-500 py-2 pl-3 border rounded-md border-gray-200 placeholder:text-sm  text-sm  `}
              >
                <option value="">Select</option>
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
              <p className=" pl-2 text-xs text-red-500 font-semibold">
                {errors.priority?.message}
              </p>
            </div>

            <div className=" flex flex-col gap-2">
              <label>Due date</label>
              <input
                {...register("dueDate")}
                disabled={pageType == "view"}
                className=" hover:border-gray-400 dark:hover:border-gray-600 dark:border-black dark:border-[0.2px] dark:bg-secondary1    ease-in-out duration-500 py-2 px-3 border rounded-md border-gray-200 placeholder:text-sm  text-sm"
                type="date"
              />
              <p className=" pl-2 text-xs text-red-500 font-semibold">
                {errors.dueDate?.message}
              </p>
            </div>
            <div className=" flex flex-col gap-2">
              <label>Task Title</label>
              <input
                disabled={pageType == "view"}
                {...register("taskTitle")}
                className=" hover:border-gray-400 dark:hover:border-gray-600 dark:border-black dark:border-[0.2px] dark:bg-secondary1    ease-in-out duration-500 py-2 px-3 border rounded-md border-gray-200 placeholder:text-sm  text-sm"
                type="text"
              />
              <p className=" pl-2 text-xs text-red-500 font-semibold">
                {errors.taskTitle?.message}
              </p>
            </div>
            <div className="mb-3 col-span-3 gap-2">
              <label>Task Description</label>
              <ReactQuill
                readOnly={pageType == "view"}
                id="content"
                className=" rounded-md bg-white dark:bg-secondary1  "
                value={watch("taskDesc")}
                onChange={(value) => {
                  setValue("taskDesc", value);
                  trigger("taskDesc");
                }}
              />
              <p className=" pl-2 text-xs text-red-500 font-semibold">
                {errors.taskDesc?.message}
              </p>
            </div>
          </div>

          {/* <div className="grid col-span-3 gap-4 mt-4 mb-2">
            {tasks.map((task, index) => (
              <div key={task.id} className="flex items-center gap-2">
                <input
                  className="flex-1 hover:border-gray-400 dark:hover:border-gray-600 dark:border-primary1 dark:border-[0.2px] dark:bg-secondary1 ease-in-out duration-500 py-2 px-3 border rounded-md border-gray-200 placeholder:text-sm text-sm"
                  type="text"
                  placeholder={`Task ${index + 1}`}
                  value={task.value}
                  onChange={(e) => handleTaskChange(task.id, e.target.value)}
                />
                {tasks.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeTaskField(task.id)}
                    className="text-red-500 text-sm px-2 py-1 rounded hover:bg-red-100"
                  >
                    Remove
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={addTaskField}
              className="flex items-center w-40 gap-1 text-blue-500 text-sm px-3 py-1 rounded"
            >
              + Add Multiple Task
            </button>
          </div> */}

          {pageType == "view" ? (
            <Link to={'/view-task'}>
            <Button className="dark:bg-[#3b5ae4] w-24 dark:text-[#ffffff] dark:shadow-[#1f1f1f] dark:shadow-md">
              Back
            </Button>
            </Link>
          ) : (
            <Button
              className="dark:bg-[#3b5ae4] w-24 dark:text-[#ffffff] dark:shadow-[#1f1f1f] dark:shadow-md"
              type="submit"
            >
              Add
            </Button>
          )}
        </form>
      </div>
    </div>
  );
};

export default AddTask;
