import { BASE_URL } from "@/constants";
import axios from "axios";
import { Inputs } from "./menu-master";

export const addMenu = async (data: Inputs) => {
  return await axios.post(`${BASE_URL}/menu`, data);
};
export const fetchMenu = async () => {
  const response = await axios.get(`${BASE_URL}/menu`);
  return response.data?.data;
};
