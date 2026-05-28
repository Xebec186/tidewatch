import { useAuth } from "../context/AuthContext";
import RegularDashboardNavbar from "./RegularDashboardNavbar";
import TechnicalDashboardNavbar from "./TechnicalDashboardNavbar";

export default function NavbarRouter({ onNotificationToggle }) {
  const { user } = useAuth();

  switch (user?.role) {
    case "regular":
      return <RegularDashboardNavbar onNotificationToggle={onNotificationToggle} />;

    case "technical":
      return <TechnicalDashboardNavbar onNotificationToggle={onNotificationToggle} />;
    default:
      return "";
  }
}
