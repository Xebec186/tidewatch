import { Link } from "react-router-dom";
import { LuWaves, LuBellRing, LuMenu } from "react-icons/lu";

export default function TechnicalDashboardNavbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-outline-variant/20 bg-surface/85 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link to="/technical-dashboard" className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-on-primary shadow-lg shadow-primary/10">
            <LuWaves size={20} />
          </div>
          <div>
            <p className="text-lg font-extrabold tracking-tight text-primary">
              TideWatch
            </p>
            <p className="text-[10px] uppercase tracking-[0.22em] text-on-surface-variant">
              Technical View
            </p>
          </div>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          <a href="#analytics" className="text-sm font-medium text-primary">
            Analytics
          </a>
          <a
            href="#logs"
            className="text-sm font-medium text-on-surface-variant transition-colors hover:text-primary"
          >
            Logs
          </a>
          <a
            href="#history"
            className="text-sm font-medium text-on-surface-variant transition-colors hover:text-primary"
          >
            History
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
            type="button"
            className="inline-flex cursor-pointer items-center justify-center rounded-xl p-2 text-on-surface-variant transition-colors hover:bg-surface-container-low hover:text-primary"
            aria-label="Notifications"
          >
            <LuBellRing size={20} />
          </button>
          <button
            type="button"
            className="inline-flex cursor-pointer items-center justify-center rounded-xl p-2 text-on-surface-variant transition-colors hover:bg-surface-container-low hover:text-primary md:hidden"
            aria-label="Menu"
          >
            <LuMenu size={20} />
          </button>
        </div>
      </div>
    </header>
  );
}
