import { useState } from "react";
import { LuEye, LuEyeOff, LuLock } from "react-icons/lu";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({ email: "", password: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-surface text-on-surface font-manrope flex flex-col">
      <main className="relative flex-1 overflow-hidden px-6 py-12 flex items-center justify-center">
        <div className="pointer-events-none absolute top-[-10%] left-[-5%] h-[60%] w-[40%] rounded-full bg-primary/5 blur-[120px]" />
        <div className="pointer-events-none absolute bottom-[-10%] right-[-5%] h-[70%] w-[50%] rounded-full bg-secondary-container/20 blur-[120px]" />

        <div className="relative z-10 w-full max-w-110">
          <div className="mb-10 text-center">
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary shadow-xl pb-1">
              <span className="text-4xl text-on-primary">≋</span>
            </div>
            <h1 className="mb-2 text-3xl font-extrabold tracking-tight text-primary">
              TideWatch
            </h1>
            <p className="text-sm font-medium text-on-surface-variant">
              Fluid Intelligence Systems
            </p>
          </div>

          <div className="rounded-2xl border border-white/60 bg-white/75 p-8 shadow-[0_8px_24px_rgba(23,28,31,0.06)] backdrop-blur-md md:p-10">
            <h2 className="mb-8 text-xl font-bold text-on-surface">
              Welcome back
            </h2>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <label
                  htmlFor="email"
                  className="ml-1 block text-sm font-semibold text-on-surface-variant"
                >
                  Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="someone@example.com"
                  className="w-full rounded-xl border border-transparent bg-surface-container-highest px-4 py-3 text-on-surface placeholder:text-outline focus:border-primary focus:outline-none focus:ring-0"
                />
              </div>

              <div className="space-y-2">
                <div className="ml-1 flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="block text-sm font-semibold text-on-surface-variant"
                  >
                    Password
                  </label>
                  <a
                    href="#"
                    className="text-xs font-bold text-primary hover:underline underline-offset-4 cursor-pointer"
                  >
                    Forgot Password?
                  </a>
                </div>

                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={form.password}
                    onChange={(e) =>
                      setForm({ ...form, password: e.target.value })
                    }
                    placeholder="••••••••"
                    className="w-full rounded-xl border border-transparent bg-surface-container-highest px-4 py-3 pr-12 text-on-surface placeholder:text-outline focus:border-primary focus:outline-none focus:ring-0"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant hover:text-primary cursor-pointer"
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                  >
                    {showPassword ? (
                      <LuEyeOff size={20} />
                    ) : (
                      <LuEye size={20} />
                    )}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className="mt-2 w-full rounded-xl bg-primary py-4 font-bold text-on-primary shadow-lg shadow-primary/10 cursor-pointer transition-all hover:bg-primary/90 active:scale-[0.98]"
              >
                Sign In
              </button>

              <div className="relative py-4">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-outline-variant/20" />
                </div>
                <div className="relative flex justify-center">
                  <span className="bg-white px-4 text-xs font-bold uppercase tracking-widest text-on-surface-variant">
                    Or
                  </span>
                </div>
              </div>

              <button
                type="button"
                className="flex w-full items-center justify-center gap-3 rounded-xl border border-outline-variant/10 bg-surface-container-low py-3.5 font-semibold text-on-surface transition-all hover:bg-surface-container-high cursor-pointer"
              >
                <FcGoogle size={25} />
                Sign in with Google
              </button>
            </form>

            <div className="mt-10 text-center">
              <p className="text-sm font-medium text-on-surface-variant">
                New to TideWatch?{" "}
                <Link
                  to="/signup"
                  className="ml-1 font-bold text-primary hover:underline underline-offset-4"
                >
                  Create an Account
                </Link>
              </p>
            </div>
          </div>

          <div className="mt-8 flex items-center justify-center gap-2 opacity-60">
            <LuLock size={14} />
            <span className="text-xs font-bold uppercase tracking-widest text-neutral">
              End-to-end encrypted telemetry
            </span>
          </div>
        </div>
      </main>
    </div>
  );
}
