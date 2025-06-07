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
import TableWrapper from "@/components/ui/TableWrapper";
import { useQuery } from "@tanstack/react-query";
import { fetchManageleaves } from "./services";

// type Inputs = {
//   _id: string;
//   name: string;
//   email: string;
//   leaveType: string;
//   count: string;
//   department: string;
//   from_date: string;
//   to_date: string;
//   reason: string;
//   status: string;
//   companyName: string;
//   createdAt: string;
//   __v: number;
// };



const ManageLeave = () => {
  const columns: any = useMemo(() => COLUMNS, []);

  const { data, isLoading } = useQuery({
    queryKey: ["manageleave"],
    queryFn: fetchManageleaves,
    staleTime:Infinity
  });

  return (
    <div className="w-full h-[90vh] dark:bg-primary1 bg-background2 py-2 pr-2 ">
      <TableWrapper
        data={data || []}
        loading={isLoading}
        columns={columns}
        description="Here's a list of Leaves."
        title="Manage Leaves"
      />
    </div>
  );
};

export default ManageLeave;
