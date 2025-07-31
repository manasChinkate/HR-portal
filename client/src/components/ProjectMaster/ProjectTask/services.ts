import { Inputs } from "@/features/employee/EmployeeForm";
import { BASE_URL } from "@/constants";
import axios from "axios";
import { TaskInputs } from "./TaskForm";

interface StatusChange {
  projectId: string;
  _id: string;
  status: string;
}

export const fetchTeamMembers = async () => {
  const res = await axios.get(`${BASE_URL}/employee/reporting`);

  const filtered = res.data.data.filter(
    (e: Inputs) => e.authority !== "ProjectManager"
  );
  return filtered;
};

export const createTask = async (data: TaskInputs) => {
  const formattedData = {
    ...data,
    status: "Not Started",
  };
  const res = await axios.post(`${BASE_URL}/tasks`, formattedData);
  return res.data?.data;
};

export const fetchTasks = async (projectId: string) => {
  const res = await axios.get(`${BASE_URL}/tasks`, {
    params: { projectId },
  });

  return res.data?.data;
};

export const handleChangeStatus = async (data: StatusChange) => {
  const res = await axios.post(`${BASE_URL}/tasks/update`, data);
};
