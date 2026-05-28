import {
  LuArrowRight,
  LuBatteryCharging,
  LuClock3,
  LuDownload,
  LuGauge,
  LuMapPin,
  LuShieldCheck,
  LuSignal,
  LuWaves,
  LuFilter,
  LuTriangleAlert,
  LuClipboardList,
} from "react-icons/lu";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  BarChart,
  Bar,
  Legend,
} from "recharts";
import TechnicalDashboardNavbar from "../../components/TechnicalDashboardNavbar";

const telemetryData = [
  { time: "13:00", level: 2.18, distance: 169.2, battery: 3.89 },
  { time: "13:30", level: 2.24, distance: 167.8, battery: 3.88 },
  { time: "14:00", level: 2.31, distance: 165.5, battery: 3.87 },
  { time: "14:30", level: 2.41, distance: 163.9, battery: 3.86 },
  { time: "15:00", level: 2.53, distance: 161.4, battery: 3.85 },
  { time: "15:30", level: 2.62, distance: 159.8, battery: 3.84 },
  { time: "16:00", level: 2.71, distance: 158.1, battery: 3.83 },
  { time: "16:30", level: 2.79, distance: 156.8, battery: 3.82 },
  { time: "17:00", level: 2.86, distance: 155.9, battery: 3.81 },
];

const alertTrend = [
  { time: "Mon", warning: 1, danger: 0 },
  { time: "Tue", warning: 2, danger: 0 },
  { time: "Wed", warning: 1, danger: 1 },
  { time: "Thu", warning: 3, danger: 0 },
  { time: "Fri", warning: 2, danger: 1 },
  { time: "Sat", warning: 0, danger: 0 },
  { time: "Sun", warning: 1, danger: 0 },
];

const logs = [
  {
    timestamp: "2024-10-24 17:02:15",
    type: "Info",
    message: "New tide reading stored successfully.",
  },
  {
    timestamp: "2024-10-24 16:55:10",
    type: "Warning",
    message: "Battery level dropped below 25% threshold.",
  },
  {
    timestamp: "2024-10-24 16:42:40",
    type: "Info",
    message: "ESP8266 connection revalidated after brief reconnect.",
  },
  {
    timestamp: "2024-10-24 16:31:05",
    type: "Info",
    message: "GPS coordinates updated for Harbor Gate station.",
  },
];

const historyRows = [
  {
    timestamp: "2024-10-24 17:02:15",
    distance: 155.9,
    level: 2.86,
    battery: 3.81,
    gps: "5.6037, -0.1870",
    latency: "1.2s",
    status: "OK",
  },
  {
    timestamp: "2024-10-24 17:01:15",
    distance: 156.3,
    level: 2.84,
    battery: 3.81,
    gps: "5.6037, -0.1870",
    latency: "1.1s",
    status: "OK",
  },
  {
    timestamp: "2024-10-24 17:00:15",
    distance: 156.9,
    level: 2.83,
    battery: 3.82,
    gps: "5.6037, -0.1870",
    latency: "1.3s",
    status: "OK",
  },
  {
    timestamp: "2024-10-24 16:59:15",
    distance: 157.4,
    level: 2.82,
    battery: 3.82,
    gps: "5.6037, -0.1870",
    latency: "1.4s",
    status: "OK",
  },
];

function StatusPill({ children, tone = "safe" }) {
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
      {children}
    </span>
  );
}

function MetricCard({ label, value, helper, icon: Icon, tone = "default" }) {
  const cardStyles =
    tone === "primary"
      ? "bg-primary text-on-primary shadow-lg shadow-primary/10"
      : "bg-surface-container-lowest border border-outline-variant/10";

  const labelStyles =
    tone === "primary" ? "text-on-primary/75" : "text-on-surface-variant";
  const valueStyles = tone === "primary" ? "text-on-primary" : "text-primary";
  const helperStyles =
    tone === "primary" ? "text-primary-fixed-dim" : "text-on-surface-variant";
  const iconWrap =
    tone === "primary"
      ? "bg-on-primary/10 text-on-primary"
      : "bg-primary-container text-on-primary-container";

  return (
    <div className={`rounded-2xl p-6 shadow-sm ${cardStyles}`}>
      <div
        className={`mb-5 flex h-12 w-12 items-center justify-center rounded-xl ${iconWrap}`}
      >
        <Icon size={22} />
      </div>
      <p
        className={`text-xs font-bold uppercase tracking-[0.22em] ${labelStyles}`}
      >
        {label}
      </p>
      <p className={`mt-2 text-3xl font-black tracking-tight ${valueStyles}`}>
        {value}
      </p>
      <p className={`mt-2 text-sm leading-relaxed ${helperStyles}`}>{helper}</p>
    </div>
  );
}

