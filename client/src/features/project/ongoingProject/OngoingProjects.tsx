import { useQuery } from "@tanstack/react-query";
import { fetchProjects } from "./services";
import { calculateRemainingDays } from "./helper";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useAppSelector } from "../../../../app/hooks";
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
    staleTime: Infinity,
  });
  const authority = useAppSelector((state) => state.auth.authority);

  if (isLoading) return <p>...Loading</p>;

  console.log("PROJECTS", data);

  return (
    <div className="py-4 px-6 min-h-[90vh] bg-background2 dark:bg-primary1">
      <h2 className="text-3xl font-semibold mb-6 text-gray-800 dark:text-white">
        Ongoing Projects
      </h2>

      <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {data.length === 0 && (
          <div className="col-span-full flex flex-col items-center justify-start  px-8">
            {/* Icon/Illustration */}
            <div className="mb-6 p-4 bg-gray-100 dark:bg-gray-800 rounded-full">
              <svg
                className="w-16 h-16 text-gray-400 dark:text-gray-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
            </div>

            {/* Main Message */}
            <h3 className="text-2xl font-semibold text-gray-700 dark:text-gray-300 mb-3">
              No Ongoing Projects
            </h3>

            {/* Description */}
            <p className="text-gray-500 dark:text-gray-400 text-center max-w-md mb-8 leading-relaxed">
              You don't have any active projects at the moment. Start by
              creating a new project to track your progress and deadlines.
            </p>

            {/* Action Button */}
            {authority == "Admin" && (
              <Link to={"/project/new"}>
                <Button className=" dark:bg-secondary1 dark:text-white dark:hover:border">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                    />
                  </svg>
                  Create New Project
                </Button>
              </Link>
            )}

            {/* Optional: Additional help text */}
            <div className="mt-8 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
              <p className="text-sm text-blue-700 dark:text-blue-300 text-center">
                💡 <strong>Tip:</strong> Once you create projects, you'll be
                able to track deadlines, and monitor progress all in one place.
              </p>
            </div>
          </div>
        )}

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
