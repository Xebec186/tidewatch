import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { LuEye, LuEyeOff, LuLock, LuMail, LuUser } from "react-icons/lu";
import { Link, useNavigate } from "react-router-dom";

export default function Signup() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [role, setRole] = useState("regular");

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-surface text-on-surface font-manrope flex flex-col items-center justify-center px-6 py-12 relative overflow-hidden">
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] h-[40%] w-[40%] rounded-full bg-primary-fixed-dim/20 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] h-[50%] w-[50%] rounded-full bg-tertiary-fixed-dim/10 blur-[150px]" />
      </div>

      <main className="w-full max-w-[480px]">
        <div className="mb-10 text-center">
          <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary shadow-xl">
            <span className="text-3xl text-on-primary">≋</span>
          </div>
          <h1 className="mb-2 text-3xl font-extrabold tracking-tight text-primary">
            TideWatch
          </h1>
          <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-on-surface-variant">
            Fluid Intelligence Systems
          </p>
        </div>

        <section className="rounded-[2rem] bg-surface-container-lowest/90 p-8 shadow-[0_8px_24px_rgba(23,28,31,0.06)] backdrop-blur-xl transition-all duration-300 md:p-10">
          <div className="mb-8">
            <h2 className="mb-2 text-2xl font-bold text-on-surface">
              Create an account
            </h2>
            <p className="text-sm text-on-surface-variant">
              Join TideWatch to monitor tide conditions, receive alerts, and
              keep the system running smoothly.
            </p>
          </div>

          <button
            type="button"
            className="flex w-full cursor-pointer items-center justify-center gap-3 rounded-xl bg-surface-container py-3.5 px-4 text-sm font-semibold text-on-surface transition-all duration-200 hover:bg-surface-container-high active:scale-[0.98]"
          >
            <FcGoogle className="h-5 w-5" />
            Sign up with Google
          </button>

          <div className="relative my-8 flex items-center">
            <div className="flex-grow border-t border-outline-variant/30" />
            <span className="mx-4 text-[10px] font-bold uppercase tracking-[0.2em] text-outline">
              or use email
            </span>
            <div className="flex-grow border-t border-outline-variant/30" />
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label
                htmlFor="fullName"
                className="mb-2 ml-1 block text-xs font-bold uppercase tracking-widest text-on-surface-variant"
              >
                Full Name
              </label>
              <div className="relative">
                <LuUser className="absolute left-4 top-1/2 -translate-y-1/2 text-outline/50" />
                <input
                  id="fullName"
                  type="text"
                  value={form.fullName}
                  onChange={(e) =>
                    setForm({ ...form, fullName: e.target.value })
                  }
                  placeholder="John Doe"
                  className="w-full rounded-xl border-none bg-surface-container-low py-3.5 pl-12 pr-4 text-on-surface placeholder:text-outline/40 focus:ring-2 focus:ring-primary focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="email"
                className="mb-2 ml-1 block text-xs font-bold uppercase tracking-widest text-on-surface-variant"
              >
                Email Address
              </label>
              <div className="relative">
                <LuMail className="absolute left-4 top-1/2 -translate-y-1/2 text-outline/50" />
                <input
                  id="email"
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="name@company.com"
                  className="w-full rounded-xl border-none bg-surface-container-low py-3.5 pl-12 pr-4 text-on-surface placeholder:text-outline/40 focus:ring-2 focus:ring-primary focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="mb-2 ml-1 block text-xs font-bold uppercase tracking-widest text-on-surface-variant">
                User Role
              </label>

              <div className="flex rounded-xl bg-surface-container-low p-1">
                <button
                  type="button"
                  onClick={() => setRole("regular")}
                  className={`cursor-pointer flex-1 rounded-lg px-3 py-2.5 text-xs font-bold transition-all ${
                    role === "regular"
                      ? "bg-surface-container-lowest text-primary shadow-sm"
                      : "text-outline/60 hover:text-on-surface-variant"
                  }`}
                >
                  Regular User
                </button>
                <button
                  type="button"
                  onClick={() => setRole("technical")}
                  className={`cursor-pointer flex-1 rounded-lg px-3 py-2.5 text-xs font-bold transition-all ${
                    role === "technical"
                      ? "bg-surface-container-lowest text-primary shadow-sm"
                      : "text-outline/60 hover:text-on-surface-variant"
                  }`}
                >
                  Technical User
                </button>
              </div>

              <div className="mt-3 rounded-xl border border-outline-variant/30 bg-surface-container-low px-4 py-3 text-sm text-on-surface-variant">
                {role === "regular" ? (
                  <p>
                    Regular users mainly view tide readings, receive alerts, and
                    stay informed about water-level changes.
                  </p>
                ) : (
                  <p>
                    Technical users manage device settings, thresholds,
                    diagnostics, and system monitoring for TideWatch.
                  </p>
                )}
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="mb-2 ml-1 block text-xs font-bold uppercase tracking-widest text-on-surface-variant"
              >
                Password
              </label>
              <div className="relative">
                <LuLock className="absolute left-4 top-1/2 -translate-y-1/2 text-outline/50" />
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={form.password}
                  onChange={(e) =>
                    setForm({ ...form, password: e.target.value })
                  }
                  placeholder="••••••••"
                  className="w-full rounded-xl border-none bg-surface-container-low py-3.5 pl-12 pr-12 text-on-surface placeholder:text-outline/40 focus:ring-2 focus:ring-primary focus:outline-none"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer text-outline/50 transition-colors hover:text-primary"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <LuEyeOff size={18} /> : <LuEye size={18} />}
                </button>
              </div>
            </div>

            <div>
              <label
                htmlFor="confirmPassword"
                className="mb-2 ml-1 block text-xs font-bold uppercase tracking-widest text-on-surface-variant"
              >
                Confirm Password
              </label>
              <div className="relative">
                <LuLock className="absolute left-4 top-1/2 -translate-y-1/2 text-outline/50" />
                <input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  value={form.confirmPassword}
                  onChange={(e) =>
                    setForm({ ...form, confirmPassword: e.target.value })
                  }
                  placeholder="••••••••"
                  className="w-full rounded-xl border-none bg-surface-container-low py-3.5 pl-12 pr-12 text-on-surface placeholder:text-outline/40 focus:ring-2 focus:ring-primary focus:outline-none"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword((prev) => !prev)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer text-outline/50 transition-colors hover:text-primary"
                  aria-label={
                    showConfirmPassword
                      ? "Hide confirm password"
                      : "Show confirm password"
                  }
                >
                  {showConfirmPassword ? (
                    <LuEyeOff size={18} />
                  ) : (
                    <LuEye size={18} />
                  )}
                </button>
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="w-full cursor-pointer rounded-xl bg-primary py-4 font-bold text-on-primary shadow-lg shadow-primary/20 transition-all duration-300 hover:brightness-110 active:scale-[0.99]"
              >
                Create Account
              </button>
            </div>
          </form>

          <p className="mt-8 text-center text-sm font-medium text-on-surface-variant">
            Already have an account?{" "}
            <Link
              to="/login"
              className="ml-1 font-bold text-primary underline-offset-4 hover:underline"
            >
              Log In
            </Link>
          </p>
        </section>

        <footer className="mt-12 text-center">
          <p className="text-[10px] uppercase tracking-[0.2em] text-slate-500">
            © {new Date().getFullYear()} TideWatch IoT. Fluid Intelligence
            Systems.
          </p>
          <div className="mt-4 flex justify-center gap-6">
            <a
              href="#"
              className="text-[10px] uppercase tracking-widest text-slate-400 transition-colors hover:text-primary"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="text-[10px] uppercase tracking-widest text-slate-400 transition-colors hover:text-primary"
            >
              Terms of Service
            </a>
          </div>
        </footer>
      </main>
    </div>
  );
}
