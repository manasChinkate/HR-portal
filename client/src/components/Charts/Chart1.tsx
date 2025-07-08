"use client";

import { Bar, BarChart, XAxis } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useQuery } from "@tanstack/react-query";
import { fetchHoliday } from "../MainMaster/services/masterServices";
import { Calendar } from "lucide-react";
import { Badge } from "../ui/badge";

const chartData = [
  { date: "2024-07-15", running: 450, swimming: 300 },
  { date: "2024-07-16", running: 380, swimming: 420 },
  { date: "2024-07-17", running: 520, swimming: 120 },
  { date: "2024-07-18", running: 140, swimming: 550 },
  { date: "2024-07-19", running: 600, swimming: 350 },
  { date: "2024-07-20", running: 480, swimming: 400 },
];

const chartConfig = {
  running: {
    label: "Running",
    color: "hsl(var(--chart-1))",
  },
  swimming: {
    label: "Swimming",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

const formatDateRange = (from: string, to: string) => {
  const fromDate = new Date(from).toLocaleDateString();
  const toDate = new Date(to).toLocaleDateString();
  return from === to ? fromDate : `${fromDate} - ${toDate}`;
};

const Chart1 = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["holiday"],
    queryFn: fetchHoliday,
    staleTime: Infinity,
  });

  const currentDate = new Date();
  const currentMonth = currentDate.toLocaleString("default", { month: "long" });

  const filterCurrentMonthHolidays = (holidayData: any[] = []) => {
    const currentDate = new Date();
    const currentMonthIndex = currentDate.getMonth(); // 0-based index (June = 5)
    const currentYear = currentDate.getFullYear();

    const startOfMonth = new Date(currentYear, currentMonthIndex, 1);
    const endOfMonth = new Date(currentYear, currentMonthIndex + 1, 0);

    console.log("Current Month Range:", {
      startOfMonth,
      endOfMonth,
    });

    return holidayData.filter((holiday) => {
      if (!holiday?.fromDate || !holiday?.toDate) return false;

      const fromDate = new Date(holiday.fromDate);
      const toDate = new Date(holiday.toDate);

      // Validate date parsing
      if (isNaN(fromDate.getTime()) || isNaN(toDate.getTime())) {
        console.warn("Invalid holiday date format:", holiday);
        return false;
      }

      // Check if any part of the holiday overlaps with the current month
      const isInCurrentMonth =
        (fromDate >= startOfMonth && fromDate <= endOfMonth) ||
        (toDate >= startOfMonth && toDate <= endOfMonth) ||
        (fromDate <= startOfMonth && toDate >= endOfMonth);
      console.log("isisisis", isInCurrentMonth);
      return isInCurrentMonth;
    });
  };

  const holidayData = filterCurrentMonthHolidays(data);

  const getHolidayDuration = (fromDate: string, toDate: string) => {
    const from = new Date(fromDate);
    const to = new Date(toDate);
    const diffTime = Math.abs(to.getTime() - from.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
  };

  const getHolidayBadgeColor = (fromDate: string, toDate: string) => {
    const duration = getHolidayDuration(fromDate, toDate);
    if (duration === 1) {
      return "bg-blue-100 text-blue-800 hover:bg-blue-200";
    } else if (duration <= 3) {
      return "bg-green-100 text-green-800 hover:bg-green-200";
    } else {
      return "bg-purple-100 text-purple-800 hover:bg-purple-200";
    }
  };

  return (
    <Card className="h-full bg-background1 dark:bg-secondary1">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="h-5 w-5 text-blue-500" />
          Holidays - {currentMonth}
        </CardTitle>
        <CardDescription>
          Upcoming holidays and observances this month
        </CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="flex items-center justify-between p-3 bg-gray-100 rounded-lg animate-pulse"
              >
                <div className="flex-1">
                  <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
                  <div className="h-3 bg-gray-300 rounded w-1/2"></div>
                </div>
                <div className="h-6 bg-gray-300 rounded w-16"></div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {holidayData.length > 0 ? (
              holidayData.map((holiday, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 bg-background1 dark:bg-secondary1 dark:text-gray-100 rounded-lg "
                >
                  <div className="flex-1">
                    <h4 className="font-medium dark:text-white text-black">
                      {holiday.holiday}
                    </h4>
                    <p className="text-sm text-gray-500">
                      {formatDateRange(holiday.fromDate, holiday.toDate)}
                    </p>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <Badge
                      className={getHolidayBadgeColor(
                        holiday.fromDate,
                        holiday.toDate
                      )}
                    >
                      {getHolidayDuration(holiday.fromDate, holiday.toDate) ===
                      1
                        ? "Single Day"
                        : `${getHolidayDuration(
                            holiday.fromDate,
                            holiday.toDate
                          )} Days`}
                    </Badge>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-gray-500">
                <Calendar className="h-12 w-12 mx-auto mb-3 opacity-50" />
                <p>No holidays this month</p>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default Chart1;
