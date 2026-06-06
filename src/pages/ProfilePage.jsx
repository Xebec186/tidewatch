import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import {
  LuBellRing,
  LuCircleUser,
  LuKeyRound,
  LuEye,
  LuEyeOff,
  LuCircleCheck,
  LuTrash2,
  LuTriangleAlert,
} from "react-icons/lu";
import SectionCard from "../components/SectionCard";

export default function ProfilePage() {
  const { user, updateUserProfile, updateUserPassword, deleteUserAccount } =
    useAuth();
  const navigate = useNavigate();

  // Initialize state directly from user to avoid effect sync issues
  const [fullName, setFullName] = useState(
    user?.displayName || user?.fullName || "",
  );
  const [alertsEnabled, setAlertsEnabled] = useState(
    user?.alertsEnabled === true,
  );

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [deletePass, setDeletePass] = useState("");
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({ type: "", message: "" });

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: "", message: "" });
    try {
      await updateUserProfile({ fullName, alertsEnabled });
      setStatus({ type: "success", message: "Profile updated successfully!" });
    } catch (error) {
      setStatus({ type: "error", message: error.message });
    } finally {
      setLoading(false);
    }
  };

  const handleUpdatePassword = async (e) => {
    e.preventDefault();
    if (!oldPassword)
      return setStatus({ type: "error", message: "Current password required" });
    if (newPassword !== confirmPassword) {
      return setStatus({
        type: "error",
        message: "New passwords do not match",
      });
    }

    setLoading(true);
    setStatus({ type: "", message: "" });
    try {
      await updateUserPassword(oldPassword, newPassword);
      setStatus({ type: "success", message: "Password updated successfully!" });
      setOldPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (error) {
      setStatus({
        type: "error",
        message: "Authentication failed. " + error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteAccount = async (e) => {
    e.preventDefault();
    if (!deletePass) return;

    setLoading(true);
    try {
      await deleteUserAccount(deletePass);
      navigate("/");
    } catch (error) {
      setStatus({
        type: "error",
        message: "Account deletion failed. " + error.message,
      });
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-surface text-on-surface font-manrope selection:bg-primary-container selection:text-on-primary-container">
      <main className="mx-auto max-w-7xl px-6 py-8 md:py-10">
        <header className="mb-10 text-center md:text-left">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-secondary-container px-3 py-1 text-[10px] font-bold uppercase tracking-[0.22em] text-on-secondary-fixed-variant">
            <span className="h-2 w-2 rounded-full bg-primary" />
            Account settings
          </div>
          <h1 className="text-3xl font-black tracking-tight text-primary sm:text-4xl md:text-6xl">
            My Account
          </h1>
        </header>

        {status.message && (
          <div
            className={`mb-8 flex items-center gap-3 rounded-2xl p-4 ${status.type === "success" ? "bg-emerald-50 text-emerald-700 border border-emerald-100" : "bg-error-container text-on-error-container"}`}
          >
            {status.type === "success" && <LuCircleCheck size={20} />}
            <p className="text-sm font-bold">{status.message}</p>
          </div>
        )}

        <div className="grid items-start gap-8 lg:grid-cols-12">
          {/* LEFT COLUMN: Identity & Preferences */}
          <div className="space-y-8 lg:col-span-5">
            <SectionCard>
              <form onSubmit={handleUpdateProfile} className="space-y-6">
                <div className="flex flex-col items-center gap-6 md:flex-row">
                  <div className="relative">
                    <div className="flex h-24 w-24 items-center justify-center rounded-2xl border-4 border-surface-container-lowest bg-surface-container-low text-primary shadow-lg">
                      <LuCircleUser size={64} />
                    </div>
                  </div>
                  <div className="flex-1 text-center md:text-left">
                    <p className="text-xs font-bold uppercase tracking-widest text-on-surface-variant">
                      Registered Email
                    </p>
                    <p className="mt-1 font-bold text-primary">{user?.email}</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="mb-2 ml-1 block text-xs font-bold uppercase tracking-widest text-on-surface-variant">
                      Full Name
                    </label>
                    <input
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full rounded-xl border-none bg-surface-container-low px-5 py-3.5 text-on-surface focus:ring-2 focus:ring-primary/20 focus:outline-none"
                    />
                  </div>

                  <div className="rounded-2xl bg-surface-container-low p-5">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-container text-on-primary-container">
                          <LuBellRing size={18} />
                        </div>
                        <div>
                          <p className="text-sm font-bold text-on-surface">
                            Tide Alerts
                          </p>
                          <p className="text-xs text-on-surface-variant">
                            Enable push notifications
                          </p>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => setAlertsEnabled(!alertsEnabled)}
                        className={`cursor-pointer rounded-full px-4 py-1.5 text-[10px] font-black uppercase tracking-widest transition-all ${
                          alertsEnabled
                            ? "bg-emerald-500 text-white shadow-lg shadow-emerald-500/20"
                            : "bg-surface-container-high text-on-surface-variant"
                        }`}
                      >
                        {alertsEnabled ? "Enabled" : "Disabled"}
                      </button>
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full cursor-pointer rounded-xl bg-primary py-4 text-sm font-bold text-on-primary shadow-lg shadow-primary/10 transition-all hover:brightness-110 active:scale-[0.98] disabled:opacity-50"
                >
                  {loading ? "Saving Changes..." : "Save Profile"}
                </button>
              </form>
            </SectionCard>

            <SectionCard className="border-error/10 bg-error-container/5">
              <div className="flex items-center gap-3 text-error mb-4">
                <LuTrash2 size={20} />
                <h3 className="font-bold">Danger Zone</h3>
              </div>
              <p className="text-xs text-on-surface-variant mb-6">
                Once you delete your account, there is no going back. Please be
                certain.
              </p>

              {!showDeleteConfirm ? (
                <button
                  onClick={() => setShowDeleteConfirm(true)}
                  className="w-full rounded-xl border border-error/20 py-3 text-sm font-bold text-error hover:bg-error/5 transition-colors cursor-pointer"
                >
                  Delete Account
                </button>
              ) : (
                <form onSubmit={handleDeleteAccount} className="space-y-4">
                  <p className="text-[10px] font-bold uppercase text-error">
                    Enter your password to confirm
                  </p>
                  <input
                    type="password"
                    required
                    value={deletePass}
                    onChange={(e) => setDeletePass(e.target.value)}
                    placeholder="Verify password"
                    className="w-full rounded-xl border border-error/20 bg-surface px-4 py-3 text-sm focus:ring-1 focus:ring-error focus:outline-none"
                  />
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => setShowDeleteConfirm(false)}
                      className="flex-1 rounded-xl bg-surface-container-low py-3 text-xs font-bold uppercase"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={loading || !deletePass}
                      className="flex-1 rounded-xl bg-error py-3 text-xs font-bold uppercase text-white shadow-lg shadow-error/20"
                    >
                      {loading ? "Deleting..." : "Confirm Delete"}
                    </button>
                  </div>
                </form>
              )}
            </SectionCard>
          </div>

          {/* RIGHT COLUMN: Security */}
          <div className="space-y-8 lg:col-span-7">
            <SectionCard>
              <div className="mb-8 flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-container text-on-primary-container">
                  <LuKeyRound size={22} />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-primary">
                    Update Password
                  </h2>
                  <p className="text-sm text-on-surface-variant">
                    Change your login credentials securely.
                  </p>
                </div>
              </div>

              <form onSubmit={handleUpdatePassword} className="space-y-6">
                <div className="space-y-2">
                  <label className="ml-1 text-xs font-bold uppercase tracking-widest text-on-surface-variant">
                    Current Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPass ? "text" : "password"}
                      value={oldPassword}
                      onChange={(e) => setOldPassword(e.target.value)}
                      placeholder="Required for security"
                      className="w-full rounded-xl border-none bg-surface-container-low px-5 py-4 text-on-surface focus:ring-2 focus:ring-primary/20 focus:outline-none"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPass(!showPass)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-on-surface-variant hover:text-primary transition-colors"
                    >
                      {showPass ? <LuEyeOff size={18} /> : <LuEye size={18} />}
                    </button>
                  </div>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                  <div className="space-y-2">
                    <label className="ml-1 text-xs font-bold uppercase tracking-widest text-on-surface-variant">
                      New Password
                    </label>
                    <input
                      type={showPass ? "text" : "password"}
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="Min. 6 characters"
                      className="w-full rounded-xl border-none bg-surface-container-low px-5 py-4 text-on-surface focus:ring-2 focus:ring-primary/20 focus:outline-none"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="ml-1 text-xs font-bold uppercase tracking-widest text-on-surface-variant">
                      Confirm New Password
                    </label>
                    <input
                      type={showPass ? "text" : "password"}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Repeat new password"
                      className="w-full rounded-xl border-none bg-surface-container-low px-5 py-4 text-on-surface focus:ring-2 focus:ring-primary/20 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="flex justify-end">
                  <button
                    type="submit"
                    disabled={loading || !newPassword || !oldPassword}
                    className="w-full sm:w-auto cursor-pointer rounded-xl bg-primary px-10 py-4 text-sm font-bold text-on-primary shadow-lg shadow-primary/10 transition-all hover:brightness-110 active:scale-[0.98] disabled:opacity-50"
                  >
                    Update Password
                  </button>
                </div>
              </form>
            </SectionCard>

            <SectionCard>
              <div className="flex items-start gap-4">
                <div className="mt-1 flex h-10 w-10 items-center justify-center rounded-xl bg-amber-50 text-amber-600">
                  <LuTriangleAlert size={20} />
                </div>
                <div>
                  <h3 className="font-bold text-on-surface">Security Note</h3>
                  <p className="mt-2 text-sm leading-relaxed text-on-surface-variant">
                    Updating your password or deleting your account requires
                    your current password to ensure your data remains protected.
                  </p>
                </div>
              </div>
            </SectionCard>
          </div>
        </div>
      </main>
    </div>
  );
}
