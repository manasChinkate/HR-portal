import { useEffect, useMemo, useState } from "react";
import { Button } from "../../ui/button";
import { BASE_URL } from "../../../constants";
import axios from "axios";
import { SubmitHandler, useForm } from "react-hook-form";

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

const ViewTasks = () => {
 const [projects, setProjects] = useState<Inputs[]>([]);
  const [loading, setLoading] = useState(true);
  const [task, setTasks] = useState([]);

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
  console.log("DATA",data)

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
      const res = await axios.get(`${BASE_URL}/projects`);
      setProjects(res.data.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching Projects:", error);
    }
  };
  const getTasks = async (projectId: string) => {
    if (projectId) {
      try {
        const res = await axios.get(`${BASE_URL}/tasks`, {
          params: { projectId },
        });

        // Check if tasks is an array and if it's defined
        // const tasks = res.data[0].tasks.map((task) => ({
        //   ...task,
        //   projectId, // Attach the project name to each task
        // }));
        console.log("tasks :", res.data.data);
        setTasks(res.data.data);
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
            {projects.map((e) => (
              <option key={e._id} value={e._id}>
                {e.projectName}
              </option>
            ))}
          </select>
          {errors.projectName && (
            <p className="text-red-500 text-sm">Project is required</p>
          )}
        </div>

        <div className="bg-transparent md:p-4 p-2 rounded-md  dark:bg-secondary1 ">
          <div className="space-y-3 sm:space-y-0 sm:flex  justify-between items-center">
            <div>
              <h1 className=" text-2xl font-bold     ">Tasks History</h1>
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
                      className="ml-auto hidden h-8 lg:flex dark:bg-secondary1"
                    >
                      <RxMixerHorizontal className="mr-2 h-4 w-4" />
                      View
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="bg-white dark:bg-secondary1 py-2 px-3 text-[0.8rem] shadow-lg rounded-md">
                    <div className=" bg-gray-50 dark:bg-secondary1 font-semibold py-1 flex items-center gap-2">
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
{/* 
          {task.length === 0 ? (
            <>
              <h1>NO tasks available</h1>
            </>
          ) : ( */}
            <div className="overflow-auto mt-4 border  rounded-lg">
              {loading ? (
                <div className="w-full flex items-center justify-center h-[65vh]">
                  <img src="/NoData.jpg" className="w-[5rem]" alt="Loading..." />
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
                              {column.canFilter
                                ? column.render("Filter")
                                : null}
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
                            <img src="" alt="No Data" className="w-[10rem]" />
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
                                  {cell.render(
                                    "Cell",
                                    { updater: getTasks },
                                    selectedProject
                                  )}
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
          {/* )} */}
          {/*-------------------------------Pagination--------------------------- */}
          <div className="text-sm sm:text-base sm:flex justify-between items-center my-2">
            <div className="text-sm sm:text-base flex justify-between items-center gap-5">
              <span className="text-sm text-muted-foreground">
                Page{` `}
                <strong className="text-sm text-black dark:text-white">
                  {pageIndex + 1} - {pageOptions.length}
                </strong>
                {` `}
                of{" "}
                <strong className="text-sm text-black dark:text-white">
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
  );
}

export default ViewTasks