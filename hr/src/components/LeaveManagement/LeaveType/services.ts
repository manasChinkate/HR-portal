import { BASE_URL } from "@/constants";
import axios from "axios";
import { Inputs } from "./LeaveType";

export const fetchLeaveType = async () => {
  const res = await axios.get(`${BASE_URL}/leavetype`);
  return res.data.data;
};
export const addLeaveType = async (data: Inputs) =>
  await axios.post(`${BASE_URL}/leavetype`, data);
