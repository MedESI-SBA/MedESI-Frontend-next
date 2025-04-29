"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { LuLogOut } from "react-icons/lu";

export default function Sidebar({ userType }) {
  const router = useRouter();
  const [openSections, setOpenSections] = useState({});

  // Navigation items for different user types
  const navItems = {
    doctor: [
      {
        icon: "/Dashboard.svg",
        label: "Dashboard",
        path: "/doctor/dashboard",
      },
      {
        icon: "/Schedule.svg",
        label: "Schedule",
        path: "/doctor/schedule",
      },
    ],
    admin: [
      {
        icon: "/Dashboard.svg",
        label: "Dashboard",
        path: "/admin/dashboard",
      },
    ],
  };

  const pages = [
    {
      icon: "/Userp.svg",
      label: "Profile",
      subItems: ["Overview", "Settings"],
    },
    {
      icon: "/Account.svg",
      label: "Account",
    },
  ];

  const toggleSection = (label) => {
    setOpenSections((prev) => ({ ...prev, [label]: !prev[label] }));
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/");
  };

  return (
    <aside className="w-64 bg-white border-r border-gray-200 p-6 overflow-y-auto sticky top-0 h-screen flex flex-col">
      {/* Logo */}
      <div className="flex items-center space-x-3 mb-8">
        <img src="/Logo.svg" className="w-10 h-10" alt="Logo" />
        <h1 className="font-bold text-xl text-gray-800">
          {userType === "doctor" ? "Doctor" : "Admin"} Panel
        </h1>
      </div>

      {/* Navigation */}
      <div className="mb-6">
        <h2 className="text-gray-500 text-sm font-light mb-2">Navigation</h2>
        <ul className="space-y-3 text-gray-700">
          {navItems[userType].map((item, index) => (
            <li
              key={index}
              className={`flex items-center space-x-3 p-3 rounded-lg cursor-pointer ${
                router.pathname === item.path
                  ? "bg-[#E1E1E1] text-black"
                  : "hover:bg-gray-200"
              }`}
              onClick={() => router.push(item.path)}
            >
              {router.pathname === item.path && (
                <div className="absolute left-0 top-3 h-[50%] w-1.5 bg-black rounded"></div>
              )}
              <img src={item.icon} className="w-5 h-5" alt={item.label} />
              <span>{item.label}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Common Pages Section */}
      <div>
        <h2 className="text-gray-500 text-sm font-light mb-2">Account</h2>
        <ul className="space-y-3 text-gray-700">
          {pages.map((page, index) => (
            <li key={index} className="flex flex-col">
              <div
                className="flex items-center space-x-3 p-3 hover:bg-gray-200 rounded-lg cursor-pointer"
                onClick={() => toggleSection(page.label)}
              >
                {page.subItems && (
                  <span
                    className={`text-gray-500 transition-transform ${
                      openSections[page.label] ? "rotate-90" : ""
                    }`}
                  >
                    <img src="/ArrowLineRight.svg" className="w-5 h-5" alt="" />
                  </span>
                )}
                <img src={page.icon} className="w-5 h-5" alt={page.label} />
                <span>{page.label}</span>
              </div>
              {page.subItems && openSections[page.label] && (
                <ul className="pl-6 space-y-1 text-gray-500 text-sm">
                  {page.subItems.map((subItem, subIndex) => (
                    <li
                      key={subIndex}
                      className="hover:text-black cursor-pointer"
                      onClick={() =>
                        router.push(`/${userType}/${subItem.toLowerCase()}`)
                      }
                    >
                      {subItem}
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </div>

      {/* Logout Button */}
      <div className="mt-auto pt-6">
        <button
          onClick={handleLogout}
          className="flex items-center space-x-3 p-3 w-full text-left hover:bg-gray-200 rounded-lg cursor-pointer"
        >
          <LuLogOut className="w-5 h-5 text-gray-700" />
          <span className="text-gray-700">Logout</span>
        </button>
      </div>
    </aside>
  );
}
