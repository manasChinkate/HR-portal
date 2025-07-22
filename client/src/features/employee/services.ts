import { BASE_URL } from "@/constants";
import axios from "axios";
import { Inputs } from "./EmployeeForm";

export const fetchEmployees = async () => {
  const res = await axios.get(`${BASE_URL}/employee`);
  return res.data?.data;
};
export const addEmployee = async (data: Inputs) => {
  const res = await axios.post(`${BASE_URL}/employee`, data);
  return res.data?.data;
};
export const getCountries = async () => {
  const res = await axios.get(
    `https://restcountries.com/v3.1/all?fields=name,flags`
  );
  return res.data;
};
