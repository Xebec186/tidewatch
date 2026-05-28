import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LuWaves, LuBellRing, LuCircleUser, LuLogOut, LuMenu, LuX } from "react-icons/lu";
import { useAuth } from "../context/AuthContext";

export default function RegularDashboardNavbar({ onNotificationToggle }) {
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

  return (
    <header className={`sticky top-0 z-40 border-b border-outline-variant/20 transition-colors duration-300 ${
      isMenuOpen ? "bg-surface" : "bg-surface/85 backdrop-blur-md"
    }`}>
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
              Regular View
            </p>
          </div>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          <a href="/dashboard#overview" className="text-sm font-medium text-primary">
            Overview
          </a>
          <a
            href="/dashboard#charts"
            className="text-sm font-medium text-on-surface-variant transition-colors hover:text-primary"
          >
            Charts
          </a>
          <a
            href="/dashboard#alerts"
            className="text-sm font-medium text-on-surface-variant transition-colors hover:text-primary"
          >
            Alerts
          </a>
        </nav>

        <div className="flex items-center gap-3">
          <div className="hidden items-center gap-2 rounded-full bg-tertiary-container/10 px-3 py-1.5 text-primary md:flex">
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-primary" />
            </span>
            <span className="text-[10px] font-bold uppercase tracking-[0.24em]">
              Live
            </span>
          </div>
          
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
        className={`fixed inset-x-0 top-[73px] bottom-0 z-40 bg-surface shadow-2xl transition-all duration-300 md:hidden ${
          isMenuOpen 
            ? "translate-y-0 opacity-100" 
            : "-translate-y-4 opacity-0 pointer-events-none"
        }`}
      >
        <div className="flex flex-col gap-4 p-6">
          <div className="flex items-center gap-2 rounded-full bg-tertiary-container/10 px-3 py-1.5 text-primary self-start">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
            </span>
            <span className="text-[10px] font-bold uppercase tracking-[0.24em]">
              Live Status
            </span>
          </div>

          <nav className="flex flex-col gap-4">
            <a
              href="/dashboard#overview"
              onClick={() => setIsMenuOpen(false)}
              className="text-base font-semibold text-primary transition-colors"
            >
              Overview
            </a>
            <a
              href="/dashboard#charts"
              onClick={() => setIsMenuOpen(false)}
              className="text-base font-semibold text-on-surface-variant transition-colors hover:text-primary"
            >
              Charts
            </a>
            <a
              href="/dashboard#alerts"
              onClick={() => setIsMenuOpen(false)}
              className="text-base font-semibold text-on-surface-variant transition-colors hover:text-primary"
            >
              Alerts
            </a>
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
