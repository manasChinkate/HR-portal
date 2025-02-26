

import { Button } from '../ui/button';
import axios from 'axios'
import { useForm, SubmitHandler } from 'react-hook-form'
import { BASE_URL } from '../../constants';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../app/store'
import { useEffect, useMemo, useState } from 'react';
import { exportToExcel } from "../xlsx";
import {
  useTable,
  useSortBy,
  useGlobalFilter,
  useFilters,
  usePagination,
} from "react-table";

import '../table.css'

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@radix-ui/react-popover";

import { COLUMNS } from "./columns";
import ColumnFiltering from "../ColumnFiltering";
import GlobalFiltering from "../GlobalFiltering";
import { FaFileExcel } from 'react-icons/fa';
import {
  RxChevronLeft,
  RxChevronRight,
  RxDoubleArrowLeft,
  RxDoubleArrowRight,
  RxMixerHorizontal,
} from "react-icons/rx";
import Checkbox from '../Checkbox';
import toast from 'react-hot-toast';


const AttendanceMark = () => {

  const [status, setStatus] = useState("Not Checked In");
  const [checkInTime, setCheckInTime] = useState(null);
  const [checkOutTime, setCheckOutTime] = useState(null);
  const [loading, setloading] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [attendace, setAttendance] = useState([])

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<Inputs>()


  const columns: any = useMemo(() => COLUMNS, []);
  const data = useMemo(() => attendace, [attendace]);

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

  const getData = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/getAttendance`);
      // Handle the response, e.g., store in state or display the data
      console.log(res.data);
      setAttendance(res.data)
      setloading(false)

    } catch (error) {
      // Handle any errors that occur during the request
      console.error('Error fetching Leaves:', error);
    }
  }



  const handleCheckIn = async () => {
    const now = new Date(); // Current date and time
    setCheckInTime(now);


    // Format the date to YYYY-MM-DD
    const formattedDate = now.toISOString().split("T")[0];

    const data = {
      checkInTime: now.toLocaleTimeString(), // Include the check-in time in HH:MM:SS format
      date: formattedDate, // Include today's date
    };

    console.log(data)

    try {
      const res = await axios.post(`${BASE_URL}/mark-in`, data)

      if (res.status === 400) {
        // toast.success(res.data)
        setStatus('Already Checked In')
      } else {
        setStatus("Present");
        toast.success("Successfully Checked In")
      }

    } catch (error) {
      toast.error("Already Checked In")
    }


    // API call to save check-in
  };

  const handleCheckOut = async () => {
    setIsModalOpen(true)
  };

  const confirmCheckOut = async () => {
    setIsModalOpen(false); // Close the modal
    // Perform the check-out logic here

    const now = new Date();
    setCheckOutTime(now);
    setStatus("Checked Out");
    // API call to save check-out

    const formattedDate = now.toISOString().split("T")[0];


    const data = {
      checkOutTime: now.toLocaleTimeString(), // Include the check-in time in HH:MM:SS format
      date: formattedDate, // Include today's date
    };
    try {
      const res = await axios.post(`${BASE_URL}/mark-out`, data)

      if(res.status === 200){
        toast.success("Success CheckOut")
        getData()
      }else(
        toast.error(res.data.message)
     
      )
      
    } catch (error) {
    
    }

    console.log("Checked out successfully!");
  };

  const cancelCheckOut = () => {
    setIsModalOpen(false); // Close the modal without checking out
  };

  useEffect(() => {
    getData()
  }, [])
  return (


    <div className='w-full max-h-[90vh] bg-background2 flex flex-col gap-2 dark:bg-primary1 p-2 overflow-y-auto'>
            <div className=' bg-background1 dark:bg-secondary1  rounded-lg w-full p-4 text-sm' >

        {isModalOpen && (
          <div onClick={() => setIsModalOpen(false)} className="fixed top-0 left-0 z-50 h-full px-2 w-screen bg-[#000000b3] flex md:items-center items-center justify-center ">
            <div className="bg-white  overflow-y-scroll dark:bg-secondary1 overflow-auto p-6 rounded-sm w-full md:w-auto">
              <h2 className="text-lg font-bold mb-4">Confirm Check Out</h2>
              <p>Are you sure you want to check out for the day?</p>
              <div className="mt-4 flex justify-end">
                <button
                  onClick={cancelCheckOut}
                  className="px-4 py-2 bg-gray-300 text-black rounded-md mr-2"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmCheckOut}
                  className="px-4 py-2 bg-red-500 text-white rounded-md"
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        )}


        <h2 className="text-lg font-bold">Daily Attendance</h2>
        <p>Status: {status}</p>
        <div className="mt-4">
          <button
            onClick={handleCheckIn}
            className="px-4 py-2 bg-green-500 text-white rounded-md mr-2 disabled:opacity-45"
            // disabled={status === "Present"}
          >
            Check In
          </button>
          <button
            onClick={handleCheckOut}
            className="px-4 py-2 bg-blue-500 text-white rounded-md disabled:opacity-45"
            // disabled={!checkInTime || status === "Checked Out"}
          >
            Check Out
          </button>
        </div>
      </div>
      <div className="bg-background1 dark:bg-secondary1 md:p-4 p-2 rounded-md shadow-lg ">
        <div className="space-y-3 sm:space-y-0 sm:flex justify-between items-center">
          <div>
            <h1 className=' text-2xl font-bold     '>My Attendance</h1>
            <p className="text-xs text-muted-foreground">
              Here&apos;s a history of your attendance.
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

  )
}

export default AttendanceMark