import { TiThMenu } from 'react-icons/ti';
import logo from '../../assets/logo.png';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../app/store';
import { cleanUp } from '../../../app/authslice';
import { useEffect, useState } from 'react';
import { MdLogout, MdOutlineDarkMode, MdOutlineLightMode } from 'react-icons/md';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet"
import { IoMdNotificationsOutline } from 'react-icons/io';


const Navbar = ({ setShowMenu, showMenu }) => {
  const name = useSelector((state: RootState) => state.auth.name);

  const [isDarkMode, setIsDarkMode] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const sidebartoggle = () => {
    setShowMenu(!showMenu);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    dispatch(cleanUp());
    navigate('/login');
  };

  const notifications = [
    { id: 1, message: 'Your leave request has been approved.', time: '10 mins ago' },
    { id: 2, message: 'New company policy update available.', time: '1 hour ago' },
    { id: 3, message: 'Meeting scheduled with the manager.', time: '3 hours ago' },
    { id: 4, message: 'Your salary for December has been processed.', time: 'Yesterday' },
    { id: 4, message: 'Your salary for December has been processed.', time: 'Yesterday' },
    { id: 4, message: 'Your salary for December has been processed.', time: 'Yesterday' },
    { id: 4, message: 'Your salary for December has been processed.', time: 'Yesterday' },
    { id: 4, message: 'Your salary for December has been processed.', time: 'Yesterday' },
    { id: 4, message: 'Your salary for December has been processed.', time: 'Yesterday' },
    { id: 4, message: 'Your salary for December has been processed.', time: 'Yesterday' },
    { id: 4, message: 'Your salary for December has been processed.', time: 'Yesterday' },
    { id: 4, message: 'Your salary for December has been processed.', time: 'Yesterday' },
    { id: 4, message: 'Your salary for December has been processed.', time: 'Yesterday' },
    { id: 4, message: 'Your salary for December has been processed.', time: 'Yesterday' },
    { id: 4, message: 'Your salary for December has been processed.', time: 'Yesterday' },
  ];

  return (
    <div className='h-[9vh] flex items-center justify-between px-5 rounded-md rounded-tl-none rounded-tr-none bg-background1 dark:bg-[#121212] dark:text-white dark:rounded-md'>
      <div className='flex gap-4 items-center'>
        <TiThMenu className='text-2xl cursor-pointer' onClick={sidebartoggle} />
        {!showMenu && (
          <img className='h-7 hidden md:block' src={logo} alt="logo" />
        )}
      </div>

      <div>
        <h1 className='text-sm sm:text-base'>
          Hello, Welcome back, {name}
        </h1>
      </div>

      <div className=' flex items-center gap-1'>

        <div>
          <Sheet>
            <SheetTrigger className='   p-1 rounded-md border border-black '><IoMdNotificationsOutline className=' text-2xl' />
            </SheetTrigger>
            <SheetContent>
              <div className=" h-[90vh] overflow-y-auto">
                <h2 className="text-lg font-bold mb-4">Notifications</h2>
                <ul className="space-y-3">
                  {notifications.map((notification) => (
                    <li
                      key={notification.id}
                      className="p-3 rounded-md bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700"
                    >
                      <p className="text-sm text-gray-800 dark:text-gray-200">
                        {notification.message}
                      </p>
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        {notification.time}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </SheetContent>
          </Sheet>

        </div>

        <div onClick={toggleDarkMode} className=' text-2xl border cursor-pointer border-black hover:border-button  rounded-md   p-1 hover:text-button  ease-in-out duration-400 transition-opacity'>
          {isDarkMode ? <MdOutlineLightMode /> : <MdOutlineDarkMode />}

        </div>


        <button className='p-1  text-2xl border cursor-pointer border-black hover:border-red-500 hover:text-red-500 rounded-lg  ' onClick={handleLogout}>
          <MdLogout />

        </button>
      </div>
    </div>
  );
};

export default Navbar;
