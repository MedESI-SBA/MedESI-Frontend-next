"use client";
import { useState, useEffect } from "react";
import { use } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import api from "@/lib/api";
import ProtectedRoute from "@/components/ProtectedRoute/ProtectedRoute";
import { LuSettings, LuUser, LuSearch, LuBell, LuX } from "react-icons/lu";
import { jsPDF } from "jspdf";
import { PDFDownloadLink } from "@react-pdf/renderer";
import html2canvas from "html2canvas";
import PrescriptionPDF from "@/components/PrescriptionPDF/PrescriptionPDF";

export default function consultation({ params }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const resolvedParams = use(params);
  const [openSections, setOpenSections] = useState({});
  const [error, setError] = useState(null);
  const [prescriptions, setPrescriptions] = useState([
    { id: 1, name: "", dosage: "", frequency: "", duration: "" },
  ]);
  const [medicalPrescriptions, setMedicalPrescriptions] = useState([
    { id: 1, name: "", details: "" },
  ]);
  const [appointment, setAppointment] = useState(null);
  const [doctor, setDoctor] = useState(null);
  const [formData, setFormData] = useState({
    notes: "",
    reorientation: "",
    prescriptionIssueDate: new Date().toISOString().split("T")[0],
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  useEffect(() => {
    const appointmentParam = searchParams.get("appointment");
    if (appointmentParam) {
      try {
        setAppointment(JSON.parse(appointmentParam));
      } catch (e) {
        console.error("Error parsing appointment:", e);
      }
    }

    const fetchDoctor = async () => {
      try {
        const response = await api.get("/api/doctors/me");
        setDoctor(response.data);
      } catch (error) {
        console.error("Error fetching doctor:", error);
      }
    };

    fetchDoctor();
  }, [searchParams]);
  const patient = appointment?.patient;
  // Format medications for PDF

  const toggleSection = (label) => {
    setOpenSections((prev) => ({
      ...prev,
      [label]: !prev[label],
    }));
  };
  const addPrescription = () => {
    const newId = prescriptions.length + 1;
    setPrescriptions([
      ...prescriptions,
      {
        id: newId,
        name: "",
        dosage: "",
        frequency: "",
        duration: "",
      },
    ]);
  };

  const removePrescription = (id) => {
    if (prescriptions.length > 1) {
      setPrescriptions(prescriptions.filter((p) => p.id !== id));
      setMedicalPrescriptions(
        medicalPrescriptions.filter((mp) => mp.id !== id)
      );
    }
  };

  const updatePrescription = (id, field, value) => {
    const updatedPrescriptions = prescriptions.map((p) =>
      p.id === id ? { ...p, [field]: value } : p
    );
    setPrescriptions(updatedPrescriptions);

    const prescription = updatedPrescriptions.find((p) => p.id === id);
    if (
      prescription.name &&
      prescription.dosage &&
      prescription.frequency &&
      prescription.duration
    ) {
      const details = `${prescription.frequency} times a day  for ${prescription.duration} days`;

      setMedicalPrescriptions((prev) => {
        const exists = prev.some((mp) => mp.id === id);
        if (exists) {
          return prev.map((mp) =>
            mp.id === id
              ? {
                  ...mp,
                  name: `${prescription.name} `,
                  details,
                }
              : mp
          );
        } else {
          return [
            ...prev,
            {
              id,
              name: `${prescription.name} `,
              details,
            },
          ];
        }
      });
    }
  };

  const handleSubmit = async () => {
    if (!appointment) {
      setSubmitError("No appointment data available");
      return;
    }

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const response = await api.post(
        "/api/doctors/consultations/appointment",
        {
          patient_id: patient.id,
          appointment_id: appointment.id,
          notes: formData.notes,
          reorientation: formData.reorientation,
          prescriptions: prescriptions.filter(
            (p) => p.name && p.dosage && p.frequency && p.duration
          ),
          prescriptionIssueDate: formData.prescriptionIssueDate,
        }
      );

      if (response.data.status) {
        setSubmitSuccess(true);
        router.push("/doctor/schedule");
      } else {
        setSubmitError(
          response.data.message || "Failed to create consultation"
        );
      }
    } catch (error) {
      console.error("Error creating consultation:", error);
      setSubmitError(error.response?.data?.message || "An error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <ProtectedRoute>
      <div className="flex h-full bg-gray-100">
        <aside className="w-65 bg-white shadow-lg p-6">
          <div className="flex items-center space-x-3 mb-8">
            <img src="/Logo.svg" className="w-10 h-10" alt="Logo" />
            <h1 className="font-bold text-xl text-gray-800">Doctor Esi</h1>
          </div>
          <nav>
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
            <h2 className="text-gray-500 text-sm font-light mt-6 mb-2">
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
            <h2 className="text-gray-500 text-sm font-light mt-6 mb-2">
              Pages
            </h2>
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
                          className="w-5 h-5 "
                        />
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
                        >
                          {subItem}
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          </nav>
        </aside>
        <div className="flex-1 flex flex-col h-full">
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
          <main className="flex-1 ">
            <div className="flex flex-col md:flex-row h-full">
              <div className="bg-white p-6 flex-1">
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
                      {patient?.firstName} {patient?.familyName}
                    </h3>
                    <p className="text-gray-400 text-sm">{patient?.email}</p>
                    {appointment && (
                      <p className="text-gray-500 text-sm">
                        Appointment:{" "}
                        {new Date(appointment.dateTime).toLocaleDateString()}
                      </p>
                    )}
                  </div>
                  <button
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className={`px-4 py-2 rounded-md text-white ${
                      isSubmitting
                        ? "bg-blue-400"
                        : "bg-blue-500 hover:bg-blue-600"
                    }`}
                  >
                    {isSubmitting ? "Submitting..." : "Submit Consultation"}
                  </button>
                  {submitError && (
                    <div className="text-red-500 mb-4">{submitError}</div>
                  )}

                  {submitSuccess && (
                    <div className="text-green-500 mb-4">
                      Consultation created successfully!
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h3 className="text-sm font-medium mb-2">Notes</h3>
                    <textarea
                      className="h-24 w-96 bg-muted rounded-md bg-gray-200 p-2"
                      rows={4}
                      value={formData.notes}
                      onChange={(e) =>
                        setFormData({ ...formData, notes: e.target.value })
                      }
                    />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium mb-2">Reorientation</h3>
                    <textarea
                      className="h-24 w-96 bg-muted rounded-md bg-gray-200 p-2"
                      rows={4}
                      value={formData.reorientation}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          reorientation: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>

                <div className="mt-6">
                  <div className="flex items-center mb-2">
                    <h3 className="text-sm font-medium">Add Prescription</h3>
                    <button
                      onClick={addPrescription}
                      size="sm"
                      variant="outline"
                      className="h-6 w-6 p-0 ml-2 bg-blue-500 text-white rounded flex items-center justify-center"
                    >
                      <span>+</span>
                    </button>
                  </div>

                  {/* Prescription Items */}
                  {prescriptions.map((prescription) => (
                    <div
                      key={prescription.id}
                      className="flex gap-2 mb-2 items-center"
                    >
                      <input
                        type="text"
                        placeholder="Medication name"
                        value={prescription.name}
                        onChange={(e) =>
                          updatePrescription(
                            prescription.id,
                            "name",
                            e.target.value
                          )
                        }
                        className="flex-1 h-10 rounded-md border border-input bg-background px-3 py-2 text-sm"
                      />
                      <input
                        type="text"
                        placeholder="Dosage"
                        value={prescription.dosage}
                        onChange={(e) =>
                          updatePrescription(
                            prescription.id,
                            "dosage",
                            e.target.value
                          )
                        }
                        className="w-20 h-10 rounded-md border border-input bg-background px-3 py-2 text-sm"
                      />
                      <input
                        type="text"
                        placeholder="Frequency"
                        value={prescription.frequency}
                        onChange={(e) =>
                          updatePrescription(
                            prescription.id,
                            "frequency",
                            e.target.value
                          )
                        }
                        className="w-24 h-10 rounded-md border border-input bg-background px-3 py-2 text-sm"
                      />
                      <input
                        type="text"
                        placeholder="Duration"
                        value={prescription.duration}
                        onChange={(e) =>
                          updatePrescription(
                            prescription.id,
                            "duration",
                            e.target.value
                          )
                        }
                        className="w-24 h-10 rounded-md border border-input bg-background px-3 py-2 text-sm"
                      />
                      <button
                        onClick={() => removePrescription(prescription.id)}
                        className="h-10 w-10 p-0 text-red-500 hover:bg-red-50 rounded flex items-center justify-center"
                      >
                        <LuX size={16} />
                      </button>
                    </div>
                  ))}
                </div>

                <div className="mt-6">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-sm font-medium">
                      Medical Prescription
                    </h3>
                    <PDFDownloadLink
                      document={
                        <PrescriptionPDF
                          patientName={`${patient?.firstName} ${patient?.familyName}`}
                          age={patient?.age || "N/A"}
                          date={
                            appointment
                              ? new Date(appointment.dateTime)
                                  .toISOString()
                                  .split("T")[0]
                              : new Date().toISOString().split("T")[0]
                          }
                          doctorInfo={{
                            name: doctor
                              ? `DR. ${doctor.firstName} ${doctor.familyName}`.toUpperCase()
                              : "DR. SARAH KROUCHI",
                            specialty:
                              doctor?.specialty || "General Practitioner",
                            clinic: doctor?.clinic || "Esi-Sba Medical Center",
                            address:
                              doctor?.address ||
                              "EL WIAM Sidi Bel Abbès 22016, Algérie",
                            phone: doctor?.phone || "+213067845858",
                          }}
                          medications={medicalPrescriptions}
                        />
                      }
                      fileName={`prescription_${patient?.firstName}_${patient?.familyName}.pdf`}
                    >
                      {({ loading }) => (
                        <button
                          disabled={loading}
                          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                        >
                          {loading
                            ? "Generating PDF..."
                            : "Download Prescription"}
                        </button>
                      )}
                    </PDFDownloadLink>
                  </div>

                  <div
                    id="prescription-content"
                    className="border rounded-md p-6"
                  >
                    <div className="flex justify-between mb-6">
                      <div>
                        <h4 className="text-blue-500 font-semibold">
                          {doctor
                            ? `DR. ${doctor.firstName} ${doctor.familyName}`.toUpperCase()
                            : "DR. SARAH KROUCHI"}
                        </h4>
                        <p className="text-sm text-muted-foreground">
                          {doctor?.specialty || "Doctor General"}
                        </p>
                      </div>
                      <div className="text-right text-sm">
                        <p>{doctor?.clinic || "Esi-Sba Medical Center"}</p>
                        <p>
                          {doctor?.address ||
                            "EL WIAM Sidi Bel Abbès 22016, Algérie"}
                        </p>
                        <p>{doctor?.phone || "+213067845858"}</p>
                      </div>
                    </div>

                    <div className="border-t pt-4 pb-4 flex justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">
                          Patient: {patient?.firstName} {patient?.familyName}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-muted-foreground">
                          Age: {patient?.age || "N/A"} years
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Date:{" "}
                          {appointment
                            ? new Date(appointment.dateTime)
                                .toISOString()
                                .split("T")[0]
                            : new Date().toISOString().split("T")[0]}
                        </p>
                      </div>
                    </div>

                    <div className="border-t pt-4">
                      <h4 className="text-blue-500 font-semibold mb-4">
                        MEDICAMENTS
                      </h4>

                      {medicalPrescriptions.map((item) => (
                        <div key={item.id} className="border-b pb-4 mb-4">
                          <p>{item.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {item.details}
                          </p>
                        </div>
                      ))}

                      <div className="flex justify-end mt-8">
                        <button
                          variant="outline"
                          className="border-blue-500 text-blue-500 px-4 py-2 rounded border"
                        >
                          SIGNATURE
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <aside className="w-80 bg-white p-6 shadow-xl rounded-2xl">
                <h2 className="text-lg font-semibold text-gray-800 mb-4">
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
                        <span className="text-gray-500 text-xs">
                          {item.time}
                        </span>
                      </div>
                    </li>
                  ))}
                </ul>
                <h2 className="text-lg font-semibold text-gray-800 mt-6 mb-4">
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
                        <span className="text-gray-500 text-xs">
                          {item.time}
                        </span>
                      </div>
                    </li>
                  ))}
                </ul>
              </aside>
            </div>
          </main>
        </div>
      </div>
    </ProtectedRoute>
  );
}
