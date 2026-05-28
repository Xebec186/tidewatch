import {
  LuArrowRight,
  LuBellRing,
  LuClock3,
  LuGauge,
  LuShieldCheck,
  LuSignal,
  LuWaves,
} from "react-icons/lu";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  AreaChart,
  Area,
} from "recharts";
import RegularDashboardNavbar from "../../components/RegularDashboardNavbar";

const tideData = [
  { time: "06:00", tide: 1.9 },
  { time: "08:00", tide: 2.1 },
  { time: "10:00", tide: 2.4 },
  { time: "12:00", tide: 2.8 },
  { time: "14:00", tide: 2.7 },
  { time: "16:00", tide: 2.9 },
  { time: "18:00", tide: 3.1 },
];

const alertData = [
  { time: "07:10", value: 1 },
  { time: "09:20", value: 0 },
  { time: "12:30", value: 1 },
  { time: "15:00", value: 0 },
  { time: "18:15", value: 2 },
];

const recentAlerts = [
  {
    title: "Warning threshold approached",
    time: "18:15",
    severity: "Warning",
    description: "Tide level moved close to the configured warning boundary.",
  },
  {
    title: "Live data received",
    time: "18:12",
    severity: "Info",
    description: "Latest tide reading was successfully recorded by the system.",
  },
  {
    title: "System online",
    time: "18:00",
    severity: "Info",
    description: "Device connection restored and data stream is active.",
  },
];

const statCards = [
  {
    label: "Current tide level",
    value: "2.84 m",
    helper: "Measured from the ultrasonic sensor",
    icon: LuWaves,
  },
  {
    label: "System status",
    value: "Safe",
    helper: "Below the warning threshold",
    icon: LuShieldCheck,
  },
  {
    label: "Last updated",
    value: "2 mins ago",
    helper: "Fresh reading received from device",
    icon: LuClock3,
  },
  {
    label: "Device connection",
    value: "Online",
    helper: "ESP8266 data stream active",
    icon: LuSignal,
  },
];

function StatusPill({ label, tone = "safe" }) {
  const styles =
    tone === "danger"
      ? "bg-error-container text-on-error-container"
      : tone === "warning"
        ? "bg-secondary-container text-on-secondary-fixed-variant"
        : "bg-tertiary-container/10 text-primary";

  return (
    <span
      className={`inline-flex items-center rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-[0.22em] ${styles}`}
    >
      {label}
    </span>
  );
}

function MetricCard({ label, value, helper, icon: Icon }) {
  return (
    <div className="rounded-2xl border border-outline-variant/10 bg-surface-container-lowest p-6 shadow-sm">
      <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-primary-container text-on-primary-container">
        <Icon size={22} />
      </div>
      <p className="text-xs font-bold uppercase tracking-[0.22em] text-on-surface-variant">
        {label}
      </p>
      <p className="mt-2 text-3xl font-black tracking-tight text-primary">
        {value}
      </p>
      <p className="mt-2 text-sm leading-relaxed text-on-surface-variant">
        {helper}
      </p>
    </div>
  );
}

