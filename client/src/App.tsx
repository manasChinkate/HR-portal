import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import Login from "@/Pages/login/Login";
import SessionOut from "./Pages/SessionOut/SessionOut";
import AddHoliday from "./components/MainMaster/AddHoliday/AddHoliday";
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
import MenuMaster from "./components/MenuMaster/MenuMaster";
import Header from "./components/header/Header";
import Dashboard from "./Pages/dashboard/Dashboard";
import CompanyForm from "./features/company/CompanyForm";
import RefreshToken from "./RefreshToken";
import DesignationForm from "./features/designation/DesignationForm";
import './app.css';
import EmployeeForm from "./features/employee/EmployeeForm";
import EmployeeTable from "./features/employee/EmployeeTable";


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
        <RefreshToken>
          <QueryClientProvider client={queryClient}>
            <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
              <SidebarProvider className="flex custom-scrollbar  bg-background2 dark:bg-primary1">
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
        </RefreshToken>
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
          element: <Dashboard />,
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
          element: <EmployeeForm />,
        },
        {
          path: "/employees/view",
          element: <EmployeeTable />,
        },

        {
          path: "/designation/new",
          element: <DesignationForm />,
        },
        {
          path: "/holiday/new",
          element: <AddHoliday />,
        },
        {
          path: "/client/new",
          element: <AddClient />,
        },
        {
          path: "/department/new",
          element: <AddDepartment />,
        },
        {
          path: "/leavetype/new",
          element: <LeaveType />,
        },
        {
          path: "/manageleave",
          element: <ManageLeave />,
        },
        {
          path: "/leave/new",
          element: <ApplyLeave />,
        },

        {
          path: "/project/new",
          element: <ProjectDetails />,
        },
        {
          path: "/ongoing_projects/view",
          element: <OngoingProjects />,
        },
        {
          path: "/timesheet/new",
          element: <Filltimesheet />,
        },
        {
          path: "/timesheet/view",
          element: <TimesheetTable />,
        },
        {
          path: "/mark-attendance",
          element: <AttendanceMark />,
        },
        {
          path: "/add-task",
          element: <AddTask />,
        },
        {
          path: "/view-task",
          element: <ViewTasks />,
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
