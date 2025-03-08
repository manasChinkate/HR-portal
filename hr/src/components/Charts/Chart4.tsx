import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { BASE_URL } from "@/constants";
import { useSelector } from "react-redux";
import { RootState } from "app/store";

const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff8042", "#ffbb28"];

interface LeaveType {
  leaveType: string;
  count: string;
}

interface Employee {
  employeeId: string;
  pendingLeave: LeaveType[];
}

const Chart4: React.FC = () => {
  const employeeId = useSelector((state: RootState) => state.auth.userId);

  const [leaveData, setLeaveData] = useState<LeaveType[]>([]);

  const fetchLeaveData = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/employee`);
      const employees: Employee[] = res.data;

      // Assuming we want to show leave data for a specific employee
      const specificEmployee = employees?.find(
        (e) => e.employeeId == employeeId
      ); // Change index as per requirement
      setLeaveData(specificEmployee.pendingLeave);
    } catch (error) {
      console.error("Error fetching leave data:", error);
    }
  };

  useEffect(() => {
    fetchLeaveData();
  }, []);

  return (
    <div className="bg-white">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-gray-800 dark:text-gray-200">
          Leaves Remaining
        </CardTitle>

        <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 justify-stretch">
          {leaveData.map((e, key) => {
            return (
              <button className="  py-8 rounded-lg border  ">
                <p className="text-sm  text-muted-foreground">{e.leaveType}</p>
                <span className="text-lg font-bold leading-none sm:text-3xl">
                  {e.count}
                </span>
              </button>
            );
          })}
        </div>
      </CardHeader>
      <CardContent></CardContent>
    </div>
  );
};

export default Chart4;
