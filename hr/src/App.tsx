import React, { useState } from 'react'
import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom';
import Navbar from './Pages/Navbar/Navbar';
import Dashboard from './Pages/Dashboard/Dashboard';
import Sidebar from './Pages/Sidebar/Sidebar';
import AddnewCompany from './components/AddnewCompany/AddnewCompany';
import Login from './Pages/Login/Login';
import Protected from '../src/Protected'
import SessionOut from './Pages/SessionOut/SessionOut';
import AddnewEmployee from './components/AddnewEmployee/AddnewEmployee';
import AddDesignation from './components/AddDesignation/AddDesignation';
import AddHoliday from './components/AddHoliday/AddHoliday';
import EmployeeTable from './components/AddnewEmployee/EmployeeTable';
import axios from 'axios';


const App = () => {
  const Layout = () => {
    const [showMenu, setShowMenu] = useState(true);
    const [showMobileMenu, setShowMobileMenu] = useState(false);


    axios.interceptors.request.use(
      function (config) {
        // Do something before request is sent
        config.headers.token = localStorage.getItem("token");
        return config;
      },
      function (error) {
        // Do something with request error
        return Promise.reject(error);
      }
    );

    return (
      <>

        <div className='  border-b  '>
          <Navbar setShowMenu={setShowMenu} showMenu={showMenu} />
        </div>
        <div className="grid grid-cols-10 max-h-[90vh]  bg-white">
          <div className={`${showMenu ? "col-span-2" : "hidden"}`}>
            {
              showMenu && (
                <Sidebar />
              )
            }
          </div>
          <div
            className={`${showMenu ? "col-span-8" : "col-span-10"} `} >
            <Outlet />
          </div>
        </div>

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
          path: "/main-master",
          element: (
            <Protected>
              <Dashboard />
            </Protected>
          ),
        },
        {
          path: "/add-new-company",
          element: (
            <Protected>
              <AddnewCompany />
            </Protected>
          ),
        },
        {
          path: "/add-employee",
          element: (
            <Protected>
              <AddnewEmployee />
            </Protected>
          ),
        },
        {
          path: "/employee-table",
          element: (
            <Protected>
              <EmployeeTable />
            </Protected>
          ),
        },
        {
          path: "/designation",
          element: (
            <Protected>
              <AddDesignation />
            </Protected>
          ),
        },
        {
          path: "/holidays",
          element: (
            <Protected>
              <AddHoliday />
            </Protected>
          ),
        },
      ]
    },
    {
      path: "/login",
      element: (
        <Login />
      ),
    },
    {
      path: "/session-out",
      element: (
        <SessionOut />
      ),
    },

  ]);
  return <RouterProvider router={router}></RouterProvider>;
}



export default App