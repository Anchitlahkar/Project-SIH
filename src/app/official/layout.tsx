import { AuthProvider } from "../context/auth";
import ProtectedRoute from "../context/ProtectedRoute"
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Official's Page",
  description: "Page for Official User's Only",
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
