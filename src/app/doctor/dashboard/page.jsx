"use client";
import { useRouter } from "next/navigation";
import ProtectedRoute from "@/components/ProtectedRoute/ProtectedRoute";
import React, { useState, useEffect } from "react";
import api from "@/lib/api";
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
  LuCalendarCheck,
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
    { label: "Corporate", icon: LuBriefcase, active: false, category: "Blog" },
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
  const [showAllReservations, setShowAllReservations] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedReservation, setSelectedReservation] = useState(null);
  const [patients, setPatients] = useState([]);
  const [loadingPatients, setLoadingPatients] = useState(true);
  const [patientsError, setPatientsError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [appointments, setAppointments] = useState([]);
  const [loadingAppointments, setLoadingAppointments] = useState(true);
  const [appointmentsError, setAppointmentsError] = useState(null);
  const [scheduledDate, setScheduledDate] = useState(
    new Date().toISOString().split("T")[0]
  );

  const toggleSection = (label) => {
    setOpenSections((prev) => ({
      ...prev,
      [label]: !prev[label],
    }));
  };

  const stats = [
    {
      title: "Total Students",
      value: patients.length,
      change: "+1.076%",
      color: "text-[#1C1C1C]",
    },
    {
      title: "Appointments",
      value: appointments.length,
      change: "-0.023%",
      color: "text-[#1C1C1C]",
    },
    {
      title: "Work hours",
      value: "35",
      change: "+15.001%",
      color: "text-[#1C1C1C]",
    },
    {
      title: "Growth",
      value: "30.1%",
      change: "+6.608%",
      color: "text-[#1C1C1C]",
    },
  ];



  const fetchPatients = async () => {
    try {
      setLoadingPatients(true);
      const response = await api.get("/api/doctors/patients");
      setPatients(response.data?.data || response.data || []);
      console.log(response);
    } catch (error) {
      console.error("Failed to fetch patients:", error);
      setPatientsError(
        error.message || "Failed to load patients. Please try again."
      );
    } finally {
      setLoadingPatients(false);
    }
  };

  useEffect(() => {
    fetchPatients();
  }, []);

  const handleConsultClick = (appointment) => {
    setSelectedReservation({
      ...appointment,
      name: `${appointment.patient.familyName} ${appointment.patient.firstName}`,
      email: appointment.patient.email,
      issue: appointment.notes,
      date: new Date(appointment.requestedDate).toLocaleDateString(),
    });
    setShowModal(true);
  };

  const handleApprove = async () => {
    try {
      if (!scheduledDate) {
        alert("Please select a date");
        return;
      }

      await api.post(`/api/doctors/appointments/schedule`, {
        appointment_id: selectedReservation.id,
        date: scheduledDate,
      });

      alert("Appointment approved and scheduled successfully");
      setShowModal(false);
      fetchAppointments();
    } catch (error) {
      console.error("Failed to schedule appointment:", error);
      alert(error.response?.data?.message || "Failed to schedule appointment");
    }
  };

  const handleDecline = async () => {
    try {
      await api.delete("/api/doctors/appointments", {
        data: { appointment_id: selectedReservation.id },
      });
      alert("Appointment declined successfully");
      setShowModal(false);
      fetchAppointments(); // Refresh the list
    } catch (error) {
      console.error("Failed to decline appointment:", error);
      alert(error.response?.data?.message || "Failed to decline appointment");
    }
  };

  const fetchAppointments = async () => {
    try {
      setLoadingAppointments(true);
      const response = await api.get("/api/doctors/appointments/requested");
      console.log(response);
      setAppointments(
        Array.isArray(response.data.appointments)
          ? response.data.appointments
          : []
      );
      console.log(appointments);
    } catch (error) {
      console.error("Failed to fetch appointments:", error);
      setAppointmentsError(
        error.message || "Failed to load appointments. Please try again."
      );
      setAppointments([]); // Set to empty array on error
    } finally {
      setLoadingAppointments(false);
    }
  };

  const cancelAppointment = async (appointmentId) => {
    try {
      await api.delete("/api/doctors/appointments", {
        data: { appointment_id: appointmentId },
      });

      await fetchAppointments();
      alert("Appointment cancelled successfully");
    } catch (error) {
      console.error("Failed to cancel appointment:", error);
      alert(error.response?.data?.message || "Failed to cancel appointment");
    }
  };
  useEffect(() => {
    fetchPatients();
    fetchAppointments();
  }, []);
  return (
    <ProtectedRoute>
      <div className="flex h-screen bg-main-bg">
        {/* --- Sidebar --- */}
        <Sidebar userType="doctor" />

        {/* --- Main Content Area --- */}
        <div className="flex-1 flex flex-col ">
          {/* --- Fixed Topbar --- */}
          <header className="sticky top-0 bg-white border-b border-gray-200 flex items-center justify-between px-6 h-16 z-10">
            <div>
              <span className="text-sm text-text-muted">Dashboards</span>
              <span className="text-sm text-text-muted mx-1">/</span>
              <span className="text-sm font-medium text-gray-800">
                Patients
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <div className="relative hidden sm:block">
                <LuSearch
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={18}
                />
                <input
                  type="text"
                  placeholder="Search patients..."
                  className="bg-gray-100 rounded-md pl-10 pr-4 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <button className="text-gray-500 hover:text-gray-700">
                <LuSettings size={20} />
              </button>
              <button className="text-gray-500 hover:text-gray-700 relative">
                <LuBell size={20} />
              </button>
              <button
                onClick={() => router.push("/doctor/profile")}
                className="text-gray-500 hover:text-gray-700 cursor-pointer"
              >
                <LuUser size={24} />
              </button>
            </div>
          </header>

          {/* --- Scrollable Content Container --- */}
          <div className="flex flex-1 overflow-hidden">
            {/* --- Scrollable Main Content --- */}
            <div className="flex-1 overflow-y-auto">
              <main className="mx-auto space-y-6 p-6">
                {showAllReservations ? (
                  // Full Pending Reservations View
                  <div className="bg-[#FFFFFF] rounded-lg shadow-sm p-6 animate-fadeIn">
                    <h2 className="text-lg font-semibold text-[#1C1C1C] mb-4">
                      Pending Reservations
                    </h2>
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm text-left text-[#1C1C1C]">
                        <thead className="text-xs uppercase bg-[#F7F9FB]">
                          <tr>
                            <th scope="col" className="p-3"></th>
                            <th scope="col" className="p-3">
                              User
                            </th>
                            <th scope="col" className="p-3">
                              Role
                            </th>
                            <th scope="col" className="p-3">
                              Mail
                            </th>
                            <th scope="col" className="p-3">
                              Reason
                            </th>
                            <th scope="col" className="p-3">
                              Date
                            </th>
                            <th scope="col" className="p-3">
                              Medical History
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {appointments.map((appointment, index) => (
                            <tr
                              key={appointment.id}
                              className="border-b hover:bg-[#E5E9F6] animate-fadeIn"
                              style={{ animationDelay: `${index * 0.05}s` }}
                            >
                              <td className="p-3">
                                <input type="checkbox" className="w-4 h-4" />
                              </td>
                              <td className="p-3 flex items-center space-x-3">
                                <img
                                  src={"/default-avatar.svg"}
                                  alt="User Avatar"
                                  className="w-8 h-8 rounded-full bg-gray-200"
                                />
                                <span>
                                  {appointment.patient.familyName}{" "}
                                  {appointment.patient.firstName}
                                </span>
                              </td>
                              <td className="p-3">Patient</td>
                              <td className="p-3">
                                {appointment.patient.email}
                              </td>
                              <td className="p-3">
                                {appointment.notes.slice(0, 10)}...
                              </td>
                              <td className="p-3">
                                {new Date(
                                  appointment.requestedDate
                                ).toLocaleDateString()}
                              </td>
                              <td className="p-3">
                                <button
                                  onClick={() =>
                                    handleConsultClick(appointment)
                                  }
                                  className="bg-[#8CE0F3] text-white px-4 py-1 rounded-lg cursor-pointer hover:bg-blue-400 transition"
                                >
                                  Consult
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    <button
                      onClick={() => setShowAllReservations(false)}
                      className="mt-4 px-6 py-3 bg-[#0060F5] text-white rounded-lg hover:bg-blue-700 cursor-pointer transition animate-fadeIn"
                    >
                      Return
                    </button>
                  </div>
                ) : (
                  // Default Dashboard View
                  <div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-24">
                      <div className="space-y-6">
                        <h2 className="text-lg font-semibold text-[#1C1C1C] animate-fadeIn">
                          Students Statistics
                        </h2>
                        <div className="grid grid-cols-2 gap-4">
                          {stats.map((stat, index) => (
                            <div
                              key={index}
                              className={`p-8 rounded-lg shadow-sm animate-scaleIn ${
                                stat.title === "Total Students"
                                  ? "bg-[#E3F5FF]"
                                  : stat.title === "Growth"
                                  ? "bg-[#E5E9F6]"
                                  : "bg-[#F7F9FB]"
                              }`}
                              style={{ animationDelay: `${index * 0.1}s` }}
                            >
                              <h3 className="text-lg font-semibold text-[#1C1C1C]">
                                {stat.title}
                              </h3>
                              <div className="flex items-baseline space-x-2">
                                <p className="text-3xl font-bold mt-3 text-[#1C1C1C]">
                                  {stat.value}
                                </p>
                                <p className="ml-3 text-xs text-[#1C1C1C]">
                                  {stat.change}
                                </p>
                                <svg
                                  className="w-4 h-4"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M5 10l7-7m0 0l7 7m-7-7v18"
                                  />
                                </svg>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="space-y-6">
                        <h2 className="text-lg font-semibold text-[#1C1C1C] animate-fadeIn">
                          Pending Reservation
                        </h2>
                        <div className="space-y-3">
                          <div className="space-y-3">
                            {loadingAppointments ? (
                              <div className="flex justify-center items-center h-32">
                                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
                              </div>
                            ) : appointmentsError ? (
                              <div className="text-red-500 text-center p-4">
                                {appointmentsError}
                              </div>
                            ) : appointments.length === 0 ? (
                              <div className="text-gray-500 text-center p-4">
                                No appointments found
                              </div>
                            ) : (
                              appointments
                                .slice(0, 3)
                                .map((appointment, index) => (
                                  <div
                                    key={appointment.id || index}
                                    className="flex items-center justify-between bg-[#F7F9FB] p-3 rounded-lg shadow-sm animate-fadeIn"
                                    style={{
                                      animationDelay: `${index * 0.1}s`,
                                    }}
                                  >
                                    <div className="flex items-center space-x-3 mt-3">
                                      <img
                                        src={"/default-avatar.svg"}
                                        alt="User Avatar"
                                        className="w-10 h-10 rounded-full bg-gray-200"
                                      />
                                      <div className="flex gap-4 justify-items-center">
                                        <p className="text-md font-regular text-[#1C1C1C]">
                                          {appointment.patient?.familyName +
                                            " " +
                                            appointment.patient?.firstName ||
                                            "Unknown Patient"}
                                        </p>
                                        <p className="text-sm text-[#1C1C1C]">
                                          {appointment.requestedDate
                                            ? new Date(
                                                appointment.requestedDate
                                              ).toLocaleDateString()
                                            : "No date"}
                                        </p>
                                        <p className="text-sm text-[#1C1C1C]">
                                          {appointment.notes
                                            ? appointment.notes.slice(0, 20) +
                                              "...."
                                            : "No reason provided"}
                                        </p>
                                      </div>
                                    </div>
                                    <button
                                      onClick={() =>
                                        cancelAppointment(appointment.id)
                                      }
                                      className="text-[#ffff] text-sm bg-[#8CE0F3] px-3 py-2 rounded-lg cursor-pointer"
                                    >
                                      Cancel
                                    </button>
                                  </div>
                                ))
                            )}
                          </div>
                        </div>
                        <button
                          onClick={() => setShowAllReservations(true)}
                          className="px-6 py-3 bg-[#0060F5] text-white ml-[75%] rounded-lg hover:bg-blue-700 cursor-pointer transition animate-fadeIn"
                        >
                          View All
                        </button>
                      </div>
                    </div>

                    <div className="bg-[#FFFFFF] rounded-lg shadow-sm p-6 animate-fadeIn">
                      <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left text-[#1C1C1C]">
                          <thead className="text-xs uppercase bg-[#F7F9FB]">
                            <tr>
                              <th scope="col" className="p-3"></th>
                              <th scope="col" className="p-3">
                                User
                              </th>
                              <th scope="col" className="p-3">
                                Patient Type
                              </th>
                              <th scope="col" className="p-3">
                                Mail
                              </th>
                              <th scope="col" className="p-3">
                                Phone
                              </th>
                              <th scope="col" className="p-3">
                                Age
                              </th>
                              <th scope="col" className="p-3">
                                Medical History
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {patients.map((patient, index) => (
                              <tr
                                key={index}
                                className="border-b hover:bg-[#E5E9F6] animate-fadeIn"
                                style={{ animationDelay: `${index * 0.05}s` }}
                              >
                                <td className="p-3">
                                  <input type="checkbox" className="w-4 h-4" />
                                </td>
                                <td className="p-3 flex items-center space-x-3">
                                  <img
                                    src={"/default-avatar.svg"}
                                    alt="User Avatar"
                                    className="w-8 h-8 rounded-full bg-gray-200"
                                  />
                                  <span>
                                    {patient.firstName} {patient.familyName}
                                  </span>
                                </td>
                                <td className="p-3">{patient.patientType}</td>
                                <td className="p-3">{patient.email}</td>
                                <td className="p-3">{patient.phoneNumber}</td>
                                <td className="p-3">{patient.age}</td>
                                <td className="p-3">
                                  <button
                                    className="bg-[#E85B5B] text-white px-4 py-1 rounded-lg cursor-pointer hover:bg-red-700 transition"
                                    onClick={() =>
                                      router.push(
                                        `/medical-records/${patient.id}`
                                      )
                                    }
                                  >
                                    View
                                  </button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                )}

                {/* Modal for Consult Details */}
                {showModal && selectedReservation && (
                  <div className="fixed inset-0 flex items-center justify-center z-50 backdrop-blur-md">
                    <div className="bg-white rounded-lg shadow-lg p-6 w-[60%]">
                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700">
                            Fullname
                          </label>
                          <p className="mt-1 p-2 w-full bg-gray-100 rounded-md text-gray-900">
                            {selectedReservation.name}
                          </p>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700">
                            Email
                          </label>
                          <p className="mt-1 p-2 w-full bg-gray-100 rounded-md text-gray-900">
                            {selectedReservation.email}
                          </p>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700">
                            Reason
                          </label>
                          <p className="mt-1 p-2 w-full bg-gray-100 rounded-md text-gray-900 h-24 overflow-y-auto">
                            {selectedReservation.issue}
                          </p>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700">
                            Proposed Date
                          </label>
                          <p className="mt-1 p-2 w-full bg-gray-100 rounded-md text-gray-900">
                            {selectedReservation.date}
                          </p>
                        </div>
                      </div>
                      <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">
                          Scheduled Date
                        </label>
                        <input
                          type="date"
                          value={scheduledDate}
                          onChange={(e) => setScheduledDate(e.target.value)}
                          className="mt-1 p-2 w-full border rounded-md"
                          min={new Date().toISOString().split("T")[0]}
                        />
                      </div>
                      <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">
                          Additional Notes
                        </label>
                        <p className="mt-1 p-2 w-full bg-gray-100 rounded-md text-gray-900 h-24 overflow-y-auto">
                          {selectedReservation.notes}
                        </p>
                      </div>
                      <div className="flex justify-end space-x-3">
                        <button
                          onClick={handleApprove}
                          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                        >
                          Approve & Schedule
                        </button>
                        <button
                          onClick={handleDecline}
                          className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
                        >
                          Decline
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </main>
            </div>

            {/* --- Fixed Right Panel --- */}
            <aside className="w-80 bg-white p-6 border-l border-gray-300 hidden lg:block">
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
    </ProtectedRoute>
  );
}
