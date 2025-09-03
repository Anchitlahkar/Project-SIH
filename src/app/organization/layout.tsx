import "../globals.css"
import { AuthProvider } from "../context/auth";
import ProtectedRoute from "../context/ProtectedRoute"
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Organisation's Page",
  description: "Page for Oganisationa User's Only",
};


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-gray-100">
      <AuthProvider>
        <ProtectedRoute>
          {children}
        </ProtectedRoute>
      </AuthProvider>
    </div>
  );
}
