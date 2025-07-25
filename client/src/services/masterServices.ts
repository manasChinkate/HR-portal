import { BASE_URL } from "@/constants";
import axios from "axios";

export const fetchDesignation = async () => {
  const res = await axios.get(`${BASE_URL}/designation`);
  return res.data?.data;
};
export const fetchClient = async () => {
  const res = await axios.get(`${BASE_URL}/client`);
  return res.data.data;
};

export const fetchDepartment = async () => {
  const res = await axios.get(`${BASE_URL}/department`);
  return res.data?.data;
};

export const fetchHoliday = async () => {
  const res = await axios.get(`${BASE_URL}/holiday`);
  return res.data?.data;
};
    