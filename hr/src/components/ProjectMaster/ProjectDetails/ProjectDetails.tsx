import { Button } from "../../ui/button";

import { useForm, SubmitHandler } from "react-hook-form";

import toast from "react-hot-toast";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchClient } from "@/components/MainMaster/services/masterServices";
import { addProject, fetchProjectManager } from "./services";

export type projectInputs = z.infer<typeof ProjectSchema>;
const ProjectSchema = z
  .object({
    projectName: z.string().min(1, "Project is required"),
    clientName: z.string().min(1, "Client is required"),
    projectManager: z.string().min(1, "Project Manager is required"),
    startDate: z.string().min(1, "Start Date is required"),
    deadline: z.string().min(1, "Deadline is required"),
    priority: z.string(),
    description: z.string().min(1, "Description is required"),
  })
  .refine(
    (data) => {
      const from = new Date(data.startDate);
      const to = new Date(data.deadline);
      return to > from;
    },
    {
      message: "Deadline must be after Start Date",
      path: ["deadline"], // this tells Zod where the error should appear
    }
  );

const ProjectDetails = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<projectInputs>({
    resolver: zodResolver(ProjectSchema),
  });

  const queryClient = useQueryClient();

  const { data: clientData = [] } = useQuery({
    queryKey: ["client"],
    queryFn: fetchClient,
    staleTime: Infinity,
  });
  const { data: projectManagerData = [] } = useQuery({
    queryKey: ["projectmanager"],
    queryFn: fetchProjectManager,
    staleTime: Infinity,
  });

  const mutation = useMutation({
    mutationFn: addProject,
    onSuccess: () => {
      toast.success("Created Successfully");
      queryClient.invalidateQueries({ queryKey: ["project"] });
      reset();
    },
  });

  const onSubmit: SubmitHandler<projectInputs> = async (data) => {
    mutation.mutate(data);
  };

  return (
    <div className="w-full max-h-[90vh] bg-background2 flex flex-col gap-2 dark:bg-primary1 py-2 pr-2 overflow-y-auto">
      <div className=" bg-background1 dark:bg-secondary1  rounded-lg w-full p-4 text-sm">
        <div className=" border-b border-gray-200 pb-2">
          <h1 className=" text-2xl font-bold      ">Add Project</h1>
          <p className=" text-gray-500 text-sm">Add Projects here</p>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className=" grid md:grid-cols-3 sm:grid-cols-2  gap-4 mt-4 mb-5 ">
            <div className=" flex flex-col gap-2">
              <label>Project Name</label>
              <input
                {...register("projectName")}
                className=" hover:border-gray-400 dark:hover:border-gray-600 dark:border-primary1 dark:border-[0.2px] dark:bg-secondary1    ease-in-out duration-500 py-2 px-3 border rounded-md border-gray-200 placeholder:text-sm  text-sm"
                type="text"
                placeholder="name of your project"
              />
              <p className=" pl-2 text-xs text-red-500 font-semibold">
                {errors.projectName?.message}
              </p>
            </div>
            <div className=" flex flex-col gap-2">
              <label>Client</label>
              <select
                {...register("clientName")}
                id="clientname"
                className={`hover:border-gray-400 dark:bg-secondary1 dark:border-primary1 ease-in-out duration-500 py-2 pl-3 border rounded-md border-gray-200 placeholder:text-sm  text-sm  `}
              >
                <option value="">Select</option>
                {clientData.map((e: { clientName: string; _id: string }) => {
                  return <option value={e._id}>{e.clientName}</option>;
                })}
              </select>
              <p className=" pl-2 text-xs text-red-500 font-semibold">
                {errors.clientName?.message}
              </p>
            </div>
            <div className=" flex flex-col gap-2">
              <label>Assign Project Manager</label>
              <select
                {...register("projectManager")}
                className={`hover:border-gray-400 dark:bg-secondary1 dark:border-primary1 ease-in-out duration-500 py-2 pl-3 border rounded-md border-gray-200 placeholder:text-sm  text-sm  `}
              >
                <option value="">Select</option>
                {projectManagerData.map(
                  (e: { _id: string; fullname: string }) => {
                    return <option value={e._id}>{e.fullname}</option>;
                  }
                )}
              </select>
              <p className=" pl-2 text-xs text-red-500 font-semibold">
                {errors.projectManager?.message}
              </p>
            </div>
            <div className=" flex flex-col gap-2">
              <label>Start Date</label>
              <input
                {...register("startDate")}
                className=" hover:border-gray-400 dark:hover:border-gray-600 dark:border-black dark:border-[0.2px] dark:bg-secondary1    ease-in-out duration-500 py-2 px-3 border rounded-md border-gray-200 placeholder:text-sm  text-sm"
                type="date"
                placeholder="holiday"
              />
              <p className=" pl-2 text-xs text-red-500 font-semibold">
                {errors.startDate?.message}
              </p>
            </div>
            <div className=" flex flex-col gap-2">
              <label>Deadline</label>
              <input
                {...register("deadline")}
                className=" hover:border-gray-400 dark:hover:border-gray-600 dark:border-black dark:border-[0.2px] dark:bg-secondary1    ease-in-out duration-500 py-2 px-3 border rounded-md border-gray-200 placeholder:text-sm  text-sm"
                type="date"
                placeholder="holiday"
              ></input>
              <p className=" pl-2 text-xs text-red-500 font-semibold">
                {errors.deadline?.message}
              </p>
            </div>
            <div className=" flex flex-col gap-2">
              <label>Priority</label>
              <select
                {...register("priority")}
                id="clientname"
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
            <div className=" flex flex-col gap-2 col-span-3">
              <label>Project Description</label>
              <textarea
                {...register("description")}
                className=" hover:border-gray-400 dark:hover:border-gray-600  dark:border-primary1  dark:border-[0.2px] dark:bg-secondary1    ease-in-out duration-500 py-2 px-3 border rounded-md border-gray-200 placeholder:text-sm  text-sm"
                placeholder=" description"
              ></textarea>
              <p className=" pl-2 text-xs text-red-500 font-semibold">
                {errors.description?.message}
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
    </div>
  );
};

export default ProjectDetails;
