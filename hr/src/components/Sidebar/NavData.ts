


export const AdminNavData = [
  {
    title: "Home",
    icon: "IoHome",
    link: "/",
  },
  {
    title: "Main Master",
    icon: "GrDomain",
    children: [
      {
        title: "Add Designation",
        icon: "GrUserWorker",
        link: "admin/designation/new",
      },
      {
        title: "Add Holiday",
        icon: "FaRegCalendarCheck",
        link: "admin/holiday/new",
      },
      {
        title: "Add Client",
        icon: "LuAppWindow",
        link: "admin/client/new",
      },
      {
        title: "Add Department",
        icon: "PiBuildingOfficeLight",
        link: "admin/department/new",
      },
    ],
  },
  {
    title: "Leave Management",
    icon: "MdOutlineTimeToLeave",
    children: [
      {
        title: "Leave Type",
        icon: "MdMergeType",
        link: "admin/leavetype/new",
      },
      {
        title: "Manage Leave",
        icon: "MdManageHistory",
        link: "admin/manageleave",
      },
    ],
  },
  {
    title: "Project Master",
    icon: "RiProjectorLine",
    children: [
      {
        title: "Create Project  ",
        icon: "MdMergeType",
        link: "/project/new",
      },

      {
        title: "Ongoing Projects  ",
        icon: "MdMergeType",
        link: "/ongoing_projects/view",
      },
    ],
  },
  {
    title: "Task Management  ",
    icon: "MdMergeType",
    children: [
      {
        title: "Add Task",
        icon: "MdMergeType",
        link: "/add-task",
      },
      {
        title: "View Tasks",
        icon: "MdMergeType",
        link: "/view-task",
      },
    ],
  },
  {
    title: "TimeSheet",
    icon: "RiProjectorLine",
    children: [
      {
        title: "Timesheet Details",
        icon: "MdMergeType",
        link: "/timesheet/view",
      },
    ],
  },
  {
    title: "Add Employee",
    icon: "BsPersonWorkspace",
    link: "/admin/employees/new",
  },
  {
    title: "HelpDesk",
    icon: "SiHelpdesk",
    link: "/helpDesk",
  },
];

export const MasterAdminNavData = [
  {
    title: "Home",
    icon: "IoHome",
    link: "/",
  },
  {
    title: "Add New Company",
    icon: "FaBuilding",
    link: "/company/new",
  },
  {
    title: "HelpDesk",
    icon: "SiHelpdesk",
    link: "/helpDesk",
  },
];

export const EmployeeNavData = [
  {
    title: "Home",
    icon: "IoHome",
    link: "/",
  },

  {
    title: "Leave Management",
    icon: "MdOutlineTimeToLeave",
    children: [
      {
        title: "Apply Leave ",
        icon: "MdMergeType",
        link: "/employee/leave/new",
      },
    ],
  },
  {
    title: "Project Master",
    icon: "RiProjectorLine",
    children: [
      {
        title: "Ongoing Projects",
        icon: "MdMergeType",
        link: "/ongoing_projects/view",
      },
     
    ],
  },
  {
    title: "Task Management  ",
    icon: "MdMergeType",
    children: [
      {
        title: "View Tasks",
        icon: "MdMergeType",
        link: "/view-task",
      },
    ],
  },
  
  {
    title: "TimeSheet",
    icon: "RiProjectorLine",
    children: [
      {
        title: "Fill Timesheet  ",
        icon: "MdMergeType",
        link: "employee/timesheet/new",
      },
    ],
  },
  {
    title: "Attendance",
    icon: "IoHome",
    link: "/mark-attendance",
  },

  {
    title: "HelpDesk",
    icon: "SiHelpdesk",
    link: "/helpDesk",
  },
];