import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import Login from "@/Pages/login/Login";
import Protected from "../src/Protected";
import SessionOut from "./Pages/SessionOut/SessionOut";
import AddnewEmployee from "./components/AddnewEmployee/AddnewEmployee";
import AddDesignation from "./components/MainMaster/AddDesignation/AddDesignation";
import AddHoliday from "./components/MainMaster/AddHoliday/AddHoliday";
import EmployeeTable from "./components/AddnewEmployee/EmployeeTable";
import axios from "axios";
import CompanyTable from "@/features/company/CompanyTable";
import AddClient from "./components/MainMaster/AddClient/AddClient";
import LeaveType from "./components/LeaveManagement/LeaveType/LeaveType";
import ManageLeave from "./components/LeaveManagement/ManageLeave/ManageLeave";
import ApplyLeave from "./components/LeaveManagement/ApplyLeave/ApplyLeave";
import AddDepartment from "./components/MainMaster/AddDepartment/AddDepartment";
import ProjectDetails from "./components/ProjectMaster/ProjectDetails/ProjectDetails";
import OngoingProjects from "./components/ProjectMaster/OngoingProjects/OngoingProjects";
import Filltimesheet from "./components/Timesheet/Filltimesheet";
import TimesheetTable from "./components/Timesheet/TimesheetTable";
import AttendanceMark from "./components/Attendance/AttendanceMark";
import AddTask from "./components/ProjectMaster/ProjectTask/AddTask";
import ViewTasks from "./components/ProjectMaster/ProjectTask/ViewTasks";
import { SidebarProvider } from "./components/ui/sidebar";
import AppSidebar from "./components/Sidebar/AppSidebar";
import { ThemeProvider } from "./components/Theme-Provider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import MenuMaster from "./components/MenuMaster/menu-master";
import Header from "./components/header/Header";
import Dashboard from "./Pages/dashboard/Dashboard";
import CompanyForm from "./features/company/CompanyForm";

const App = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });
  const Layout = () => {
    axios.interceptors.request.use(
      function (config) {
        // Do something before request is sent
        config.headers.token = localStorage.getItem("token");
        config.headers.authority = localStorage.getItem("authority");
        return config;
      },
      function (error) {
        // Do something with request error
        return Promise.reject(error);
      }
    );

    return (
      <>
        <QueryClientProvider client={queryClient}>
          <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
            <SidebarProvider className="flex   bg-background2 dark:bg-primary1">
              <AppSidebar />

              <main className="flex flex-col flex-1 h-full overflow-hidden ">
                <Header />
                <div className="flex-1 overflow-auto ">
                  <Outlet />
                </div>
              </main>
            </SidebarProvider>
          </ThemeProvider>
        </QueryClientProvider>
      </>
    );
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      // errorElement: <ErrorPage />,
      children: [
        {
          path: "/",
          element: (
            <Protected>
              <Dashboard />
            </Protected>
          ),
        },

        {
          path: "/company/new",
          element: <CompanyForm />,
        },
        {
          path: "/company/view",
          element: <CompanyTable />,
        },
        {
          path: "/menu",
          element: <MenuMaster />,
        },
        {
          path: "/employees/new",
          element: (
            <Protected>
              <AddnewEmployee />
            </Protected>
          ),
        },
        {
          path: "/employees/view",
          element: <EmployeeTable />,
        },

        {
          path: "/designation/new",
          element: (
            <Protected>
              <AddDesignation />
            </Protected>
          ),
        },
        {
          path: "/holiday/new",
          element: (
            <Protected>
              <AddHoliday />
            </Protected>
          ),
        },
        {
          path: "/client/new",
          element: (
            <Protected>
              <AddClient />
            </Protected>
          ),
        },
        {
          path: "/department/new",
          element: (
            <Protected>
              <AddDepartment />
            </Protected>
          ),
        },
        {
          path: "/leavetype/new",
          element: (
            <Protected>
              <LeaveType />
            </Protected>
          ),
        },
        {
          path: "/manageleave",
          element: (
            <Protected>
              <ManageLeave />
            </Protected>
          ),
        },
        {
          path: "/leave/new",
          element: (
            <Protected>
              <ApplyLeave />
            </Protected>
          ),
        },

        {
          path: "/project/new",
          element: (
            <Protected>
              <ProjectDetails />
            </Protected>
          ),
        },
        {
          path: "/ongoing_projects/view",
          element: (
            <Protected>
              <OngoingProjects />
            </Protected>
          ),
        },
        {
          path: "/timesheet/new",
          element: (
            <Protected>
              <Filltimesheet />
            </Protected>
          ),
        },
        {
          path: "/timesheet/view",
          element: (
            <Protected>
              <TimesheetTable />
            </Protected>
          ),
        },
        {
          path: "/mark-attendance",
          element: (
            <Protected>
              <AttendanceMark />
            </Protected>
          ),
        },
        {
          path: "/add-task",
          element: (
            <Protected>
              <AddTask />
            </Protected>
          ),
        },
        {
          path: "/view-task",
          element: (
            <Protected>
              <ViewTasks />
            </Protected>
          ),
        },
      ],
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/session-out",
      element: <SessionOut />,
    },
  ]);
  return <RouterProvider router={router}></RouterProvider>;
};

export default App;
