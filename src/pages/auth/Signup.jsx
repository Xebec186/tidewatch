import { useState } from "react";
import { LuEye, LuEyeOff, LuLock, LuMail, LuUser } from "react-icons/lu";
import { Link, useNavigate } from "react-router-dom";
import BackgroundGlow from "../../components/BackgroundGlow";
import BrandHeader from "../../components/BrandHeader";
import AuthFooter from "../../components/AuthFooter";
import { useAuth } from "../../context/AuthContext";

export default function Signup() {
  const navigate = useNavigate();
  const { signup } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      return setError("Passwords do not match");
    }

    setError("");
    setLoading(true);
    try {
      await signup(form.email, form.password, {
        fullName: form.fullName,
      });
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      setError("Failed to create an account. " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-surface text-on-surface font-manrope flex flex-col items-center justify-center md:px-6 py-12 relative overflow-hidden">
      <BackgroundGlow />

      <main className="w-full max-w-full md:max-w-120">
        <BrandHeader />

        <section className="rounded-4xl bg-surface-container-lowest/90 p-8 shadow-[0_8px_24px_rgba(23,28,31,0.06)] backdrop-blur-xl transition-all duration-300 md:p-10">
          <div className="mb-8">
            <h2 className="mb-2 text-xl md:text-2xl font-bold text-on-surface">
              Create an account
            </h2>
            <p className="text-sm text-on-surface-variant">
              Join TideWatch to monitor tide conditions and receive real-time updates.
            </p>
          </div>

          {error && (
            <div className="mb-6 rounded-lg bg-error-container p-4 text-sm text-on-error-container">
              {error}
            </div>
          )}

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
                  required
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
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="someone@example.com"
                  className="w-full rounded-xl border-none bg-surface-container-low py-3.5 pl-12 pr-4 text-on-surface placeholder:text-outline/40 focus:ring-2 focus:ring-primary focus:outline-none"
                />
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
                  required
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
                disabled={loading}
                className="w-full cursor-pointer rounded-xl bg-primary py-4 font-bold text-on-primary shadow-lg shadow-primary/20 transition-all duration-300 hover:brightness-110 active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Creating Account..." : "Create Account"}
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
        <AuthFooter />
      </main>
    </div>
  );
}
