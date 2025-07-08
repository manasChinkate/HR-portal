
import { format } from "date-fns";

export const convertDate = (isoDate: string) => {
  const date = new Date(isoDate);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-based in JavaScript
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
};

export const convertTo12HourFormat = (time: string) => {
  const date = new Date(`1970-01-01T${time}`);
  return format(date, "hh:mm a"); // Format as 12-hour with AM/PM
};
