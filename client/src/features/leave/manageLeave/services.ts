import { BASE_URL } from "@/constants";
import axios from "axios";
import { Leave } from "./columns";

export const fetchManageleaves = async () => {
  const res = await axios.get(`${BASE_URL}/leaves/manage`);
  return res.data.data;
};

export const handleAcceptLeave = async (data: Leave) => {
  return await axios.patch(`${BASE_URL}/leaves/accepted/${data._id}`, {
    data: data,
  });
};
export const handleRejectLeave = async (data: Leave) => {
  return await axios.patch(`${BASE_URL}/leaves/rejected/${data._id}`, {
    data: data,
  });
};
