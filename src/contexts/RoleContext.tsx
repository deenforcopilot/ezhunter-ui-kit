import { createContext, useContext, useState, ReactNode } from "react";

export type UserRole = "applicant" | "recruiter" | "client" | "admin";

interface RoleContextType {
  role: UserRole;
  setRole: (role: UserRole) => void;
  user: {
    name: string;
    phone: string;
    avatar: string | null;
    level: string;
    points: number;
  };
}

const RoleContext = createContext<RoleContextType | undefined>(undefined);

export function RoleProvider({ children }: { children: ReactNode }) {
  const [role, setRole] = useState<UserRole>("applicant");
  
  const user = {
    name: "สมชาย ใจดี",
    phone: "081-234-5678",
    avatar: null,
    level: "Gold",
    points: 1250,
  };

  return (
    <RoleContext.Provider value={{ role, setRole, user }}>
      {children}
    </RoleContext.Provider>
  );
}

export function useRole() {
  const context = useContext(RoleContext);
  if (!context) {
    throw new Error("useRole must be used within a RoleProvider");
  }
  return context;
}
