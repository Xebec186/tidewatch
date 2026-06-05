import { useState } from "react";
import { LuEye, LuEyeOff, LuMail, LuLock } from "react-icons/lu";
import { Link, useNavigate } from "react-router-dom";
import BackgroundGlow from "../../components/BackgroundGlow";
import BrandHeader from "../../components/BrandHeader";
import AuthFooter from "../../components/AuthFooter";
import { useAuth } from "../../context/AuthContext";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await login(form.email, form.password);
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      setError("Failed to sign in. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-surface text-on-surface font-manrope flex flex-col">
      <main className="relative flex-1 overflow-hidden md:px-6 py-12 flex items-center justify-center">
        <BackgroundGlow />

        <div className="relative z-10 w-full max-w-110">
          <BrandHeader />
          <div className="rounded-4xl border border-white/60 bg-white/75 px-5 py-8 shadow-[0_8px_24px_rgba(23,28,31,0.06)] backdrop-blur-md md:p-10">
            <h2 className="mb-8 text-xl font-bold text-on-surface">
              Welcome back
            </h2>

            {error && (
              <div className="mb-6 rounded-lg bg-error-container p-4 text-sm text-on-error-container">
                {error}
              </div>
            )}

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
                    required
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
                </div>

                <div className="relative">
                  <LuLock className="absolute left-4 top-1/2 -translate-y-1/2 text-outline/50" />
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    required
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
                disabled={loading}
                className="mt-2 w-full rounded-xl bg-primary py-4 font-bold text-on-primary shadow-lg shadow-primary/10 cursor-pointer transition-all hover:bg-primary/90 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Signing In..." : "Sign In"}
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
