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

import MultiSelectComboBox from "@/components/ui/MultiSelectCombobox";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useLocation } from "react-router-dom";
import { fetchProjects } from "../OngoingProjects/services";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createTask, fetchTeamMembers } from "./services";
import { projectInputs } from "../ProjectDetails/ProjectDetails";

export type TaskInputs = z.infer<typeof TaskSchema>;

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
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    watch,
    trigger,
    formState: { errors },
  } = useForm<TaskInputs>({
    resolver: zodResolver(TaskSchema),
    defaultValues: {
      taskDesc: "",
      assignees: [],
    },
  });
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: createTask,
    onSuccess: () => {
      toast.success("Created Successfully");
      reset();
      queryClient.invalidateQueries({ queryKey: ["task"] });
    },
    onError: () => toast.error("Failed Creating task"),
  });

  const onSubmit: SubmitHandler<TaskInputs> = async (data) => {
    mutation.mutate(data);
  };

  const { data: projects = [] } = useQuery({
    queryKey: ["project"],
    queryFn: fetchProjects,
    staleTime: Infinity,
  });

  const { data: projectManagerData = [] } = useQuery({
    queryKey: ["teamMember"],
    queryFn: fetchTeamMembers,
    staleTime: Infinity,
  });

  const rowData = location.state?.data;
  const pageType = location.state?.mode;

  useEffect(() => {
    if (pageType !== "Add" && rowData) {
      reset(rowData);
      setSelectedUsers(rowData.assignees);
    }
  }, [pageType, rowData]);

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
                {projects.map((e: { _id: string; projectName: string }) => (
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
                options={projectManagerData}
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

          {pageType == "view" ? (
            <Link to={"/view-task"}>
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
