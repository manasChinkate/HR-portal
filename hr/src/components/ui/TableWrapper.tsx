// components/TableWrapper.tsx
import {
  useTable,
  useSortBy,
  useGlobalFilter,
  useFilters,
  usePagination,
} from "react-table";
import { useMemo } from "react";
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

interface TableWrapperProps {
  columns: any;
  data: any[];
  loading?: boolean;
  title?: string;
  description?: string;
  queryKey?:string,
  refetch:()=>void
}

const TableWrapper = ({
  columns,
  data,
  loading = false,
  title,
  description,
  refetch
}: TableWrapperProps) => {
  const defaultColumn = useMemo(() => ({ Filter: ColumnFiltering }), []);
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    state,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    pageOptions,
    gotoPage,
    pageCount,
    setGlobalFilter,
    allColumns,
    getToggleHideAllColumnsProps,
    visibleColumns,
    rows,
  } = useTable(
    {
      columns,
      data,
      defaultColumn,
      initialState: { pageIndex: 0 },
    },
    useFilters,
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  const { globalFilter, pageIndex } = state;

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

        {/* Action Controls */}
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

          {/* Excel Export Button */}
          <Tooltip>
            <TooltipTrigger>
              <Button
                onClick={() =>
                  exportToExcel(
                    visibleColumns.map((col) => ({
                      label: col.Header,
                      value: col.id,
                    })),
                    rows.map((row) => row.original),
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

          {/* Column Visibility Popover */}
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
                    <Checkbox {...getToggleHideAllColumnsProps()} />
                    <span>Toggle All</span>
                  </div>
                  <div className="max-h-[40vh] overflow-auto space-y-2">
                    {allColumns.map((column) => (
                      <div
                        key={column.id}
                        className="flex items-center gap-3 py-1"
                      >
                        <input
                          type="checkbox"
                          {...column.getToggleHiddenProps()}
                          className="rounded border-background2 dark:border-gray-600 text-blue-600 focus:ring-blue-500 dark:bg-gray-700"
                        />
                        <label className="text-primary1 dark:text-gray-300 cursor-pointer select-none">
                          {column.Header}
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

          {/* Global Filter */}
          <GlobalFiltering filter={globalFilter} setFilter={setGlobalFilter} />
        </div>
      </div>

      {/* Table Container */}
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
            <table {...getTableProps()} className="w-full">
              {/* Table Header */}
              <thead className="bg-primary1 ">
                {headerGroups.map((headerGroup) => (
                  <tr
                    {...headerGroup.getHeaderGroupProps()}
                    className="border-b border-background2 dark:border-gray-600"
                  >
                    {headerGroup.headers.map((column) => (
                      <th
                        {...column.getHeaderProps(
                          column.getSortByToggleProps()
                        )}
                        className="whitespace-nowrap px-6 py-3 text-left text-xs font-semibold text-white dark:text-gray-300 uppercase tracking-wider hover:bg-primary1/90 dark:hover:bg-gray-600/50 transition-colors duration-150 cursor-pointer"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            {column.render("Header")}
                            <span className="text-white/50 dark:text-gray-500">
                              {column.isSorted ? (
                                column.isSortedDesc ? (
                                  <span className="text-yellow-400 dark:text-blue-400">
                                    ↓
                                  </span>
                                ) : (
                                  <span className="text-yellow-400 dark:text-blue-400">
                                    ↑
                                  </span>
                                )
                              ) : (
                                <span className="opacity-0 group-hover:opacity-100">
                                  ↕
                                </span>
                              )}
                            </span>
                          </div>
                          {column.canFilter && (
                            <div className="ml-2">
                              {column.render("Filter")}
                            </div>
                          )}
                        </div>
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>

              {/* Table Body */}
              <tbody
                {...getTableBodyProps()}
                className="bg-background1 dark:bg-primary1 divide-y divide-background2 dark:divide-gray-700"
              >
                {page.length === 0 ? (
                  <tr>
                    <td
                      colSpan={columns.length}
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
                  page.map((row, index) => {
                    prepareRow(row);
                    return (
                      <tr
                        {...row.getRowProps()}
                        className={`hover:bg-background2 dark:hover:bg-gray-700/50 transition-colors duration-150 
                    bg-background2/50 dark:bg-secondary1
                    }`}
                      >
                        {row.cells.map((cell) => (
                          <td
                            {...cell.getCellProps()}
                            className="px-6 py-2 text-sm text-primary1 dark:text-gray-100"
                          >
                            {cell.render("Cell")}
                          </td>
                        ))}
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Pagination Section */}
      <div className="flex flex-col sm:flex-row justify-between items-center mt-6 gap-4">
        {/* Page Info */}
        <div className="flex items-center gap-6 text-sm text-primary1/70 dark:text-gray-400">
          <span className="flex items-center gap-1">
            Page
            <strong className="text-primary1 dark:text-white mx-1">
              {pageIndex + 1}
            </strong>
            of
            <strong className="text-primary1 dark:text-white ml-1">
              {pageOptions.length}
            </strong>
          </span>

          <div className="flex items-center gap-2">
            <label className="text-sm">Go to page:</label>
            <input
              type="number"
              defaultValue={pageIndex + 1}
              onChange={(e) => {
                const pageNumber = e.target.value
                  ? Number(e.target.value) - 1
                  : 0;
                gotoPage(pageNumber);
              }}
              className="w-16 px-2 py-1 text-sm border border-background2 dark:border-gray-600 rounded-md bg-background1 dark:bg-primary1 text-primary1 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition-colors duration-200"
              min="1"
              max={pageOptions.length}
            />
          </div>
        </div>

        {/* Pagination Controls */}
        <div className="flex items-center gap-1">
          <Button
            variant="outline"
            className="h-9 w-9 p-0 border-background2 dark:border-gray-600 hover:bg-background2 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={() => gotoPage(0)}
            disabled={!canPreviousPage}
            title="First page"
          >
            <RxDoubleArrowLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            className="h-9 w-9 p-0 border-background2 dark:border-gray-600 hover:bg-background2 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={previousPage}
            disabled={!canPreviousPage}
            title="Previous page"
          >
            <RxChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            className="h-9 w-9 p-0 border-background2 dark:border-gray-600 hover:bg-background2 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={nextPage}
            disabled={!canNextPage}
            title="Next page"
          >
            <RxChevronRight className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            className="h-9 w-9 p-0 border-background2 dark:border-gray-600 hover:bg-background2 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={() => gotoPage(pageCount - 1)}
            disabled={!canNextPage}
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
