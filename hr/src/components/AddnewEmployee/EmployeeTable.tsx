import { useMemo } from "react";

import "../table.css";

import { COLUMNS } from "./columns";

import { useQuery } from "@tanstack/react-query";
import TableWrapper from "../ui/TableWrapper";
import { fetchEmployees } from "./services";

const EmployeeTable = () => {
  const columns: any = useMemo(() => COLUMNS, []);

  const { data, isLoading,refetch } = useQuery({
    queryKey: ["employees"],
    queryFn: fetchEmployees,
    staleTime: Infinity,
  });

  return (
    <div className="w-full max-h-[90vh] bg-background2 flex flex-col gap-2 dark:bg-primary1 py-2 pr-2 overflow-y-auto">
      <TableWrapper
        data={data || []}
        loading={isLoading}
        columns={columns}
        description="Here's a list of Employees."
        title="Employee Management"
        refetch={refetch}
      />
    </div>
  );
};

export default EmployeeTable;
