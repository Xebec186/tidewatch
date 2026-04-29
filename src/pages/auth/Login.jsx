import { useState } from "react";
import { LuEye, LuEyeOff, LuMail, LuLock } from "react-icons/lu";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";
import BackgroundGlow from "../../components/BackgroundGlow";
import BrandHeader from "../../components/BrandHeader";
import AuthFooter from "../../components/AuthFooter";

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
        <BackgroundGlow />

        <div className="relative z-10 w-full max-w-110">
          <BrandHeader />
          <div className="rounded-2xl border border-white/60 bg-white/75 p-8 shadow-[0_8px_24px_rgba(23,28,31,0.06)] backdrop-blur-md md:p-10">
            <h2 className="mb-8 text-xl font-bold text-on-surface">
              Welcome back
            </h2>

            <form onSubmit={handleSubmit} className="space-y-5">
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
                    onChange={(e) =>
                      setForm({ ...form, email: e.target.value })
                    }
                    placeholder="someone@example.com"
                    className="w-full rounded-xl border-none bg-surface-container-low py-3.5 pl-12 pr-4 text-on-surface placeholder:text-outline/40 focus:ring-2 focus:ring-primary focus:outline-none"
                  />
                </div>
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
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                  >
                    {showPassword ? (
                      <LuEyeOff size={18} />
                    ) : (
                      <LuEye size={18} />
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

          <AuthFooter />
        </div>
      </main>
    </div>
  );
}
