import { Inputs } from "@/features/employee/EmployeeForm";
import { BASE_URL } from "@/constants";
import axios from "axios";
import { projectInputs } from "./ProjectForm";

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
