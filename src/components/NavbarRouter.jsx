import { useAuth } from "../context/AuthContext";
import RegularDashboardNavbar from "./RegularDashboardNavbar";
import TechnicalDashboardNavbar from "./TechnicalDashboardNavbar";

export default function NavbarRouter() {
  const { user } = useAuth();

  switch (user.role) {
    case "regular":
      return <RegularDashboardNavbar />;

    case "technical":
      return <TechnicalDashboardNavbar />;
    default:
      return "";
  }
}
