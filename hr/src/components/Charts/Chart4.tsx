import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { BASE_URL } from "@/constants";
import { useSelector } from "react-redux";
import { RootState } from "app/store";

export interface PendingLeave {
  leaveType: string;
  count: string;
  _id: string;
}

const Chart4: React.FC = () => {
  const [leaveData, setLeaveData] = useState<PendingLeave[]>([]);

  const fetchLeaveData = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/leaves/pending`);

      setLeaveData(res.data.data);
    } catch (error) {
      console.error("Error fetching leave data:", error);
    }
  };

  useEffect(() => {
    fetchLeaveData();
  }, []);

  return (
    <>
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-gray-800 dark:text-gray-200">
          Leaves Remaining
        </CardTitle>
      </CardHeader>
      <CardContent>
        {leaveData.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {leaveData.map((e, key) => (
              <Card key={key} className="text-center">
                <CardHeader>
                  <p className="text-sm text-muted-foreground">{e.leaveType}</p>
                </CardHeader>
                <CardContent>
                  <span className="text-lg font-bold leading-none sm:text-3xl">
                    {e.count}
                  </span>
                </CardContent>
              </Card>
              // <button

              //   key={key}
              //   className="py-8 bg-background1 rounded-lg border "
              // >
              //   <p className="text-sm text-muted-foreground">{e.leaveType}</p>
              //   <span className="text-lg font-bold leading-none sm:text-3xl">
              //     {e.count}
              //   </span>
              // </button>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500">No leave data available</p>
        )}
      </CardContent>
    </>
  );
};

export default Chart4;
