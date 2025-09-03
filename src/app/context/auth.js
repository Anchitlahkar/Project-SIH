"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../../utils/firebase"; // adjust your import

export const AuthContext = createContext({
  currentUser: null,
});

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(undefined);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      
      if (user) {
        setCurrentUser({
          email: user.email,
          username: user.displayName,
        });
      } else {
        setCurrentUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ currentUser }}>
      {children}
    </AuthContext.Provider>
  );
}

// 👇 Add this helper hook
export function useAuth() {
  return useContext(AuthContext);
}
