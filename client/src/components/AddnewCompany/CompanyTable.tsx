import { BASE_URL } from "../../constants";

import { useMemo } from "react";


import { COLUMNS } from "./columns";

import axios from "axios";
import TableWrapper from "../ui/TableWrapper";
import { useQuery } from "@tanstack/react-query";

const CompanyTable = () => {
  const columns: any = useMemo(() => COLUMNS, []);

  const getCompanyData = async () => {
    const res = await axios.get(`${BASE_URL}/company`);
    return res.data?.data;
  };

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["company"],
    queryFn: getCompanyData,
    staleTime: Infinity,
  });

  return (
    <div className=" max-h-[90vh] max-w-[1000px]  bg-background2 dark:bg-primary1 py-2 pr-2">
      <TableWrapper
        data={data || []}
        columns={columns}
        loading={isLoading}
        refetch={refetch}
        description="Here's a list of Companies."
        title="Companies"
      />
    </div>
  );
};

export default CompanyTable;
