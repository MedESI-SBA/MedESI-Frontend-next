"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import api from "@/lib/api";
import ProtectedRoute from "@/components/ProtectedRoute/ProtectedRoute";
import { LuSettings, LuUser, LuSearch, LuBell, LuX } from "react-icons/lu";

export default function ProfileDoctor() {
  const router = useRouter();
  const [openSections, setOpenSections] = useState({});
  const [adminDATA, setadminDATA] = useState({
    firstName: "",
    familyName: "",
    phoneNumber: "",
    email: "",
    roles: "",
    id: "",
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    familyName: "",
    phoneNumber: "",
  });
  const [initialFormData, setInitialFormData] = useState({
    firstName: "",
    familyName: "",
    phoneNumber: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const toggleSection = (label) => {
    setOpenSections((prev) => ({
      ...prev,
      [label]: !prev[label],
    }));
  };

  useEffect(() => {
    const fetchadminDATA = async () => {
      try {
        const response = await api.get("/api/admins/me");
        setadminDATA({
          firstName: response.data.firstName || "",
          familyName: response.data.familyName || "",
          phoneNumber: response.data.phoneNumber || "",
          email: response.data.email || "",
          roles: response.data.roles || "",
          id: response.data.id || "",
        });
        const initialData = {
          firstName: response.data.firstName || "",
          familyName: response.data.familyName || "",
          phoneNumber: response.data.phoneNumber || "",
        };
        setFormData(initialData);
        setInitialFormData(initialData);
      } catch (error) {
        console.error("Error fetching patient data:", error);
      }
    };

    fetchadminDATA();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const payload = {};
      if (formData.firstName !== initialFormData.firstName)
        payload.firstName = formData.firstName;
      if (formData.familyName !== initialFormData.familyName)
        payload.familyName = formData.familyName;
      if (formData.phoneNumber !== initialFormData.phoneNumber)
        payload.phoneNumber = formData.phoneNumber;

      if (Object.keys(payload).length > 0) {
        const { data } = await api.put("/api/admins/me", payload);
        setadminDATA((prev) => ({
          ...prev,
          id: data.user.id || prev.id,
          firstName: data.user.firstName || prev.firstName,
          familyName: data.user.familyName || prev.familyName,
          phoneNumber: data.user.phoneNumber || prev.phoneNumber,
          email: data.user.email || prev.email,
          roles: data.user.roles || prev.roles,
        }));
        const updatedData = {
          firstName: data.user.firstName || formData.firstName,
          familyName: data.user.familyName || formData.familyName,
          phoneNumber: data.user.phoneNumber || formData.phoneNumber,
        };

        setFormData(updatedData);
        setInitialFormData(updatedData);

      }
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error updating profile:", error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <ProtectedRoute>
      <div className="flex  bg-gray-100 h-screen">
        {isModalOpen && (
          <div className="fixed inset-0 backdrop-blur-sm  bg-white/30 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md border-1 border-black">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold">Edit Profile</h3>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="text-gray-500 hover:text-gray-700 cursor-pointer"
                >
                  <LuX size={24} />
                </button>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      First Name
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Family Name
                    </label>
                    <input
                      type="text"
                      name="familyName"
                      value={formData.familyName}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Phone Number
                    </label>
                    <input
                      type="text"
                      name="phoneNumber"
                      value={formData.phoneNumber}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
                <div className="mt-6 flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-4 py-2 border cursor-pointer border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="px-4 py-2 bg-blue-600 cursor-pointer text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
                  >
                    {isLoading ? (
                      <span className="flex items-center justify-center">
                        <svg
                          className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Saving...
                      </span>
                    ) : (
                      "Save Changes"
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
        {/* Sidebar */}
        <aside className="w-64 bg-white border-r border-gray-200 p-6">
          <div className="flex items-center space-x-3 mb-8">
            <img src="/Logo.svg" className="w-10 h-10" alt="Logo" />
            <h1 className="font-bold text-xl text-gray-800">Doctor Esi</h1>
          </div>

          <div className="mb-6">
            <h2 className="text-gray-500 text-sm font-light mb-2">Favorites</h2>
            <ul className="space-y-2 text-gray-700">
              <li className="hover:text-black cursor-pointer flex items-center gap-2">
                <span className="text-gray-500 font-light text-xl">•</span>{" "}
                Overview
              </li>
              <li className="hover:text-black cursor-pointer flex items-center gap-2">
                <span className="text-gray-500 font-light text-xl">•</span>{" "}
                Schedule
              </li>
            </ul>
          </div>

          <div className="mb-6">
            <h2 className="text-gray-500 text-sm font-light mb-2">
              Dashboards
            </h2>
            <ul className="space-y-3 text-gray-700">
              {["Default", "Activities", "Schedule", "Something"].map(
                (item, index) => (
                  <li
                    key={index}
                    className={`flex items-center space-x-3 p-3 rounded-lg cursor-pointer relative ${
                      item === "Default"
                        ? "bg-[#E1E1E1] text-black"
                        : "hover:bg-gray-200"
                    }`}
                  >
                    {item === "Default" && (
                      <div className="absolute left-0 top-3 h-[50%] w-1.5 bg-black rounded"></div>
                    )}
                    <img src={`/${item}.svg`} className="w-5 h-5" alt={item} />
                    <span>{item}</span>
                  </li>
                )
              )}
            </ul>
          </div>

          <div>
            <h2 className="text-gray-500 text-sm font-light mb-2">Pages</h2>
            <ul className="space-y-3 text-gray-700">
              {[
                {
                  icon: "/Userp.svg",
                  label: "User Profile",
                  subItems: [
                    "Overview",
                    "Projects",
                    "Campaigns",
                    "Documents",
                    "Usage",
                  ],
                },
                { icon: "/Account.svg", label: "Account" },
                { icon: "/Corporate.svg", label: "Corporate" },
                { icon: "/Blog.svg", label: "Blog" },
                { icon: "/Social.svg", label: "Social" },
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
                        <img
                          src="/ArrowLineRight.svg"
                          alt=""
                          className="w-5 h-5"
                        />
                      </span>
                    )}
                    <img
                      src={page.icon || "/placeholder.svg"}
                      className="w-5 h-5"
                      alt={page.label}
                    />
                    <span>{page.label}</span>
                  </div>
                  {page.subItems && openSections[page.label] && (
                    <ul className="pl-6 space-y-1 text-gray-500 text-sm">
                      {page.subItems.map((subItem, subIndex) => (
                        <li
                          key={subIndex}
                          className="hover:text-black cursor-pointer"
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
        </aside>

        {/* Main Content */}
        <div className="flex-1 flex flex-col h-full">
          {/* Header */}
          <header className="bg-white border-b border-gray-200 flex items-center justify-between px-6 h-16 z-10">
            {/* Left Side: Breadcrumbs/Title */}
            <div className="flex items-center">
              <span className="text-sm text-gray-500">Admin</span>
              <span className="text-sm text-gray-500 mx-2">/</span>
              <span className="text-sm font-medium text-gray-800">Profile</span>
            </div>

            {/* Right Side: Search & Icons */}
            <div className="flex items-center space-x-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search"
                  className="bg-gray-100 rounded-md pl-10 pr-4 py-1.5 text-sm focus:outline-none"
                />
                <LuSearch
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={18}
                />
              </div>
              <button className="text-gray-500 hover:text-gray-700">
                <LuSettings size={20} />
              </button>
              <button className="text-gray-500 hover:text-gray-700">
                <LuBell size={20} />
              </button>
              <button className="text-gray-500 hover:text-gray-700">
                <LuUser size={20} />
              </button>
            </div>
          </header>

          {/* Main Content Area */}
          <main className="flex-1 ">
            <div className="flex flex-col md:flex-row h-full">
              {/* Profile Section */}
              <div className="bg-white   p-6 flex-1">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold text-gray-800">
                    Admin Profile
                  </h2>
                  <button
                    className="bg-blue-600 hover:bg-blue-700 text-white px-10 py-1.5 rounded-lg transition cursor-pointer"
                    onClick={() => setIsModalOpen(true)}
                  >
                    Edit
                  </button>
                </div>

                <div className="flex items-center space-x-6 mb-8">
                  <div className="w-24 h-24 bg-gray-200 rounded-full overflow-hidden">
                    <img
                      src="/default-avatar.svg"
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800">
                      {adminDATA?.firstName || "Admin Name"}{" "}
                      {adminDATA?.familyName}
                    </h3>
                    <p className="text-gray-400 text-sm">
                      {adminDATA?.email || "DOCTORINA@ESI-SBA.DZ"}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="text-black text-sm font-medium">
                      Full Name
                    </label>
                    <input
                      type="text"
                      value={`${adminDATA?.firstName} ${adminDATA?.familyName}`}
                      className="w-full bg-gray-200 px-3 py-2 rounded-lg mt-1 text-gray-600"
                      disabled
                    />
                  </div>
                  <div>
                    <label className="text-black text-sm font-medium">
                      Phone Number
                    </label>
                    <input
                      type="text"
                      value={adminDATA.phoneNumber || ""}
                      className="w-full bg-gray-200 px-3 py-2 rounded-lg mt-1 text-gray-600"
                      disabled
                    />
                  </div>
                  <div>
                    <label className="text-black text-sm font-medium">
                      Email
                    </label>
                    <input
                      type="text"
                      value={adminDATA.email || ""}
                      className="w-full bg-gray-200 px-3 py-2 rounded-lg mt-1 text-gray-600"
                      disabled
                    />
                  </div>

                  <div>
                    <label className="text-black text-sm font-medium">
                      Roles
                    </label>
                    <input
                      type="text"
                      value={adminDATA?.roles}
                      className="w-full bg-gray-200 px-3 py-2 rounded-lg mt-1 text-gray-600"
                      disabled
                    />
                  </div>
                  <div>
                    <label className="text-black text-sm font-medium">ID</label>
                    <input
                      type="text"
                      value={adminDATA.id ? adminDATA.id.toString() : ""}
                      className="w-full bg-gray-200 px-3 py-2 rounded-lg mt-1 text-gray-600"
                      disabled
                    />
                  </div>
                </div>
              </div>

              {/* Right Panel */}
              <div className="w-full md:w-80 bg-white p-6 border-l border-gray-200 ">
                <div className="mb-6">
                  <h2 className="text-lg font-semibold text-gray-800 mb-4">
                    Notifications
                  </h2>
                  <ul className="space-y-3">
                    <li className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg shadow-sm">
                      <div className="flex-shrink-0 w-6 h-6 bg-red-100 rounded-full flex items-center justify-center">
                        <img
                          src="/problem.svg"
                          className="w-4 h-4"
                          alt="Icon"
                        />
                      </div>
                      <div>
                        <p className="text-gray-800 text-sm font-medium">
                          You have a student who submitted a long report about
                          something important
                        </p>
                        <span className="text-gray-500 text-xs">Just now</span>
                      </div>
                    </li>
                    <li className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg shadow-sm">
                      <div className="flex-shrink-0 w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                        <img
                          src="/newprof.svg"
                          className="w-4 h-4"
                          alt="Icon"
                        />
                      </div>
                      <div>
                        <p className="text-gray-800 text-sm font-medium">
                          Akram needs his medical history
                        </p>
                        <span className="text-gray-500 text-xs">
                          59 minutes ago
                        </span>
                      </div>
                    </li>
                    <li className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg shadow-sm">
                      <div className="flex-shrink-0 w-6 h-6 bg-yellow-100 rounded-full flex items-center justify-center">
                        <img src="/alarm.svg" className="w-4 h-4" alt="Icon" />
                      </div>
                      <div>
                        <p className="text-gray-800 text-sm font-medium">
                          Tarek have missed his appointment
                        </p>
                        <span className="text-gray-500 text-xs">
                          12 hours ago
                        </span>
                      </div>
                    </li>
                  </ul>
                </div>

                <div>
                  <h2 className="text-lg font-semibold text-gray-800 mb-4">
                    Activities
                  </h2>
                  <ul className="space-y-3">
                    <li className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg shadow-sm">
                      <div className="flex-shrink-0 w-8 h-8 bg-green-100 rounded-full flex items-center justify-center overflow-hidden">
                        <img src="/pr2.svg" className="w-5 h-5" alt="Icon" />
                      </div>
                      <div>
                        <p className="text-gray-800 text-sm font-medium">
                          You have an appointment
                        </p>
                        <span className="text-gray-500 text-xs">Just now</span>
                      </div>
                    </li>
                    <li className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg shadow-sm">
                      <div className="flex-shrink-0 w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center overflow-hidden">
                        <img src="/pr3.svg" className="w-5 h-5" alt="Icon" />
                      </div>
                      <div>
                        <p className="text-gray-800 text-sm font-medium">
                          Bro got his appointment delayed
                        </p>
                        <span className="text-gray-500 text-xs">
                          59 minutes ago
                        </span>
                      </div>
                    </li>
                    <li className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg shadow-sm">
                      <div className="flex-shrink-0 w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center overflow-hidden">
                        <img src="/pr4.svg" className="w-5 h-5" alt="Icon" />
                      </div>
                      <div>
                        <p className="text-gray-800 text-sm font-medium">
                          You have 4 profiles to review
                        </p>
                        <span className="text-gray-500 text-xs">
                          12 hours ago
                        </span>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </ProtectedRoute>
  );
}
