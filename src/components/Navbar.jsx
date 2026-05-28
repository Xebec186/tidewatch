import { Link } from "react-router-dom";
import { LuArrowRight, LuMenu, LuLayoutDashboard } from "react-icons/lu";
import { MdWaves } from "react-icons/md";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user } = useAuth();
  return (
    <header className="sticky top-0 z-50 border-b border-outline-variant/20 bg-surface/85 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link to="/" className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-on-primary shadow-lg shadow-primary/10">
            <MdWaves size={20} />
          </div>
          <div>
            <p className="text-lg font-extrabold tracking-tight text-primary">
              TideWatch
            </p>
            <p className="text-[10px] uppercase tracking-[0.24em] text-on-surface-variant">
              Fluid Intelligence Systems
            </p>
          </div>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          <a
            href="#features"
            className="text-sm font-medium text-on-surface-variant transition-colors hover:text-primary"
          >
            Features
          </a>
          <a
            href="#audience"
            className="text-sm font-medium text-on-surface-variant transition-colors hover:text-primary"
          >
            Users
          </a>
          <a
            href="#cta"
            className="text-sm font-medium text-on-surface-variant transition-colors hover:text-primary"
          >
            Get Started
          </a>
        </nav>

        <div className="flex items-center gap-3">
          {user ? (
            <Link
              to="/dashboard"
              className="inline-flex cursor-pointer items-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-bold text-on-primary shadow-lg shadow-primary/10 transition-all hover:bg-primary-container active:scale-[0.98]"
            >
              Dashboard
              <LuLayoutDashboard size={16} />
            </Link>
          ) : (
            <>
              <Link
                to="/login"
                className="hidden rounded-xl px-4 py-2 text-sm font-semibold text-on-surface-variant transition-colors hover:text-primary sm:inline-flex"
              >
                Log In
              </Link>
              <Link
                to="/signup"
                className="inline-flex cursor-pointer items-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-bold text-on-primary shadow-lg shadow-primary/10 transition-all hover:bg-primary-container active:scale-[0.98]"
              >
                Sign Up
                <LuArrowRight size={16} />
              </Link>
            </>
          )}
          <button
            type="button"
            className="inline-flex cursor-pointer items-center justify-center rounded-xl p-2 text-on-surface-variant transition-colors hover:bg-surface-container-low hover:text-primary md:hidden"
            aria-label="Open menu"
          >
            <LuMenu size={22} />
          </button>
        </div>
      </div>
    </header>
  );
}
