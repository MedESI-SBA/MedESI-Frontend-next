"use client";
import { useState } from "react";
import { AuthProvider } from "@/providers/AuthContext";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";

export default function ClientLayout({ children }) {
  const [showLogin, setShowLogin] = useState(false);
  
  return (
    <AuthProvider>
      <div className={`${showLogin ? "bg-opacity-50" : ""}`}>
        {children}
      </div>
    </AuthProvider>
  );
}