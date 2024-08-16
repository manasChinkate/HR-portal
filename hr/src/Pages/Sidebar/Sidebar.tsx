import React, { useState } from 'react';
import { FaAngleDown, FaAngleUp, FaBuilding, FaRegCalendarCheck } from 'react-icons/fa';
import { GrDomain, GrUserWorker } from 'react-icons/gr';
import { IoMdExit } from 'react-icons/io';
import { IoHome } from 'react-icons/io5';
import { BsPersonWorkspace } from 'react-icons/bs';
import { RiProjectorLine } from 'react-icons/ri';
import { SiHelpdesk } from 'react-icons/si';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../../assets/logo.png';
import { useDispatch, useSelector } from 'react-redux';
import { cleanUp } from '../../../app/authslice';
import { RootState } from '../../../app/store';

const Sidebar = () => {
  const [activeParent, setActiveParent] = useState<number | null>(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const sidebar = useSelector((state: RootState) => state.auth.sidebar);
  const Role = useSelector((state: RootState) => state.auth.authority);

  const handleParentClick = (index: number, link: string, hasChildren: boolean) => {
    if (hasChildren) {
      setActiveParent(activeParent === index ? null : index);
    } else {
      navigate(link);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    dispatch(cleanUp());
    navigate('/login');
  };

  const navData = Role === 'masterAdmin' ? MasterAdminNavData : Role === 'Admin' ? AdminNavData : [];

  return (
    <div className='w-full h-full bg-white text-sm py-2 flex flex-col justify-between'>
      <div>
        <div className='w-full flex items-center justify-center mb-4'>
          <img className='h-7' src={logo} alt="logo" />
        </div>
        <p className='px-4 pb-2 font-semibold'>Menu</p>

        {navData.map((data, index) => (
          <div key={index}>
            <div
              className={`mx-2 shadow-md py-3 rounded mb-1 flex items-center gap-4 px-4 cursor-pointer transition-colors duration-200 ${
                activeParent === index ? 'bg-teal-600 text-white' : 'bg-gray-200 hover:bg-gray-300'
              }`}
              onClick={() => handleParentClick(index, data.link, !!data.children)}
            >
              {data.icon} {data.name}
              {data.children && (
                <div className='ml-auto'>
                  {activeParent === index ? <FaAngleDown /> : <FaAngleUp />}
                </div>
              )}
            </div>
            {data.children && activeParent === index && (
              <div>
                {data.children.map((child, childIndex) => (
                  <Link to={child.link} key={childIndex} className='no-underline'>
                    <div
                      className='mx-2 shadow-md py-3 bg-gray-300 hover:bg-gray-400 hover:text-white rounded mb-1 flex items-center gap-4 pl-8 cursor-pointer'
                    >
                      {child.icon} {child.name}
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
      <button
        onClick={handleLogout}
        className='mx-2 shadow-md py-3 bg-gray-200 hover:bg-gray-300 rounded mb-1 flex items-center gap-4 px-4 cursor-pointer text-sm transition-colors duration-200'
      >
        <IoMdExit />
        Logout
      </button>
    </div>
  );
};

export default Sidebar;

const MasterAdminNavData = [
  {
    name: 'Home',
    icon: <IoHome />,
    link: '/',
  },
  {
    name: 'Add New Company',
    icon: <FaBuilding />,
    link: '/add-new-company',
  },
  {
    name: 'HelpDesk',
    icon: <SiHelpdesk />,
    link: '/helpDesk',
  },
];

const AdminNavData = [
  {
    name: 'Home',
    icon: <IoHome />,
    link: '/',
  },
  {
    name: 'Main Master',
    icon: <GrDomain />,
    children: [
      {
        name: 'Add Designation',
        icon: <GrUserWorker />,
        link: '/designation',
      },
      {
        name: 'Add Holiday',
        icon: <FaRegCalendarCheck />,
        link: '/holidays',
      },
    ],
  },
  {
    name: 'Project Master',
    icon: <RiProjectorLine />,
    link: '/project-master',
  },
  {
    name: 'Add Employee',
    icon: <BsPersonWorkspace />,
    link: '/add-employee',
  },
  {
    name: 'HelpDesk',
    icon: <SiHelpdesk />,
    link: '/helpDesk',
  },
];
