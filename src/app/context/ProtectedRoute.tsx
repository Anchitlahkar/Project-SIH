"use client";

import { useAuth } from "../context/auth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Swal from "sweetalert2";

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { currentUser } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (currentUser === null) {
      Swal.fire({
        title: "Not Logged In",
        text: "Please Logged In",
        icon: "error"
      })
      router.push("/auth/login"); // redirect if not logged in
    }
  }, [currentUser, router]);

  // Optionally show a loader until auth state is resolved
  if (currentUser === null) {
    return (
      <>
        <p>Loading...</p>
      </>
    )
  }

  return <>{children}</>;
}
