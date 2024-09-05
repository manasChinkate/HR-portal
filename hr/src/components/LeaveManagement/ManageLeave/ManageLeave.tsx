import { Button } from '../../ui/button';
import axios from 'axios'
import { useForm, SubmitHandler } from 'react-hook-form'
import { BASE_URL } from '../../../constants';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../app/store'
import { useEffect, useMemo, useState } from 'react';
import { exportToExcel } from "../../xlsx";
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

import { COLUMNS } from "./columns";
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
import Checkbox from '../../Checkbox';
import toast from 'react-hot-toast';


type Inputs = {
    leavetype: string;
    count: string;
}

const ManageLeave = () => {
    const [leaves, setLeaves] = useState<Inputs[]>([])
    const [loading, setloading] = useState(true)
    const {
        register,
        handleSubmit,
        watch,
        reset,
        formState: { errors },
    } = useForm<Inputs>()


    const columns: any = useMemo(() => COLUMNS, []);
    const data = useMemo(() => leaves, [leaves]);

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


    const companyName = useSelector((state: RootState) => state.auth.companyName)

    const getLeaves = async () => {
        try {
            const res = await axios.get(`${BASE_URL}/getclient`);
            // Handle the response, e.g., store in state or display the data
            console.log(res.data);
            setLeaves(res.data.clients)
            setloading(false)

        } catch (error) {
            // Handle any errors that occur during the request
            console.error('Error fetching Clients:', error);
            toast.error('error')
        }
    }



    useEffect(() => {
        getLeaves()
    }, [])

    return (
        <div className='w-full min-h-[90vh] bg-[#e5e7ec] dark:bg-primary1 p-2 overflow-y-auto'>


            <div className="bg-white dark:bg-secondary1 md:p-4 p-2 rounded-md shadow-lg ">
                <div className="space-y-3 sm:space-y-0 sm:flex justify-between items-center">
                    <div>
                        <h1 className=' text-2xl font-bold     '>Manage Leave</h1>
                        <p className="text-xs text-muted-foreground">
                            Here&apos;s a list of applided leaves.
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

export default ManageLeave