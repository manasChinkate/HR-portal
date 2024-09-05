import { TiThMenu } from 'react-icons/ti';
import logo from '../../assets/logo.png';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../app/store';
import { cleanUp } from '../../../app/authslice';
import { Switch } from '../../components/ui/switch';
import { useEffect, useState } from 'react';
import { MdLogout, MdOutlineDarkMode, MdOutlineLightMode } from 'react-icons/md';

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

  return (
    <div className='h-[9vh] flex items-center justify-between px-5 dark:bg-[#121212] dark:text-white'>
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

      <div className=' flex items-center gap-3'>
      <div onClick={toggleDarkMode} className=' text-2xl hover:outline-button hover:outline-1 rounded-md hover:outline px-2 py-1 hover:text-button  ease-in-out duration-400 transition-opacity'>
        {isDarkMode ? <MdOutlineLightMode />:<MdOutlineDarkMode />}

      </div>


      <button className='p-1 sm:px-3 text-2xl dark:text-white rounded-lg text-black dark:hover:bg-red-500' onClick={handleLogout}>
        <MdLogout />

      </button>
      </div>
    </div>
  );
};

export default Navbar;
