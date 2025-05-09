"use client";
import ProtectedRoute from "@/components/ProtectedRoute/ProtectedRoute";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import api from "@/lib/api";
import Image from "next/image";
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
  LuDownload,
} from "react-icons/lu";
import Sidebar from "@/components/Sidebar/Sidebar";

export default function Dashboard() {
  const router = useRouter();
  const navItems = [
    {
      label: "Default",
      icon: LuLayoutDashboard,
      active: true,
      category: "Dashboards",
    },
    {
      label: "Activities",
      icon: LuActivity,
      active: false,
      category: "Dashboards",
    },
    {
      label: "Schedule",
      icon: LuCalendarDays,
      active: false,
      category: "Dashboards",
    },
    {
      label: "Something",
      icon: LuSettings,
      active: false,
      category: "Dashboards",
    },
    { label: "User Profile", icon: LuUser, active: false, category: "Pages" },
    { label: "Overview", icon: LuFolderOpen, active: false, category: "Pages" },
    { label: "Projects", icon: LuBriefcase, active: false, category: "Pages" },
    { label: "Campaigns", icon: LuChartBar, active: false, category: "Pages" },
    { label: "Documents", icon: LuFileText, active: false, category: "Pages" },
    { label: "Usage", icon: LuRss, active: false, category: "Pages" },
    { label: "Account", icon: LuSettings, active: false, category: "Pages" },
    { label: "Corporate", icon: LuBriefcase, active: false, category: "Blog" }, // Example Category
    { label: "Blog", icon: LuRss, active: false, category: "Blog" },
    { label: "Social", icon: LuShare2, active: false, category: "Blog" },
  ];

  const groupedItems = navItems.reduce((acc, item) => {
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
  const notifications = [
    {
      id: 1,
      text: "You have a student who submitted...",
      time: "Just now",
      icon: LuUserPlus,
    },
    {
      id: 2,
      text: "Akram needs his medical history updated",
      time: "49 minutes ago",
      icon: LuFileWarning,
    },
    {
      id: 3,
      text: "Tarek have missed his appointment",
      time: "12 hours ago",
      icon: LuCalendarCheck,
    },
    {
      id: 4,
      text: "You've clocked in 9:00 today",
      time: "Today 11:30 AM",
      icon: LuClock,
    },
  ];

  const activities = [
    {
      id: 1,
      text: "You have an appointment...",
      time: "Just now",
      icon: LuCalendarCheck,
    },
    {
      id: 2,
      text: "Bro got his appointment date...",
      time: "31 mins ago",
      icon: LuCalendarCheck,
    },
    {
      id: 3,
      text: "You have 4 profiles that need...",
      time: "12 hours ago",
      icon: LuUserPlus,
    },
    { id: 4, text: "Place holder", time: "Feb 2, 2025", icon: LuUserPlus },
    {
      id: 5,
      text: "2nd mc place holder",
      time: "Feb 2, 2025",
      icon: LuUserPlus,
    },
  ];

  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState(null);
  const [validationErrors, setValidationErrors] = useState([]);
  const [patients, setPatients] = useState([]);
  const [loadingPatients, setLoadingPatients] = useState(true);
  const [patientsError, setPatientsError] = useState(null);
  const [activeTab, setActiveTab] = useState("patients");
  const [doctors, setDoctors] = useState([]);
  const [admins, setAdmins] = useState([]);
  const [loadingDoctors, setLoadingDoctors] = useState(false);
  const [loadingAdmins, setLoadingAdmins] = useState(false);
  const [doctorsError, setDoctorsError] = useState(null);
  const [adminsError, setAdminsError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [newUser, setNewUser] = useState({
    userType: "patient",
    email: "",
    firstName: "",
    familyName: "",
    phoneNumber: "",
    age: "",
    patientType: "student",
    roles: [],
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };
  const handleUpload = async () => {
    if (!file) {
      setUploadError("Please select a file first.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      setUploading(true);
      setUploadError(null);
      setUploadSuccess(false);
      setValidationErrors([]);

      const response = await api.post("/api/admins/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("File uploaded successfully:", response.data);
      setUploadSuccess(true);
      setFile(null);
      await fetchPatients();
      setTimeout(() => {
        setUploadSuccess(false);
      }, 5000);
    } catch (error) {
      console.error("File upload failed:", error);
      setUploadSuccess(false);

      if (error.response && error.response.status === 422) {
        setUploadError("Some records failed to upload.");
        setValidationErrors(error.response.data.errors);
      } else {
        setUploadError(
          error.response?.data?.message ||
            "File upload failed. Please try again."
        );
        setValidationErrors([]);
      }
    } finally {
      setUploading(false);
    }
  };
  const fetchPatients = async () => {
    try {
      setLoadingPatients(true);
      const response = await api.get("/api/admins/patients");
      setPatients(response.data?.data || response.data || []);
    } catch (error) {
      console.error("Failed to fetch patients:", error);
      setPatientsError(
        error.message || "Failed to load patients. Please try again."
      );
    } finally {
      setLoadingPatients(false);
    }
  };

  const fetchDoctors = async () => {
    try {
      setLoadingDoctors(true);
      const response = await api.get("/api/admins/doctors");
      setDoctors(response.data?.data || response.data || []);
    } catch (error) {
      console.error("Failed to fetch doctors:", error);
      setDoctorsError(
        error.message || "Failed to load doctors. Please try again."
      );
    } finally {
      setLoadingDoctors(false);
    }
  };

  const fetchAdmins = async () => {
    try {
      setLoadingAdmins(true);
      const response = await api.get("/api/admins/admins");
      setAdmins(response.data?.data || response.data || []);
    } catch (error) {
      console.error("Failed to fetch admins:", error);
      setAdminsError(
        error.message || "Failed to load admins. Please try again."
      );
    } finally {
      setLoadingAdmins(false);
    }
  };

  useEffect(() => {
    fetchPatients();
    fetchDoctors();
    fetchAdmins();
  }, []);
  const handleDownloadTemplate = () => {
    const link = document.createElement("a");
    link.href = "/patients_template.xlsx";
    link.download = "patient_template.xlsx";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  const getCurrentData = () => {
    switch (activeTab) {
      case "patients":
        return {
          data: patients,
          loading: loadingPatients,
          error: patientsError,
          columns: [
            "User",
            "Patient Type",
            "Mail",
            "Phone",
            "Age",
            "Medical History",
          ],
        };
      case "doctors":
        return {
          data: doctors,
          loading: loadingDoctors,
          error: doctorsError,
          columns: ["User", "Mail", "Phone", "Actions"],
        };
      case "admins":
        return {
          data: admins,
          loading: loadingAdmins,
          error: adminsError,
          columns: ["User", "Role", "Mail", "Phone Number", "Actions"],
        };
      default:
        return {
          data: [],
          loading: false,
          error: null,
          columns: [],
        };
    }
  };

  const currentData = getCurrentData();

  const filterData = (data) => {
    if (!searchTerm) return data;

    const term = searchTerm.toLowerCase();

    return data.filter((user) => {
      const fieldsToSearch = [
        user.firstName,
        user.familyName,
        user.email,
        user.phoneNumber,
        activeTab === "patients" ? user.patientType : "",
        activeTab === "doctors" ? user.specialty || "" : "",
        activeTab === "admins" ? user.role || "" : "",
      ].filter(Boolean);

      return fieldsToSearch.some((field) =>
        field.toString().toLowerCase().includes(term)
      );
    });
  };
  const handleCreateAccountClick = () => {
    setIsCreateModalOpen(true);
    setSubmitError(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);
    setSubmitSuccess(false);

    try {
      const payload = {
        email: newUser.email,
        firstName: newUser.firstName,
        familyName: newUser.familyName,
        phoneNumber: newUser.phoneNumber,
      };

      if (newUser.userType === "patient") {
        payload.patient_type = newUser.patientType;
        payload.role = "patient";
        payload.age = newUser.age;
      } else if (newUser.userType === "admin") {
        payload.roles = ["admin"];
      } else if (newUser.userType === "doctor") {
        payload.role = "doctor";
      }

      const response = await api.post(
        `/api/admins/${newUser.userType}s`,
        payload
      );
      setSubmitSuccess(true);
      if (newUser.userType === "patient") {
        await fetchPatients();
      } else if (newUser.userType === "doctor") {
        await fetchDoctors();
      } else {
        await fetchAdmins();
      }
      if (!submitSuccess) {
        setNewUser({
          userType: "patient",
          email: "",
          firstName: "",
          familyName: "",
          phoneNumber: "",
          age: "",
          patientType: "student",
          roles: [],
        });
      }
    } catch (error) {
      console.error("Failed to create user:", error);
      setSubmitError(
        error.response?.data?.message ||
          "Failed to create user. Please try again."
      );
      setSubmitSuccess(false);
    } finally {
      setIsSubmitting(false);
    }
  };
  const handleModalClose = () => {
    setIsCreateModalOpen(false);
    setSubmitSuccess(false);
    setSubmitError(null);
  };
  return (
    <ProtectedRoute>
      <div className="flex h-screen bg-main-bg">
        {/* --- Sidebar --- */}
        <Sidebar userType="admin" />

        {/* --- Main Content Area (includes Topbar, Main section, Right Sidebar) --- */}
        <div className="flex-1 flex flex-col ">
          {/* --- Topbar --- */}
          <header className="sticky top-0 bg-white border-b border-gray-200 flex items-center justify-between px-6 h-16 z-10">
            {" "}
            {/* Use sticky */}
            {/* Left Side: Breadcrumbs/Title */}
            <div>
              <span className="text-sm text-text-muted">Dashboards</span>
              <span className="text-sm text-text-muted mx-1">/</span>
              <span className="text-sm font-medium text-gray-800">Default</span>
            </div>
            {/* Right Side: Search & Icons */}
            <div className="flex items-center space-x-4">
              <div className="relative hidden sm:block">
                {" "}
                {/* Hide search on very small screens */}
                <LuSearch
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={18}
                />
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
              </button>
              <button
                onClick={() => router.push("/admin/profile")}
                className="text-gray-500 hover:text-gray-700 cursor-pointer"
              >
                <LuUser size={24} />
              </button>
            </div>
          </header>

          {/* --- Scrollable Content (Main + Right Sidebar) --- */}
          <div className="flex flex-1 overflow-hidden">
            {" "}
            {/* Flex container for main content and right sidebar */}
            {/* --- Main Dashboard Content --- */}
            <main className="flex-1 overflow-y-auto p-6">
              {" "}
              {/* Scrollable main content */}
              <h2 className="text-xl font-semibold text-gray-800 mb-6">
                Admin Dashboard
              </h2>
              {/* Top Cards Row */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                {/* --- Card 1: Create Patient (Inlined DashboardCard Structure) --- */}
                <div className="p-6 rounded-lg shadow-subtle bg-card-blue-bg">
                  <h3 className="text-base font-semibold text-gray-700 mb-4">
                    Create Patient accounts
                  </h3>
                  <div>
                    <div className="flex flex-col items-center justify-center text-center text-gray-500 border-2 border-dashed border-gray-300 rounded-lg p-8 h-40">
                      <LuUpload size={32} className="mb-2 text-gray-400" />
                      <p className="text-sm mb-2">Drag & Drop your file</p>
                      <p className="text-xs mb-3">or</p>
                      <input
                        type="file"
                        onChange={handleFileChange}
                        accept=".xlsx, .xls"
                        className="hidden"
                        id="file-upload"
                      />
                      <label
                        htmlFor="file-upload"
                        className="bg-white text-blue-600 border border-gray-300 hover:bg-gray-50 text-sm font-medium py-1.5 px-4 rounded-md cursor-pointer"
                      >
                        Select File
                      </label>
                      {file && (
                        <p className="mt-2 text-gray-700">
                          File selected: {file.name}
                        </p>
                      )}
                    </div>
                    <button
                      onClick={handleUpload}
                      disabled={uploading || !file}
                      className={`${
                        uploading || !file
                          ? "bg-blue-400 cursor-not-allowed"
                          : "bg-blue-600 hover:bg-blue-700"
                      } text-white text-sm font-medium py-1.5 px-4 rounded-md flex items-center gap-2`}
                    >
                      {uploading ? (
                        <>
                          <svg
                            className="animate-spin h-4 w-4 text-white"
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
                          Uploading...
                        </>
                      ) : (
                        "Upload"
                      )}
                    </button>
                    {file && (
                      <button
                        onClick={() => setFile(null)}
                        className="text-gray-600 hover:text-gray-800 text-sm font-medium py-1.5 px-4 rounded-md border border-gray-300 hover:bg-gray-50"
                      >
                        Clear
                      </button>
                    )}
                    <button
                      onClick={handleDownloadTemplate}
                      className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-800 cursor-pointer"
                    >
                      <LuDownload size={16} />
                      Download Template
                    </button>
                    {uploadSuccess && (
                      <div className="mt-4 bg-green-50 border border-green-200 text-green-700 rounded-md p-3 text-sm">
                        File uploaded successfully! Patients have been created.
                      </div>
                    )}

                    {/* Error Message */}
                    {uploadError && !validationErrors.length && (
                      <div className="mt-4 bg-red-50 border border-red-200 text-red-700 rounded-md p-3 text-sm">
                        {uploadError}
                      </div>
                    )}
                    {validationErrors.length > 0 && (
                      <div className="mt-4 bg-red-50 border border-red-200 text-red-700 rounded-md p-4 space-y-2 text-sm max-h-64 overflow-y-auto">
                        {validationErrors.map((err, index) => (
                          <div
                            key={index}
                            className="border-b border-red-100 pb-2 last:border-0"
                          >
                            <span className="capitalize font-medium">
                              {err.attribute}
                            </span>
                            : {err.errors.join(", ")}
                            {err.values && (
                              <div className="text-gray-500 text-xs mt-1">
                                → <code>{err.values[err.attribute]}</code>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* --- Card 2: Manual Account (Inlined DashboardCard Structure) --- */}
                <div className="p-6 rounded-lg shadow-subtle bg-card-blue-bg">
                  <h3 className="text-base font-semibold text-gray-700 mb-4">
                    Manual account
                  </h3>
                  <div>
                    <div className="flex flex-col items-center justify-center text-center text-gray-500 border-2 border-dashed border-gray-300 rounded-lg p-8 h-40">
                      <LuPlus size={32} className="mb-2 text-gray-400" />
                      <p className="text-sm mb-2">Add a new account manually</p>
                      <button
                        onClick={handleCreateAccountClick}
                        className="bg-blue-600 text-white hover:bg-blue-700 text-sm font-medium py-1.5 px-4 rounded-md mt-3 cursor-pointer"
                      >
                        Create Account
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              {/* --- Users Table --- */}
              <div className="bg-white rounded-lg shadow-subtle mt-6 overflow-x-auto">
                {/* Tabs */}
                <div className="border-b border-gray-200">
                  <div className="flex items-center justify-between pr-2">
                    <nav className="flex -mb-px">
                      <button
                        onClick={() => setActiveTab("patients")}
                        className={`py-4 cursor-pointer px-6 text-center border-b-2 font-medium text-sm ${
                          activeTab === "patients"
                            ? "border-blue-500 text-blue-600"
                            : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                        }`}
                      >
                        Patients
                      </button>
                      <button
                        onClick={() => setActiveTab("doctors")}
                        className={`py-4 cursor-pointer px-6 text-center border-b-2 font-medium text-sm ${
                          activeTab === "doctors"
                            ? "border-blue-500 text-blue-600"
                            : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                        }`}
                      >
                        Doctors
                      </button>
                      <button
                        onClick={() => setActiveTab("admins")}
                        className={`py-4 cursor-pointer px-6 text-center border-b-2 font-medium text-sm ${
                          activeTab === "admins"
                            ? "border-blue-500 text-blue-600"
                            : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                        }`}
                      >
                        Admins
                      </button>
                    </nav>
                    {/* Professional Search Bar */}
                    <div className="relative w-64">
                      <div className="flex items-center">
                        <LuSearch
                          className="absolute left-3 text-gray-400"
                          size={18}
                        />
                        <input
                          type="text"
                          placeholder={`Search ${activeTab}...`}
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          className="w-full bg-gray-100 rounded-md pl-10 pr-8 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                        {searchTerm && (
                          <button
                            onClick={() => setSearchTerm("")}
                            className="absolute right-2 text-gray-400 hover:text-gray-600"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-4 w-4"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M6 18L18 6M6 6l12 12"
                              />
                            </svg>
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Table */}
                <table className="w-full min-w-[800px] text-sm text-left text-gray-600">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                    <tr>
                      <th scope="col" className="p-4">
                        <input
                          type="checkbox"
                          className="form-checkbox h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                        />
                      </th>
                      {currentData.columns.map((column, index) => (
                        <th key={index} scope="col" className="px-6 py-3">
                          {column}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {currentData.loading ? (
                      <tr>
                        <td
                          colSpan={currentData.columns.length + 1}
                          className="px-6 py-4 text-center"
                        >
                          Loading {activeTab}...
                        </td>
                      </tr>
                    ) : currentData.error ? (
                      <tr>
                        <td
                          colSpan={currentData.columns.length + 1}
                          className="px-6 py-4 text-center text-red-500"
                        >
                          {currentData.error}
                        </td>
                      </tr>
                    ) : currentData.data.length === 0 ? (
                      <tr>
                        <td
                          colSpan={currentData.columns.length + 1}
                          className="px-6 py-4 text-center"
                        >
                          No {activeTab} found
                        </td>
                      </tr>
                    ) : (
                      filterData(currentData.data).map((user) => (
                        <tr
                          key={user.id}
                          className="bg-white border-b hover:bg-gray-50"
                        >
                          <td className="w-4 p-4">
                            <input
                              type="checkbox"
                              className="form-checkbox h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                            />
                          </td>
                          <th
                            scope="row"
                            className="flex items-center px-6 py-3 text-gray-900 whitespace-nowrap"
                          >
                            <Image
                              className="w-8 h-8 rounded-full mr-3 object-cover"
                              src={"/default-avatar.svg"}
                              alt={`${user.firstName} ${user.familyName} avatar`}
                              width={32}
                              height={32}
                              unoptimized
                            />
                            <span className="truncate">
                              {user.firstName} {user.familyName}
                            </span>
                          </th>

                          {activeTab === "patients" && (
                            <>
                              <td className="px-6 py-3">{user.patientType}</td>
                              <td className="px-6 py-3 truncate">
                                {user.email}
                              </td>
                              <td className="px-6 py-3 whitespace-nowrap">
                                {user.phoneNumber}
                              </td>
                              <td className="px-6 py-3 whitespace-nowrap">
                                {user.age}
                              </td>
                              <td className="px-6 py-3 text-center">
                                <button
                                  className=" cursor-pointer bg-red-400 hover:bg-button-red-hover text-white text-xs font-semibold py-1.5 px-4 rounded-full"
                                  onClick={() =>
                                    router.push(`/medical-records/${user.id}`)
                                  }
                                >
                                  View
                                </button>
                              </td>
                            </>
                          )}

                          {activeTab === "doctors" && (
                            <>
                              <td className="px-6 py-3 truncate">
                                {user.email}
                              </td>
                              <td className="px-6 py-3 whitespace-nowrap">
                                {user.phoneNumber}
                              </td>
                              <td className="px-6 py-3 text-center">
                                <button className="bg-blue-400 hover:bg-blue-500 text-white text-xs font-semibold py-1.5 px-4 rounded-full">
                                  Manage
                                </button>
                              </td>
                            </>
                          )}

                          {activeTab === "admins" && (
                            <>
                              <td className="px-6 py-3">
                                {user.role || "Admin"}
                              </td>
                              <td className="px-6 py-3 truncate">
                                {user.email}
                              </td>
                              <td className="px-6 py-3 whitespace-nowrap">
                                {user.phoneNumber}
                              </td>
                              <td className="px-6 py-3 text-center">
                                <button className="bg-gray-400 hover:bg-gray-500 text-white text-xs font-semibold py-1.5 px-4 rounded-full">
                                  Edit
                                </button>
                              </td>
                            </>
                          )}
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
              {/* Add Spacer at the bottom if needed */}
              <div className="h-10"></div>
            </main>
            {/* --- Right Sidebar --- */}
            <aside className="w-80 bg-white p-6 border-l border-gray-300 ">
              {/* Notifications Section */}
              <h2 className="text-lg font-semibold text-gray-800 mb-4">
                {" "}
                Notifications
              </h2>
              <ul className="text-[13px] space-y-3">
                {[
                  {
                    icon: "/problem.svg",
                    text: "You have a student who submitted a long report about something important",
                    time: "Just now",
                  },
                  {
                    icon: "/newprof.svg",
                    text: "Akram needs his medical history",
                    time: "59 minutes ago",
                  },
                  {
                    icon: "/alarm.svg",
                    text: "Tarek missed his appointment",
                    time: "12 hours ago",
                  },
                ].map((item, index) => (
                  <li
                    key={index}
                    className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg shadow-sm hover:bg-gray-100 transition"
                  >
                    <img src={item.icon} className="w-6 h-6" alt="Icon" />
                    <div className="flex-1 min-w-0">
                      <p className="text-gray-800 font-medium truncate w-48">
                        {item.text}
                      </p>
                      <span className="text-gray-500 text-xs">{item.time}</span>
                    </div>
                  </li>
                ))}
              </ul>

              {/* Activities Section */}
              <h2 className="text-lg font-semibold text-gray-800 mt-6 mb-4">
                {" "}
                Activities
              </h2>
              <ul className="text-sm space-y-3">
                {[
                  {
                    icon: "/pr2.svg",
                    text: "You have an appointment",
                    time: "Just now",
                  },
                  {
                    icon: "/pr3.svg",
                    text: "Bro got his appointment delayed",
                    time: "59 minutes ago",
                  },
                  {
                    icon: "/pr4.svg",
                    text: "You have 4 profiles to review",
                    time: "12 hours ago",
                  },
                ].map((item, index) => (
                  <li
                    key={index}
                    className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg shadow-sm hover:bg-gray-100 transition"
                  >
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
        </div>
      </div>
      {/* Create User Modal */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-800">
                  {submitSuccess ? "Success!" : "Create New User"}
                </h3>
                <button
                  onClick={handleModalClose}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
              {submitSuccess ? (
                <div className="text-center py-8">
                  <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
                    <svg
                      className="h-6 w-6 text-green-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <h3 className="mt-3 text-lg font-medium text-gray-900">
                    User created successfully!
                  </h3>
                  <div className="mt-6">
                    <button
                      type="button"
                      onClick={() => {
                        setIsCreateModalOpen(false);
                        setSubmitSuccess(false);
                      }}
                      className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700"
                    >
                      Close
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div className="space-y-4">
                    {/* User Type Dropdown */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        User Type
                      </label>
                      <select
                        name="userType"
                        value={newUser.userType}
                        onChange={handleInputChange}
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      >
                        <option value="patient">Patient</option>
                        <option value="doctor">Doctor</option>
                        <option value="admin">Admin</option>
                      </select>
                    </div>

                    {/* Patient Type Dropdown (conditionally shown) */}
                    {newUser.userType === "patient" && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Patient Type
                        </label>
                        <select
                          name="patientType"
                          value={newUser.patientType}
                          onChange={handleInputChange}
                          className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                          required
                        >
                          <option value="student">Student</option>
                          <option value="staff">Staff</option>
                          <option value="faculty">Faculty</option>
                        </select>
                      </div>
                    )}

                    {/* Email */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Email
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={newUser.email}
                        onChange={handleInputChange}
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      />
                    </div>

                    {/* First Name */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        First Name
                      </label>
                      <input
                        type="text"
                        name="firstName"
                        value={newUser.firstName}
                        onChange={handleInputChange}
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      />
                    </div>

                    {/* Family Name */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Family Name
                      </label>
                      <input
                        type="text"
                        name="familyName"
                        value={newUser.familyName}
                        onChange={handleInputChange}
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      />
                    </div>

                    {/* Phone Number */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        name="phoneNumber"
                        value={newUser.phoneNumber}
                        onChange={handleInputChange}
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      />
                    </div>

                    {/* Age */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Age
                      </label>
                      <input
                        type="number"
                        name="age"
                        min="1"
                        value={newUser.age}
                        onChange={handleInputChange}
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      />
                    </div>
                    {/* Add this after the Age field in your modal form */}
                    {(newUser.userType === "doctor" ||
                      newUser.userType === "admin") && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Roles{" "}
                          {newUser.userType === "doctor"
                            ? "(Select at least one)"
                            : ""}
                        </label>
                        <div className="space-y-2">
                          {newUser.userType === "admin" && (
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">
                                Role
                              </label>
                              <div className="flex items-center bg-gray-100 p-2 rounded">
                                <input
                                  type="checkbox"
                                  checked
                                  readOnly
                                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                />
                                <label className="ml-2 block text-sm text-gray-700">
                                  Admin
                                </label>
                              </div>
                              <p className="text-xs text-gray-500 mt-1">
                                All admins have full access
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Error Message */}
                  {submitError && (
                    <div className="mt-4 text-red-500 text-sm">
                      {submitError}
                    </div>
                  )}

                  {/* Form Actions */}
                  <div className="mt-6 flex justify-end space-x-3">
                    <button
                      type="button"
                      onClick={() => setIsCreateModalOpen(false)}
                      className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                      disabled={isSubmitting}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <svg
                            className="animate-spin -ml-1 mr-2 h-4 w-4 text-white inline"
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
                          Creating...
                        </>
                      ) : (
                        "Create User"
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </ProtectedRoute>
  );
}
