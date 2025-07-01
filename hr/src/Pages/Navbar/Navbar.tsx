import { TiThMenu } from "react-icons/ti";
import logo from "../../assets/logo.png";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../app/store";
import { cleanUp } from "../../../app/authSlice";
import { useEffect, useState } from "react";
import {
  MdLogout,
  MdOutlineDarkMode,
  MdOutlineLightMode,
} from "react-icons/md";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { IoMdNotificationsOutline } from "react-icons/io";
import { BASE_URL } from "@/constants";
import axios from "axios";
import { SidebarTrigger } from "@/components/ui/sidebar";

import { useTheme } from "@/components/Theme-Provider";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";

interface Notification {
  _id: string;
  userId: string;
  message: string;
  read: boolean;
  createdAt: string; // or Date if parsing as Date object
  companyName: string;
  __v: number;
}

const Navbar = () => {

  const { setTheme } = useTheme();

  const name = useSelector((state: RootState) => state.auth.name);

  const [isDarkMode, setIsDarkMode] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    dispatch(cleanUp());
    navigate("/login");
  };

  const getNotifications = async () => {
    const res = await axios.get(`${BASE_URL}/notification`);
    return res.data
  };

  const {data, isPending} = useQuery({
    queryKey:["notification"],
    queryFn:getNotifications,
    staleTime:Infinity
  })

 
  return (
    <div className="h-[7vh] flex items-center justify-between px-5 mt-2 mr-2 rounded-md border  bg-background1 dark:bg-secondary1 dark:text-white">
      <div className="flex gap-4 items-center">
        {/* <TiThMenu className='text-2xl cursor-pointer' onClick={sidebartoggle} /> */}
        {/* {!showMenu && (
          <img className='h-7 hidden md:block' src={logo} alt="logo" />
        )} */}
        <SidebarTrigger />
      </div>

      <div>
        <h1 className="text-sm sm:text-base">Hello, Welcome back, {name}</h1>
      </div>

      <div className=" flex items-center gap-1">
        <div>
          <Sheet>
            <SheetTrigger
              // onClick={() => getNotifications()}
              className="p-1 rounded-md border border-black "
            >
              <IoMdNotificationsOutline className=" text-2xl" />
            </SheetTrigger>
            <SheetContent className=" dark:bg-primary1">
              <div className=" h-[90vh] overflow-y-auto">
                <h2 className="text-lg font-bold mb-4">Notifications</h2>
                <ul className="space-y-3">
                  {data?.notifications?.map(
                    (notification: Notification) => {
                      const formattedDate = new Date(
                        notification.createdAt
                      ).toLocaleDateString("en-GB", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                      });

                      const formattedTime = new Date(
                        notification.createdAt
                      ).toLocaleTimeString("en-US", {
                        hour: "2-digit",
                        minute: "2-digit",
                        hour12: true,
                      });

                      return (
                        <li
                          key={notification._id}
                          className="p-3 rounded-md bg-gray-100 dark:bg-secondary1 hover:bg-gray-200 dark:hover:bg-gray-700"
                        >
                          <p className="text-sm text-gray-800 dark:text-gray-200">
                            {notification.message}
                          </p>
                          <div className="text-xs text-gray-500 dark:text-gray-400  flex items-center justify-between  ">
                            <span>{formattedDate}</span> {formattedTime}
                          </div>
                        </li>
                      );
                    }
                  )}
                </ul>
              </div>
            </SheetContent>
          </Sheet>
        </div>

        <div
          onClick={toggleDarkMode}
          className=" text-2xl border cursor-pointer border-black hover:border-button  rounded-md   p-1 hover:text-button  ease-in-out duration-400 transition-opacity"
        >
          {isDarkMode ? (
            <MdOutlineLightMode onClick={() => setTheme("light")} />
          ) : (
            <MdOutlineDarkMode onClick={() => setTheme("dark")} />
          )}
        </div>
       

        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button
              className=" p-2 h-auto border bg-transparent cursor-pointer border-black hover:border-red-500 hover:text-red-500 rounded-lg"
              variant="outline"
            >
              <MdLogout />
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent className=" dark:bg-primary1 bg-background2">
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                You will be completely Logged out. Need to Log In again
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel className=" bg-background1 dark:bg-primary1 dark:text-white">
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction
                onClick={handleLogout}
                className="bg-red-600 dark:text-white dark:hover:bg-red-600 "
              >
                Continue
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
};

export default Navbar;
