import { Link } from "react-router-dom";
import { LuArrowRight, LuWaves, LuBadgeInfo } from "react-icons/lu";
import { MdOutlineSensors } from "react-icons/md";
import { features } from "../data/features";
import { stats } from "../data/stats";
import { audience } from "../data/audience";
import { useTelemetry } from "../context/ThingsBoardContext";

export default function LandingPage() {
  const { telemetry, isConnected } = useTelemetry();

  const getLatest = (key, fallback = "--") => {
    if (telemetry[key] && telemetry[key].length > 0) {
      return telemetry[key][0][1];
    }
    return fallback;
  };

  const currentTideRaw = getLatest("tide_m");
  const currentTide = currentTideRaw !== "--" && !isNaN(parseFloat(currentTideRaw)) 
    ? parseFloat(currentTideRaw).toFixed(2) 
    : "--";
  return (
    <div className="min-h-screen bg-surface text-on-surface font-manrope selection:bg-primary-container selection:text-on-primary-container">
      <main className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_2px_2px,rgba(0,68,81,0.05)_1px,transparent_0)] bg-size-[40px_40px] opacity-60" />
        <div className="pointer-events-none absolute -top-24 -right-24 h-96 w-96 rounded-full bg-primary/5 blur-3xl" />
        <div className="pointer-events-none absolute top-1/2 -left-48 h-96 w-96 rounded-full bg-tertiary/5 blur-3xl" />

        <section className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-14 px-6 pb-24 pt-8 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <div
              className={`mb-6 inline-flex items-center gap-2 rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-[0.22em] ${isConnected ? "bg-secondary-container text-on-secondary-fixed-variant" : "bg-error-container text-on-error-container"}`}
            >
              <span
                className={`h-2 w-2 rounded-full ${isConnected ? "bg-primary animate-pulse" : "bg-error"}`}
              />
              System status: {isConnected ? "active" : "offline"}
            </div>

            <h1 className="max-w-3xl text-4xl font-extrabold tracking-tight text-primary md:text-6xl lg:text-7xl">
              Tide monitoring that stays clear, connected, and ready.
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-on-surface-variant md:text-xl">
              TideWatch is a low-cost tide gauge system built to measure water
              levels and help coastal teams respond faster to changing
              conditions using real-time ultrasonic sensing.
            </p>

            <div className="mt-10 flex md:flex-wrap gap-4">
              <Link
                to="/signup"
                className="inline-flex cursor-pointer items-center gap-2 rounded-xl bg-primary px-4 md:px-7 py-4 text-sm md:text-md font-bold text-on-primary shadow-xl shadow-primary/10 transition-all hover:bg-primary-container active:scale-[0.98]"
              >
                Get Started
                <LuArrowRight size={18} />
              </Link>
              <Link
                to="/login"
                className="inline-flex cursor-pointer items-center rounded-xl bg-secondary-container px-7 py-4 font-bold text-primary transition-colors hover:bg-surface-container-highest"
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
                  <p className="text-lg md:text-2xl font-black text-primary">
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
                        {currentTide}
                      </span>
                      <span className="pb-1 text-xl font-bold text-on-surface-variant">
                        m
                      </span>
                    </div>
                  </div>
                  <div
                    className={`rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] ${isConnected ? "bg-tertiary-container text-on-tertiary-container" : "bg-error-container text-on-error-container"}`}
                  >
                    {isConnected ? "Live Stream" : "Station Offline"}
                  </div>
                </div>

                <div className="relative h-28 overflow-hidden rounded-2xl bg-surface-container-low">
                  <svg
                    className={`absolute inset-0 h-full w-full ${isConnected ? "animate-pulse" : ""}`}
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
                <LuWaves className="mb-4 text-primary" size={22} />
                <p className="text-xs font-bold uppercase tracking-[0.22em] text-on-surface-variant">
                  Monitoring
                </p>
                <p
                  className={`mt-2 text-2xl font-black ${isConnected ? "text-primary" : "text-on-surface-variant"}`}
                >
                  {isConnected ? "Active" : "---"}
                </p>
              </div>

              <div className="rounded-2xl border border-outline-variant/10 bg-surface-container-lowest p-6 shadow-sm">
                <MdOutlineSensors className="mb-4 text-primary" size={22} />
                <p className="text-xs font-bold uppercase tracking-[0.22em] text-on-surface-variant">
                  Device mode
                </p>
                <p
                  className={`mt-2 text-2xl font-black ${isConnected ? "text-primary" : "text-error"}`}
                >
                  {isConnected ? "Online" : "Offline"}
                </p>
              </div>
            </div>
          </div>
        </section>

        <section id="features" className="bg-surface-container-low py-25">
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
                  technical use cases.
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
                Experience
              </p>
              <h2 className="mt-3 text-4xl font-extrabold tracking-tight text-primary">
                A unified view for everyone.
              </h2>
              <p className="mt-5 max-w-xl text-on-surface-variant">
                Whether you are a coastal resident checking the daily tide or a
                technician monitoring sensor performance, TideWatch provides all
                the critical data in one powerful, real-time dashboard.
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

        <section id="cta" className="px-1 md:px-6 pb-42 pt-25">
          <div className="relative mx-auto max-w-full sm:max-w-5xl overflow-hidden rounded-4xl bg-primary">
            <div className="absolute inset-0 bg-linear-to-br from-primary via-primary to-tertiary opacity-95" />
            <div className="relative z-10 px-5 py-8 text-center md:px-16 md:py-24">
              <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-on-primary/80">
                Ready to deploy
              </p>
              <h2 className="mx-auto mt-4 max-w-3xl text-2xl font-black leading-tight text-on-primary md:text-5xl">
                Bring TideWatch into your coastal monitoring workflow.
              </h2>
              <p className="mx-auto mt-5 max-w-2xl text-sm leading-relaxed text-on-primary/80 md:text-base">
                Start with the public landing page, then move into the secure
                login and signup flow.
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
                  Login
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
