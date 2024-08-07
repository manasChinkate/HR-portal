import React, { useState } from 'react'
import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom';
import Navbar from './Pages/Navbar/Navbar';
import Dashboard from './Pages/Dashboard/Dashboard';
import Sidebar from './Pages/Sidebar/Sidebar';
import AddnewCompany from './components/AddnewCompany/AddnewCompany';
import Login from './Pages/Login/Login';

const App = () => {
  const Layout = () => {
    const [showMenu, setShowMenu] = useState(true);
    const [showMobileMenu, setShowMobileMenu] = useState(false);
    return (
      <>
      
        <div className='  border-b  '>
          <Navbar setShowMenu={setShowMenu} showMenu={showMenu} />
        </div>
        <div className="grid grid-cols-10 max-h-[90vh]  bg-black">
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
            <Dashboard />
          ),
        },
        {
          path: "/main-master",
          element: (
            <Dashboard />
          ),
        },
        {
          path: "/add-new-comapny",
          element: (
            <AddnewCompany />
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

  ]);
  return <RouterProvider router={router}></RouterProvider>;
}



export default App