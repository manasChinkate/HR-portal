import { Inputs } from "@/components/AddnewEmployee/AddnewEmployee";
import { BASE_URL } from "@/constants";
import axios from "axios";
import { projectInputs } from "./ProjectDetails";

export const fetchProjectManager = async () => {
  const res = await axios.get(`${BASE_URL}/employee/reporting`);

  const filtered = res.data.data.filter(
    (e: Inputs) => e.authority === "ProjectManager"
  );
  return filtered;
};

export const addProject = async (data:projectInputs) => {
  const res = await axios.post(`${BASE_URL}/projects`, data);
  return res.data
};