export default function RegularDashboard() {
  return (
    <div className="min-h-screen bg-surface text-on-surface font-manrope selection:bg-primary-container selection:text-on-primary-container">
      <RegularDashboardNavbar />

      <main className="mx-auto max-w-7xl px-6 py-8 md:py-10">
        <section id="overview" className="mb-10 grid gap-8 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <div className="mb-4 flex items-center gap-3">
              <span className="relative flex h-3 w-3">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-3 w-3 rounded-full bg-emerald-500" />
              </span>
              <span className="text-sm font-bold uppercase tracking-[0.2em] text-on-surface-variant">
                Live system monitoring
              </span>
            </div>

            <h1 className="text-4xl font-black tracking-tight text-primary md:text-6xl">
              Coastal Station 01
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-on-surface-variant md:text-lg">
              TideWatch is tracking tide activity in real time and helping users
              stay informed with a clear view of the current water level,
              operational status, and recent alerts.
            </p>
          </div>

          <div className="lg:col-span-4">
            <div className="rounded-2xl border border-outline-variant/10 bg-surface-container-lowest p-6 shadow-sm">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.22em] text-on-surface-variant">
                    Current status
                  </p>
                  <div className="mt-3 flex items-center gap-3">
                    <StatusPill label="Safe" />
                    <span className="text-sm font-semibold text-on-surface-variant">
                      Updated 2 mins ago
                    </span>
                  </div>
                </div>
                <div className="rounded-xl bg-tertiary-container/10 p-3 text-primary">
                  <LuShieldCheck size={22} />
                </div>
              </div>

              <div className="mt-6 rounded-2xl bg-surface-container-low p-5">
                <p className="text-xs font-bold uppercase tracking-[0.22em] text-on-surface-variant">
                  Location
                </p>
                <p className="mt-2 text-lg font-bold text-primary">
                  Harbor Gate
                </p>
                <p className="mt-1 text-sm text-on-surface-variant">
                  GPS: 5.6037, -0.1870
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-10 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {statCards.map((card) => (
            <MetricCard key={card.label} {...card} />
          ))}
        </section>

        <section id="charts" className="grid gap-6 lg:grid-cols-12">
          <div className="lg:col-span-8 rounded-[1.75rem] border border-outline-variant/10 bg-surface-container-lowest p-6 shadow-sm md:p-8">
            <div className="mb-6 flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.22em] text-on-surface-variant">
                  Tide trend
                </p>
                <h2 className="mt-2 text-2xl font-black tracking-tight text-primary md:text-3xl">
                  Water level over time
                </h2>
              </div>
              <div className="flex items-center gap-2">
                <StatusPill label="24h view" />
                <StatusPill label="Live data" tone="warning" />
              </div>
            </div>

            <div className="h-[320px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={tideData}
                  margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
                >
                  <CartesianGrid
                    strokeDasharray="4 4"
                    stroke="#bfc8cb"
                    opacity={0.35}
                  />
                  <XAxis
                    dataKey="time"
                    tickLine={false}
                    axisLine={false}
                    tick={{ fill: "#3f484b", fontSize: 12 }}
                  />
                  <YAxis
                    tickLine={false}
                    axisLine={false}
                    tick={{ fill: "#3f484b", fontSize: 12 }}
                    domain={[1.5, 3.5]}
                  />
                  <Tooltip
                    contentStyle={{
                      borderRadius: 16,
                      border: "1px solid rgba(191, 200, 203, 0.35)",
                      background: "#ffffff",
                      boxShadow: "0 8px 24px rgba(23, 28, 31, 0.08)",
                    }}
                    labelStyle={{ color: "#171c1f", fontWeight: 700 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="tide"
                    stroke="#004451"
                    strokeWidth={4}
                    dot={{ r: 4, strokeWidth: 0, fill: "#004451" }}
                    activeDot={{
                      r: 7,
                      stroke: "#8cd1e4",
                      strokeWidth: 3,
                      fill: "#004451",
                    }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="lg:col-span-4 space-y-6">
            <div className="rounded-[1.75rem] bg-primary p-6 text-on-primary shadow-lg shadow-primary/10 md:p-8">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-on-primary/75">
                    Latest advisory
                  </p>
                  <h2 className="mt-3 text-2xl font-black tracking-tight">
                    Monitoring remains safe.
                  </h2>
                </div>
                <div className="rounded-full bg-on-primary/10 p-3">
                  <LuBellRing size={20} />
                </div>
              </div>

              <p className="mt-4 text-sm leading-relaxed text-on-primary/80">
                Tide levels are rising, but the current reading is still within
                the safe operating range. Keep watching the trend as the evening
                tide approaches.
              </p>

              <button
                type="button"
                className="mt-6 inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-secondary-container px-5 py-3.5 font-bold text-primary transition-all hover:bg-primary-fixed active:scale-[0.98]"
              >
                View safety note
                <LuArrowRight size={16} />
              </button>
            </div>

            <div className="rounded-[1.75rem] border border-outline-variant/10 bg-surface-container-lowest p-6 shadow-sm md:p-8">
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-on-surface-variant">
                Station snapshot
              </p>
              <div className="mt-5 space-y-4">
                <div className="flex items-center justify-between rounded-2xl bg-surface-container-low px-4 py-3">
                  <span className="text-sm font-semibold text-on-surface-variant">
                    Status
                  </span>
                  <span className="text-sm font-bold text-primary">Online</span>
                </div>
                <div className="flex items-center justify-between rounded-2xl bg-surface-container-low px-4 py-3">
                  <span className="text-sm font-semibold text-on-surface-variant">
                    Last ping
                  </span>
                  <span className="text-sm font-bold text-primary">
                    2 mins ago
                  </span>
                </div>
                <div className="flex items-center justify-between rounded-2xl bg-surface-container-low px-4 py-3">
                  <span className="text-sm font-semibold text-on-surface-variant">
                    Source
                  </span>
                  <span className="text-sm font-bold text-primary">
                    Arduino UNO + ESP8266
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="alerts" className="mt-10 grid gap-6 lg:grid-cols-12">
          <div className="lg:col-span-7 rounded-[1.75rem] border border-outline-variant/10 bg-surface-container-lowest p-6 shadow-sm md:p-8">
            <div className="mb-6 flex items-end justify-between gap-4">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.22em] text-on-surface-variant">
                  Recent alerts
                </p>
                <h2 className="mt-2 text-2xl font-black tracking-tight text-primary">
                  Activity log
                </h2>
              </div>
              <StatusPill label="3 items" />
            </div>

            <div className="space-y-4">
              {recentAlerts.map((alert, index) => (
                <div
                  key={`${alert.time}-${index}`}
                  className="rounded-2xl bg-surface-container-low px-4 py-4 md:px-5"
                >
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <div className="flex items-center gap-3">
                        <span
                          className={`rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-[0.22em] ${
                            alert.severity === "Warning"
                              ? "bg-secondary-container text-on-secondary-fixed-variant"
                              : "bg-tertiary-container/10 text-primary"
                          }`}
                        >
                          {alert.severity}
                        </span>
                        <p className="text-sm font-bold text-on-surface">
                          {alert.title}
                        </p>
                      </div>
                      <p className="mt-2 text-sm text-on-surface-variant">
                        {alert.description}
                      </p>
                    </div>
                    <span className="text-xs font-bold uppercase tracking-[0.22em] text-on-surface-variant">
                      {alert.time}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-5 rounded-[1.75rem] border border-outline-variant/10 bg-surface-container-lowest p-6 shadow-sm md:p-8">
            <div className="mb-6 flex items-end justify-between gap-4">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.22em] text-on-surface-variant">
                  Alert frequency
                </p>
                <h2 className="mt-2 text-2xl font-black tracking-tight text-primary">
                  Notifications over time
                </h2>
              </div>
              <LuGauge className="text-primary" size={22} />
            </div>

            <div className="h-[220px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={alertData}>
                  <defs>
                    <linearGradient id="alertFill" x1="0" y1="0" x2="0" y2="1">
                      <stop
                        offset="5%"
                        stopColor="#004451"
                        stopOpacity={0.25}
                      />
                      <stop offset="95%" stopColor="#004451" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid
                    strokeDasharray="4 4"
                    stroke="#bfc8cb"
                    opacity={0.3}
                  />
                  <XAxis
                    dataKey="time"
                    tickLine={false}
                    axisLine={false}
                    tick={{ fill: "#3f484b", fontSize: 12 }}
                  />
                  <YAxis
                    tickLine={false}
                    axisLine={false}
                    tick={{ fill: "#3f484b", fontSize: 12 }}
                    allowDecimals={false}
                  />
                  <Tooltip
                    contentStyle={{
                      borderRadius: 16,
                      border: "1px solid rgba(191, 200, 203, 0.35)",
                      background: "#ffffff",
                      boxShadow: "0 8px 24px rgba(23, 28, 31, 0.08)",
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="value"
                    stroke="#004451"
                    fill="url(#alertFill)"
                    strokeWidth={3}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
