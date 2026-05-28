import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";

export default function DashboardLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-surface text-on-surface font-manrope">
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
