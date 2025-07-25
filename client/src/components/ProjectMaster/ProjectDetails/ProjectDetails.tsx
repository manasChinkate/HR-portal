import { Button } from "../../ui/button";

import { useForm, SubmitHandler } from "react-hook-form";

import toast from "react-hot-toast";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchClient } from "@/services/masterServices";
import { addProject, fetchProjectManager } from "./services";
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
  const form = useForm({
    resolver: zodResolver(ProjectSchema),
  });
  const { handleSubmit, reset } = form;

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
        <Form {...form}>
          <form
            className=" flex flex-col gap-3 py-3"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className=" grid md:grid-cols-3 sm:grid-cols-2  gap-4 mt-4 mb-5 ">
              {/* Project Name */}
              <FormField
                control={form.control}
                name="projectName"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormLabel>Project Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Tata" {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* Client Name */}
              <FormField
                control={form.control}
                name="clientName"
                render={({ field }) => (
                  <FormItem className=" space-y-2">
                    <FormLabel>Email</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select Client" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {clientData.map(
                          (e: { clientName: string; _id: string }) => {
                            return (
                              <SelectItem value={e._id}>
                                {e.clientName}
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
              {/* Project Manager */}
              <FormField
                control={form.control}
                name="projectManager"
                render={({ field }) => (
                  <FormItem className=" space-y-2">
                    <FormLabel>Project Manager</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select Project Manager" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {projectManagerData.map(
                          (e: { fullname: string; _id: string }) => {
                            return (
                              <SelectItem value={e._id}>
                                {e.fullname}
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
              {/* Start Date */}
              <FormField
                control={form.control}
                name="startDate"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormLabel>Start Date</FormLabel>
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
              {/*Deadline*/}
              <FormField
                control={form.control}
                name="deadline"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormLabel>Deadline</FormLabel>
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
              {/* Text Area */}
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem className="space-y-2 col-span-3">
                    <FormLabel>Project Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Tell about project"
                        className="resize-none"
                        {...field}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            {/* Submit Button */}
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

export default ProjectDetails;
