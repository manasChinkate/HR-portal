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
        link: "/designation/new",
      },
      {
        title: "Add Holiday",
        icon: "FaRegCalendarCheck",
        link: "/holiday/new",
      },
      {
        title: "Add Client",
        icon: "LuAppWindow",
        link: "/client/new",
      },
      {
        title: "Add Department",
        icon: "PiBuildingOfficeLight",
        link: "/department/new",
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
        link: "/leavetype/new",
      },
      {
        title: "Manage Leave",
        icon: "MdManageHistory",
        link: "/manageleave",
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
    link: "/employees/new",
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
    title: "Menu Master",
    icon: "FaBuilding",
    link: "/menu",
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
        link: "/leave/new",
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
        icon: "BookText",
        link: "/timesheet/new",
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
