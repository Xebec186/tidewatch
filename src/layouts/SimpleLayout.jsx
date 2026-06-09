import { Outlet, Link } from "react-router-dom";
import { MdWaves, MdArrowBack } from "react-icons/md";
import { useAuth } from "../context/AuthContext";
import Footer from "../components/Footer";

export default function SimpleLayout() {
  const { user } = useAuth();
  const backDestination = user ? "/dashboard" : "/";
  const backLabel = user ? "Back to Dashboard" : "Back to Home";

  return (
    <div className="min-h-screen flex flex-col bg-surface text-on-surface font-manrope">
      <header className="w-full border-b border-black/5 bg-surface/80 backdrop-blur-md sticky top-0 z-50">
        <div className="mx-auto max-w-7xl px-6 h-16 flex items-center justify-between">
          <Link to={backDestination} className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary text-on-primary shadow-lg shadow-primary/10">
              <MdWaves size={20} />
            </div>
            <div className="min-w-0">
              <p className="text-lg font-extrabold tracking-tight text-primary leading-tight">
                TideWatch
              </p>
              <p className="hidden xs:block text-[10px] uppercase tracking-[0.24em] text-on-surface-variant truncate">
                Fluid Intelligence Systems
              </p>
            </div>
          </Link>
          <Link
            to={backDestination}
            className="text-sm font-bold text-on-surface-variant hover:text-primary transition-colors flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-surface-container-low"
          >
            <MdArrowBack size={20} className="shrink-0" />
            <span className="hidden sm:inline whitespace-nowrap">{backLabel}</span>
            <span className="sm:hidden whitespace-nowrap">Back</span>
          </Link>
        </div>
      </header>
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
