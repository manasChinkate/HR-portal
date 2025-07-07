// TableWrapper.tsx (React Table v8)
import React, { useMemo } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  flexRender,
  ColumnDef,
} from "@tanstack/react-table";
import GlobalFiltering from "../GlobalFiltering";
import ColumnFiltering from "../ColumnFiltering";
import { Button } from "./button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  RxChevronLeft,
  RxChevronRight,
  RxDoubleArrowLeft,
  RxDoubleArrowRight,
  RxMixerHorizontal,
} from "react-icons/rx";
import { FaFileExcel } from "react-icons/fa";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@radix-ui/react-popover";
import Checkbox from "../Checkbox";
import { exportToExcel } from "../xlsx";
import { RefreshCcw } from "lucide-react";
import { useSelector } from "react-redux";
import { RootState } from "app/store";

interface TableWrapperProps<T> {
  columns: ColumnDef<T, any>[];
  data: T[];
  loading?: boolean;
  title?: string;
  description?: string;
  refetch: () => void;
}

const TableWrapper = <T,>({
  columns,
  data,
  loading = false,
  title,
  description,
  refetch,
}: TableWrapperProps<T>) => {
  const authority = useSelector((state: RootState) => state.auth.authority);

  const table = useReactTable({
    columns,
    data,
    defaultColumn: { filterFn: ColumnFiltering },
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: { pagination: { pageIndex: 0 } },
  });

  const {
    getHeaderGroups,
    getRowModel,
    getState,
    nextPage,
    previousPage,
    setPageIndex,
    getCanNextPage,
    getCanPreviousPage,
    getPageCount,
    getPageOptions,
    getAllColumns,
    getToggleAllColumnsVisibilityHandler,
    getVisibleFlatColumns,
  } = table;

  const { globalFilter, pagination } = getState();

  return (
    <div className="bg-background1 dark:bg-secondary1 border border-background2 dark:border-gray-700 md:p-6 p-4 rounded-xl shadow-sm transition-colors duration-200">
      {/* Header Section */}
      <div className="space-y-4 sm:space-y-0 sm:flex justify-between items-start mb-6">
        <div className="space-y-1">
          {title && (
            <h1 className="text-2xl font-bold text-primary1 dark:text-white">
              {title}
            </h1>
          )}
          {description && (
            <p className="text-sm text-primary1/70 dark:text-gray-400 leading-relaxed">
              {description}
            </p>
          )}
        </div>

        <div className="flex items-center gap-3">
          <Tooltip>
            <TooltipTrigger>
              <Button
                onClick={refetch}
                className="hidden sm:flex items-center justify-center size-10 bg-background2 dark:bg-blue-900/20 hover:bg-background2/80 dark:hover:bg-blue-900/30 rounded-lg transition-colors duration-200 group"
                title="Refresh Data"
              >
                <RefreshCcw className="text-lg text-blue-600 dark:text-blue-400 group-hover:text-blue-700 dark:group-hover:text-blue-300 transition-colors duration-200" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Refresh Data</p>
            </TooltipContent>
          </Tooltip>

          {authority === "Admin" && (
            <Tooltip>
              <TooltipTrigger>
                <Button
                  onClick={() =>
                    exportToExcel(
                      getVisibleFlatColumns().map((col) => ({
                        label: col.id,
                        value: col.id,
                      })),
                      getRowModel().rows.map((row) => row.original),
                      "dataSheet"
                    )
                  }
                  className="hidden sm:flex items-center justify-center size-10 bg-background2 dark:bg-green-900/20 hover:bg-background2/80 dark:hover:bg-green-900/30 rounded-lg transition-colors duration-200 group"
                >
                  <FaFileExcel className="text-lg text-green-600 dark:text-green-400 group-hover:text-green-700 dark:group-hover:text-green-300 transition-colors duration-200" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Export to Excel</p>
              </TooltipContent>
            </Tooltip>
          )}

          <Tooltip>
            <TooltipTrigger>
              <Popover>
                <PopoverTrigger>
                  <Button
                    variant="outline"
                    size="sm"
                    className="hidden lg:flex h-10 px-4 bg-background1 dark:bg-primary1 border-background2 dark:border-gray-600 hover:bg-background2 dark:hover:bg-gray-700 text-primary1 dark:text-gray-300 transition-colors duration-200"
                  >
                    <RxMixerHorizontal className="mr-2 h-4 w-4" />
                    Columns
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="bg-background1 dark:bg-primary1 border border-background2 dark:border-gray-600 py-3 px-4 text-sm shadow-xl rounded-lg min-w-[200px]">
                  <div className="font-semibold py-2 flex items-center gap-3 text-primary1 dark:text-white border-b border-background2 dark:border-gray-600 mb-3">
                    <Checkbox {...getToggleAllColumnsVisibilityHandler()} />
                    <span>Toggle All</span>
                  </div>
                  <div className="max-h-[40vh] overflow-auto space-y-2">
                    {getAllColumns().map((col) => (
                      <div key={col.id} className="flex items-center gap-3 py-1">
                        <input
                          type="checkbox"
                          {...col.getToggleVisibilityHandler()}
                          className="rounded border-background2 dark:border-gray-600 text-blue-600 focus:ring-blue-500 dark:bg-gray-700"
                        />
                        <label className="text-primary1 dark:text-gray-300 cursor-pointer select-none">
                          {col.id}
                        </label>
                      </div>
                    ))}
                  </div>
                </PopoverContent>
              </Popover>
            </TooltipTrigger>
            <TooltipContent>
              <p>Column Visibility</p>
            </TooltipContent>
          </Tooltip>

          <GlobalFiltering
            filter={globalFilter}
            setFilter={table.setGlobalFilter}
          />
        </div>
      </div>

      {/* Table */}
      <div className="border border-background2 dark:border-gray-700 rounded-lg overflow-hidden bg-background1 dark:bg-primary1 shadow-sm">
        {loading ? (
          <div className="w-full flex items-center justify-center h-[65vh] bg-background2 dark:bg-primary1">
            <div className="flex flex-col items-center gap-3">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 dark:border-blue-400"></div>
              <span className="text-primary1/70 dark:text-gray-400 text-sm">
                Loading...
              </span>
            </div>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-primary1">
                {getHeaderGroups().map((headerGroup) => (
                  <tr
                    key={headerGroup.id}
                    className="border-b border-background2 dark:border-gray-600"
                  >
                    {headerGroup.headers.map((header) => (
                      <th
                        key={header.id}
                        className="whitespace-nowrap px-6 py-3 text-left text-xs font-semibold text-white dark:text-gray-300 uppercase tracking-wider hover:bg-primary1/90 dark:hover:bg-gray-600/50 transition-colors duration-150 cursor-pointer"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            {flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                          </div>
                        </div>
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody className="bg-background1 dark:bg-primary1 divide-y divide-background2 dark:divide-gray-700">
                {getRowModel().rows.length === 0 ? (
                  <tr>
                    <td
                      colSpan={getVisibleFlatColumns().length}
                      className="text-center p-12 text-primary1/70 dark:text-gray-400"
                    >
                      <div className="flex flex-col items-center gap-3">
                        <div className="w-12 h-12 bg-background2 dark:bg-gray-700 rounded-full flex items-center justify-center">
                          <span className="text-primary1/50 dark:text-gray-500 text-xl">
                            📊
                          </span>
                        </div>
                        <div>
                          <p className="font-medium">No data available</p>
                          <p className="text-sm text-primary1/50 dark:text-gray-500">
                            There are no records to display
                          </p>
                        </div>
                      </div>
                    </td>
                  </tr>
                ) : (
                  getRowModel().rows.map((row) => (
                    <tr
                      key={row.id}
                      className="hover:bg-background2 dark:hover:bg-gray-700/50 transition-colors duration-150 bg-background2/50 dark:bg-secondary1"
                    >
                      {row.getVisibleCells().map((cell) => (
                        <td
                          key={cell.id}
                          className="px-6 py-2 text-sm text-primary1 dark:text-gray-100"
                        >
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </td>
                      ))}
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Pagination Section */}
      <div className="flex flex-col sm:flex-row justify-between items-center mt-6 gap-4">
        <div className="flex items-center gap-6 text-sm text-primary1/70 dark:text-gray-400">
          <span className="flex items-center gap-1">
            Page
            <strong className="text-primary1 dark:text-white mx-1">
              {pagination.pageIndex + 1}
            </strong>
            of
            <strong className="text-primary1 dark:text-white ml-1">
              {getPageCount()}
            </strong>
          </span>
          <div className="flex items-center gap-2">
            <label className="text-sm">Go to page:</label>
            <input
              type="number"
              defaultValue={pagination.pageIndex + 1}
              onChange={(e) => {
                const page = e.target.value ? Number(e.target.value) - 1 : 0;
                setPageIndex(page);
              }}
              className="w-16 px-2 py-1 text-sm border border-background2 dark:border-gray-600 rounded-md bg-background1 dark:bg-primary1 text-primary1 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition-colors duration-200"
              min={1}
              max={getPageCount()}
            />
          </div>
        </div>

        <div className="flex items-center gap-1">
          <Button
            variant="outline"
            className="h-9 w-9 p-0 border-background2 dark:border-gray-600 hover:bg-background2 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={() => setPageIndex(0)}
            disabled={!getCanPreviousPage()}
            title="First page"
          >
            <RxDoubleArrowLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            className="h-9 w-9 p-0 border-background2 dark:border-gray-600 hover:bg-background2 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={() => previousPage()}
            disabled={!getCanPreviousPage()}
            title="Previous page"
          >
            <RxChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            className="h-9 w-9 p-0 border-background2 dark:border-gray-600 hover:bg-background2 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={() => nextPage()}
            disabled={!getCanNextPage()}
            title="Next page"
          >
            <RxChevronRight className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            className="h-9 w-9 p-0 border-background2 dark:border-gray-600 hover:bg-background2 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={() => setPageIndex(getPageCount() - 1)}
            disabled={!getCanNextPage()}
            title="Last page"
          >
            <RxDoubleArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TableWrapper;
