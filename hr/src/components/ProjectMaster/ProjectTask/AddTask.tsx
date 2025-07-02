import { useEffect, useState } from "react";
import { Button } from "../../ui/button";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";

import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

import MultiSelectComboBox from "@/components/ui/MultiSelectCombobox";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useLocation } from "react-router-dom";
import { fetchProjects } from "../OngoingProjects/services";
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
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { Input } from "@/components/ui/input";

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

  const form = useForm({
    resolver: zodResolver(TaskSchema),
    defaultValues: {
      taskDesc: "",
      taskTitle: "",
      assignees: [],
      priority: "",
      dueDate: "",
    },
  });
  const {
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = form;
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
        <Form {...form}>
          <form
            className=" flex flex-col gap-3 py-3"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className=" grid md:grid-cols-3 sm:grid-cols-2  gap-4 mt-4 mb-5 ">
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
                      disabled={pageType == "view"}
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
              {/* Assignes  */}
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
                  <FormItem className=" space-y-2">
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
              {/*Due Date*/}
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

              <FormField
                control={form.control}
                name="taskDesc"
                render={({ field }) => (
                  <FormItem className="col-span-3 mb-3">
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
                            form.trigger("taskDesc"); // optional: if you want immediate validation
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
                className="dark:bg-black dark:text-[#ffffff] dark:shadow-[#1f1f1f] dark:shadow-md w-fit"
                type="submit"
              >
                Add
              </Button>
            )}
          </form>
        </Form>
      </div>
    </div>
  );
};

export default AddTask;
