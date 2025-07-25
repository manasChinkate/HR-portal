import { useSelector } from "react-redux";
import { RootState } from "../../../app/store";
import { useMemo } from "react";

import { COLUMN1 } from "./columns";

import TableWrapper from "@/components/ui/TableWrapper";
import { useQuery } from "@tanstack/react-query";
import { fetchTimesheet } from "./services";
import { Button } from "../../components/ui/button";
import { Link } from "react-router-dom";

const TimesheetTable = () => {
  const authority = useSelector((state: RootState) => state.auth.authority);

  const columns: any = useMemo(() => COLUMN1, [COLUMN1]);

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["timesheet"],
    queryFn: fetchTimesheet,
    staleTime: Infinity,
  });

  // if(isLoading) return <p>Loading....</p>
  return (
    <div className="w-full h-[90vh] dark:bg-primary1 gap-2 bg-background2 py-2 pr-2 overflow-y-auto">
      {/* <div className="bg-background1 md:p-4 p-2 rounded-md  dark:bg-secondary1 shadow-lg"> */}
      {/* <div className=" flex items-center ">
        {authority !== "Admin" && (
          <Link to={"/timesheet/view"}>
            <Button
              type="button"
              className="flex items-center gap-2 dark:bg-black dark:text-white dark:shadow-[#1f1f1f] dark:shadow-md w-fit"
            >
              Back
            </Button>
          </Link>
        )}
      </div> */}
      <TableWrapper
        data={data || []}
        loading={isLoading}
        columns={columns}
        description="Here's a list of Timesheets."
        title="Timesheet Management"
        refetch={refetch}
      />
      {/* </div> */}
    </div>
  );
};

export default TimesheetTable;
