import { useAuth } from "../context/AuthContext";
import {
  LuBellRing,
  LuChevronRight,
  LuClock3,
  LuCopy,
  LuEye,
  LuGlobe,
  LuLock,
  LuShieldCheck,
  LuCircleUser,
  LuBatteryCharging,
  LuHistory,
  LuKeyRound,
  LuPencil,
} from "react-icons/lu";

function SectionCard({ children, className = "" }) {
  return (
    <section
      className={`rounded-[1.75rem] border border-outline-variant/10 bg-surface-container-lowest p-6 shadow-sm md:p-8 ${className}`}
    >
      {children}
    </section>
  );
}

function ToggleRow({ icon: Icon, title, description, enabled = true }) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-2xl bg-surface-container-low px-4 py-4">
      <div className="flex items-center gap-4">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary-container text-on-primary-container">
          <Icon size={20} />
        </div>
        <div>
          <p className="text-sm font-bold text-on-surface">{title}</p>
          <p className="text-xs text-on-surface-variant">{description}</p>
        </div>
      </div>
      <button
        type="button"
        className={`cursor-pointer rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-[0.22em] transition-colors ${
          enabled
            ? "bg-tertiary-container/20 text-tertiary"
            : "bg-surface-container-high text-on-surface-variant"
        }`}
      >
        {enabled ? "On" : "Off"}
      </button>
    </div>
  );
}

function PasswordRequirement({ text, done = false }) {
  return (
    <li className="flex items-center gap-2 text-xs text-on-surface-variant">
      <span
        className={`inline-flex h-4 w-4 items-center justify-center rounded-full text-[10px] font-black ${
          done
            ? "bg-primary text-on-primary"
            : "bg-surface-container-high text-on-surface-variant"
        }`}
      >
        {done ? "✓" : "•"}
      </span>
      {text}
    </li>
  );
}

