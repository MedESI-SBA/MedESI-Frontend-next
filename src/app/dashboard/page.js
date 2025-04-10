"use client";
import ProtectedRoute from "@/components/ProtectedRoute/ProtectedRoute";
import React,{useState} from 'react'; 
import api from "@/lib/api";
import Image from 'next/image'; 
import {
  LuLayoutDashboard,
  LuActivity,
  LuCalendarDays,
  LuSettings,
  LuUser,
  LuFolderOpen,
  LuFileText,
  LuChartBar,
  LuBriefcase,
  LuRss,
  LuShare2,
  LuSearch,
  LuBell,
  LuUserPlus,
  LuCalendarCheck,
  LuFileWarning,
  LuClock,
  LuUpload, 
  LuPlus,
  LuMoreVertical
} from 'react-icons/lu';


export default function Dashboard() {
  const navItems = [
    { label: 'Default', icon: LuLayoutDashboard, active: true, category: 'Dashboards' },
    { label: 'Activities', icon: LuActivity, active: false, category: 'Dashboards' },
    { label: 'Schedule', icon: LuCalendarDays, active: false, category: 'Dashboards' },
    { label: 'Something', icon: LuSettings, active: false, category: 'Dashboards' },
    { label: 'User Profile', icon: LuUser, active: false, category: 'Pages' },
    { label: 'Overview', icon: LuFolderOpen, active: false, category: 'Pages' },
    // Add other items from the image if needed
    { label: 'Projects', icon: LuBriefcase, active: false, category: 'Pages' },
    { label: 'Campaigns', icon: LuChartBar, active: false, category: 'Pages' },
    { label: 'Documents', icon: LuFileText, active: false, category: 'Pages' },
    { label: 'Usage', icon: LuRss, active: false, category: 'Pages' },
    { label: 'Account', icon: LuSettings, active: false, category: 'Pages' },
    { label: 'Corporate', icon: LuBriefcase, active: false, category: 'Blog' }, // Example Category
    { label: 'Blog', icon: LuRss, active: false, category: 'Blog' },
    { label: 'Social', icon: LuShare2, active: false, category: 'Blog' },
  ];

  const groupedItems = navItems.reduce((acc, item) => {
    // Ensure the category array exists before pushing
    if (!acc[item.category]) {
      acc[item.category] = [];
    }
    acc[item.category].push(item);
    return acc;
  }, {}); 
  const [openSections, setOpenSections] = useState({});

  const toggleSection = (label) => {
    setOpenSections((prev) => ({
      ...prev,
      [label]: !prev[label],
    }));
  };
  // Right Sidebar Data
  const notifications = [
    { id: 1, text: 'You have a student who submitted...', time: 'Just now', icon: LuUserPlus },
    { id: 2, text: 'Akram needs his medical history updated', time: '49 minutes ago', icon: LuFileWarning },
    { id: 3, text: 'Tarek have missed his appointment', time: '12 hours ago', icon: LuCalendarCheck },
    { id: 4, text: "You've clocked in 9:00 today", time: 'Today 11:30 AM', icon: LuClock },
  ];

  const activities = [
    { id: 1, text: 'You have an appointment...', time: 'Just now', icon: LuCalendarCheck },
    { id: 2, text: 'Bro got his appointment date...', time: '31 mins ago', icon: LuCalendarCheck },
    { id: 3, text: 'You have 4 profiles that need...', time: '12 hours ago', icon: LuUserPlus },
    { id: 4, text: 'Place holder', time: 'Feb 2, 2025', icon: LuUserPlus },
    { id: 5, text: '2nd mc place holder', time: 'Feb 2, 2025', icon: LuUserPlus },
  ];

  // Patient Table Data
  const patients = Array(10).fill({
    id: '123',
    name: 'Melliani Tarek',
    avatar: 'pr2.svg', // <<< Make sure this path exists in your public folder
    role: 'Patient',
    email: 't.melloni@email-labz.ie',
    phone: '0667 63 78 49',
    birth: '1989-01-01',
  });
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };
  const handleUpload = async () => {
    if (!file) {
      setUploadError("Please select a file first.");
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      setUploading(true);
      setUploadError(null);
      const response = await api.post('/api/admins/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log('File uploaded successfully:', response.data);
    } catch (error) {
      console.error('File upload failed:', error);
      setUploadError("File upload failed. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <ProtectedRoute>
      <div className="flex h-screen bg-main-bg"> {/* Overall Flex Container */}

        {/* --- Sidebar --- */}
        <aside className="border-r border-gray-300 w-64 h-screen bg-sidebar-bg shadow-subtle p-4 flex-col fixed top-0 left-0 hidden md:flex">
             <div className="flex items-center space-x-3 mb-8">
               <img src="Logo.svg" className="w-10 h-10" alt="Logo" />
               <h1 className="font-bold text-xl text-gray-800">Doctor Esi</h1>
             </div>
             <nav>
               <h2 className="text-gray-500 text-sm font-light mb-2">Favorites</h2>
               <ul className="space-y-2 text-gray-700">
                 <li className="hover:text-black cursor-pointer flex items-center gap-2">
                   <span className="text-gray-500 font-light text-xl">•</span> Overview
                 </li>
                 <li className="hover:text-black cursor-pointer flex items-center gap-2">
                   <span className="text-gray-500 font-light text-xl">•</span> Schedule
                 </li>
               </ul>

               <h2 className="text-gray-500 text-sm font-light mt-6 mb-2">Dashboards</h2>
               <ul className="space-y-3 text-gray-700">
                 {['Default', 'Activities', 'Schedule', 'Something'].map((item, index) => (
                   <li
                     key={index}
                     className={`flex items-center space-x-3 p-3 rounded-lg cursor-pointer relative ${
                       item === 'Default' ? 'bg-[#E1E1E1] text-black' : 'hover:bg-gray-200'
                     }`}
                   >
                     {item === 'Default' && (
                       <div className="absolute left-0 top-3 h-[50%] w-1.5 bg-black rounded"></div>
                     )}
                     <img src={`${item}.svg`} className="w-5 h-5" alt={item} />
                     <span>{item}</span>
                   </li>
                 ))}
               </ul>
               
               <h2 className="text-gray-500 text-sm font-light mt-6 mb-2">Pages</h2>
               <ul className="space-y-3 text-gray-700">
                 {[
                   { icon: 'Userp.svg', label: 'User Profile', subItems: ['Overview', 'Projects', 'Campaigns', 'Documents', 'Usage'] },
                   { icon: 'Account.svg', label: 'Account' },
                   { icon: 'Corporate.svg', label: 'Corporate' },
                   { icon: 'Blog.svg', label: 'Blog' },
                   { icon: 'Social.svg', label: 'Social' },
                 ].map((page, index) => (
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
                           <img src="ArrowLineRight.svg" alt="" className="w-5 h-5 " />
                         </span>
                       )}
                       <img src={page.icon} className="w-5 h-5" alt={page.label} />
                       <span>{page.label}</span>
                     </div>
                     {page.subItems && openSections[page.label] && (
                       <ul className="pl-6 space-y-1 text-gray-500 text-sm">
                         {page.subItems.map((subItem, subIndex) => (
                           <li key={subIndex} className="hover:text-black cursor-pointer">{subItem}</li>
                         ))}
                       </ul>
                     )}
                   </li>
                 ))}
               </ul>
             </nav>
           </aside>

        {/* --- Main Content Area (includes Topbar, Main section, Right Sidebar) --- */}
        <div className="flex-1 flex flex-col md:ml-64"> 

          {/* --- Topbar --- */}
          <header className="sticky top-0 bg-white border-b border-gray-200 flex items-center justify-between px-6 h-16 z-10"> {/* Use sticky */}
            {/* Left Side: Breadcrumbs/Title */}
            <div>
              <span className="text-sm text-text-muted">Dashboards</span>
              <span className="text-sm text-text-muted mx-1">/</span>
              <span className="text-sm font-medium text-gray-800">Default</span>
            </div>
            {/* Right Side: Search & Icons */}
            <div className="flex items-center space-x-4">
              <div className="relative hidden sm:block"> {/* Hide search on very small screens */}
                <LuSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="text"
                  placeholder="Search..."
                  className="bg-gray-100 rounded-md pl-10 pr-4 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <button className="text-gray-500 hover:text-gray-700">
                <LuSettings size={20} />
              </button>
              <button className="text-gray-500 hover:text-gray-700 relative">
                <LuBell size={20} />
                {/* Optional: Notification badge */}
              </button>
              <button className="text-gray-500 hover:text-gray-700">
                <LuUser size={24} />
              </button> 
            </div>
          </header>

          {/* --- Scrollable Content (Main + Right Sidebar) --- */}
          <div className="flex flex-1 overflow-hidden"> {/* Flex container for main content and right sidebar */}

             {/* --- Main Dashboard Content --- */}
            <main className="flex-1 overflow-y-auto p-6"> {/* Scrollable main content */}
              <h2 className="text-xl font-semibold text-gray-800 mb-6">Admin Dashboard</h2>

              {/* Top Cards Row */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">

                {/* --- Card 1: Create Patient (Inlined DashboardCard Structure) --- */}
                <div className="p-6 rounded-lg shadow-subtle bg-card-blue-bg">
                  <h3 className="text-base font-semibold text-gray-700 mb-4">Create Patient accounts</h3>
                  <div>
                    <div className="flex flex-col items-center justify-center text-center text-gray-500 border-2 border-dashed border-gray-300 rounded-lg p-8 h-40">
                      <LuUpload size={32} className="mb-2 text-gray-400" />
                      <p className="text-sm mb-2">Drag & Drop your file</p>
                      <p className="text-xs mb-3">or</p>
                      <input
                        type="file"
                        onChange={handleFileChange}
                        className="bg-white text-blue-600 border border-gray-300 hover:bg-gray-50 text-sm font-medium py-1.5 px-4 rounded-md"
                      />
                      {file && <p className="mt-2 text-gray-700">File selected: {file.name}</p>}
                    </div>
                    <button
                      onClick={handleUpload}
                      disabled={uploading}
                      className="mt-4 bg-blue-600 text-white hover:bg-blue-700 text-sm font-medium py-1.5 px-4 rounded-md"
                    >
                      {uploading ? 'Uploading...' : 'Upload'}
                    </button>
                    {uploadError && <p className="mt-2 text-red-500">{uploadError}</p>}
                  </div>
                </div>

                {/* --- Card 2: Manual Account (Inlined DashboardCard Structure) --- */}
                <div className="p-6 rounded-lg shadow-subtle bg-card-blue-bg">
                   <h3 className="text-base font-semibold text-gray-700 mb-4">Manual account</h3>
                    <div>
                      <div className="flex flex-col items-center justify-center text-center text-gray-500 border-2 border-dashed border-gray-300 rounded-lg p-8 h-40">
                        <LuPlus size={32} className="mb-2 text-gray-400" />
                        <p className="text-sm mb-2">Add a new account manually</p>
                        <button className="bg-blue-600 text-white hover:bg-blue-700 text-sm font-medium py-1.5 px-4 rounded-md mt-3">
                          Create Account
                        </button>
                      </div>
                    </div>
                </div>
              </div>

              {/* --- Patient Table --- */}
              <div className="bg-white rounded-lg shadow-subtle mt-6 overflow-x-auto">
                <table className="w-full min-w-[800px] text-sm text-left text-gray-600">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                    <tr>
                      <th scope="col" className="p-4">
                        <input type="checkbox" className="form-checkbox h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500" />
                      </th>
                      <th scope="col" className="px-6 py-3">User</th>
                      <th scope="col" className="px-6 py-3">Role</th>
                      <th scope="col" className="px-6 py-3">Mail</th>
                      <th scope="col" className="px-6 py-3">Phone</th>
                      <th scope="col" className="px-6 py-3">Birth</th>
                      <th scope="col" className="px-6 py-3 text-center">Medical History</th>
                      {/* <th scope="col" className="px-6 py-3"><span className="sr-only">Actions</span></th> */}
                    </tr>
                  </thead>
                  <tbody>
                    {patients.map((patient, index) => (
                      <tr key={index} className="bg-white border-b hover:bg-gray-50">
                        <td className="w-4 p-4">
                          <input type="checkbox" className="form-checkbox h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500" />
                        </td>
                        <th scope="row" className="flex items-center px-6 py-3 text-gray-900 whitespace-nowrap">
                           <Image
                              className="w-8 h-8 rounded-full mr-3 object-cover" // Added object-cover
                              src={patient.avatar}
                              alt={`${patient.name} avatar`}
                              width={32}
                              height={32}
                              unoptimized // Use if loading from /public locally without specific loader config
                           />
                          <span className="truncate">{patient.name}</span>
                        </th>
                        <td className="px-6 py-3">{patient.role}</td>
                        <td className="px-6 py-3 truncate">{patient.email}</td>
                        <td className="px-6 py-3 whitespace-nowrap">{patient.phone}</td>
                        <td className="px-6 py-3 whitespace-nowrap">{patient.birth}</td>
                        <td className="px-6 py-3 text-center">
                          <button className=" bg-red-400 hover:bg-button-red-hover text-white text-xs font-semibold py-1.5 px-4 rounded-full transition-colors duration-150 ease-in-out whitespace-nowrap">
                            View
                          </button>
                        </td>
                        {/* <td className="px-6 py-3 text-right"> <button>...</button> </td> */}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {/* Add Spacer at the bottom if needed */}
              <div className="h-10"></div>
            </main>

            {/* --- Right Sidebar --- */}
            <aside className="w-80 bg-white p-6 shadow-xl rounded-2xl">
            {/* Notifications Section */}
            <h2 className="text-lg font-semibold text-gray-800 mb-4"> Notifications</h2>
            <ul className="text-[13px] space-y-3">
            {[
              { icon: "problem.svg", text: "You have a student who submitted a long report about something important", time: "Just now" },
              { icon: "newprof.svg", text: "Akram needs his medical history", time: "59 minutes ago" },
              { icon: "alarm.svg", text: "Tarek missed his appointment", time: "12 hours ago" }
            ].map((item, index) => (
              <li 
                key={index} 
                className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg shadow-sm hover:bg-gray-100 transition"
              >
                <img src={item.icon} className="w-6 h-6" alt="Icon" />
                <div className="flex-1 min-w-0">
                  <p className="text-gray-800 font-medium truncate w-48">{item.text}</p>
                  <span className="text-gray-500 text-xs">{item.time}</span>
                </div>
              </li>
            ))}
          </ul>
          
            {/* Activities Section */}
            <h2 className="text-lg font-semibold text-gray-800 mt-6 mb-4"> Activities</h2>
            <ul className="text-sm space-y-3">
              {[
                { icon: "pr2.svg", text: "You have an appointment", time: "Just now" },
                { icon: "pr3.svg", text: "Bro got his appointment delayed", time: "59 minutes ago" },
                { icon: "pr4.svg", text: "You have 4 profiles to review", time: "12 hours ago" }
              ].map((item, index) => (
                <li key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg shadow-sm hover:bg-gray-100 transition">
                  <img src={item.icon} className="w-6 h-6" alt="Icon" />
                  <div>
                    <p className="text-gray-800 font-medium">{item.text}</p>
                    <span className="text-gray-500 text-xs">{item.time}</span>
                  </div>
                </li>
              ))}
            </ul>
          </aside>
            
          </div> {/* End Scrollable Content */}
        </div> {/* End Main Content Area */}
      </div> {/* End Overall Flex Container */}
    </ProtectedRoute>
  );
}