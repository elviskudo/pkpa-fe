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
  const [expandedParent, setExpandedParent] = useState(null); // Track expanded parent

  useEffect(() => {
    const activeItem = dataMenu.find(menu => menu.url === pathname) || 
      dataMenu.flatMap(menu => menu.children || []).find(child => child.url === pathname);
    setActiveMenu(activeItem ? activeItem.uuid : null);

    if (activeItem && activeItem.parent_id) {
      setExpandedParent(activeItem.parent_id);
    }
  }, [pathname, dataMenu]);

  const handleParentClick = (menu) => {
    // Toggle expansion for parent without URL
    if (expandedParent === menu.id) {
      setExpandedParent(null); // Collapse if already expanded
    } else {
      setExpandedParent(menu.id); // Expand the selected parent
    }
  };

  return (
    <div className={`h-screen ${isOpen ? "w-64" : "w-20"} bg-white border-r border-gray-200 transition-all duration-300 fixed overflow-y-auto`}>
      <div className="p-4 flex items-center justify-between">
        <Link href="/" className="flex items-center">
          <img src="/images/lambang-pkpa.png" alt="PKPA Logo" className="h-auto w-auto" />
          {isOpen && <span className="ml-2 text-xl font-bold">PKPA</span>}
        </Link>
      </div>

      <ul className="space-y-1">
        {dataMenu.map((menu) => {
          const IconComponent = iconMap[menu.icon];
          const isActiveParent = expandedParent === menu.id;

          return (
            <li key={menu.id}>
              {menu.url ? (
                // Jika parent memiliki URL, gunakan <Link> untuk navigasi
                <Link href={menu.url}
                  className={`flex items-center p-3 text-sm font-medium ${activeMenu === menu.uuid ? "bg-orange-50 text-[#fe9800]" : "text-gray-700 hover:bg-gray-100"} ${isOpen ? "" : "justify-center"}`}
                  onClick={() => handleParentClick(menu)}
                >
                  {IconComponent && <IconComponent className="h-6 w-6 mr-3" />}
                  {isOpen && <span>{menu.name}</span>}
                </Link>
              ) : (
                // Jika parent tidak memiliki URL, gunakan div untuk toggle child
                <div
                  onClick={() => handleParentClick(menu)}
                  className={`flex items-center p-3 text-sm font-medium cursor-pointer ${isActiveParent ? "bg-orange-50 text-[#fe9800]" : "text-gray-700 hover:bg-gray-100"} ${isOpen ? "" : "justify-center"}`}
                >
                  {IconComponent && <IconComponent className="h-6 w-6 mr-3" />}
                  {isOpen && <span>{menu.name}</span>}
                </div>
              )}

              {/* Render children if they exist, sidebar is open, and parent is expanded */}
              {menu.children && menu.children.length > 0 && isOpen && isActiveParent && (
                <ul className="pl-6 space-y-1">
                  {menu.children.map((child) => {
                    const ChildIconComponent = iconMap[child.icon];
                    return (
                      <li key={child.id}>
                        <Link href={child.url}
                          className={`flex items-center p-2 text-sm font-medium ${activeMenu === child.uuid ? "bg-orange-50 text-[#fe9800]" : "text-gray-600 hover:bg-gray-50"} ${isOpen ? "" : "justify-center"}`}
                        >
                          {ChildIconComponent && <ChildIconComponent className="h-5 w-5 mr-2" />}
                          {isOpen && <span>{child.name}</span>}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Sidebar;