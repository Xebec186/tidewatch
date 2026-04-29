import { Link } from "react-router-dom";
import {
  LuArrowRight,
  LuBellRing,
  LuShieldCheck,
  LuWifi,
  LuGauge,
  LuMenu,
  LuBadgeInfo,
} from "react-icons/lu";
import { FiBarChart } from "react-icons/fi";
import { SiArduino } from "react-icons/si";
import { MdWaves } from "react-icons/md";

const stats = [
  { value: "24/7", label: "monitoring" },
  { value: "Real-time", label: "alerts" },
  { value: "Low-cost", label: "deployment" },
  { value: "IoT-ready", label: "architecture" },
];

const features = [
  {
    icon: LuBellRing,
    title: "Instant alerts",
    description:
      "Receive threshold-based warnings through connected notifications when tide levels become unsafe.",
  },
  {
    icon: FiBarChart,
    title: "Live readings",
    description:
      "Track tide measurements, patterns, and system status in a clean dashboard built for clarity.",
  },
  {
    icon: LuShieldCheck,
    title: "Reliable monitoring",
    description:
      "Designed for coastal safety, education, and small-scale deployments where affordable monitoring matters.",
  },
  {
    icon: LuWifi,
    title: "Connected system",
    description:
      "The proposal supports Wi-Fi and alert delivery so data can reach the right people quickly.",
  },
  {
    icon: LuGauge,
    title: "Threshold control",
    description:
      "Technical users can manage alert limits, device settings, and operational checks from the system.",
  },
  {
    icon: SiArduino,
    title: "Sensor-driven",
    description:
      "Built around an Arduino-based tide gauge concept using accessible components and practical deployment.",
  },
];

