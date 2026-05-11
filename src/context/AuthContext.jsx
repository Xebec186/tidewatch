import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  // TEMPORARY STATIC USER
  const [user, setUser] = useState({
    id: "u_001",
    name: "Glenn Rogers",
    role: "regular", // regular | technical | admin
  });

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
