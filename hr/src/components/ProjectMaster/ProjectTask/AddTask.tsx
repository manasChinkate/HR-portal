import { useEffect, useMemo, useState } from "react";
import { Button } from "../../ui/button";
import { BASE_URL } from "../../../constants";
import axios from "axios";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { RootState } from "../../../../app/store";


import {
    useTable,
    useSortBy,
    useGlobalFilter,
    useFilters,
    usePagination,
} from "react-table";

import '../../table.css'

import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@radix-ui/react-popover";

import { COLUMN1, COLUMNS } from "./columns";
import ColumnFiltering from "../../ColumnFiltering";
import GlobalFiltering from "../../GlobalFiltering";
import { FaFileExcel } from 'react-icons/fa';
import {
    RxChevronLeft,
    RxChevronRight,
    RxDoubleArrowLeft,
    RxDoubleArrowRight,
    RxMixerHorizontal,
} from "react-icons/rx";
import { exportToExcel } from "../../xlsx";
import Checkbox from "../../Checkbox";




type Task = {
    id: number;
    value: string;
    status: "Pending";
};

type Inputs = {
    _id: string;
    projectName: string;
    clientName: string;
    projectManager: string;
    startDate: string;
    deadline: string;
    priority: "High" | "Medium" | "Low";
    description: string;
    companyName: string;
    createdAt: string;
    tasks: Task[];
    __v: number;
};

