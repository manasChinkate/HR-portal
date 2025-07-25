import { BASE_URL } from "@/constants";
import axios from "axios";
import { z } from "zod";
import { LeaveSchema } from "./ApplyLeave";

type Inputs = z.infer<typeof LeaveSchema>;

export const fetchLeaves = async () => {
  const res = await axios.get(`${BASE_URL}/leaves`);
  return res.data?.data;
};
export const applyLeave = async (data: Inputs) => {
  const res = await axios.post(`${BASE_URL}/leaves`, data);
  return res.data?.data;
};
