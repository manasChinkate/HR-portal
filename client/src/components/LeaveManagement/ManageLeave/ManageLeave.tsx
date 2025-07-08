
import {  useMemo } from "react";



import { COLUMNS } from "./columns";

import TableWrapper from "@/components/ui/TableWrapper";
import { useQuery } from "@tanstack/react-query";
import { fetchManageleaves } from "./services";




const ManageLeave = () => {
  const columns: any = useMemo(() => COLUMNS, []);

  const { data, isLoading,refetch } = useQuery({
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
        refetch={refetch}
      />
    </div>
  );
};

export default ManageLeave;
