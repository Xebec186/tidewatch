import { useAuth } from "../../context/AuthContext";

import RegularDashboard from "./RegularDashboard";
import TechnicalDashboard from "./TechnicalDashboard";
import AdminDashboard from "./AdminDashboard";

export default function DashboardRouter() {
  const { user } = useAuth();

  switch (user.role) {
    case "technical":
      return <TechnicalDashboard />;

    case "admin":
      return <AdminDashboard />;

    default:
      return <RegularDashboard />;
  }
}