export default function ProfilePage() {
  const { user } = useAuth();
  return (
    <div className="min-h-screen bg-surface text-on-surface font-manrope selection:bg-primary-container selection:text-on-primary-container">
      <main className="mx-auto max-w-7xl px-6 py-8 md:py-10">
        <header className="mb-10">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-secondary-container px-3 py-1 text-[10px] font-bold uppercase tracking-[0.22em] text-on-secondary-fixed-variant">
            <span className="h-2 w-2 rounded-full bg-primary" />
            Account profile
          </div>
          <h1 className="text-4xl font-black tracking-tight text-primary md:text-6xl">
            Manage your TideWatch account.
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-on-surface-variant md:text-lg">
            Keep your profile, access level, alert preferences, and security
            settings aligned with your TideWatch role.
          </p>
        </header>

        <div className="grid items-start gap-8 lg:grid-cols-12">
          <div className="space-y-8 lg:col-span-5">
            <SectionCard>
              <div className="flex flex-col gap-6">
                <div className="flex items-start gap-4">
                  <div className="relative">
                    <div className="flex h-28 w-28 items-center justify-center rounded-2xl border-4 border-surface-container-lowest bg-surface-container-low text-primary shadow-lg">
                      <LuCircleUser size={72} />
                    </div>
                    <button
                      type="button"
                      className="absolute -bottom-2 -right-2 cursor-pointer rounded-xl bg-primary p-2 text-on-primary shadow-md transition-transform hover:scale-105"
                      aria-label="Edit avatar"
                    >
                      <LuPencil size={14} />
                    </button>
                  </div>

                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h2 className="text-3xl font-bold tracking-tight text-primary">
                        {user?.displayName || "TideWatch User"}
                      </h2>
                      <span className="rounded-full bg-tertiary-container/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.22em] text-primary">
                        {user?.role ? user.role.charAt(0).toUpperCase() + user.role.slice(1) : "User"} Role
                      </span>
                    </div>
                    <p className="mt-2 text-sm text-on-surface-variant">
                      {user?.email}
                    </p>
                  </div>
                </div>

                <div className="rounded-2xl border border-outline-variant/10 bg-surface-container-low p-5">
                  <div className="mb-3 flex items-center justify-between">
                    <h3 className="text-xs font-bold uppercase tracking-[0.22em] text-on-surface-variant">
                      Bio
                    </h3>
                    <LuCopy className="text-on-surface-variant" size={16} />
                  </div>
                  <p className="text-sm leading-relaxed text-on-surface">
                    Technical user for TideWatch operations. View live tide
                    telemetry, monitor device diagnostics, check battery health,
                    and support station stability.
                  </p>
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  <button
                    type="button"
                    className="cursor-pointer rounded-xl bg-primary px-5 py-3.5 text-sm font-bold text-on-primary transition-all hover:bg-primary-container active:scale-[0.98]"
                  >
                    Update Profile
                  </button>
                  <button
                    type="button"
                    className="cursor-pointer rounded-xl border border-outline-variant px-5 py-3.5 text-sm font-bold text-primary transition-colors hover:bg-surface-container-high"
                  >
                    Share
                  </button>
                </div>
              </div>
            </SectionCard>

            <SectionCard>
              <div className="mb-6 flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-container text-on-primary-container">
                  <LuShieldCheck size={20} />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-primary">
                    Account access
                  </h2>
                  <p className="text-sm text-on-surface-variant">
                    Role and access summary for this TideWatch account.
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between rounded-2xl bg-surface-container-low px-4 py-4">
                  <div className="flex items-center gap-4">
                    <LuEye className="text-primary" size={18} />
                    <div>
                      <p className="text-sm font-bold text-on-surface">
                        View tide data
                      </p>
                      <p className="text-xs text-on-surface-variant">
                        All users can inspect basic readings
                      </p>
                    </div>
                  </div>
                  <span className="text-xs font-bold uppercase tracking-[0.22em] text-primary">
                    Allowed
                  </span>
                </div>

                <div className="flex items-center justify-between rounded-2xl bg-surface-container-low px-4 py-4">
                  <div className="flex items-center gap-4">
                    <LuBatteryCharging className="text-primary" size={18} />
                    <div>
                      <p className="text-sm font-bold text-on-surface">
                        Battery level
                      </p>
                      <p className="text-xs text-on-surface-variant">
                        Visible to technical users and admins
                      </p>
                    </div>
                  </div>
                  <span className="text-xs font-bold uppercase tracking-[0.22em] text-primary">
                    Allowed
                  </span>
                </div>

                <div className="flex items-center justify-between rounded-2xl bg-surface-container-low px-4 py-4">
                  <div className="flex items-center gap-4">
                    <LuLock className="text-primary" size={18} />
                    <div>
                      <p className="text-sm font-bold text-on-surface">
                        Threshold settings
                      </p>
                      <p className="text-xs text-on-surface-variant">
                        Admin-only system configuration
                      </p>
                    </div>
                  </div>
                  <span className="text-xs font-bold uppercase tracking-[0.22em] text-on-surface-variant">
                    Restricted
                  </span>
                </div>
              </div>
            </SectionCard>
          </div>

          <div className="space-y-8 lg:col-span-7">
            <SectionCard>
              <div className="mb-8 flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-container text-on-primary-container">
                  <LuKeyRound size={20} />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-primary">
                    Account security
                  </h2>
                  <p className="text-sm text-on-surface-variant">
                    Update your password and keep the TideWatch account
                    protected.
                  </p>
                </div>
              </div>

              <form className="space-y-6">
                <div className="space-y-2">
                  <label className="ml-1 text-xs font-bold uppercase tracking-widest text-on-surface-variant">
                    Current Password
                  </label>
                  <input
                    type="password"
                    placeholder="••••••••••••"
                    className="w-full rounded-xl border-none bg-surface-container-highest px-6 py-4 text-on-surface placeholder:text-outline-variant focus:ring-2 focus:ring-primary/20 focus:outline-none"
                  />
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                  <div className="space-y-2">
                    <label className="ml-1 text-xs font-bold uppercase tracking-widest text-on-surface-variant">
                      New Password
                    </label>
                    <input
                      type="password"
                      placeholder="Min. 12 characters"
                      className="w-full rounded-xl border-none bg-surface-container-highest px-6 py-4 text-on-surface placeholder:text-outline-variant focus:ring-2 focus:ring-primary/20 focus:outline-none"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="ml-1 text-xs font-bold uppercase tracking-widest text-on-surface-variant">
                      Confirm New Password
                    </label>
                    <input
                      type="password"
                      placeholder="Confirm password"
                      className="w-full rounded-xl border-none bg-surface-container-highest px-6 py-4 text-on-surface placeholder:text-outline-variant focus:ring-2 focus:ring-primary/20 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="rounded-2xl border border-outline-variant/10 bg-surface-container-highest/50 p-6">
                  <h3 className="mb-3 text-sm font-bold text-primary">
                    Security requirements
                  </h3>
                  <ul className="space-y-2">
                    <PasswordRequirement text="Minimum 12 characters" done />
                    <PasswordRequirement
                      text="One special character (!@#$%^&*)"
                      done
                    />
                    <PasswordRequirement text="At least one uppercase letter" />
                  </ul>
                </div>

                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="cursor-pointer rounded-xl bg-primary px-10 py-4 font-bold text-on-primary shadow-lg shadow-primary/10 transition-all hover:-translate-y-0.5 hover:bg-primary-container active:scale-[0.98]"
                  >
                    Change Password
                  </button>
                </div>
              </form>
            </SectionCard>

            <div className="grid gap-6 md:grid-cols-2">
              <SectionCard>
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary-container text-on-primary-container">
                  <LuBellRing size={20} />
                </div>
                <h3 className="text-xl font-bold text-primary">Tide alerts</h3>
                <p className="mt-2 text-sm leading-relaxed text-on-surface-variant">
                  Get notified when tide levels approach warning or danger
                  thresholds.
                </p>
                <div className="mt-6 space-y-4">
                  <ToggleRow
                    icon={LuBellRing}
                    title="Alert notifications"
                    description="Push notifications for tide warnings"
                    enabled
                  />
                  <ToggleRow
                    icon={LuGlobe}
                    title="Metric units"
                    description="Meters, centimeters, and Celsius"
                    enabled
                  />
                </div>
              </SectionCard>

              <SectionCard>
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary-container text-on-primary-container">
                  <LuHistory size={20} />
                </div>
                <h3 className="text-xl font-bold text-primary">
                  Activity and sessions
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-on-surface-variant">
                  Review recent access and keep track of account activity.
                </p>
                <div className="mt-6 space-y-4">
                  <div className="flex items-center justify-between rounded-2xl bg-surface-container-low px-4 py-4">
                    <div>
                      <p className="text-sm font-bold text-on-surface">
                        Login history
                      </p>
                      <p className="text-xs text-on-surface-variant">
                        Monitor recent sign-ins
                      </p>
                    </div>
                    <button
                      type="button"
                      className="cursor-pointer text-primary"
                    >
                      <LuChevronRight size={18} />
                    </button>
                  </div>

                  <div className="flex items-center justify-between rounded-2xl bg-surface-container-low px-4 py-4">
                    <div>
                      <p className="text-sm font-bold text-on-surface">
                        Current session
                      </p>
                      <p className="text-xs text-on-surface-variant">
                        Desktop browser, Accra
                      </p>
                    </div>
                    <span className="rounded-full bg-tertiary-container/20 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.22em] text-tertiary">
                      Active
                    </span>
                  </div>
                </div>
              </SectionCard>
            </div>

            <SectionCard>
              <div className="mb-6 flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-container text-on-primary-container">
                  <LuClock3 size={20} />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-primary">
                    Profile notes
                  </h2>
                  <p className="text-sm text-on-surface-variant">
                    Useful system information tied to this TideWatch account.
                  </p>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-3">
                <div className="rounded-2xl bg-surface-container-low p-4">
                  <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-on-surface-variant">
                    Access level
                  </p>
                  <p className="mt-2 text-sm font-bold text-primary">
                    Technical
                  </p>
                </div>
                <div className="rounded-2xl bg-surface-container-low p-4">
                  <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-on-surface-variant">
                    Default unit system
                  </p>
                  <p className="mt-2 text-sm font-bold text-primary">Metric</p>
                </div>
                <div className="rounded-2xl bg-surface-container-low p-4">
                  <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-on-surface-variant">
                    Station access
                  </p>
                  <p className="mt-2 text-sm font-bold text-primary">
                    Harbor Gate
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
