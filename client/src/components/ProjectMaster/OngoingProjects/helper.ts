import { differenceInSeconds, parse } from "date-fns";

type ProjectDates = {
  startDate: string | Date;
  deadline: string | Date;
};

export const calculateRemainingDays = ({
  startDate,
  deadline,
}: ProjectDates) => {
  const deadlineTime = new Date(deadline).getTime();
  const currentTime = new Date().getTime();
  const timeDifference = deadlineTime - currentTime;

  const remainingDays = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

  const formattedStartDate = new Date(startDate).toLocaleDateString("en-GB");
  const formattedDeadline = new Date(deadline).toLocaleDateString("en-GB");

  return {
    remainingDays,
    formattedStartDate,
    formattedDeadline,
  };
};

export function getTotalTime(startTime: string, endTime: string): string {
  const today = new Date().toISOString().split("T")[0]; // YYYY-MM-DD

  const start = parse(`${today} ${startTime}`, "yyyy-MM-dd HH:mm:ss", new Date());
  const end = parse(`${today} ${endTime}`, "yyyy-MM-dd HH:mm:ss", new Date());

  let diffInSeconds = differenceInSeconds(end, start);

  // Handle crossing midnight
  if (diffInSeconds < 0) {
    diffInSeconds += 24 * 60 * 60;
  }

  const hours = Math.floor(diffInSeconds / 3600);
  const minutes = Math.floor((diffInSeconds % 3600) / 60);

  let result = "";
  if (hours > 0) result += `${hours} Hour${hours > 1 ? "s" : ""} `;
  if (minutes > 0) result += `${minutes} min`;

  return result.trim(); // Remove trailing space if no minutes
}
