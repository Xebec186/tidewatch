import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  LuWaves,
  LuBellRing,
  LuCircleUser,
  LuLogOut,
  LuMenu,
  LuX,
} from "react-icons/lu";
import { useAuth } from "../context/AuthContext";

export default function DashboardNavbar({ onNotificationToggle }) {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/");
    } catch (err) {
      console.error("Failed to log out", err);
    }
  };

  const handleNotifClick = (e) => {
    e.preventDefault();
    console.log("Notification button clicked");
    if (onNotificationToggle) onNotificationToggle();
    setIsMenuOpen(false);
  };

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80; // Offset for sticky header
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
    setIsMenuOpen(false);
  };

  return (
    <header
      className={`sticky top-0 z-40 border-b border-outline-variant/20 transition-colors duration-300 ${
        isMenuOpen ? "bg-surface" : "bg-surface/85 backdrop-blur-md"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link to="/dashboard" className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-on-primary shadow-lg shadow-primary/10">
            <LuWaves size={20} />
          </div>
          <div>
            <p className="text-lg font-extrabold tracking-tight text-primary">
              TideWatch
            </p>
            <p className="text-[10px] uppercase tracking-[0.22em] text-on-surface-variant">
              Live Monitor
            </p>
          </div>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          <button
            onClick={() => scrollToSection("overview")}
            className="cursor-pointer text-sm font-medium text-primary hover:opacity-80"
          >
            Overview
          </button>
          <button
            onClick={() => scrollToSection("charts")}
            className="cursor-pointer text-sm font-medium text-on-surface-variant transition-colors hover:text-primary"
          >
            Charts
          </button>
          <button
            onClick={() => scrollToSection("alerts")}
            className="cursor-pointer text-sm font-medium text-on-surface-variant transition-colors hover:text-primary"
          >
            Activity
          </button>
        </nav>

        <div className="flex items-center gap-3">
          <div className="hidden items-center gap-3 md:flex">
            <button
              onClick={handleNotifClick}
              type="button"
              className="inline-flex cursor-pointer items-center justify-center rounded-xl p-2 text-on-surface-variant transition-colors hover:bg-surface-container-low hover:text-primary"
              aria-label="Notifications"
            >
              <LuBellRing size={20} />
            </button>
            <Link to="/profile">
              <button
                type="button"
                className="inline-flex cursor-pointer items-center justify-center rounded-xl p-2 text-on-surface-variant transition-colors hover:bg-surface-container-low hover:text-primary"
                aria-label="Profile"
              >
                <LuCircleUser size={20} />
              </button>
            </Link>
            <button
              onClick={handleLogout}
              type="button"
              className="inline-flex cursor-pointer items-center justify-center rounded-xl p-2 text-on-surface-variant transition-colors hover:bg-surface-container-low hover:text-error"
              aria-label="Logout"
            >
              <LuLogOut size={20} />
            </button>
          </div>

          <button
            onClick={toggleMenu}
            type="button"
            className="inline-flex cursor-pointer items-center justify-center rounded-xl p-2 text-on-surface-variant transition-colors hover:bg-surface-container-low hover:text-primary md:hidden"
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMenuOpen ? <LuX size={24} /> : <LuMenu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-x-0 top-18.25 bottom-0 z-40 bg-surface shadow-2xl transition-all duration-100 md:hidden ${
          isMenuOpen
            ? "translate-y-0 opacity-100"
            : "-translate-y-4 opacity-0 pointer-events-none"
        }`}
      >
        <div className="flex flex-col gap-4 p-6">
          <nav className="flex flex-col gap-4">
            <button
              onClick={() => scrollToSection("overview")}
              className="text-left text-base font-semibold text-primary transition-colors"
            >
              Overview
            </button>
            <button
              onClick={() => scrollToSection("charts")}
              className="text-left text-base font-semibold text-on-surface-variant transition-colors hover:text-primary"
            >
              Charts
            </button>
            <button
              onClick={() => scrollToSection("alerts")}
              className="text-left text-base font-semibold text-on-surface-variant transition-colors hover:text-primary"
            >
              Activity
            </button>
          </nav>

          <hr className="border-outline-variant/20" />

          <div className="flex flex-col gap-3">
            <button
              onClick={handleNotifClick}
              className="flex items-center gap-3 rounded-xl border border-outline-variant/30 p-3 text-left text-on-surface-variant transition-colors hover:bg-surface-container-low hover:text-primary"
            >
              <LuBellRing size={18} />
              <span className="text-sm font-semibold">Notifications</span>
            </button>
            <Link
              to="/profile"
              onClick={() => setIsMenuOpen(false)}
              className="flex items-center gap-3 rounded-xl border border-outline-variant/30 p-3 text-on-surface-variant transition-colors hover:bg-surface-container-low hover:text-primary"
            >
              <LuCircleUser size={18} />
              <span className="text-sm font-semibold">My Profile</span>
            </Link>
            <button
              onClick={handleLogout}
              className="flex items-center gap-3 rounded-xl border border-error/20 p-3 text-error transition-colors hover:bg-error/5"
            >
              <LuLogOut size={18} />
              <span className="text-sm font-semibold">Log Out</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
