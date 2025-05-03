import React, { act, Children, useState } from "react";
import {
  FaAngleDown,
  FaAngleRight,
  FaBuilding,
  FaRegCalendarCheck,
  FaUser,
} from "react-icons/fa";

import { IoHome } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { cleanUp } from "../../../app/authslice";
import { RootState } from "../../../app/store";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";
import { BsPersonWorkspace } from "react-icons/bs";
import { SiHelpdesk } from "react-icons/si";
import { RiProjectorLine } from "react-icons/ri";
import { GrUserWorker, GrDomain } from "react-icons/gr";
import { LuAppWindow } from "react-icons/lu";
import {
  MdMailOutline,
  MdManageHistory,
  MdMergeType,
  MdOutlineTimeToLeave,
} from "react-icons/md";
import { PiBuildingOfficeLight } from "react-icons/pi";

const Sidebar = ({ showMenu, setShowMenu }) => {
  const [activeParent, setActiveParent] = useState<number | null>(null);
  const [activeChild, setActiveChild] = useState(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const Role = useSelector((state: RootState) => state.auth.authority);
  const name = useSelector((state: RootState) => state.auth.name);
  const email = useSelector((state: RootState) => state.auth.email);

  const handleParentClick = (index, link, hasChildren) => {
    if (!hasChildren) {
      navigate(link);
    } else {
      setActiveParent(activeParent === index ? null : index);
      setActiveChild(null);
    }
  };

  const handleChildClick = (parentIndex, childIndex, hasChildren) => {
    if (!hasChildren) return;
    setActiveChild(activeChild === childIndex ? null : childIndex);
  };
  const handleLogout = () => {
    localStorage.removeItem("token");
    dispatch(cleanUp());
    navigate("/login");
    setShowMenu(false); // Close sidebar on logout
  };

  const navData =
    Role === "MasterAdmin"
      ? MasterAdminNavData
      : Role === "Admin"
      ? AdminNavData
      : Role === "Employee"
      ? EmployeeNavData
      : Role === "HiringManager"
      ? HRNavData
      : Role === "ProjectManager"
      ? ProjectManagerNavData
      : [];

  return (
    <>
      <div className="relative ">
        {/* Sidebar */}
        <div
          className={`fixed inset-y-0 left-0 w-64 bg-background1 rounded-md dark:bg-secondary1  dark:text-white text-sm pb-2 transition-transform h-[97vh] duration-3000 transform lg:transform-none lg:relative lg:translate-x-0 z-20 ${
            showMenu ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div>
            <div className=" w-full flex flex-col items-center justify-center gap-1  mb-4 h-28  border-b border-gray-200 ">
              {/* <img className='h-7' src={logo} alt="logo" /> */}

              <div className=" flex gap-2 items-center text-gray-400">
                <FaUser className=" text-lg" />
                <h1 className=" text-lg font-semibold  ">{name}</h1>
              </div>
              <div className=" flex gap-2 items-center  text-gray-400">
                <MdMailOutline className=" text-lg" />
                <h1 className=" text-sm font-semibold  ">{email}</h1>
              </div>
            </div>
            <p className="px-4 pb-2 font-semibold">Menu</p>

            {navData.map((data, index) => (
              <div key={index}>
              <div
                className={`mx-2 py-3 w-full rounded flex items-center gap-4 px-4 cursor-pointer transition-colors duration-400 relative group`}
                onClick={() => handleParentClick(index, data.link, !!data.children)}
              >
                {/* Down/Right Arrow as Parent toggle */}
                <div className="w-5">
                  {data.children && (activeParent === index ? <FaAngleDown /> : <FaAngleRight />)}
                </div>
            
                {/* Icon and Label */}
                <div className="dark:text-blue-500 text-base">{data.icon}</div>
                <span>{data.name}</span>
            
                {/* Bottom Border on Hover */}
                <div className="absolute bottom-0 left-0 h-[1px] bg-gray-500 w-0 group-hover:w-full transition-all duration-300"></div>
              </div>
            
              {/* Second level dropdown */}
              {data.children && activeParent === index && (
                <div>
                  {data.children.map((child, childIndex) => (
                    <div key={childIndex}>
                      <div
                        className="mx-2 py-3 bg-transparent dark:bg-secondary1 rounded flex items-center gap-4 pl-8 cursor-pointer relative group"
                        onClick={() => handleChildClick(index, childIndex, !!child.children)}
                      >
                        {child.icon} {child.name}
                        <div className="absolute bottom-0 left-0 h-[1px] bg-gray-500 w-0 group-hover:w-full transition-all duration-300"></div>
                      </div>
            
                      {/* Third level */}
                      {child.children && activeParent === index && activeChild === childIndex && (
                        <div className="pl-12">
                          {child.children.map((grandChild, grandIndex) => (
                            <Link to={grandChild.link} key={grandIndex} className="no-underline">
                              <div className="py-2 rounded flex items-center gap-4 cursor-pointer">
                                {grandChild.icon} {grandChild.name}
                              </div>
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
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
            className="fixed inset-0 bg-primary1 bg-opacity-50 lg:hidden z-10"
            onClick={() => setShowMenu(false)}
          ></div>
        )}
      </div>
    </>
  );
};

export default Sidebar;

const MasterAdminNavData = [
  {
    name: "Home",
    icon: <IoHome />,
    link: "/",
  },
  {
    name: "Add New Company",
    icon: <FaBuilding />,
    link: "/masteradmin/company/add",
  },
  {
    name: "HelpDesk",
    icon: <SiHelpdesk />,
    link: "/helpDesk",
  },
];
const AdminNavData = [
  {
    name: "Home",
    icon: <IoHome />,
    link: "/",
  },
  {
    name: "Main Master",
    icon: <GrDomain />,
    children: [
      {
        name: "Add Designation",
        icon: <GrUserWorker />,
        link: "admin/designation/new",
      },
      {
        name: "Add Holiday",
        icon: <FaRegCalendarCheck />,
        link: "admin/holiday/new",
      },
      {
        name: "Add Client",
        icon: <LuAppWindow />,
        link: "admin/client/new",
      },
      {
        name: "Add Department",
        icon: <PiBuildingOfficeLight />,
        link: "admin/department/new",
      },
    ],
  },
  {
    name: "Leave Management",
    icon: <MdOutlineTimeToLeave />,
    children: [
      {
        name: "Leave Type",
        icon: <MdMergeType />,
        link: "admin/leavetype/new",
      },
      {
        name: "Manage Leave",
        icon: <MdManageHistory />,
        link: "admin/manageleave",
      },
    ],
  },
  {
    name: "Project Master",
    icon: <RiProjectorLine />,
    children: [
      {
        name: "Create Project  ",
        icon: <MdMergeType />,
        link: "/project/new",
      },
      {
        name: "Task Management  ",
        // icon: <MdMergeType />,
        children: [
          {
            name: "Add Task",
            icon: <MdMergeType />,
            link: "/add-task",
          },
          {
            name: "View Tasks",
            icon: <MdMergeType />,
            link: "/view-task",
          },
        ],
      },
      {
        name: "Ongoing Projects  ",
        icon: <MdMergeType />,
        link: "/ongoing_projects/view",
      },
    ],
  },
  {
    name: "TimeSheet",
    icon: <RiProjectorLine />,
    children: [
      {
        name: "Timesheet Details",
        icon: <MdMergeType />,
        link: "/timesheet/view",
      },
    ],
  },
  {
    name: "Add Employee",
    icon: <BsPersonWorkspace />,
    link: "/admin/employees/new",
  },
  {
    name: "HelpDesk",
    icon: <SiHelpdesk />,
    link: "/helpDesk",
  },
];
const HRNavData = [
  {
    name: "Home",
    icon: <IoHome />,
    link: "/",
  },

  {
    name: "Leave Management",
    icon: <MdOutlineTimeToLeave />,
    children: [
      {
        name: "Apply Leave ",
        icon: <MdMergeType />,
        link: "/employee/leave/new",
      },
      {
        name: "Manage Leave",
        icon: <MdManageHistory />,
        link: "admin/manageleave",
      },
    ],
  },

  {
    name: "TimeSheet",
    icon: <RiProjectorLine />,
    children: [
      {
        name: "Fill Timesheet  ",
        icon: <MdMergeType />,
        link: "employee/timesheet/new",
      },
      {
        name: "Timesheet Details",
        icon: <MdMergeType />,
        link: "/timesheet",
      },
    ],
  },
  {
    name: "Add Employee",
    icon: <BsPersonWorkspace />,
    link: "/add-employee",
  },
  {
    name: "HelpDesk",
    icon: <SiHelpdesk />,
    link: "/helpDesk",
  },
];
const EmployeeNavData = [
  {
    name: "Home",
    icon: <IoHome />,
    link: "/",
  },

  {
    name: "Leave Management",
    icon: <MdOutlineTimeToLeave />,
    children: [
      {
        name: "Apply Leave ",
        icon: <MdMergeType />,
        link: "/employee/leave/new",
      },
    ],
  },
  {
    name: "Project Master",
    icon: <RiProjectorLine />,
    children: [
      {
        name: "Ongoing Projects",
        icon: <MdMergeType />,
        link: "/ongoing_projects/view",
      },
      {
        name: "Task Management  ",
        icon: <MdMergeType />,
        Children: [
          {
            name: "View Tasks",
            icon: <MdMergeType />,
            link: "/view-task",
          },
        ],
      },
    ],
  },
  {
    name: "TimeSheet",
    icon: <RiProjectorLine />,
    children: [
      {
        name: "Fill Timesheet  ",
        icon: <MdMergeType />,
        link: "employee/timesheet/new",
      },
    ],
  },
  {
    name: "Attendance",
    icon: <IoHome />,
    link: "/mark-attendance",
  },

  {
    name: "HelpDesk",
    icon: <SiHelpdesk />,
    link: "/helpDesk",
  },
];
const ProjectManagerNavData = [
  {
    name: "Home",
    icon: <IoHome />,
    link: "/",
  },

  {
    name: "Leave Management",
    icon: <MdOutlineTimeToLeave />,
    children: [
      {
        name: "Apply Leave ",
        icon: <MdMergeType />,
        link: "/employee/leave/new",
      },
    ],
  },
  {
    name: "Project Master",
    icon: <RiProjectorLine />,
    children: [
      {
        name: "Project Details ",
        icon: <MdMergeType />,
        link: "/employee/leave/new",
      },
      {
        name: "Task Management  ",
        icon: <MdMergeType />,
        Children: [
          {
            name: "Add Task",
            icon: <MdMergeType />,
            link: "/add-task",
          },
          {
            name: "View Tasks",
            icon: <MdMergeType />,
            link: "/view-task",
          },
        ],
      },
    ],
  },
  {
    name: "TimeSheet",
    icon: <RiProjectorLine />,
    children: [
      {
        name: "Fill Timesheet  ",
        icon: <MdMergeType />,
        link: "employee/timesheet/new",
      },
      {
        name: "Timesheet Details",
        icon: <MdMergeType />,
        link: "/timesheet",
      },
    ],
  },
  {
    name: "Add Employee",
    icon: <BsPersonWorkspace />,
    link: "/add-employee",
  },
  {
    name: "HelpDesk",
    icon: <SiHelpdesk />,
    link: "/helpDesk",
  },
];
