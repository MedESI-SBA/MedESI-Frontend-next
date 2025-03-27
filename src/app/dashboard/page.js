"use client";
import ProtectedRoute from "@/components/ProtectedRoute/ProtectedRoute";

export default function Dashboard() {
  return (
    <ProtectedRoute>
      <div className="p-10 text-center">
        <h1 className="text-2xl font-bold">Dashboard</h1>
      </div>
    </ProtectedRoute>
  );
}
