import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "@/components/ui/card";
import { BASE_URL } from "@/constants";
import { Users } from "lucide-react";
import { Badge } from "../ui/badge";
import { Progress } from "../ui/progress";

interface ILeaveType {
  _id: string;
  leaveType: string;
  count: string; // or number if it should be numeric
  companyId: string;
  createdAt: string | Date;
  __v: number;
}

interface IPendingLeave {
  _id: string;
  leaveType: ILeaveType; // Embedded leaveType object
  count: string; // or number if it should be numeric
  // Add other fields if they exist in your actual data
}

const Chart4: React.FC = () => {
  const [leaveData, setLeaveData] = useState<IPendingLeave[]>([]);

  const fetchLeaveData = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/leaves/pending`);

      setLeaveData(res.data.data);
      console.log(res.data.data);
    } catch (error) {
      console.error("Error fetching leave data:", error);
    }
  };
  const leaveBalances = [
    {
      type: "Sick Leave",
      remaining: 8,
      total: 12,
      used: 4,
      color: "bg-red-500",
    },
    {
      type: "Casual Leave",
      remaining: 6,
      total: 10,
      used: 4,
      color: "bg-blue-500",
    },
    {
      type: "Annual Leave",
      remaining: 15,
      total: 21,
      used: 6,
      color: "bg-green-500",
    },
    {
      type: "Maternity/Paternity",
      remaining: 90,
      total: 90,
      used: 0,
      color: "bg-purple-500",
    },
    {
      type: "Compensatory Off",
      remaining: 3,
      total: 5,
      used: 2,
      color: "bg-orange-500",
    },
  ];

  useEffect(() => {
    fetchLeaveData();
  }, []);

  return (
    <>
      {/* <CardHeader className="p-0">
        <CardTitle className="text-lg font-semibold text-gray-800 dark:text-gray-200 ">
          Leaves Remaining
        </CardTitle>
      </CardHeader>
      <CardContent className=" p-0">
        {leaveData.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {leaveData.map((e, key) => (
              <Card className="@container/card  bg-background1 dark:bg-secondary1">
                <CardHeader>
                  <CardDescription>{e.leaveType}</CardDescription>
                  <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
                    {e.count} Day
                  </CardTitle>
                  <CardAction></CardAction>
                </CardHeader>
              </Card>
            ))}
          </div>
        ) }
      </CardContent> */}
      <Card className="h-fit bg-background1 dark:bg-secondary1">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5 text-green-500" />
            Leave Balances
          </CardTitle>
          <CardDescription>
            Your remaining leave days by category
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {leaveData.map((leave, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-medium text-gray-900 dark:text-gray-100">
                    {leave.leaveType.leaveType}
                  </span>
                  <span className="text-sm text-gray-600">
                    {leave.count}/{leave.leaveType.count} days
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Progress
                    value={(+leave.count / +leave.leaveType.count) * 100}
                    className="flex-1 h-2"
                  />
                  <Badge variant="outline" className="text-xs">
                    {+leave.leaveType.count - +leave.count} used
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default Chart4;
