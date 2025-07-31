import { useMemo } from "react";

import { useForm } from "react-hook-form";

import "react-quill-new/dist/quill.snow.css";

import { COLUMNS } from "./columns";

import TableWrapper from "@/components/ui/TableWrapper";
import { useQuery } from "@tanstack/react-query";
import { fetchProjects } from "../../../features/project/ongoingProject/services";
import { fetchTasks } from "./services";
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

type Inputs = {
  projectId: string;
};

const TaskTable = () => {
  const form = useForm<Inputs>({
    defaultValues: {
      projectId: "",
    },
  });
  const { watch } = form;

  const columns: any = useMemo(() => COLUMNS, []);

  const selectedProject = watch("projectId");

  const { data: projects = [] } = useQuery({
    queryKey: ["project"],
    queryFn: fetchProjects,
    staleTime: Infinity,
  });
  const { data, isLoading, refetch } = useQuery({
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
        </div>
        <Form {...form}>
          <form className=" flex flex-col gap-3 py-3">
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
          </form>
        </Form>

        <TableWrapper
          data={data || []}
          loading={isLoading}
          columns={columns}
          // description="Here's a list of Tasks."
          // title="View Tasks"
          refetch={refetch}
        />
      </div>
    </div>
  );
};

export default TaskTable;
