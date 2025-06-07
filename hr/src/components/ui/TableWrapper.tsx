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

interface TableWrapperProps {
  columns: any;
  data: any[];
  loading?: boolean;
  title?: string;
  description?: string;
}

const TableWrapper = ({
  columns,
  data,
  loading = false,
  title,
  description,
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
  console.log("Loading", loading);

  return (
    <div className="bg-background1 dark:bg-secondary1 md:p-4 p-2 rounded-md shadow-lg w-full">
      <div className="space-y-3 sm:space-y-0 sm:flex justify-between items-center">
        <div>
          {title && <h1 className="text-2xl font-bold">{title}</h1>}
          {description && (
            <p className="text-xs text-muted-foreground">{description}</p>
          )}
        </div>
        <div className="sm:flex justify-between items-center gap-2">
          <FaFileExcel
            className="hidden sm:block text-[1.5rem] text-[#00b400] cursor-pointer transition duration-75 ease-in hover:text-[#4bbd4b]"
            onClick={() =>
              exportToExcel(
                visibleColumns.map((col: any) => ({
                  label: col.Header,
                  value: col.id,
                })),
                rows.map((row: any) => row.original),
                "dataSheet"
              )
            }
          />
          <Popover>
            <PopoverTrigger>
              <Button
                variant="outline"
                size="sm"
                className="hidden lg:flex h-8 dark:bg-secondary1"
              >
                <RxMixerHorizontal className="mr-2 h-4 w-4" />
                View
              </Button>
            </PopoverTrigger>
            <PopoverContent className="bg-white dark:bg-secondary1 py-2 px-3 text-sm shadow-lg rounded-md">
              <div className="font-semibold py-1 flex items-center gap-2">
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
          <GlobalFiltering filter={globalFilter} setFilter={setGlobalFilter} />
        </div>
      </div>

      {/* Table */}
      <div className="mt-4 border rounded-lg overflow-x-auto max-w-full">
        {loading ? (
          <div className="w-full flex items-center justify-center h-[65vh]">
            Loading...
          </div>
        ) : (
          <table {...getTableProps()} className="w-full">
            <thead>
              {headerGroups.map((headerGroup: any) => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column: any) => (
                    <th
                      {...column.getHeaderProps(column.getSortByToggleProps())}
                      className="whitespace-nowrap px-4 py-2 text-left"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          {column.render("Header")}
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
                  <td colSpan={columns.length} className="text-center p-4">
                    No data available
                  </td>
                </tr>
              ) : (
                page.map((row: any) => {
                  prepareRow(row);
                  return (
                    <tr {...row.getRowProps()}>
                      {row.cells.map((cell: any) => (
                        <td {...cell.getCellProps()} className="px-4 py-2">
                          {cell.render("Cell")}
                        </td>
                      ))}
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        )}
      </div>

      {/* Pagination */}
      <div className="text-sm sm:flex justify-between items-center my-2">
        <div className="flex gap-4 items-center">
          <span>
            Page{" "}
            <strong>
              {pageIndex + 1} of {pageOptions.length}
            </strong>
          </span>
          <span>
            Go to page:{" "}
            <input
              type="number"
              defaultValue={pageIndex + 1}
              onChange={(e) => {
                const pageNumber = e.target.value
                  ? Number(e.target.value) - 1
                  : 0;
                gotoPage(pageNumber);
              }}
              className="w-[50px] border-gray-400 dark:bg-secondary1 border-[1px] rounded-sm p-[0.1rem_0.3rem] text-sm"
            />
          </span>
        </div>
        <div className="flex gap-2 my-3 sm:my-0">
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
            onClick={previousPage}
            disabled={!canPreviousPage}
          >
            <RxChevronLeft />
          </Button>
          <Button
            variant="outline"
            className="h-8 w-8 p-0"
            onClick={nextPage}
            disabled={!canNextPage}
          >
            <RxChevronRight />
          </Button>
          <Button
            variant="outline"
            className="h-8 w-8 p-0"
            onClick={() => gotoPage(pageCount - 1)}
            disabled={!canNextPage}
          >
            <RxDoubleArrowRight />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TableWrapper;
