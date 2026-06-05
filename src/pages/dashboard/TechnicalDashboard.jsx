import { useTelemetry } from "../../context/ThingsBoardContext";
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

// Utility to format ThingsBoard data for Recharts
const formatTelemetry = (telemetry, key) => {
  if (!telemetry[key]) return [];
  return telemetry[key]
    .map(([ts, val]) => ({
      time: new Date(ts).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      value: parseFloat(val),
      ts,
    }))
    .reverse(); // ThingsBoard sends newest first
};

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
    message: "ESP32 connection revalidated after brief reconnect.",
  },
  {
    timestamp: "2024-10-24 16:31:05",
    type: "Info",
    message: "GPS coordinates updated for Harbor Gate station.",
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
  const { telemetry, isConnected, latestTs } = useTelemetry();

  // Extract latest values
  const getLatest = (key, fallback = "--") => {
    if (telemetry[key] && telemetry[key].length > 0) {
      return telemetry[key][0][1];
    }
    return fallback;
  };

  const level = getLatest("tide_m");
  const distance = getLatest("distance_cm");
  const battery = getLatest("battery");
  const rssi = getLatest("rssi");
  const lat = getLatest("latitude");
  const lng = getLatest("longitude");

  const formatVal = (val, decimals = 2) => {
    const num = parseFloat(val);
    return isNaN(num) ? val : num.toFixed(decimals);
  };

  const gpsCoords =
    lat !== "--" && lng !== "--"
      ? `${parseFloat(lat).toFixed(4)}, ${parseFloat(lng).toFixed(4)}`
      : "5.6037, -0.1870"; // Fallback to Harbor Gate

  const signalLabel =
    rssi !== "--"
      ? parseInt(rssi) > -60
        ? "Strong"
        : parseInt(rssi) > -80
          ? "Good"
          : "Weak"
      : isConnected
        ? "Strong"
        : "Lost";

  // Format data for chart
  const chartData = formatTelemetry(telemetry, "tide_m").map((item) => {
    const dVal = telemetry["distance_cm"]?.find((d) => d[0] === item.ts)?.[1];
    const bVal = telemetry["battery"]?.find((b) => b[0] === item.ts)?.[1];
    return {
      ...item,
      level: item.value,
      distance: dVal ? parseFloat(dVal) : null,
      battery: bVal ? parseFloat(bVal) : null,
    };
  });

  const lastUpdated = latestTs
    ? new Date(latestTs).toLocaleTimeString()
    : "Never";

  return (
    <div className="min-h-screen bg-surface text-on-surface font-manrope selection:bg-primary-fixed selection:text-on-primary-fixed">
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
              single TideWatch station powered by ESP32.
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
                    {isConnected ? "Stable" : "Offline"}
                  </h2>
                </div>
                <div className="rounded-full bg-on-primary/10 p-3">
                  <LuShieldCheck size={20} />
                </div>
              </div>

              <div className="mt-6 space-y-3">
                <div className="flex items-center justify-between rounded-2xl bg-on-primary/10 px-4 py-3">
                  <span className="text-sm font-semibold text-on-primary/80">
                    Last Update
                  </span>
                  <span className="text-sm font-bold text-on-primary">
                    {lastUpdated}
                  </span>
                </div>
                <div className="flex items-center justify-between rounded-2xl bg-on-primary/10 px-4 py-3">
                  <span className="text-sm font-semibold text-on-primary/80">
                    Signal
                  </span>
                  <span className="text-sm font-bold text-on-primary">
                    {signalLabel}
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
            value={`${formatVal(level)} m`}
            helper="Current water level from the live sensor stream"
            icon={LuWaves}
          />
          <MetricCard
            label="Sensor distance"
            value={`${formatVal(distance)} cm`}
            helper="Raw ultrasonic return used to compute tide height"
            icon={LuGauge}
          />
          <MetricCard
            label="Battery level"
            value={`${formatVal(battery)} V`}
            helper="Visible to technical users and admins only"
            icon={LuBatteryCharging}
          />
          <MetricCard
            label="Device status"
            value={isConnected ? "Online" : "Offline"}
            helper="Real-time connection to ThingsBoard WebSocket"
            icon={LuSignal}
            tone={isConnected ? "primary" : "default"}
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
                <StatusPill tone={isConnected ? "safe" : "danger"}>
                  {isConnected ? "Live stream" : "Disconnected"}
                </StatusPill>
                <StatusPill>Real-time</StatusPill>
              </div>
            </div>

            <div className="h-[340px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={chartData}
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
                    ThingsBoard WS
                  </span>
                  <span
                    className={`text-sm font-bold ${isConnected ? "text-primary" : "text-error"}`}
                  >
                    {isConnected ? "Connected" : "Disconnected"}
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
                  <span className="text-sm font-bold text-primary">
                    {isConnected ? "Active" : "---"}
                  </span>
                </div>
                <div className="flex items-center justify-between rounded-2xl bg-surface-container-low px-4 py-3">
                  <span className="text-sm font-semibold text-on-surface-variant">
                    Battery status
                  </span>
                  <span className="text-sm font-bold text-primary">
                    {parseFloat(battery) > 3.5 ? "Healthy" : "Low"}
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
                    {gpsCoords}
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
                    Real-time
                  </span>
                </div>
              </div>
              <div className="mt-6 flex items-center gap-3 rounded-2xl bg-surface-container-lowest/70 px-4 py-4">
                <LuMapPin className="text-primary" size={18} />
                <p className="text-sm text-on-surface-variant">
                  Live data source: ThingsBoard Cloud IoT Platform.
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
                {isConnected ? "Real-time stream" : "Offline"}
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
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant/10">
                {chartData.slice(0, 10).map((row) => (
                  <tr
                    key={row.ts}
                    className="transition-colors hover:bg-surface-container-low/50"
                  >
                    <td className="px-6 py-4 text-xs font-mono font-medium text-on-surface">
                      {new Date(row.ts).toLocaleString()}
                    </td>
                    <td className="px-6 py-4 text-xs font-bold text-primary">
                      {row.distance?.toFixed(1) || "--"}
                    </td>
                    <td className="px-6 py-4 text-xs font-bold text-primary">
                      {row.level?.toFixed(2) || "--"}
                    </td>
                    <td className="px-6 py-4 text-xs font-bold text-primary">
                      {row.battery?.toFixed(2) || "--"}
                    </td>
                    <td className="px-6 py-4 text-xs font-medium text-on-surface-variant">
                      {gpsCoords}
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="rounded-full bg-tertiary-container/20 px-2 py-0.5 text-[9px] font-black uppercase text-tertiary">
                        OK
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
