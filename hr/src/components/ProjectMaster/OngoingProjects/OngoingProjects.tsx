import axios from "axios";
import { useEffect, useState } from "react";
import { BASE_URL } from "../../../constants";
import { useQuery } from "@tanstack/react-query";
import { fetchProjects } from "./services";
import { calculateRemainingDays } from "./helper";

interface Client {
  clientName: string;
  _id: string;
}
interface ProjectManager {
  fullname: string;
  _id: string;
}
type Project = {
  _id: string;
  projectName: string;
  clientName: Client;
  projectManager: ProjectManager;
  startDate: string;
  deadline: string;
  priority: "High" | "Medium" | "Low";
  description: string;
  companyName: string;
  createdAt: string;
  __v: number;
};

const OngoingProjects = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["project"],
    queryFn: fetchProjects,
    staleTime:Infinity
  });

  if(isLoading) return <p>...Loading</p>

  console.log("PROJECTS",data)

  return (
    <div className="py-2 pr-2 min-h-[90vh]  bg-background2 dark:bg-primary1">
      <h2 className="text-2xl font-bold mb-3 pl-6 text-gray-700 dark:text-gray-100">
        Ongoing Projects
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 ">
        {data.map((project: Project) => {
          const { remainingDays, formattedStartDate, formattedDeadline } =
            calculateRemainingDays({
              startDate: project.startDate,
              deadline: project.deadline,
            });

          return (
            <div
              key={project._id}
              className="bg-background1 dark:bg-secondary1  shadow-lg rounded-lg p-6 border border-gray-200 dark:border-primary1"
            >
              <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-200 mb-2">
                {project.projectName}
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mb-2">
                {project.clientName.clientName}
              </p>
              <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                {project.description}
              </p>

              <div className="flex justify-between items-center px-3">
                <div className="text-sm space-y-3">
                  <p className="text-gray-700 dark:text-gray-300">
                    <span className="font-semibold ">Assigned To:</span>{" "}
                    {project.projectManager?.fullname}
                  </p>
                  <p className="text-gray-700 dark:text-gray-300">
                    <span className="font-semibold">Start Date: </span>
                    {formattedStartDate}
                  </p>
                  <p className="text-gray-700 dark:text-gray-300">
                    <span className="font-semibold">Deadline: </span>
                    {formattedDeadline}
                  </p>
                </div>
                <div className="text-center space-y-2">
                  <p className="text-3xl font-bold text-blue-800 dark:text-blue-800">
                    {remainingDays}
                  </p>
                  <p className="text-xs text-gray-500">Days Remaining</p>
                  <p className="text-gray-700 dark:text-gray-300">
                    <span className="font-semibold">Priority:</span>{" "}
                    <span
                      className={`px-2 py-1 text-xs rounded-full text-white ${
                        project.priority === "High"
                          ? "bg-red-500"
                          : project.priority === "Medium"
                          ? "bg-yellow-500"
                          : "bg-green-500"
                      }`}
                    >
                      {project.priority}
                    </span>
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default OngoingProjects;
