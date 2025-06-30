import { BASE_URL } from "@/constants";
import axios from "axios";

export const fetchData = async () => {
  const res = await axios.get(`${BASE_URL}/attendance/`);
  return res.data?.data;
};
