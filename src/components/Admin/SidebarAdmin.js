// SidebarAdmin.js
"use client";
import Link from "next/link";
import { useState, useEffect } from "react";

// Import all necessary icons from MUI
import DashboardIcon from '@mui/icons-material/Dashboard';
import PersonAdd from  '@mui/icons-material/PersonAdd';
import GroupIcon from '@mui/icons-material/Group';
import AssessmentIcon from '@mui/icons-material/Assessment';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import CategoryIcon from '@mui/icons-material/Category';
import SchoolIcon from '@mui/icons-material/School';
import AssignmentIcon from '@mui/icons-material/Assignment';
import VideocamIcon from '@mui/icons-material/Videocam';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import ForumIcon from '@mui/icons-material/Forum';
import PollIcon from '@mui/icons-material/Poll';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import CampaignIcon from '@mui/icons-material/Campaign';
import SettingsIcon from '@mui/icons-material/Settings';
import WebIcon from '@mui/icons-material/Web';
import NotificationsIcon from '@mui/icons-material/Notifications';

// Map icon names to MUI components
const iconMap = {
  DashboardIcon: DashboardIcon,
  PersonAdd: PersonAdd,
  GroupIcon: GroupIcon,
  AssessmentIcon: AssessmentIcon,
  LibraryBooksIcon: LibraryBooksIcon,
  CategoryIcon: CategoryIcon,
  SchoolIcon: SchoolIcon,
  AssignmentIcon: AssignmentIcon,
  VideocamIcon: VideocamIcon,
  VerifiedUserIcon: VerifiedUserIcon,
  ForumIcon: ForumIcon,
  PollIcon: PollIcon,
  AccountBalanceIcon: AccountBalanceIcon,
  CampaignIcon: CampaignIcon,
  SettingsIcon: SettingsIcon,
  WebIcon: WebIcon,
  NotificationsIcon: NotificationsIcon,
};

const Sidebar = ({ isOpen, dataMenu, pathname }) => {
  const [activeMenu, setActiveMenu] = useState(null);

  useEffect(() => {
    const activeItem = dataMenu.find(menu => menu.url === pathname);
    setActiveMenu(activeItem ? activeItem.uuid : null);
  }, [pathname, dataMenu]);

  return (
    <div className={`h-screen ${isOpen ? "w-64" : "w-20"} bg-white border-r border-gray-200 transition-all duration-300 fixed overflow-y-auto`}> {/* Added `overflow-y-auto` */}
      <div className="p-4 flex items-center justify-between">
        <Link href="/" className="flex items-center">
          <img src="/images/lambang-pkpa.png" alt="PKPA Logo" className="h-auto w-auto" />
          {isOpen && <span className="ml-2 text-xl font-bold">PKPA</span>}
        </Link>
      </div>

      <ul className="space-y-1">
        {dataMenu.map((menu) => {
          // Get the corresponding icon component from the iconMap
          const IconComponent = iconMap[menu.icon];
          return (
            <li key={menu.id}>
              <Link href={menu.url}
                className={`flex items-center p-3 text-sm font-medium ${activeMenu === menu.uuid ? "bg-gray-200 text-blue-500" : "text-gray-700 hover:bg-gray-100"} ${isOpen ? "" : "justify-center"}`}>
                {/* Render the icon as a MUI component */}
                {IconComponent && <IconComponent className="h-6 w-6 mr-3" />}
                {isOpen && <span>{menu.name}</span>}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Sidebar;
