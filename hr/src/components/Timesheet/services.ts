import { BASE_URL } from "@/constants";
import { convertTo12HourFormat } from "@/utils/dateHelper";
import axios from "axios";

export const fetchTimesheet = async () => {
  const res = await axios.get(`${BASE_URL}/timesheet`);
  return res.data;
};
export const addTimesheet = async (data) => {
  const formattedStartTime = convertTo12HourFormat(data.startTime);
  const formattedEndTime = convertTo12HourFormat(data.endTime);

  const formdata = {
    ...data,
    startTime: formattedStartTime,
    endTime: formattedEndTime,
  };
  console.log("FORMATDATA",formdata)

  const res = await axios.post(`${BASE_URL}/timesheet`, formdata);
  return res.data?.data;
};
