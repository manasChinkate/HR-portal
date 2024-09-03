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


type Inputs = {
    designation: string
}

const AddDesignation = () => {
    const [desigantion, setDesignation] = useState<Inputs[]>([])
    const [loading, setloading] = useState(true)
    const {
        register,
        handleSubmit,
        watch,
        reset,
        formState: { errors },
    } = useForm<Inputs>()


    const columns: any = useMemo(() => COLUMNS, []);
    const data = useMemo(() => desigantion, [desigantion]);

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

    const getDesignation = async () => {
        try {
            const res = await axios.get(`${BASE_URL}/designation`);
            // Handle the response, e.g., store in state or display the data
            console.log(res.data);
            setDesignation(res.data)
            setloading(false)

        } catch (error) {
            // Handle any errors that occur during the request
            console.error('Error fetching Designations:', error);
        }
    }

    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        console.log(data)
        const formdata = {
            ...data,
            companyName: companyName
        }

        const res = await axios.post(`${BASE_URL}/designation`, formdata)

        if (res.status === 201) {
            reset()
            getDesignation()
        }
    }

    useEffect(() => {
        getDesignation()
    }, [])

    return (
        <div className='w-full max-h-[90vh] bg-[#e5e7ec] p-2 overflow-y-auto'>
            <div className=' bg-white  rounded-lg w-full p-4 text-sm' >

                <div className=' border-b border-gray-200 pb-2'>
               
                    <h1 className=' text-2xl font-bold     '>Add Designation</h1>
                    <p className=' text-gray-500 text-sm'>Add new designations for your employees</p>
                </div>
                <form onSubmit={handleSubmit(onSubmit)} >
                    <div className=' grid md:grid-cols-3 sm:grid-cols-2  gap-4 mt-4 mb-5 '>

                        {/* <p className=' col-span-full border-b-2 pb-1 font-semibold'>Add Details</p> */}
                        <div className=' flex flex-col gap-2'>
                            <label>Add Designation</label>
                            <input
                                {...register("designation")}
                                className=' hover:border-gray-400    ease-in-out duration-500 py-2 px-3 border rounded-md border-gray-200 placeholder:text-sm  text-sm' type='text' placeholder='designation'></input>
                        </div>
                    </div>
                    <Button type='submit'>
                        Add Designation
                    </Button>
                </form>
            </div>
            <div className="bg-white md:p-4 p-2 rounded-md shadow-lg my-4">
                <div className="space-y-3 sm:space-y-0 sm:flex justify-between items-center">
                    <div>
                        <h1 className=' text-2xl font-bold     '>Designation List</h1>
                        <p className="text-xs text-muted-foreground">
                            Here&apos;s a list of Designations.
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
                                        className="ml-auto hidden h-8 lg:flex"
                                    >
                                        <RxMixerHorizontal className="mr-2 h-4 w-4" />
                                        View
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="bg-white py-2 px-3 text-[0.8rem] shadow-lg rounded-md">
                                    <div className=" bg-gray-50 font-semibold py-1 flex items-center gap-2">
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
                            <strong className="text-sm text-black">
                                {pageIndex + 1} - {pageOptions.length}
                            </strong>
                            {` `}
                            of <strong className="text-sm text-black">
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
                                className="w-[50px] border-gray-400 border-[1px] border-solid rounded-sm p-[0.1rem_0.3rem] text-[0.8rem]"
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

export default AddDesignation