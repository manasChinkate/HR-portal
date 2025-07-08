import { BASE_URL } from "@/constants";
import axios from "axios";
import { LeaveData } from "./columns";

export const fetchManageleaves = async () => {
  const res = await axios.get(`${BASE_URL}/leaves/manage`);
  return res.data.data;
};

export const handleAcceptLeave = async (data: LeaveData) => {
  return await axios.patch(`${BASE_URL}/leaves/Accepted/${data._id}`, {
    data: data,
  });
};
export const handleRejectLeave = async (data: LeaveData) => {
  return await axios.patch(`${BASE_URL}/leaves/Rejected/${data._id}`, {
    data: data,
  });
};
