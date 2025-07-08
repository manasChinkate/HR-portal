import { BASE_URL } from "@/constants";
import axios from "axios";

export const fetchProjects = async () => {
  const res = await axios.get(`${BASE_URL}/projects`);
  return res.data?.data
};
