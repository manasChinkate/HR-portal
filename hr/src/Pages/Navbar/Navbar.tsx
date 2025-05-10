import { TiThMenu } from "react-icons/ti";
import logo from "../../assets/logo.png";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../app/store";
import { cleanUp } from "../../../app/authslice";
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/components/Theme-Provider";

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
  const [notificationData, setNotificationData] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
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
    try {
      const res = await axios.get(`${BASE_URL}/notifications`);
      // Handle the response, e.g., store in state or display the data
      console.log(res.data);
      setNotificationData(res.data);
      setLoading(false);
    } catch (error) {
      // Handle any errors that occur during the request
      console.error("Error fetching Designations:", error);
    }
  };

  console.log("notificationData", notificationData);
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
              onClick={() => getNotifications()}
              className="p-1 rounded-md border border-black "
            >
              <IoMdNotificationsOutline className=" text-2xl" />
            </SheetTrigger>
            <SheetContent className=" dark:bg-primary1">
              <div className=" h-[90vh] overflow-y-auto">
                <h2 className="text-lg font-bold mb-4">Notifications</h2>
                <ul className="space-y-3">
                  {notificationData?.notifications?.map(
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

        <div onClick={toggleDarkMode} className=' text-2xl border cursor-pointer border-black hover:border-button  rounded-md   p-1 hover:text-button  ease-in-out duration-400 transition-opacity'>
          {isDarkMode ? <MdOutlineLightMode onClick={() => setTheme("light")} /> : <MdOutlineDarkMode onClick={() => setTheme("dark")} />}

        </div>
        {/* <DropdownMenu>
          <DropdownMenuTrigger asChild>
        

            <div className=" text-2xl border cursor-pointer border-black hover:border-button  rounded-md   p-1 hover:text-button  ease-in-out duration-400 transition-opacity">
              {isDarkMode ? (
                <MdOutlineLightMode className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              ) : (
                <MdOutlineDarkMode className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              )}
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem >
              Light
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme("dark")}>
              Dark
            </DropdownMenuItem>
            
          </DropdownMenuContent>
        </DropdownMenu> */}

        <button
          className="p-1  text-2xl border cursor-pointer border-black hover:border-red-500 hover:text-red-500 rounded-lg  "
          onClick={handleLogout}
        >
          <MdLogout />
        </button>
      </div>
    </div>
  );
};

export default Navbar;