export default function TechnicalDashboard() {
  return (
    <div className="min-h-screen bg-surface text-on-surface font-manrope selection:bg-primary-fixed selection:text-on-primary-fixed">
      <TechnicalDashboardNavbar />
      <main className="mx-auto max-w-7xl px-6 py-8 md:py-10">
        <section className="mb-10 grid gap-8 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <div className="mb-4 flex items-center gap-3">
              <span className="rounded-full bg-primary-container px-2 py-0.5 text-[10px] font-mono font-bold text-on-primary-container">
                TW-NODE-01
              </span>
              <span className="text-sm font-bold uppercase tracking-[0.2em] text-on-surface-variant">
                Technical analytics
              </span>
            </div>

            <h1 className="text-4xl font-black tracking-tight text-primary md:text-6xl">
              Station diagnostics and telemetry.
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-on-surface-variant md:text-lg">
              This view is for operators and technicians. It exposes battery
              level, device health, timing, and historical telemetry for the
              single TideWatch station powered by Arduino UNO, ultrasonic
              sensing, GPS, and ESP8266.
            </p>
          </div>

          <div className="lg:col-span-4">
            <div className="rounded-[1.75rem] bg-primary p-6 text-on-primary shadow-lg shadow-primary/10 md:p-8">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-on-primary/75">
                    Node health
                  </p>
                  <h2 className="mt-3 text-3xl font-black tracking-tight">
                    Stable
                  </h2>
                </div>
                <div className="rounded-full bg-on-primary/10 p-3">
                  <LuShieldCheck size={20} />
                </div>
              </div>

              <div className="mt-6 space-y-3">
                <div className="flex items-center justify-between rounded-2xl bg-on-primary/10 px-4 py-3">
                  <span className="text-sm font-semibold text-on-primary/80">
                    Uptime
                  </span>
                  <span className="text-sm font-bold text-on-primary">
                    142h 12m
                  </span>
                </div>
                <div className="flex items-center justify-between rounded-2xl bg-on-primary/10 px-4 py-3">
                  <span className="text-sm font-semibold text-on-primary/80">
                    Signal
                  </span>
                  <span className="text-sm font-bold text-on-primary">
                    Strong
                  </span>
                </div>
              </div>

              <button
                type="button"
                className="mt-6 inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-secondary-container px-5 py-3.5 font-bold text-primary transition-all hover:bg-primary-fixed active:scale-[0.98]"
              >
                Export report
                <LuArrowRight size={16} />
              </button>
            </div>
          </div>
        </section>

        <section
          id="analytics"
          className="mb-10 grid gap-6 sm:grid-cols-2 xl:grid-cols-4"
        >
          <MetricCard
            label="Tide level"
            value="2.84 m"
            helper="Current water level from the live sensor stream"
            icon={LuWaves}
          />
          <MetricCard
            label="Sensor distance"
            value="156 cm"
            helper="Raw ultrasonic return used to compute tide height"
            icon={LuGauge}
          />
          <MetricCard
            label="Battery level"
            value="82%"
            helper="Visible to technical users and admins only"
            icon={LuBatteryCharging}
          />
          <MetricCard
            label="Device status"
            value="Online"
            helper="ESP8266 is actively pushing readings to Firebase"
            icon={LuSignal}
            tone="primary"
          />
        </section>

        <section className="grid gap-6 lg:grid-cols-12">
          <div className="lg:col-span-8 rounded-[1.75rem] border border-outline-variant/10 bg-surface-container-lowest p-6 shadow-sm md:p-8">
            <div className="mb-6 flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.22em] text-on-surface-variant">
                  Telemetry stream
                </p>
                <h2 className="mt-2 text-2xl font-black tracking-tight text-primary md:text-3xl">
                  Tide, distance, and battery trend
                </h2>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <StatusPill tone="warning">Live stream</StatusPill>
                <StatusPill>Real-time</StatusPill>
              </div>
            </div>

            <div className="h-[340px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={telemetryData}
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
                  />
                  <Tooltip
                    contentStyle={{
                      borderRadius: 16,
                      border: "1px solid rgba(191, 200, 203, 0.35)",
                      background: "#ffffff",
                      boxShadow: "0 8px 24px rgba(23, 28, 31, 0.08)",
                    }}
                  />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="level"
                    name="Tide level (m)"
                    stroke="#004451"
                    strokeWidth={4}
                    dot={{ r: 4, strokeWidth: 0, fill: "#004451" }}
                  />
                  <Line
                    type="monotone"
                    dataKey="distance"
                    name="Distance (cm)"
                    stroke="#8cd1e4"
                    strokeWidth={3}
                    dot={{ r: 3, strokeWidth: 0, fill: "#8cd1e4" }}
                  />
                  <Line
                    type="monotone"
                    dataKey="battery"
                    name="Battery (V)"
                    stroke="#00444e"
                    strokeWidth={3}
                    dot={{ r: 3, strokeWidth: 0, fill: "#00444e" }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="lg:col-span-4 space-y-6">
            <div className="rounded-[1.75rem] border border-outline-variant/10 bg-surface-container-lowest p-6 shadow-sm md:p-8">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.22em] text-on-surface-variant">
                    Device diagnostics
                  </p>
                  <h3 className="mt-2 text-2xl font-black tracking-tight text-primary">
                    Operational snapshot
                  </h3>
                </div>
                <LuClipboardList className="text-primary" size={22} />
              </div>

              <div className="mt-6 space-y-4">
                <div className="flex items-center justify-between rounded-2xl bg-surface-container-low px-4 py-3">
                  <span className="text-sm font-semibold text-on-surface-variant">
                    Wi-Fi module
                  </span>
                  <span className="text-sm font-bold text-primary">
                    Connected
                  </span>
                </div>
                <div className="flex items-center justify-between rounded-2xl bg-surface-container-low px-4 py-3">
                  <span className="text-sm font-semibold text-on-surface-variant">
                    GPS module
                  </span>
                  <span className="text-sm font-bold text-primary">Locked</span>
                </div>
                <div className="flex items-center justify-between rounded-2xl bg-surface-container-low px-4 py-3">
                  <span className="text-sm font-semibold text-on-surface-variant">
                    Last sync
                  </span>
                  <span className="text-sm font-bold text-primary">1.2s</span>
                </div>
                <div className="flex items-center justify-between rounded-2xl bg-surface-container-low px-4 py-3">
                  <span className="text-sm font-semibold text-on-surface-variant">
                    Battery status
                  </span>
                  <span className="text-sm font-bold text-primary">
                    Healthy
                  </span>
                </div>
              </div>
            </div>

            <div className="rounded-[1.75rem] bg-secondary-container p-6 md:p-8">
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-on-secondary-container">
                Environmental context
              </p>
              <div className="mt-5 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold text-on-secondary-container">
                    GPS coordinates
                  </span>
                  <span className="text-sm font-black text-primary">
                    5.6037, -0.1870
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold text-on-secondary-container">
                    Station name
                  </span>
                  <span className="text-sm font-black text-primary">
                    Harbor Gate
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold text-on-secondary-container">
                    Current update rate
                  </span>
                  <span className="text-sm font-black text-primary">
                    Every 1 min
                  </span>
                </div>
              </div>
              <div className="mt-6 flex items-center gap-3 rounded-2xl bg-surface-container-lowest/70 px-4 py-4">
                <LuMapPin className="text-primary" size={18} />
                <p className="text-sm text-on-surface-variant">
                  Single-station deployment configured for the TideWatch MVP.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section id="logs" className="mt-10 grid gap-6 lg:grid-cols-12">
          <div className="lg:col-span-7 rounded-[1.75rem] border border-outline-variant/10 bg-surface-container-lowest p-6 shadow-sm md:p-8">
            <div className="mb-6 flex items-end justify-between gap-4">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.22em] text-on-surface-variant">
                  System logs
                </p>
                <h2 className="mt-2 text-2xl font-black tracking-tight text-primary">
                  Read-only event stream
                </h2>
              </div>
              <div className="flex gap-2">
                <button
                  type="button"
                  className="inline-flex cursor-pointer items-center gap-2 rounded-xl bg-surface-container-low px-4 py-2 text-sm font-bold text-on-surface-variant transition-colors hover:text-primary"
                >
                  <LuFilter size={16} />
                  Filter
                </button>
                <button
                  type="button"
                  className="inline-flex cursor-pointer items-center gap-2 rounded-xl bg-surface-container-low px-4 py-2 text-sm font-bold text-on-surface-variant transition-colors hover:text-primary"
                >
                  <LuDownload size={16} />
                  Export
                </button>
              </div>
            </div>

            <div className="space-y-4">
              {logs.map((entry) => (
                <div
                  key={`${entry.timestamp}-${entry.message}`}
                  className="rounded-2xl bg-surface-container-low px-4 py-4 md:px-5"
                >
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <div className="flex items-center gap-3">
                        <StatusPill
                          tone={entry.type === "Warning" ? "warning" : "safe"}
                        >
                          {entry.type}
                        </StatusPill>
                        <p className="text-sm font-bold text-on-surface">
                          {entry.message}
                        </p>
                      </div>
                    </div>
                    <span className="text-xs font-bold uppercase tracking-[0.22em] text-on-surface-variant">
                      {entry.timestamp}
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
                  Alert trend
                </p>
                <h2 className="mt-2 text-2xl font-black tracking-tight text-primary">
                  Warning vs danger
                </h2>
              </div>
              <LuTriangleAlert className="text-primary" size={22} />
            </div>

            <div className="h-[240px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={alertTrend}>
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
                  <Legend />
                  <Bar
                    dataKey="warning"
                    name="Warning"
                    fill="#cfe6f2"
                    radius={[8, 8, 0, 0]}
                  />
                  <Bar
                    dataKey="danger"
                    name="Danger"
                    fill="#004451"
                    radius={[8, 8, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="mt-6 rounded-2xl bg-primary p-5 text-on-primary">
              <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-on-primary/75">
                Technical note
              </p>
              <p className="mt-2 text-sm leading-relaxed text-on-primary/80">
                Battery level and diagnostics are intentionally exposed here for
                operators, while admin-only controls remain on a separate route.
              </p>
            </div>
          </div>
        </section>

        <section
          id="history"
          className="mt-10 rounded-[1.75rem] border border-outline-variant/10 bg-surface-container-lowest shadow-sm"
        >
          <div className="flex items-center justify-between gap-4 border-b border-outline-variant/10 p-6 md:p-8">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-on-surface-variant">
                Historical telemetry
              </p>
              <h2 className="mt-2 text-2xl font-black tracking-tight text-primary">
                Recent records from the live node
              </h2>
            </div>
            <div className="flex items-center gap-2 rounded-xl bg-surface-container-low px-3 py-2 text-on-surface-variant">
              <LuClock3 size={16} />
              <span className="text-xs font-bold uppercase tracking-[0.22em]">
                Real-time stream
              </span>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full border-collapse text-left">
              <thead className="bg-surface-container-low">
                <tr>
                  <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-on-surface-variant">
                    Timestamp
                  </th>
                  <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-on-surface-variant">
                    Distance (cm)
                  </th>
                  <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-on-surface-variant">
                    Tide Level (m)
                  </th>
                  <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-on-surface-variant">
                    Battery (V)
                  </th>
                  <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-on-surface-variant">
                    GPS
                  </th>
                  <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-on-surface-variant text-center">
                    Latency
                  </th>
                  <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-on-surface-variant text-center">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant/10">
                {historyRows.map((row) => (
                  <tr
                    key={row.timestamp}
                    className="transition-colors hover:bg-surface-container-low/50"
                  >
                    <td className="px-6 py-4 text-xs font-mono font-medium text-on-surface">
                      {row.timestamp}
                    </td>
                    <td className="px-6 py-4 text-xs font-bold text-primary">
                      {row.distance.toFixed(1)}
                    </td>
                    <td className="px-6 py-4 text-xs font-bold text-primary">
                      {row.level.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 text-xs font-bold text-primary">
                      {row.battery.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 text-xs font-medium text-on-surface-variant">
                      {row.gps}
                    </td>
                    <td className="px-6 py-4 text-center text-xs font-bold text-on-surface-variant">
                      {row.latency}
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="rounded-full bg-tertiary-container/20 px-2 py-0.5 text-[9px] font-black uppercase text-tertiary">
                        {row.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  );
}
