import { Button } from "../../ui/button";
import axios from "axios";
import { useForm, SubmitHandler } from "react-hook-form";
import { BASE_URL } from "../../../constants";
import { useSelector } from "react-redux";
import { RootState } from "../../../../app/store";
import { useEffect, useMemo, useState } from "react";
import { exportToExcel } from "../../xlsx";
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
import Checkbox from "../../Checkbox";
import toast from "react-hot-toast";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

type Inputs = z.infer<typeof LeaveSchema>;

const LeaveSchema = z
  .object({
    leaveType: z.string().min(1, "Leave type required"),
    department: z.string().min(1, "department is required"),
    count: z.string().min(1, "Count is required"),
    fromDate: z.string().min(1, { message: "From Date is required" }),
    toDate: z.string().min(1, { message: "To Date is required" }),
    reason: z.string().min(1, "Must be any reason"),
  })
  .refine(
    (data) => {
      const from = new Date(data.fromDate);
      const to = new Date(data.toDate);
      return to > from;
    },
    {
      message: "To Date must be after From Date",
      path: ["toDate"],
    }
  );

const ApplyLeave = () => {
  const [leave, setLeave] = useState<Inputs[]>([]);
  const [leavetypes, setLeavetypes] = useState<Inputs[]>([]);
  const [department, setDepartment] = useState<Inputs[]>([]);
  const [loading, setloading] = useState(true);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: zodResolver(LeaveSchema),
  });

  const columns: any = useMemo(() => COLUMNS, []);
  const data = useMemo(() => leave, [leave]);

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

  const getLeaves = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/leaves`);
      // Handle the response, e.g., store in state or display the data
      console.log(res.data.data);
      setLeave(res.data.data);
      setloading(false);
    } catch (error) {
      // Handle any errors that occur during the request
      console.error("Error fetching Leaves:", error);
    }
  };

  const getleavetype = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/leavetype`);
      // Handle the response, e.g., store in state or display the data
      console.log(res.data);
      setLeavetypes(res.data.data);
      setloading(false);
    } catch (error) {
      // Handle any errors that occur during the request
      console.error("Error fetching LeavesTypes:", error);
    }
  };
  const getDepartment = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/department`);
      // Handle the response, e.g., store in state or display the data
      console.log(res.data);
      setDepartment(res.data.data);
      setloading(false);
    } catch (error) {
      // Handle any errors that occur during the request
      console.error("Error fetching Departments:", error);
    }
  };

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    console.log(data);

    try {
      const res = await axios.post(`${BASE_URL}/leaves`, data);

      if (res.status === 201) {
        toast.success("Added successfully");
        reset();
        getLeaves();
      }
    } catch (error) {
      toast.error("Failed adding leaveType");
    }
  };

  useEffect(() => {
    getLeaves();
    getleavetype();
    getDepartment();
  }, []);

  return (
    <div className="w-full max-h-[90vh] bg-background2 flex flex-col gap-2 dark:bg-primary1 p-2 overflow-y-auto">
      <div className=" bg-background1 dark:bg-secondary1  rounded-lg w-full p-4 text-sm">
        <div className=" border-b border-gray-200 pb-2">
          <h1 className=" text-2xl font-bold      ">Apply Leave</h1>
          <p className=" text-gray-500 text-sm">Apply for leaves here</p>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className=" grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1  gap-4 mt-4 mb-5 ">
            <div className=" flex flex-col gap-2 ">
              <label>Leave Type</label>
              <select
                {...register("leaveType")}
                id="clientname"
                className={` hover:border-gray-400 dark:bg-secondary1 dark:border-primary1 ease-in-out duration-500 py-2 pl-3 border rounded-md border-gray-200 placeholder:text-sm  text-sm  `}
              >
                <option value="">Select</option>
                {leavetypes.map((e) => {
                  return <option value={e.leaveType}>{e.leaveType}</option>;
                })}
              </select>
              <p className=" pl-2 text-xs text-red-500 font-semibold">
                {errors.leaveType?.message}
              </p>
            </div>
            <div className=" flex flex-col gap-2">
              <label>Department</label>
              <select
                {...register("department", { required: true })}
                id="clientname"
                className={`hover:border-gray-400 dark:bg-secondary1 dark:border-primary1 ease-in-out duration-500 py-2 pl-3 border rounded-md border-gray-200 placeholder:text-sm  text-sm  `}
              >
                <option className="dark:text-white" value="">
                  Select
                </option>
                {department.map((e) => {
                  return <option value={e.department}>{e.department}</option>;
                })}
              </select>
              <p className=" pl-2 text-xs text-red-500 font-semibold">
                {errors.department?.message}
              </p>
            </div>
            <div className=" flex flex-col gap-2">
              <label>Count</label>
              <input
                {...register("count", { required: true })}
                className=" hover:border-gray-400 dark:hover:border-gray-600 dark:border-primary1 dark:border-[0.2px] dark:bg-secondary1    ease-in-out duration-500 py-2 px-3 border rounded-md border-gray-200 placeholder:text-sm  text-sm"
                type="text"
                placeholder="days"
              />
              <p className=" pl-2 text-xs text-red-500 font-semibold">
                {errors.count?.message}
              </p>
            </div>
            <div className=" flex flex-col gap-2">
              <label>From Date</label>
              <input
                {...register("fromDate")}
                className=" hover:border-gray-400 dark:hover:border-gray-600 dark:border-primary1 dark:border-[0.2px] dark:bg-secondary1    ease-in-out duration-500 py-2 px-3 border rounded-md border-gray-200 placeholder:text-sm  text-sm"
                type="date"
                placeholder="holiday"
              />
              <p className=" pl-2 text-xs text-red-500 font-semibold">
                {errors.fromDate?.message}
              </p>
            </div>
            <div className=" flex flex-col gap-2">
              <label>To Date</label>
              <input
                {...register("toDate")}
                className=" hover:border-gray-400 dark:hover:border-gray-600 dark:border-primary1 dark:border-[0.2px] dark:bg-secondary1    ease-in-out duration-500 py-2 px-3 border rounded-md border-gray-200 placeholder:text-sm  text-sm"
                type="date"
                placeholder="holiday"
              />
              <p className=" pl-2 text-xs text-red-500 font-semibold">
                {errors.toDate?.message}
              </p>
            </div>
            <div className=" flex flex-col gap-2 col-span-2">
              <label>Reason</label>
              <textarea
                {...register("reason")}
                className=" dark:hover:border-gray-600 dark:border-primary1 dark:border-[0.2px] dark:bg-secondary1 hover:border-gray-400 ease-in-out duration-500 py-2 pl-3 border rounded-md border-gray-200 text-sm placeholder:text-sm  "
                placeholder=" address"
              />
              <p className=" pl-2 text-xs text-red-500 font-semibold">
                {errors.reason?.message}
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

      <div className="bg-background1 dark:bg-secondary1 md:p-4 p-2 rounded-md shadow-lg ">
        <div className="space-y-3 sm:space-y-0 sm:flex justify-between items-center">
          <div>
            <h1 className=" text-2xl font-bold     ">My leaves</h1>
            <p className="text-xs text-muted-foreground">
              Here&apos;s a list of leave types.
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
        <div className="overflow-auto mt-4 border  rounded-lg">
          {loading ? (
            <div className="w-full flex items-center justify-center h-[65vh]">
              <img src="" className="w-[5rem]" alt="Loading..." />
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
  );
};

export default ApplyLeave;
