"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import api from "@/lib/api";
import ProtectedRoute from "@/components/ProtectedRoute/ProtectedRoute";
import { LuSettings, LuUser, LuSearch, LuBell, LuX } from "react-icons/lu";
import Sidebar from "@/components/Sidebar/Sidebar";

export default function ProfileDoctor() {
  const router = useRouter();
  const [openSections, setOpenSections] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [activeView, setActiveView] = useState("clean");
  const [appointments, setAppointments] = useState([]);
  const [loadingAppointments, setLoadingAppointments] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [formData, setFormData] = useState({
    patientEmail: "",
    notes: "",
    date: "",
  });
  const [patientInfo, setPatientInfo] = useState(null);
  const [patientError, setPatientError] = useState("");
  const [isCreatingAppointment, setIsCreatingAppointment] = useState(false);
  const searchPatient = async () => {
    try {
      setPatientError("");
      const response = await api.get(
        `/api/doctors/patients/email?email=${formData.patientEmail}`
      );

      // Check if patient exists in response
      if (response.data && response.data.patient) {
        setPatientInfo(response.data.patient);
        console.log("Found patient:", response.data.patient);
      } else {
        setPatientInfo(null);
        setPatientError("Patient data not found in response");
      }
    } catch (error) {
      setPatientInfo(null);
      setPatientError("Patient not found");
      console.error("Error searching patient:", error);

      // More detailed error handling
      if (error.response) {
        console.error("Response error:", error.response.data);
      } else if (error.request) {
        console.error("Request error:", error.request);
      } else {
        console.error("Error:", error.message);
      }
    }
  };

  const toggleSection = (label) => {
    setOpenSections((prev) => ({
      ...prev,
      [label]: !prev[label],
    }));
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    setLoadingAppointments(true);
    try {
      const response = await api.get("/api/doctors/appointments");
      console.log(response);
      setAppointments(
        Array.isArray(response.data.appointments)
          ? response.data.appointments
          : []
      );
    } catch (error) {
      console.error("Error fetching appointments:", error);
      setAppointments([]);
    } finally {
      setLoadingAppointments(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCreateAppointment = async (appointmentData) => {
    if (!patientInfo) {
      setPatientError("Please search and verify patient first");
      return;
    }

    setIsCreatingAppointment(true);

    try {
      const formattedData = {
        patient_id: patientInfo.id,
        notes: appointmentData.notes,
        date: new Date(appointmentData.date).toISOString().split("T")[0],
      };

      const response = await api.post(
        "/api/doctors/appointments",
        formattedData
      );
      console.log("Appointment created:", response.data);

      fetchAppointments();
      setIsModalOpen(false);
      setPatientInfo(null);
      setFormData({
        patientEmail: "",
        notes: "",
        date: "",
      });
    } catch (error) {
      console.error("Error creating appointment:", error);
      // Show error message to user
      if (error.response?.data?.message) {
        setPatientError(error.response.data.message);
      } else {
        setPatientError("Failed to create appointment");
      }
    } finally {
      setIsCreatingAppointment(false);
    }
  };

  const handleCancelAppointment = async (appointmentId) => {
    try {
      await api.delete("/api/doctors/appointments", {
        data: { appointment_id: appointmentId },
      });
      fetchAppointments();
      console.log("Appointment canceled successfully");
    } catch (error) {
      console.error("Error canceling appointment:", error);
      if (error.response?.data?.message) {
        console.error(error.response.data.message);
      }
    }
  };

  const groupAppointmentsByDay = () => {
    const days = {
      Sunday: [],
      Monday: [],
      Tuesday: [],
      Wednesday: [],
      Thursday: [],
      Friday: [],
      Saturday: [],
    };
    if (!Array.isArray(appointments)) {
      return days;
    }
    appointments.forEach((appointment) => {
      const date = new Date(appointment.dateTime);
      const dayName = date.toLocaleDateString("en-US", { weekday: "long" });
      if (days[dayName]) {
        days[dayName].push(appointment);
      }
    });

    return days;
  };

  function AppointmentSlot({ appointment }) {
    return (
      <div className="border rounded-md p-3 h-32 relative my-4">
        <div className="flex items-center gap-2 mb-2">
          <div className="h-8 w-8 rounded-full bg-gray-300"></div>
          <div>
            <div className="text-sm font-medium">
              {appointment.patient?.firstName} {appointment.patient?.familyName}
            </div>
            <div className="text-xs text-muted-foreground">
              {appointment.patient?.email}
            </div>
          </div>
        </div>
        <div className="text-xs text-gray-500 mb-1">
          {new Date(appointment.dateTime).toLocaleString()}
        </div>
        <div className="text-xs text-gray-700 truncate">
          {appointment.reason}
        </div>

        <div className="absolute bottom-3 left-3 right-3 flex justify-between">
          <button
            className="text-muted-foreground cursor-pointer"
            onClick={() => setSelectedAppointment(appointment)}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                x="4"
                y="4"
                width="16"
                height="16"
                rx="2"
                stroke="currentColor"
                strokeWidth="2"
                fill="none"
              />
            </svg>
          </button>
          <p
            className={`text-xs font-medium ${
              appointment.status === "scheduled"
                ? "text-green-600"
                : appointment.status === "cancelled"
                ? "text-red-600"
                : "text-gray-600"
            }`}
          >
            {appointment.status}
          </p>
          <button
            className="text-red-500 cursor-pointer"
            onClick={() => handleCancelAppointment(appointment.id)}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M18 6L6 18M6 6L18 18"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>
      </div>
    );
  }

  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const groupedAppointments = groupAppointmentsByDay();
  const navItems = [
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
  ];
  return (
    <ProtectedRoute>
      <div className="flex bg-gray-100 h-full">
        {selectedAppointment && (
          <div className="fixed inset-0 backdrop-blur-sm bg-white/30 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md border-1 border-black">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold">Appointment Details</h3>
                <button
                  onClick={() => setSelectedAppointment(null)}
                  className="text-gray-500 hover:text-gray-700 cursor-pointer"
                >
                  <LuX size={24} />
                </button>
              </div>
              <div className="space-y-4">
                <p
                  className={`text-xs font-medium ${
                    selectedAppointment.status === "scheduled"
                      ? "text-green-600"
                      : selectedAppointment.status === "cancelled"
                      ? "text-red-600"
                      : "text-gray-600"
                  }`}
                >
                  {selectedAppointment.status}
                </p>
                <div>
                  <h4 className="text-sm font-medium text-gray-500">Patient</h4>
                  <p className="text-gray-800">
                    {selectedAppointment.patient?.firstName}{" "}
                    {selectedAppointment.patient?.familyName}
                  </p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500">
                    Date & Time
                  </h4>
                  <p className="text-gray-800">
                    {new Date(selectedAppointment.dateTime).toLocaleString()}
                  </p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500">Reason</h4>
                  <p className="text-gray-800">{selectedAppointment.reason}</p>
                </div>
                {selectedAppointment.notes && (
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">Notes</h4>
                    <p className="text-gray-800">{selectedAppointment.notes}</p>
                  </div>
                )}
              </div>
              <div className="mt-6 flex justify-end">
                <button
                  onClick={() => setSelectedAppointment(null)}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Sidebar */}
        <Sidebar userType="doctor" />

        {/* Main Content */}
        <div className="flex-1 flex flex-col h-full">
          {/* Header */}
          <header className="sticky top-0 bg-white border-b border-gray-200 flex items-center justify-between px-6 h-16 z-10">
            {/* Left Side: Breadcrumbs/Title */}
            <div className="flex items-center">
              <span className="text-sm text-gray-500">Dashboards</span>
              <span className="text-sm text-gray-500 mx-2">/</span>
              <span className="text-sm font-medium text-gray-800">
                Schedule
              </span>
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
              <button
                className="text-gray-500 hover:text-gray-700 cursor-pointer"
                onClick={() => router.push("/doctor/profile")}
              >
                <LuUser size={20} />
              </button>
            </div>
          </header>

          {/* Main Content Area */}
          <main className="flex-1 ">
            <div className="flex flex-col md:flex-row h-full">
              <div className="bg-white p-6 flex-1">
                <div className="flex justify-between items-center mb-6">
                  <h1 className="text-2xl font-semibold">Schedule</h1>
                  <button
                    className="px-4 py-2 rounded-md bg-blue-500 text-white hover:bg-blue-600 cursor-pointer"
                    onClick={() => setIsModalOpen(true)}
                  >
                    Create Appointment
                  </button>
                </div>

                <div className="mb-6 border-b">
                  <div className="flex space-x-2">
                    <button
                      className={`px-4 py-2 text-sm font-medium cursor-pointer ${
                        activeView === "clean"
                          ? "border-b-2 border-blue-500 text-blue-700"
                          : "text-gray-500 hover:text-gray-700"
                      }`}
                      onClick={() => setActiveView("clean")}
                    >
                      Clean
                    </button>
                    <button
                      className={`px-4 py-2 text-sm font-medium cursor-pointer ${
                        activeView === "compact"
                          ? "border-b-2 border-blue-500 text-blue-700"
                          : "text-gray-500 hover:text-gray-700"
                      }`}
                      onClick={() => setActiveView("compact")}
                    >
                      Compact
                    </button>
                  </div>
                </div>

                {loadingAppointments ? (
                  <div className="flex justify-center items-center h-64">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                  </div>
                ) : (
                  <>
                    {/* Clean View (Calendar Grid) */}
                    {activeView === "clean" && (
                      <div className="grid grid-cols-5 gap-4">
                        {daysOfWeek.slice(0, 5).map((day) => (
                          <div
                            key={day}
                            className="rounded-md bg-sky-50 p-2 text-center"
                          >
                            {day}
                          </div>
                        ))}

                        {daysOfWeek.slice(0, 5).map((day) => (
                          <div key={`${day}-slots`} className="min-h-32">
                            {groupedAppointments[day]?.length > 0 ? (
                              groupedAppointments[day].map((appointment) => (
                                <AppointmentSlot
                                  key={appointment.id}
                                  appointment={appointment}
                                />
                              ))
                            ) : (
                              <div className="h-32"></div>
                            )}
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Compact View (Table) */}
                    {activeView === "compact" && (
                      <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                          <thead className="bg-gray-50">
                            <tr>
                              <th
                                scope="col"
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                              >
                                User
                              </th>
                              <th
                                scope="col"
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                              >
                                Date
                              </th>
                              <th
                                scope="col"
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                              >
                                Reason
                              </th>
                              <th
                                scope="col"
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                              >
                                Status
                              </th>
                              <th
                                scope="col"
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                              >
                                Actions
                              </th>
                            </tr>
                          </thead>
                          <tbody className="bg-white divide-y divide-gray-200">
                            {appointments.map((appointment) => (
                              <tr key={appointment.id}>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <div className="flex items-center">
                                    <div className="flex-shrink-0 h-10 w-10">
                                      <div className="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center">
                                        {appointment.patient?.firstName?.charAt(
                                          0
                                        )}
                                        {appointment.patient?.familyName?.charAt(
                                          0
                                        )}
                                      </div>
                                    </div>
                                    <div className="ml-4">
                                      <div className="text-sm font-medium text-gray-900">
                                        {appointment.patient?.firstName}{" "}
                                        {appointment.patient?.familyName}
                                      </div>
                                      <div className="text-sm text-gray-500">
                                        {appointment.patient?.email}
                                      </div>
                                    </div>
                                  </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <div className="text-sm text-gray-900">
                                    {new Date(
                                      appointment.dateTime
                                    ).toLocaleString()}
                                  </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <div className="text-sm text-gray-900">
                                    {appointment.notes.slice(0, 20)}...
                                  </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <span
                                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                      appointment.status === "scheduled"
                                        ? "bg-green-100 text-green-800"
                                        : appointment.status === "cancelled"
                                        ? "bg-red-100 text-red-800"
                                        : "bg-gray-100 text-gray-800"
                                    }`}
                                  >
                                    {appointment.status}
                                  </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                  <button
                                    className="text-blue-600 hover:text-blue-900 mr-3 cursor-pointer"
                                    onClick={() =>
                                      setSelectedAppointment(appointment)
                                    }
                                  >
                                    View
                                  </button>
                                  <button
                                    className="text-blue-600 hover:text-blue-900 mr-3 cursor-pointer"
                                    onClick={() => {
                                      const url = `/doctor/consultation/${
                                        appointment.patient?.id
                                      }?appointment=${encodeURIComponent(
                                        JSON.stringify(appointment)
                                      )}`;
                                      router.push(url);
                                    }}
                                  >
                                    Consult
                                  </button>
                                  <button
                                    className="text-red-600 hover:text-red-900 cursor-pointer"
                                    onClick={() =>
                                      handleCancelAppointment(appointment.id)
                                    }
                                  >
                                    Cancel
                                  </button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </>
                )}
              </div>

              {/* Right Panel */}
              <aside className="w-80 bg-white border-l border-gray-200 p-6 overflow-y-auto sticky top-16 h-[calc(100vh-4rem)]">
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
                          You have {appointments.length} upcoming appointments
                        </p>
                        <span className="text-gray-500 text-xs">Just now</span>
                      </div>
                    </li>
                    {Array.isArray(appointments) &&
                      appointments.slice(0, 2).map((appointment) => (
                        <li
                          key={`notif-${appointment.id}`}
                          className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg shadow-sm"
                        >
                          <div className="flex-shrink-0 w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                            <img
                              src="/newprof.svg"
                              className="w-4 h-4"
                              alt="Icon"
                            />
                          </div>
                          <div>
                            <p className="text-gray-800 text-sm font-medium">
                              Appointment with {appointment.patient?.firstName}{" "}
                              at{" "}
                              {new Date(
                                appointment.dateTime
                              ).toLocaleTimeString()}
                            </p>
                            <span className="text-gray-500 text-xs">
                              {new Date(
                                appointment.dateTime
                              ).toLocaleDateString()}
                            </span>
                          </div>
                        </li>
                      ))}
                  </ul>
                </div>

                <div>
                  <h2 className="text-lg font-semibold text-gray-800 mb-4">
                    Recent Activities
                  </h2>
                  <ul className="space-y-3">
                    {Array.isArray(appointments) &&
                      appointments.slice(0, 2).map((appointment, index) => (
                        <li
                          key={`activity-${appointment.id}`}
                          className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg shadow-sm"
                        >
                          <div
                            className={`flex-shrink-0 w-8 h-8 ${
                              index === 0
                                ? "bg-green-100"
                                : index === 1
                                ? "bg-orange-100"
                                : "bg-purple-100"
                            } rounded-full flex items-center justify-center overflow-hidden`}
                          >
                            <img
                              src={
                                index === 0
                                  ? "/pr2.svg"
                                  : index === 1
                                  ? "/pr3.svg"
                                  : "/pr4.svg"
                              }
                              className="w-5 h-5"
                              alt="Icon"
                            />
                          </div>
                          <div>
                            <p className="text-gray-800 text-sm font-medium">
                              {index === 0
                                ? "Appointment scheduled"
                                : index === 1
                                ? "Appointment updated"
                                : "Appointment reminder sent"}
                            </p>
                            <span className="text-gray-500 text-xs">
                              {new Date(appointment.dateTime).toLocaleString()}
                            </span>
                          </div>
                        </li>
                      ))}
                  </ul>
                </div>
              </aside>
            </div>
          </main>
        </div>
      </div>
    </ProtectedRoute>
  );
}