const AddTask = () => {
    const [tasks, setTasks] = useState<Task[]>([{ id: 1, value: "", status: "Pending" }]); // State to manage tasks
    const [projects, setProjects] = useState<Inputs[]>([]);
    const [loading, setLoading] = useState(true);

    const authority = useSelector((state: RootState) => state.auth.authority)


    const {
        register,
        handleSubmit,
        setValue,
        reset,
        formState: { errors },
    } = useForm<Inputs>();

    // Sync the tasks state with react-hook-form
    useEffect(() => {
        setValue("tasks", tasks);
    }, [tasks, setValue]);

    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        const formattedData = {
            ...data,
            tasks: tasks.map((task) => ({
                taskName: task.value,
                status: "Pending", // Default status for all tasks
            })),
        };

        try {
            const response = await axios.post(`${BASE_URL}/addtask`, formattedData);
            console.log("Task added successfully:", response.data);
            toast.success("Task added successfully");
            reset();
            setTasks([{ id: 1, value: "", status: "Pending" }]); // Reset tasks state
        } catch (error) {
            console.error("Error adding tasks:", error);
            toast.error("Error adding tasks");
        }
    };

    const getProjects = async () => {
        try {
            const res = await axios.get(`${BASE_URL}/getprojects`);
            setProjects(res.data);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching Projects:", error);
        }
    };

    useEffect(() => {
        getProjects();
    }, []);

    const addTaskField = () => {
        setTasks([...tasks, { id: tasks.length + 1, value: "", status: "Pending" }]);
    };

    const handleTaskChange = (id: number, value: string) => {
        const updatedTasks = tasks.map((task) =>
            task.id === id ? { ...task, value } : task
        );
        setTasks(updatedTasks);
    };

    const removeTaskField = (id: number) => {
        setTasks(tasks.filter((task) => task.id !== id));
    };

    return (

        (authority === 'Admin' || authority === "ProjectManager" ? (<div className="w-full min-h-[90vh] bg-background2 dark:bg-primary1 pt-2 overflow-y-auto">
            <div className="w-full min-h-[90vh] bg-background2 dark:bg-primary1 overflow-y-auto">
                <div className="bg-background1 dark:bg-secondary1 rounded-lg w-full p-4 text-sm">
                    <div className="border-b border-gray-200 pb-2">
                        <h1 className="text-2xl font-bold">Add Project</h1>
                        <p className="text-gray-500 text-sm">Add tasks here</p>
                    </div>
                    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2 pt-4">
                        <div className="flex flex-col gap-2">
                            <label>Select Project</label>
                            <select
                                {...register("projectName", { required: true })}
                                className="hover:border-gray-400 dark:bg-secondary1 dark:border-gray-700 ease-in-out duration-500 py-2 pl-3 border rounded-md border-gray-200 placeholder:text-sm text-sm"
                            >
                                <option value="">Select</option>
                                {projects.map((e) => (
                                    <option key={e._id} value={e.projectName}>
                                        {e.projectName}
                                    </option>
                                ))}
                            </select>
                            {errors.projectName && (
                                <p className="text-red-500 text-sm">Project is required</p>
                            )}
                        </div>

                        <div className="grid gap-4 mt-4 mb-2">
                            {tasks.map((task, index) => (
                                <div key={task.id} className="flex items-center gap-2">
                                    <input
                                        className="flex-1 hover:border-gray-400 dark:hover:border-gray-600 dark:border-gray-700 dark:border-[0.2px] dark:bg-[#121212] ease-in-out duration-500 py-2 px-3 border rounded-md border-gray-200 placeholder:text-sm text-sm"
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
                        </div>
                        <button
                            type="button"
                            onClick={addTaskField}
                            className="flex items-center w-40 gap-1 text-blue-500 text-sm px-3 py-1 rounded"
                        >
                            + Add Multiple Task
                        </button>
                        <Button
                            className="dark:bg-[#3b5ae4] w-24 dark:text-[#ffffff] dark:shadow-[#1f1f1f] dark:shadow-md"
                            type="submit"
                        >
                            Add
                        </Button>
                    </form>
                </div>
            </div>
        </div>) : <ShowTasks />)

    );
};

export default AddTask;



const ShowTasks = () => {

    const [projects, setProjects] = useState<Inputs[]>([]);
    const [loading, setLoading] = useState(true);
    const [task, setTasks] = useState([])


    const {
        register,
        handleSubmit,
        setValue,
        reset,
        watch,
        formState: { errors },
    } = useForm<Inputs>();

    const [timesheet, setTimesheet] = useState<Inputs[]>([]);


    const columns: any = useMemo(() => COLUMNS, []);
    const data = useMemo(() => task, [task]);

    const defaultColumn: any = useMemo(() => {
        return {
            Filter: ColumnFiltering,
        };
    }, []);

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        page,
        prepareRow,
        state,
        nextPage,
        visibleColumns,
        rows,
        previousPage,
        canNextPage,
        canPreviousPage,
        pageOptions,
        gotoPage,
        pageCount,
        setGlobalFilter,
        allColumns,
        getToggleHideAllColumnsProps,
    } = useTable(
        {
            columns,
            data,
            defaultColumn,
            initialState: { pageIndex: 0 } as any,
        },
        useFilters,
        useGlobalFilter,
        useSortBy,
        usePagination
    ) as any;

    const { globalFilter } = state;

    const { pageIndex } = state;


    const selectedProject = watch("projectName");

    const getProjects = async () => {
        try {
            const res = await axios.get(`${BASE_URL}/getprojects`);
            setProjects(res.data);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching Projects:", error);
        }
    };
    const getTasks = async (projectName: string) => {
        if (projectName) {
            try {
                const res = await axios.get(`${BASE_URL}/gettask`, { params: { projectName } });
                
                // Check if tasks is an array and if it's defined
                const tasks = res.data[0].tasks;
                console.log('tasks :',tasks)
                setTasks(tasks)
              
            } catch (error) {
                console.error("Error fetching tasks:", error);
            }
        }
    };
    
    useEffect(() => {
        if (selectedProject) {
            getTasks(selectedProject); // Fetch tasks when the project is selected
        }
    }, [selectedProject]);

    useEffect(() => {
        getProjects();
    }, []);
    return (
        <div className="w-full min-h-[90vh] bg-background2 dark:bg-primary1 pt-2 overflow-y-auto">
            <div className="w-full min-h-[90vh] bg-background2 dark:bg-primary1 overflow-y-auto">
                <div className="bg-background1 dark:bg-secondary1 rounded-lg w-full p-4 text-sm">
                    <div className="border-b border-gray-200 pb-2">
                        <h1 className="text-2xl font-bold">View Tasks</h1>
                        <p className="text-gray-500 text-sm">view tasks here</p>
                    </div>
                    <div className="flex flex-col gap-2 mb-3">
                        <label>Select Project</label>
                        <select
                            {...register("projectName", { required: true })}
                            className="hover:border-gray-400 dark:bg-secondary1 dark:border-gray-700 ease-in-out duration-500 py-2 pl-3 border rounded-md border-gray-200 placeholder:text-sm text-sm"
                        >
                            <option value="">Select</option>
                            {projects.map((e) => (
                                <option key={e._id} value={e.projectName}>
                                    {e.projectName}
                                </option>
                            ))}
                        </select>
                        {errors.projectName && (
                            <p className="text-red-500 text-sm">Project is required</p>
                        )}
                    </div>

                    
                        <div className="bg-white md:p-4 p-2 rounded-md  dark:bg-secondary1 shadow-lg">
                            <div className="space-y-3 sm:space-y-0 sm:flex  justify-between items-center">
                                <div>
                                    <h1 className=' text-2xl font-bold     '>Tasks History</h1>
                                    <p className="text-xs text-muted-foreground">
                                        Here&apos;s a history of your tasks.
                                    </p>
                                </div>

                                <div className="sm:flex justify-between items-center gap-2">
                                    <FaFileExcel
                                        className="hidden sm:block text-[1.5rem] text-[#00b400] cursor-pointer  transition duration-75 ease-in hover:text-[#4bbd4b]"
                                        onClick={() =>
                                            exportToExcel(
                                                visibleColumns.map((a: any) => {
                                                    return { label: a.Header, value: a.id };
                                                }),
                                                rows.map((row: any) => row.original),
                                                "dataSheets"
                                            )
                                        }
                                    />

                                    <div className="hidden lg:block">
                                        <Popover>
                                            <PopoverTrigger>
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    className="ml-auto hidden h-8 lg:flex dark:bg-[#121212]"
                                                >
                                                    <RxMixerHorizontal className="mr-2 h-4 w-4" />
                                                    View
                                                </Button>
                                            </PopoverTrigger>
                                            <PopoverContent className="bg-white dark:bg-[#121212] py-2 px-3 text-[0.8rem] shadow-lg rounded-md">
                                                <div className=" bg-gray-50 dark:bg-[#121212] font-semibold py-1 flex items-center gap-2">
                                                    <Checkbox {...getToggleHideAllColumnsProps()} />
                                                    Toggle All
                                                </div>
                                                <hr className="mb-2" />
                                                <div className="max-h-[40vh] overflow-auto">
                                                    {allColumns.map((column: any) => (
                                                        <div key={column.id}>
                                                            <label className="flex items-center gap-2">
                                                                <input
                                                                    type="checkbox"
                                                                    {...column.getToggleHiddenProps()}
                                                                />{" "}
                                                                {column.Header}
                                                            </label>
                                                        </div>
                                                    ))}
                                                </div>
                                            </PopoverContent>
                                        </Popover>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <GlobalFiltering
                                            filter={globalFilter}
                                            setFilter={setGlobalFilter}
                                        />

                                        <FaFileExcel
                                            className="sm:hidden text-[1.5rem] text-[#00b400] cursor-pointer  transition duration-75 ease-in hover:text-[#4bbd4b]"
                                            onClick={() =>
                                                exportToExcel(
                                                    visibleColumns.map((a: any) => {
                                                        return { label: a.Header, value: a.id };
                                                    }),
                                                    rows.map((row: any) => row.original),
                                                    "dataSheet"
                                                )
                                            }
                                        />
                                    </div>
                                </div>
                            </div>
                            {/* ------------------------------------Table-------------------------------------- */}

                            {
                                task.length === 0 ? <><h1>NO tasks available</h1></> :
                          
                            <div className="overflow-auto mt-4 border  rounded-lg">
                                {loading ? (
                                    <div className="w-full flex items-center justify-center h-[65vh]">
                                        <img src='' className="w-[5rem]" alt="Loading..." />
                                    </div>
                                ) : (
                                    <table {...getTableProps()}>
                                        <thead>
                                            {headerGroups.map((headerGroup: any) => (
                                                <tr {...headerGroup.getHeaderGroupProps()}>
                                                    {headerGroup.headers.map((column: any) => (
                                                        <th
                                                            className="whitespace-nowrap"
                                                            {...column.getHeaderProps(
                                                                column.getSortByToggleProps()
                                                            )}
                                                        >
                                                            <div className="flex flex-row items-center justify-between">
                                                                <div>
                                                                    {column.render("Header")}{" "}
                                                                    <span>
                                                                        {column.isSorted
                                                                            ? column.isSortedDesc
                                                                                ? "⬇️"
                                                                                : "⬆️"
                                                                            : ""}
                                                                    </span>
                                                                </div>
                                                                {column.canFilter ? column.render("Filter") : null}
                                                            </div>
                                                        </th>
                                                    ))}
                                                </tr>
                                            ))}
                                        </thead>
                                        <tbody {...getTableBodyProps()}>
                                            {page.length === 0 ? (
                                                <tr>
                                                    <td colSpan={columns.length}>
                                                        <span className="flex items-center justify-center">
                                                            <img src='' alt="No Data" className="w-[10rem]" />
                                                            No data available.
                                                        </span>
                                                    </td>
                                                </tr>
                                            ) : (
                                                page.map((row: any) => {
                                                    prepareRow(row);
                                                    return (
                                                        <tr {...row.getRowProps()}>
                                                            {row.cells.map((cell: any) => {
                                                                return (
                                                                    <td {...cell.getCellProps()}>
                                                                        {cell.render("Cell")}
                                                                    </td>
                                                                );
                                                            })}
                                                        </tr>
                                                    );
                                                })
                                            )}
                                        </tbody>
                                    </table>
                                )}
                            </div>
  }
                            {/*-------------------------------Pagination--------------------------- */}
                            <div className="text-sm sm:text-base sm:flex justify-between items-center my-2">
                                <div className="text-sm sm:text-base flex justify-between items-center gap-5">
                                    <span className="text-sm text-muted-foreground">
                                        Page{` `}
                                        <strong className="text-sm text-black dark:text-white">
                                            {pageIndex + 1} - {pageOptions.length}
                                        </strong>
                                        {` `}
                                        of <strong className="text-sm text-black dark:text-white">
                                            {rows.length}
                                        </strong>{" "}
                                        data
                                    </span>
                                    <span>
                                        Go to page: {` `}
                                        <input
                                            type="number"
                                            defaultValue={pageIndex + 1}
                                            onChange={(e) => {
                                                const pageNumber = e.target.value
                                                    ? Number(e.target.value) - 1
                                                    : 0;
                                                gotoPage(pageNumber);
                                            }}
                                            className="w-[50px] border-gray-400 dark:bg-secondary1 border-[1px] border-solid rounded-sm p-[0.1rem_0.3rem] text-[0.8rem]"
                                        />
                                    </span>
                                </div>
                                <div className="flex justify-around my-3 sm:block sm:m-0">
                                    <Button
                                        variant="outline"
                                        className="h-8 w-8 p-0"
                                        onClick={() => gotoPage(0)}
                                        disabled={!canPreviousPage}
                                    >
                                        <RxDoubleArrowLeft />
                                    </Button>
                                    <Button
                                        variant="outline"
                                        className="h-8 w-8 p-0"
                                        onClick={() => previousPage()}
                                        disabled={!canPreviousPage}
                                    >
                                        <RxChevronLeft className="h-4 w-4" />
                                    </Button>
                                    <Button
                                        variant="outline"
                                        className="h-8 w-8 p-0"
                                        onClick={() => nextPage()}
                                        disabled={!canNextPage}
                                    >
                                        <RxChevronRight className="h-4 w-4" />
                                    </Button>
                                    <Button
                                        variant="outline"
                                        className="h-8 w-8 p-0"
                                        onClick={() => gotoPage(pageCount - 1)}
                                        disabled={!canNextPage}
                                    >
                                        <RxDoubleArrowRight className="h-4 w-4" />
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                   
                </div>


        </div>
    )
}