import React, { useState } from 'react';
import { FaAngleDown, FaAngleRight, FaBuilding, FaRegCalendarCheck } from 'react-icons/fa';
import { IoMdExit } from 'react-icons/io';
import { IoHome } from 'react-icons/io5';
import { useDispatch, useSelector } from 'react-redux';
import { cleanUp } from '../../../app/authslice';
import { RootState } from '../../../app/store';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../../assets/logo.png';
import { BsPersonWorkspace } from 'react-icons/bs';
import { SiHelpdesk } from 'react-icons/si';
import { RiProjectorLine } from 'react-icons/ri';
import { GrUserWorker, GrDomain } from 'react-icons/gr';
import { LuAppWindow } from "react-icons/lu";
import { MdManageHistory, MdMergeType, MdOutlineTimeToLeave } from 'react-icons/md';


const Sidebar = ({ showMenu, setShowMenu }) => {
  const [activeParent, setActiveParent] = useState<number | null>(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const Role = useSelector((state: RootState) => state.auth.authority);

  const handleParentClick = (index: number, link: string, hasChildren: boolean) => {
    if (hasChildren) {
      setActiveParent(activeParent === index ? null : index);
    } else {
      navigate(link);
      // setShowMenu(false); // Close sidebar on navigation
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    dispatch(cleanUp());
    navigate('/login');
    setShowMenu(false); // Close sidebar on logout
  };

  const navData = Role === 'masterAdmin' ? MasterAdminNavData : Role === 'Admin' ? AdminNavData : [];

  return (
    <div className="relative">
      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 w-64 bg-white text-sm py-2 transition-transform duration-300 transform lg:transform-none lg:relative lg:translate-x-0 z-20 ${showMenu ? 'translate-x-0' : '-translate-x-full'}`}
      >
        <div>
          <div className='w-full flex items-center justify-center mb-4'>
            <img className='h-7' src={logo} alt="logo" />
          </div>
          <p className='px-4 pb-2 font-semibold'>Menu</p>

          {navData.map((data, index) => (
            <div key={index}>
              <div
                className={`mx-2 py-3 w-full rounded flex items-center gap-4 px-4 cursor-pointer transition-colors duration-400 relative group`}
                onClick={() => handleParentClick(index, data.link, !!data.children)}
              >
                {data.children && (
                  <div className=''>
                    {activeParent === index ? <FaAngleDown /> : <FaAngleRight />}
                  </div>
                )}
                {data.icon} {data.name}

                <div
                  className="absolute bottom-0 left-0 h-[1px] bg-gray-500 w-0 group-hover:w-full transition-all duration-300"
                ></div>
              </div>
              {data.children && activeParent === index && (
                <div>
                  {data.children.map((child, childIndex) => (
                    <Link to={child.link} key={childIndex} className='no-underline'>
                      <div
                        className='mx-2 py-3 bg-slate-100 rounded flex items-center gap-4 pl-8 cursor-pointer relative group'
                      >
                        {child.icon} {child.name}
                        <div
                          className="absolute bottom-0 left-0 h-[1px] bg-gray-500 w-0 group-hover:w-full transition-all duration-300"
                        ></div>
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

      {/* Overlay */}
      {showMenu && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 lg:hidden z-10"
          onClick={() => setShowMenu(false)}
        ></div>
      )}
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
      {
        name: 'Add Client',
        icon: <LuAppWindow />,
        link: '/client',
      },
    ],
  },
  {
    name: 'Leave Management',
    icon: <MdOutlineTimeToLeave />,
    children:[
      {
        name: 'Leave Type',
        icon: <MdMergeType />,
        link: '/leavetype',
      },
      {
        name: 'Manage Leave',
        icon: <MdManageHistory />,
        link: '/manageleave',
      }
    ]
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
