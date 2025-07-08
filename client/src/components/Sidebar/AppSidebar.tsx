import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";

import { Link } from "react-router-dom";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../ui/collapsible";
import {
  BookText,
  ChevronDown,
  ClipboardList,
  ClipboardType,
  ClockArrowUp,
  FilePlus,
  FilePlus2,
  FolderKanban,
  ListChecks,
  ListEnd,
  MessageCircleQuestionMark,
  ReceiptText,
} from "lucide-react";
import { useSelector } from "react-redux";
import { RootState } from "app/store";
import { IoHome } from "react-icons/io5";
import {
  MdMailOutline,
  MdManageHistory,
  MdMergeType,
  MdOutlineTimeToLeave,
} from "react-icons/md";
import { GrDomain, GrUserWorker } from "react-icons/gr";
import { FaBuilding, FaRegCalendarCheck, FaUser } from "react-icons/fa";
import { LuAppWindow } from "react-icons/lu";
import { PiBuildingOfficeLight } from "react-icons/pi";
import { RiProjectorLine } from "react-icons/ri";
import { BsPersonWorkspace } from "react-icons/bs";
import { SiHelpdesk } from "react-icons/si";
import { AdminNavData, EmployeeNavData, MasterAdminNavData } from "./NavData";
export const iconMapping = {
  IoHome,
  MdMergeType,
  MdOutlineTimeToLeave,
  MdManageHistory,
  GrDomain,
  ClipboardType,
  FilePlus,
  ListChecks,
  MessageCircleQuestionMark,
  ListEnd,
  ClockArrowUp,
  FolderKanban,
  ClipboardList,
  FilePlus2,
  GrUserWorker,
  ReceiptText,
  BookText,
  FaRegCalendarCheck,
  LuAppWindow,
  PiBuildingOfficeLight,
  RiProjectorLine,
  BsPersonWorkspace,
  SiHelpdesk,
  FaUser,
  MdMailOutline,
  FaBuilding,
};

const AppSidebar = () => {
  const Role = useSelector((state: RootState) => state.auth.authority);
  const name = useSelector((state: RootState) => state.auth.name);
  const email = useSelector((state: RootState) => state.auth.email);

  const navData =
    Role === "MasterAdmin"
      ? MasterAdminNavData
      : Role === "Admin"
      ? AdminNavData
      : Role === "Employee"
      ? EmployeeNavData
      : // : Role === "HiringManager"
        // ? HRNavData
        // : Role === "ProjectManager"
        // ? ProjectManagerNavData
        [];

  return (
    <Sidebar variant="floating">
      <SidebarHeader>
        <div className="w-full flex flex-col items-center justify-center gap-1 h-28 border-gray-200">
          <div className="flex gap-2 items-center text-gray-400">
            <FaUser className="text-lg" />
            <h1 className="text-lg font-semibold">{name}</h1>
          </div>
          <div className="flex gap-2 items-center text-gray-400">
            <MdMailOutline className="text-lg" />
            <h1 className="text-sm font-semibold">{email}</h1>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent className="px-4">
        <SidebarGroup />
        <SidebarGroupLabel>Menu</SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu className="text-sm">
            {navData.map((item) => {
              const Icon = iconMapping[item.icon as keyof typeof iconMapping];

              return item.children ? (
                <Collapsible key={item.title} className="group/collapsible">
                  <SidebarMenuItem>
                    <CollapsibleTrigger asChild>
                      <SidebarMenuButton>
                        {Icon && <Icon className="w-5 h-5 " />}
                        <span>{item.title}</span>
                        <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
                      </SidebarMenuButton>
                    </CollapsibleTrigger>
                  </SidebarMenuItem>
                  <CollapsibleContent>
                    <SidebarMenuSub>
                      {item.children.map((subItem) => {
                        const SubIcon =
                          iconMapping[subItem.icon as keyof typeof iconMapping];

                        return subItem.children ? (
                          <Collapsible key={subItem.title} className="pl-4">
                            <SidebarMenuItem>
                              <CollapsibleTrigger asChild>
                                <SidebarMenuButton>
                                  {SubIcon && <SubIcon className="w-4 h-4" />}
                                  <span>{subItem.title}</span>
                                  <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
                                </SidebarMenuButton>
                              </CollapsibleTrigger>
                            </SidebarMenuItem>
                            <CollapsibleContent>
                              <SidebarMenuSub>
                                {subItem.children.map((nestedItem) => {
                                  const NestedIcon =
                                    iconMapping[
                                      nestedItem.icon as keyof typeof iconMapping
                                    ];

                                  return (
                                    <SidebarMenuItem
                                      className="text-sm"
                                      key={nestedItem.title}
                                    >
                                      <SidebarMenuButton asChild>
                                        <Link to={nestedItem.link || ""}>
                                          {NestedIcon && (
                                            <NestedIcon className="w-4 h-4" />
                                          )}
                                          <span>{nestedItem.title}</span>
                                        </Link>
                                      </SidebarMenuButton>
                                    </SidebarMenuItem>
                                  );
                                })}
                              </SidebarMenuSub>
                            </CollapsibleContent>
                          </Collapsible>
                        ) : (
                          <SidebarMenuItem key={subItem.title}>
                            <SidebarMenuButton asChild>
                              <Link to={subItem.link || ""}>
                                {SubIcon && <SubIcon className="w-4 h-4" />}
                                <span>{subItem.title}</span>
                              </Link>
                            </SidebarMenuButton>
                          </SidebarMenuItem>
                        );
                      })}
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </Collapsible>
              ) : (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link to={item.link || ""}>
                      {Icon && <Icon className="w-5 h-5" />}
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              );
            })}
          </SidebarMenu>
        </SidebarGroupContent>
        <SidebarGroup />
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
};

export default AppSidebar;