const audience = [
  {
    title: "Regular users",
    text: "People who simply need to view tide status, understand alerts, and stay informed without changing system settings.",
  },
  {
    title: "Technical users",
    text: "Operators, admins, or engineers who configure sensors, monitor device health, review data, and manage thresholds.",
  },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-surface text-on-surface font-manrope selection:bg-primary-container selection:text-on-primary-container">
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

      <main className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_2px_2px,rgba(0,68,81,0.05)_1px,transparent_0)] [background-size:40px_40px] opacity-60" />
        <div className="pointer-events-none absolute -top-24 -right-24 h-96 w-96 rounded-full bg-primary/5 blur-3xl" />
        <div className="pointer-events-none absolute top-1/2 -left-48 h-96 w-96 rounded-full bg-tertiary/5 blur-3xl" />

        <section className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-14 px-6 pb-24 pt-20 lg:grid-cols-12 lg:pt-24">
          <div className="lg:col-span-7">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-secondary-container px-3 py-1 text-[10px] font-bold uppercase tracking-[0.22em] text-on-secondary-fixed-variant">
              <span className="h-2 w-2 rounded-full bg-primary" />
              System status: active
            </div>

            <h1 className="max-w-3xl text-5xl font-extrabold tracking-tight text-primary md:text-6xl lg:text-7xl">
              Tide monitoring that stays clear, connected, and ready.
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-on-surface-variant md:text-xl">
              TideWatch is a low-cost tide gauge system built to measure water
              levels, support alert delivery, and help communities, schools, and
              technical teams respond faster to changing coastal conditions.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                to="/signup"
                className="inline-flex cursor-pointer items-center gap-2 rounded-xl bg-primary px-7 py-4 text-base font-bold text-on-primary shadow-xl shadow-primary/10 transition-all hover:bg-primary-container active:scale-[0.98]"
              >
                Get Started
                <LuArrowRight size={18} />
              </Link>
              <Link
                to="/login"
                className="inline-flex cursor-pointer items-center rounded-xl bg-secondary-container px-7 py-4 text-base font-bold text-primary transition-colors hover:bg-surface-container-highest"
              >
                Sign In
              </Link>
            </div>

            <div className="mt-14 grid grid-cols-2 gap-4 sm:grid-cols-4">
              {stats.map((item) => (
                <div
                  key={item.label}
                  className="rounded-2xl border border-outline-variant/10 bg-surface-container-lowest p-4 shadow-sm"
                >
                  <p className="text-2xl font-black text-primary">
                    {item.value}
                  </p>
                  <p className="mt-1 text-[10px] font-bold uppercase tracking-[0.22em] text-on-surface-variant">
                    {item.label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2 rounded-[1.75rem] border border-outline-variant/10 bg-surface-container-lowest p-6 shadow-sm">
                <div className="mb-8 flex items-start justify-between gap-4">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.22em] text-on-surface-variant">
                      Current tide level
                    </p>
                    <div className="mt-2 flex items-end gap-2">
                      <span className="text-5xl font-black tracking-tight text-primary">
                        2.84
                      </span>
                      <span className="pb-1 text-xl font-bold text-on-surface-variant">
                        m
                      </span>
                    </div>
                  </div>
                  <div className="rounded-full bg-tertiary-container px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-on-tertiary-container">
                    Rising
                  </div>
                </div>

                <div className="relative h-28 overflow-hidden rounded-2xl bg-surface-container-low">
                  <svg
                    className="absolute inset-0 h-full w-full"
                    viewBox="0 0 400 100"
                    preserveAspectRatio="none"
                    aria-hidden="true"
                  >
                    <defs>
                      <linearGradient
                        id="waveGrad"
                        x1="0%"
                        x2="100%"
                        y1="0%"
                        y2="0%"
                      >
                        <stop offset="0%" stopColor="#004451" stopOpacity="1" />
                        <stop
                          offset="100%"
                          stopColor="#00444e"
                          stopOpacity="1"
                        />
                      </linearGradient>
                    </defs>
                    <path
                      d="M0,78 C90,18 300,120 400,40 L400,100 L0,100 Z"
                      fill="url(#waveGrad)"
                      fillOpacity="0.1"
                    />
                    <path
                      d="M0,78 C90,18 300,120 400,40"
                      fill="none"
                      stroke="url(#waveGrad)"
                      strokeWidth="4"
                    />
                  </svg>
                </div>
              </div>

              <div className="rounded-2xl border border-outline-variant/10 bg-surface-container-lowest p-6 shadow-sm">
                <LuBellRing className="mb-4 text-primary" size={22} />
                <p className="text-xs font-bold uppercase tracking-[0.22em] text-on-surface-variant">
                  Alert state
                </p>
                <p className="mt-2 text-2xl font-black text-primary">Stable</p>
              </div>

              <div className="rounded-2xl border border-outline-variant/10 bg-surface-container-lowest p-6 shadow-sm">
                <SiArduino className="mb-4 text-primary" size={22} />
                <p className="text-xs font-bold uppercase tracking-[0.22em] text-on-surface-variant">
                  Device mode
                </p>
                <p className="mt-2 text-2xl font-black text-primary">Online</p>
              </div>
            </div>
          </div>
        </section>

        <section id="features" className="bg-surface-container-low py-24">
          <div className="mx-auto max-w-7xl px-6">
            <div className="mb-16 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
              <div className="max-w-3xl">
                <p className="text-sm font-bold uppercase tracking-[0.24em] text-on-surface-variant">
                  Why TideWatch
                </p>
                <h2 className="mt-3 text-4xl font-extrabold tracking-tight text-primary md:text-5xl">
                  Built for safety, clarity, and practical deployment.
                </h2>
                <p className="mt-5 max-w-2xl text-on-surface-variant">
                  The proposal describes a low-cost tide gauge with alerts, so
                  the landing page emphasizes live monitoring, accessible
                  components, and a system that can serve both community and
                  technical use cases. fileciteturn0file0
                </p>
              </div>
              <div className="hidden text-right lg:block">
                <span className="select-none text-8xl font-black tracking-tight text-primary/5">
                  TIDEWATCH
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
              {features.map((feature) => {
                const Icon = feature.icon;
                return (
                  <article
                    key={feature.title}
                    className="rounded-2xl bg-surface-container-lowest p-8 shadow-sm transition-transform hover:-translate-y-0.5"
                  >
                    <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-primary-container text-on-primary-container">
                      <Icon size={22} />
                    </div>
                    <h3 className="text-xl font-bold text-primary">
                      {feature.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-on-surface-variant">
                      {feature.description}
                    </p>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section id="audience" className="mx-auto max-w-7xl px-6 py-24">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-start">
            <div className="lg:col-span-5">
              <p className="text-sm font-bold uppercase tracking-[0.24em] text-on-surface-variant">
                User roles
              </p>
              <h2 className="mt-3 text-4xl font-extrabold tracking-tight text-primary">
                Two user types, one system.
              </h2>
              <p className="mt-5 max-w-xl text-on-surface-variant">
                This keeps the interface simple for people who just need tide
                updates, while still giving administrators the tools to manage
                the device and its alert logic.
              </p>
            </div>

            <div className="grid gap-6 lg:col-span-7 md:grid-cols-2">
              {audience.map((item) => (
                <div
                  key={item.title}
                  className="rounded-[1.75rem] border border-outline-variant/10 bg-surface-container-lowest p-8 shadow-sm"
                >
                  <div className="mb-4 flex items-center gap-3">
                    <LuBadgeInfo className="text-primary" size={22} />
                    <h3 className="text-xl font-bold text-primary">
                      {item.title}
                    </h3>
                  </div>
                  <p className="text-sm leading-relaxed text-on-surface-variant">
                    {item.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="cta" className="px-6 pb-32 pt-6">
          <div className="relative mx-auto max-w-5xl overflow-hidden rounded-[2rem] bg-primary">
            <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary to-tertiary opacity-95" />
            <div className="relative z-10 px-8 py-16 text-center md:px-16 md:py-24">
              <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-on-primary/80">
                Ready to deploy
              </p>
              <h2 className="mx-auto mt-4 max-w-3xl text-3xl font-black leading-tight text-on-primary md:text-5xl">
                Bring TideWatch into your coastal monitoring workflow.
              </h2>
              <p className="mx-auto mt-5 max-w-2xl text-sm leading-relaxed text-on-primary/80 md:text-base">
                Start with the public landing page, then move into the secure
                login and signup flow for regular and technical users.
              </p>
              <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
                <Link
                  to="/signup"
                  className="inline-flex cursor-pointer items-center justify-center rounded-xl bg-surface px-8 py-4 font-extrabold text-primary transition-colors hover:bg-primary-fixed"
                >
                  Create Account
                </Link>
                <Link
                  to="/login"
                  className="inline-flex cursor-pointer items-center justify-center rounded-xl border-2 border-on-primary/20 px-8 py-4 font-extrabold text-on-primary transition-colors hover:bg-on-primary/10"
                >
                  View Login
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-outline-variant/20 bg-surface-container-low py-12">
        <div className="mx-auto flex max-w-7xl flex-col gap-8 px-6 md:flex-row md:items-start md:justify-between">
          <div className="max-w-sm">
            <p className="text-lg font-black tracking-tight text-primary">
              TideWatch
            </p>
            <p className="mt-3 text-xs uppercase tracking-[0.22em] text-on-surface-variant">
              © 2024 TideWatch IoT. Fluid Intelligence Systems.
            </p>
          </div>

          <div className="flex flex-wrap gap-x-8 gap-y-4 md:justify-end">
            {[
              "Privacy Policy",
              "Terms of Service",
              "API Documentation",
              "Contact Support",
            ].map((item) => (
              <a
                key={item}
                href="#"
                className="text-xs uppercase tracking-widest text-on-surface-variant underline-offset-4 transition-colors hover:text-primary hover:underline"
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
