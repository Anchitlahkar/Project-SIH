"use client";

import { useAuth } from "../context/auth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { currentUser } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (currentUser === null) {
      router.push("/auth/login"); // redirect if not logged in
    }
  }, [currentUser, router]);

  // Optionally show a loader until auth state is resolved
  if (currentUser === null) {
    return <p>Loading...</p>;
  }

  return <>{children}</>;
}
