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
    <div className="py-4 px-6 min-h-[90vh] bg-background2 dark:bg-primary1">
  <h2 className="text-3xl font-semibold mb-6 text-gray-800 dark:text-white">
    Ongoing Projects
  </h2>

  <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
    {data.map((project: Project) => {
      const { remainingDays, formattedStartDate, formattedDeadline } =
        calculateRemainingDays({
          startDate: project.startDate,
          deadline: project.deadline,
        });

      return (
        <div
          key={project._id}
          className="bg-background1 dark:bg-secondary1 border border-border dark:border-primary1 rounded-2xl p-6 shadow-md hover:shadow-xl transition-shadow duration-300"
        >
          <div className="space-y-2 mb-4">
            <h3 className="text-2xl font-semibold text-gray-900 dark:text-white truncate">
              {project.projectName}
            </h3>
            <p className="text-gray-500 dark:text-gray-300 text-sm">
              {project.clientName.clientName}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
              {project.description}
            </p>
          </div>

          <div className="flex justify-between gap-4">
            <div className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
              <p>
                <span className="font-medium">Assigned To:</span>{" "}
                {project.projectManager?.fullname}
              </p>
              <p>
                <span className="font-medium">Start Date:</span>{" "}
                {formattedStartDate}
              </p>
              <p>
                <span className="font-medium">Deadline:</span>{" "}
                {formattedDeadline}
              </p>
            </div>

            <div className="text-center space-y-2 min-w-[80px]">
              <div className="text-3xl font-bold text-blue-700 dark:text-blue-400">
                {remainingDays}
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400">
                Days Left
              </div>
              <div>
                <span className="font-medium text-sm text-gray-700 dark:text-gray-300">
                  Priority:
                </span>
                <div
                  className={`mt-1 px-2 py-0.5 text-xs font-medium rounded-full text-white ${
                    project.priority === "High"
                      ? "bg-red-500"
                      : project.priority === "Medium"
                      ? "bg-yellow-500 text-black"
                      : "bg-green-500"
                  }`}
                >
                  {project.priority}
                </div>
              </div>
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
