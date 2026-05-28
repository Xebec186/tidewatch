import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import NavbarRouter from "../components/NavbarRouter";

export default function DashboardLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-surface text-on-surface font-manrope">
      <NavbarRouter />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
