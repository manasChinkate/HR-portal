import { useEffect, useState } from "react";
import { Button } from "../../ui/button";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";

import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import MultiSelectComboBox from "@/components/ui/MultiSelectCombobox";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useLocation } from "react-router-dom";
import { fetchProjects } from "../../../features/project/ongoingProject/services";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createTask, fetchTeamMembers } from "./services";
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
import { CalendarIcon, Loader2, Plus } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { Input } from "@/components/ui/input";

export type TaskInputs = z.infer<typeof TaskSchema>;

export const TaskSchema = z.object({
  _id: z.string().optional(),
  projectId: z.string().min(1, "Project ID is required"),
  dueDate: z.string().optional(),
  priority: z.string().optional(),
  status: z.string().optional(),
  taskTitle: z.string().min(1, "Task title is required"),
  assignees: z
    .array(z.string().min(1, "Assignee ID is required"))
    .min(1, "At least one assignee is required"),
  taskDesc: z.string().optional(),
  companyId: z.string().optional(),
  createdAt: z.date().optional(),
});

const TaskForm = () => {
  const location = useLocation();
  const pageType = location.state?.mode;
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);

  const form = useForm({
    resolver: zodResolver(TaskSchema),
    defaultValues: defaultValues,
  });
  const {
    handleSubmit,
    reset,
    watch,
    formState: { errors, isSubmitting },
  } = form;
  const rowData = location.state?.data;

  async function defaultValues() {
    if (pageType == "view" || pageType == "edit") {
      console.log("row",rowData);
      setSelectedUsers(rowData.assignees);
      return {
        ...rowData,
      };
    } else {
      return {
        taskDesc: "",
        taskTitle: "",
        assignees: [],
        priority: "",
        dueDate: "",
      };
    }
  }
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
    await mutation.mutateAsync(data);
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

  // useEffect(() => {
    // if (pageType !== "Add" && rowData) {
    //   reset(rowData);
    //   setSelectedUsers(rowData.assignees);
    // }
  // }, [pageType, rowData]);

  // console.log(watch());
  // console.log(errors);

  return (
    <div className="w-full h-[90vh] bg-background2 dark:bg-primary1 py-2 pr-2   overflow-y-auto">
      <div className="bg-background1 dark:bg-secondary1 rounded-lg w-full p-4 text-sm">
        <div className="border-b border-gray-200 pb-2">
          <h1 className="text-2xl font-bold">Add Tasks</h1>
          <p className="text-gray-500 text-sm">Add tasks here</p>
        </div>
        <Form {...form}>
          <form
            className=" flex flex-col gap-3 py-3"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4 mb-5">
              {/* Task Name */}
              <FormField
                control={form.control}
                name="taskTitle"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormLabel>Task Title</FormLabel>
                    <FormControl>
                      <Input disabled={pageType == "view"} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Project Name */}
              <FormField
                control={form.control}
                name="projectId"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormLabel>Project</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      value={field.value}
                      // disabled={pageType == "view"}
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
                              <SelectItem key={e._id} value={e._id}>
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

              {/* Assignees */}
              <FormField
                control={form.control}
                name="assignees"
                render={() => (
                  <FormItem className="space-y-2">
                    <FormLabel>Assign</FormLabel>
                    <Controller
                      control={form.control}
                      name="assignees"
                      render={({ field }) => (
                        <MultiSelectComboBox
                          disabled={pageType === "view"}
                          options={projectManagerData}
                          selectedValues={field.value || []}
                          setSelectedValues={(val) => field.onChange(val)}
                          placeholder="Select team members"
                        />
                      )}
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Priority */}
              <FormField
                control={form.control}
                name="priority"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormLabel>Priority</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      disabled={pageType == "view"}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select Priority" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="low">Low</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="high">High</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Due Date */}
              <FormField
                control={form.control}
                name="dueDate"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormLabel>Due Date</FormLabel>
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
                          disabled={pageType == "view"}
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

              {/* Task Description - Full Width */}
              <FormField
                control={form.control}
                name="taskDesc"
                render={({ field }) => (
                  <FormItem className="col-span-1 sm:col-span-2 md:col-span-3 mb-3">
                    <FormLabel>Task Description</FormLabel>
                    <Controller
                      control={form.control}
                      name="taskDesc"
                      render={({ field: { onChange, value } }) => (
                        <ReactQuill
                          readOnly={pageType === "view"}
                          value={value}
                          onChange={(val) => {
                            onChange(val);
                            form.trigger("taskDesc");
                          }}
                          className="rounded-md bg-white dark:bg-secondary1"
                        />
                      )}
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            {pageType == "view" ? (
              <Link to={"/view-task"}>
                <Button
                  className="dark:bg-black dark:text-[#ffffff] dark:shadow-[#1f1f1f] dark:shadow-md w-fit"
                  type="button"
                >
                  Back
                </Button>
              </Link>
            ) : (
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
            )}
          </form>
        </Form>
      </div>
    </div>
  );
};

export default TaskForm;
