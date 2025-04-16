"use client";

import { useState,useEffect } from "react";
import api from "@/lib/api";
export default function ProfileDoctor() {

    const [openSections, setOpenSections] = useState({});
    const [patientData, setpatientData] = useState(null);
    const toggleSection = (label) => {
      setOpenSections((prev) => ({
        ...prev,
        [label]: !prev[label],
      }));
    };
    useEffect(() => {
      const fetchpatientData = async () => {
        try {
          const response = await api.get("/api/doctors/me"); // Use the api instance to make the request
          setpatientData(response.data);   
        } catch (error) {
          console.error("Error fetching patient data:", error);
        }
      };
  
      fetchpatientData();
    }, []);
  return (
    <div className="flex h-full bg-gray-100">
      {/* Sidebar */}
      <aside className="w-65 bg-white shadow-lg p-6">
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

      
      {/* Main Content */}
      <main className="flex-1 p-8 bg-white rounded-lg shadow-md">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-800">Patient Profile</h2>
          <button className="bg-blue-600 hover:bg-blue-700 cursor-pointer text-white px-10 py-1.5 rounded-lg transition">Edit</button>
        </div>
        <section className="mt-8">
          <div className="flex items-center space-x-6">
            <div className="w-24 h-24 bg-gray-300 rounded-full"></div>
            <div>
              <h3 className="text-xl font-semibold text-gray-800">{patientData?.firstName || 'Patinet name'} {patientData?.familyName}</h3>
              <p className="text-gray-400 text-sm">{patientData?.email || 'Patient name'}</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-6 mt-6">
            {[
              { label: 'Full Name', value: `${patientData?.firstName} ${patientData?.familyName}` },
              { label: 'Phone Number', value: patientData?.phoneNumber },
              { label: 'Email', value: patientData?.email },
              { label: 'Type', value: 'Student' },
              { label: 'ID', value: '11' },
              { label: 'Age', value: '21' },
              { label: 'Address', value: patientData?.address},
            ].map((field, index) => (
              <div key={index}>
                <label className="text-black text-sm font-medium">{field.label}</label>
                <input 
                  type="text" 
                  value={field.value} 
                  className="w-full bg-gray-200 px-3 py-2 rounded-lg mt-1 text-gray-600" 
                  disabled 
                />

              </div>
            
        

            ))}
          </div>
          <div className="mt-6">
                  <label className="text-black text-sm font-medium">Medical History</label>
                  
                    <button className="bg-[#E85B5B] hover:bg-[#E85B5B] cursor-pointer text-white px-10 py-1.5 rounded-lg transition flex items-center gap-2 mt-2">View</button>

          </div>
        </section>
      </main>
      
      {/* Right Panel */}
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


    </div>
  );
}
