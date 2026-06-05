import { useState } from "react";
import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import DashboardNavbar from "../components/DashboardNavbar";
import NotificationDrawer from "../components/NotificationDrawer";

export default function DashboardLayout() {
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);

  const toggleNotifications = () => {
    console.log("Toggling notifications. Old state:", isNotificationOpen);
    setIsNotificationOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-surface text-on-surface font-manrope">
      <DashboardNavbar onNotificationToggle={toggleNotifications} />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <NotificationDrawer 
        isOpen={isNotificationOpen} 
        onClose={() => setIsNotificationOpen(false)} 
      />
    </div>
  );
}
