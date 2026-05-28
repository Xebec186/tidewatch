import { Link, useNavigate } from "react-router-dom";
import { LuWaves, LuBellRing, LuCircleUser, LuLogOut } from "react-icons/lu";
import { useAuth } from "../context/AuthContext";

export default function RegularDashboardNavbar({ onNotificationToggle }) {
  const { logout } = useAuth();
  const navigate = useNavigate();

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
  };

  return (
    <header className="sticky top-0 z-40 border-b border-outline-variant/20 bg-surface/85 backdrop-blur-md">
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
      </div>
    </header>
  );
}
