import React, { useState } from 'react';
import { FaAngleDown, FaAngleRight, FaBuilding, FaRegCalendarCheck } from 'react-icons/fa';

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
import { PiBuildingOfficeLight } from "react-icons/pi";



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

  const navData = Role === 'masterAdmin' ? MasterAdminNavData : Role === 'Admin' ? AdminNavData : Role === 'Employee' ? EmployeeNavData  : Role === 'HiringManager' ? HRNavData  : Role === 'ProjectManager' ? ProjectManagerNavData : [];

  return (
    <div className="relative">
      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 w-64 bg-background1 rounded-md dark:bg-[#121212]  dark:text-white text-sm py-2 transition-transform duration-300 transform lg:transform-none lg:relative lg:translate-x-0 z-20 ${showMenu ? 'translate-x-0' : '-translate-x-full'}`}
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
                <div className=' dark:text-blue-500 text-base'>{data.icon}</div> {data.name}

                <div
                  className="absolute bottom-0 left-0 h-[1px] bg-gray-500  w-0 group-hover:w-full transition-all duration-300"
                ></div>
              </div>
              {data.children && activeParent === index && (
                <div>
                  {data.children.map((child, childIndex) => (
                    <Link to={child.link} key={childIndex} className='no-underline'>
                      <div
                        className='mx-2 py-3 bg-transparent  dark:bg-[#121212] rounded flex items-center gap-4 pl-8 cursor-pointer relative group'
                      >
                        {child.icon} {child.name}
                        <div
                          className="absolute bottom-0 left-0 h-[1px] bg-gray-500  w-0 group-hover:w-full transition-all duration-300"
                        ></div>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
       
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
      {
        name: 'Add Department',
        icon: <PiBuildingOfficeLight />,
        link: '/department',
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
    children:[
      {
        name: 'Create Project  ',
        icon: <MdMergeType />,
        link: '/projectdetails',
      },
      {
        name: 'Ongoing Projects  ',
        icon: <MdMergeType />,
        link: '/ongoing_projects',
      },
    ]
  },
  {
    name: 'TimeSheet',
    icon: <RiProjectorLine />,
    children:[
      
      {
        name: 'Timesheet Details' ,
        icon: <MdMergeType />,
        link: '/timesheet-history',
      },
    ]
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
const HRNavData = [
  {
    name: 'Home',
    icon: <IoHome />,
    link: '/',
  },
 
  {
    name: 'Leave Management',
    icon: <MdOutlineTimeToLeave />,
    children:[
      {
        name: 'Apply Leave ',
        icon: <MdMergeType />,
        link: '/applyleave',
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
    name: 'TimeSheet',
    icon: <RiProjectorLine />,
    children:[
      {
        name: 'Fill Timesheet  ',
        icon: <MdMergeType />,
        link: '/fill_timesheet',
      },
      {
        name: 'Timesheet Details' ,
        icon: <MdMergeType />,
        link: '/timesheet',
      },
    ]
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
const EmployeeNavData = [
  {
    name: 'Home',
    icon: <IoHome />,
    link: '/',
  },
  
  {
    name: 'Leave Management',
    icon: <MdOutlineTimeToLeave />,
    children:[
      {
        name: 'Apply Leave ',
        icon: <MdMergeType />,
        link: '/applyleave',
      },
    ]
  },
  {
    name: 'Project Master',
    icon: <RiProjectorLine />,
    children:[
      {
        name: 'Project Details ',
        icon: <MdMergeType />,
        link: '/applyleave',
      },
    ]
  },
  {
    name: 'TimeSheet',
    icon: <RiProjectorLine />,
    children:[
      {
        name: 'Fill Timesheet  ',
        icon: <MdMergeType />,
        link: '/fill_timesheet',
      },
      {
        name: 'Timesheet Details' ,
        icon: <MdMergeType />,
        link: '/timesheet',
      },
    ]
  },
  {
    name: 'Attendance',
    icon: <IoHome />,
    link: '/mark-attendance',
  },
  
  {
    name: 'HelpDesk',
    icon: <SiHelpdesk />,
    link: '/helpDesk',
  },
];
const ProjectManagerNavData = [
  {
    name: 'Home',
    icon: <IoHome />,
    link: '/',
  },
  
  {
    name: 'Leave Management',
    icon: <MdOutlineTimeToLeave />,
    children:[
      {
        name: 'Apply Leave ',
        icon: <MdMergeType />,
        link: '/applyleave',
      },
    ]
  },
  {
    name: 'Project Master',
    icon: <RiProjectorLine />,
    children:[
      {
        name: 'Project Details ',
        icon: <MdMergeType />,
        link: '/applyleave',
      },
    ]
  },
  {
    name: 'TimeSheet',
    icon: <RiProjectorLine />,
    children:[
      {
        name: 'Fill Timesheet  ',
        icon: <MdMergeType />,
        link: '/fill_timesheet',
      },
      {
        name: 'Timesheet Details' ,
        icon: <MdMergeType />,
        link: '/timesheet',
      },
    ]
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
