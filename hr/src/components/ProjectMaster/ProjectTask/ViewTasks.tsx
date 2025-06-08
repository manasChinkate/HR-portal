import { useMemo } from "react";

import { useForm } from "react-hook-form";

import "react-quill/dist/quill.snow.css";

import "../../table.css";

import { COLUMNS } from "./columns";

import TableWrapper from "@/components/ui/TableWrapper";
import { useQuery } from "@tanstack/react-query";
import { fetchProjects } from "../OngoingProjects/services";
import { fetchTasks } from "./services";

type Inputs = {
  projectName: string;
};

const ViewTasks = () => {
  const {
    register,
    watch,
    formState: { errors },
  } = useForm<Inputs>();

  const columns: any = useMemo(() => COLUMNS, []);

  const selectedProject = watch("projectName");

  const { data: projects = [] } = useQuery({
    queryKey: ["project"],
    queryFn: fetchProjects,
    staleTime: Infinity,
  });
  const { data, isLoading } = useQuery({
    queryKey: ["task", selectedProject],
    queryFn: () => fetchTasks(selectedProject),
    enabled: !!selectedProject,
    staleTime: Infinity,
  });

  return (
    <div className="w-full min-h-[90vh] bg-background2 dark:bg-primary1 py-2 pr-2 overflow-y-auto  ">
      <div className=" bg-background1 dark:bg-secondary1  rounded-lg w-full p-5 text-sm ">
        <div className="border-b border-gray-200 pb-2">
          <h1 className="text-2xl font-bold">View Tasks</h1>
          {/* <p className="text-gray-500 text-sm">view tasks here</p> */}
        </div>
        <div className="flex flex-col gap-2 mb-3">
          <label>Select Project</label>
          <select
            {...register("projectName", { required: true })}
            className="hover:border-gray-400 dark:bg-secondary1 dark:border-primary1 ease-in-out duration-500 py-2 pl-3 border rounded-md border-gray-200 placeholder:text-sm text-sm"
          >
            <option value="">Select</option>
            {projects.map((e: { _id: string; projectName: string }) => (
              <option key={e._id} value={e._id}>
                {e.projectName}
              </option>
            ))}
          </select>
          {errors.projectName && (
            <p className="text-red-500 text-sm">Project is required</p>
          )}
        </div>

        <TableWrapper
          data={data || []}
          loading={isLoading}
          columns={columns}
          description="Here's a list of Tasks."
          title="View Tasks"
        />
      </div>
    </div>
  );
};

export default ViewTasks;
