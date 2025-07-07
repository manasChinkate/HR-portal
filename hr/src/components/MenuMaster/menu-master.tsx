import { Button } from "@/components/ui/button";
// import axios from "axios";
import { useForm, SubmitHandler } from "react-hook-form";
// import { BASE_URL } from "../../../constants";

import { useMemo } from "react";
// import "../../table.css";
// import { COLUMNS } from "./columns";
import toast from "react-hot-toast";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import TableWrapper from "@/components/ui/TableWrapper";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { addMenu, fetchMenu } from "./services";
import { COLUMNS } from "./columns";
import { iconMapping } from "../Sidebar/AppSidebar";

export type Inputs = z.infer<typeof MenuSchema>;
const MenuSchema = z.object({
  menuName: z.string().min(1, { message: "Menu Name is required" }),
  parentId: z.string().nullable(),
  logo: z.string().trim().min(1, { message: "logo is required" }),
  path: z.string(),
});

const MenuMaster = () => {
  const form = useForm<Inputs>({
    resolver: zodResolver(MenuSchema),
    defaultValues: {
      menuName: "",
      parentId: null,
      logo: "",
      path: "",
    },
  });
  const {
    handleSubmit,
    reset,
    formState: { errors },
  } = form;

  // Memoize column definitions to avoid unnecessary re-renders
  const columns: any = useMemo(() => COLUMNS, []);

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: addMenu,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["menu"] });
      toast.success("Created Successfully");
      reset();
    },
    onError: () => {
      toast.error("Failed");
    },
  });

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    console.log("data", data);
    mutation.mutate(data);
  };

  const {
    data: menuData = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["menu"],
    queryFn: fetchMenu,
    staleTime: Infinity,
  });

  return (
    <div className="w-full h-full bg-background2 flex flex-col gap-2 dark:bg-primary1 py-2 pr-2 overflow-y-auto">
      <div className=" bg-background1 dark:bg-secondary1  rounded-lg w-full p-4 text-sm">
        <div className=" border-b border-gray-200 dark:border-0 pb-2">
          <h1 className=" text-2xl font-bold dark:text-gray-100     ">
            Add Menu
          </h1>
          <p className=" text-gray-500 text-sm">
            Add new Menus for your clients
          </p>
        </div>
        <Form {...form}>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className=" flex flex-col gap-3 py-3"
          >
            <div className=" grid md:grid-cols-3 sm:grid-cols-2  gap-4 mt-4 mb-5 ">
              {/* Menu Name  */}
              <FormField
                control={form.control}
                name="menuName"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormLabel>Menu Name</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

              {/*Parent Menu */}
              <FormField
                control={form.control}
                name="parentId"
                render={({ field }) => (
                  <FormItem className=" space-y-2">
                    <FormLabel>Parent Menu</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select Parent Menu" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {menuData.map(
                          (e: {
                            menuName: string;
                            _id: string;
                            logo: string;
                          }) => {
                            const Logo =
                              iconMapping[e.logo as keyof typeof iconMapping];
                            return (
                              <SelectItem value={e._id} className=" flex">
                                <div className=" flex gap-4 items-center justify-between">

                                {Logo && <Logo className="w-5 h-5 " />}
                                {e.menuName}
                                </div>
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
              {/* Path  */}
              <FormField
                control={form.control}
                name="path"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormLabel>Path</FormLabel>
                    <FormControl>
                      <Input placeholder="/path" {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Logo  */}
              <FormField
                control={form.control}
                name="logo"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormLabel>Logo</FormLabel>
                    <FormControl>
                      <Input placeholder="<logo />" {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button
              className="dark:bg-black dark:text-[#ffffff] dark:shadow-[#1f1f1f] dark:shadow-md w-fit"
              type="submit"
            >
              Add Menu
            </Button>
          </form>
        </Form>
      </div>
      <TableWrapper
        data={menuData || []}
        loading={isLoading}
        columns={columns}
        description="Here's a list of Menus."
        title="Menus"
        refetch={refetch}
      />
    </div>
  );
};

export default MenuMaster;
