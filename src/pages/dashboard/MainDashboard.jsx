import { useTelemetry } from "../../context/ThingsBoardContext";
import { useMemo } from "react";
import {
  LuGauge,
  LuShieldCheck,
  LuWaves,
  LuDownload,
  LuClipboardList,
  LuTrendingUp,
  LuTrendingDown,
  LuClock3,
} from "react-icons/lu";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import MetricCard from "../../components/MetricCard";
import StatusPill from "../../components/StatusPill";

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
    .reverse();
};

export default function MainDashboard() {
  const { telemetry, attributes, isConnected, latestTs, isLoading } =
    useTelemetry();

  // Prioritize ThingsBoard's official 'active' attribute, fallback to recent telemetry
  const isDeviceActive =
    isConnected &&
    (attributes.active === true ||
      (latestTs && Date.now() - latestTs < 600000));

  const getLatest = (key, fallback = "--") => {
    if (telemetry[key] && telemetry[key].length > 0) {
      return telemetry[key][0][1];
    }
    return fallback;
  };

  const level = getLatest("tide_m");
  const distance = getLatest("distance_cm");

  // Trend logic
  const getTrend = (key) => {
    if (telemetry[key] && telemetry[key].length >= 2) {
      const current = parseFloat(telemetry[key][0][1]);
      const previous = parseFloat(telemetry[key][1][1]);
      if (current > previous) return "up";
      if (current < previous) return "down";
    }
    return null;
  };

  const tideTrend = getTrend("tide_m");

  // Min/Max for the current session
  const stats = useMemo(() => {
    const readings = telemetry["tide_m"] || [];
    if (readings.length === 0) return { min: "--", max: "--" };
    const values = readings.map((r) => parseFloat(r[1]));
    return {
      min: Math.min(...values).toFixed(2),
      max: Math.max(...values).toFixed(2),
    };
  }, [telemetry]);

  const formatVal = (val, decimals = 2) => {
    const num = parseFloat(val);
    return isNaN(num) ? val : num.toFixed(decimals);
  };

  // Format data for chart with dual axis
  const chartData = useMemo(() => {
    const tideReadings = telemetry["tide_m"] || [];
    const distReadings = telemetry["distance_cm"] || [];

    // Create a map of timestamps to values for efficient lookup
    const dataMap = new Map();

    tideReadings.forEach(([ts, val]) => {
      dataMap.set(ts, { ts, tide: parseFloat(val), distance: null });
    });

    distReadings.forEach(([ts, val]) => {
      // Find the closest tide timestamp within 2 seconds if not exact match
      let targetTs = ts;
      if (!dataMap.has(ts)) {
        for (const existingTs of dataMap.keys()) {
          if (Math.abs(existingTs - ts) < 2000) {
            targetTs = existingTs;
            break;
          }
        }
      }

      if (dataMap.has(targetTs)) {
        dataMap.get(targetTs).distance = parseFloat(val);
      } else {
        dataMap.set(ts, { ts, tide: null, distance: parseFloat(val) });
      }
    });

    // Convert map to array, sort OLDER to NEWER for chart
    return Array.from(dataMap.values())
      .sort((a, b) => a.ts - b.ts);
  }, [telemetry]);

  // Derived data for display
  const displayData = useMemo(() => {
    return chartData.map((item) => ({
      ...item,
      time: new Date(item.ts).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      tideLabel: item.tide !== null ? item.tide.toFixed(2) : "--",
      distanceLabel: item.distance !== null ? item.distance.toFixed(1) : "--",
    }));
  }, [chartData]);

  const downloadCSV = () => {
    if (displayData.length === 0) return;
    const headers = ["Timestamp", "Tide Level (m)", "Sensor Distance (cm)"];
    const rows = displayData.map((d) => [
      new Date(d.ts).toLocaleString(),
      d.tideLabel,
      d.distanceLabel,
    ]);
    const csvContent =
      "data:text/csv;charset=utf-8," +
      headers.join(",") +
      "\n" +
      rows.map((e) => e.join(",")).join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute(
      "download",
      `tidewatch_data_${new Date().toISOString().split("T")[0]}.csv`,
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const lastUpdatedStr = latestTs
    ? new Date(latestTs).toLocaleTimeString()
    : "Never";

  return (
    <div className="min-h-screen bg-surface text-on-surface font-manrope selection:bg-primary-fixed selection:text-on-primary-fixed">
      <main className="mx-auto max-w-7xl px-6 py-8 md:py-10">
        <section id="overview" className="mb-10 grid gap-8 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <div className="mb-4 flex items-center gap-3">
              <span className="text-sm font-bold uppercase tracking-[0.2em] text-on-surface-variant">
                Live Data Monitor
              </span>
              {isLoading ? (
                <span className="flex items-center gap-1.5 rounded-full bg-surface-container-high px-2 py-0.5 text-[10px] font-bold text-on-surface-variant uppercase tracking-widest animate-pulse">
                  <span className="h-1.5 w-1.5 rounded-full bg-on-surface-variant/30" />
                  Checking...
                </span>
              ) : (
                isDeviceActive && (
                  <span className="flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] font-bold text-emerald-600 uppercase tracking-widest animate-pulse">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                    Live
                  </span>
                )
              )}
            </div>

            <h1 className="text-4xl font-black tracking-tight text-primary md:text-6xl">
              Station Metrics
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-on-surface-variant md:text-lg">
              Real-time tide monitoring powered by ultrasonic sensing. This
              dashboard tracks water levels and sensor performance directly from
              the field node.
            </p>
          </div>

          <div className="lg:col-span-4">
            <div className="rounded-[1.75rem] bg-primary p-6 text-on-primary shadow-lg shadow-primary/10 md:p-8">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-on-primary/75">
                    Stream Health
                  </p>
                  <h2 className="mt-3 text-3xl font-black tracking-tight">
                    {isLoading
                      ? "Checking..."
                      : isDeviceActive
                        ? "Active"
                        : isConnected
                          ? "Standby"
                          : "Offline"}
                  </h2>
                </div>
                <div className="rounded-full bg-on-primary/10 p-3">
                  <LuShieldCheck size={20} />
                </div>
              </div>

              <div className="mt-6 space-y-3">
                <div className="flex items-center justify-between rounded-2xl bg-on-primary/10 px-4 py-3">
                  <span className="text-sm font-semibold text-on-primary/80">
                    Latest Sync
                  </span>
                  <span className="text-sm font-bold text-on-primary">
                    {lastUpdatedStr}
                  </span>
                </div>
                <div className="flex items-center justify-between rounded-2xl bg-on-primary/10 px-4 py-3">
                  <span className="text-sm font-semibold text-on-primary/80">
                    Status
                  </span>
                  <span className="text-sm font-bold text-on-primary uppercase tracking-widest text-[10px]">
                    {isLoading
                      ? "Checking..."
                      : isDeviceActive
                        ? "Online"
                        : isConnected
                          ? "Connected"
                          : "Disconnected"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section
          id="analytics"
          className="mb-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          <MetricCard
            label="Current Tide"
            value={`${formatVal(level)} m`}
            helper="Water level reading"
            icon={LuWaves}
            trend={tideTrend}
          />
          <MetricCard
            label="Sensor Distance"
            value={`${formatVal(distance, 1)} cm`}
            helper="Ultrasonic return"
            icon={LuGauge}
          />
          <MetricCard
            label="Daily High"
            value={`${stats.max} m`}
            helper="Highest recorded today"
            icon={LuTrendingUp}
          />
          <MetricCard
            label="Daily Low"
            value={`${stats.min} m`}
            helper="Lowest recorded today"
            icon={LuTrendingDown}
          />
        </section>

        <section id="charts" className="grid gap-6 lg:grid-cols-12">
          <div className="lg:col-span-8 rounded-[1.75rem] border border-outline-variant/10 bg-surface-container-lowest p-6 shadow-sm md:p-8">
            <div className="mb-6 flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.22em] text-on-surface-variant">
                  Telemetry Trend
                </p>
                <h2 className="mt-2 text-2xl font-black tracking-tight text-primary md:text-3xl">
                  Historical Comparison
                </h2>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <StatusPill
                  tone={
                    isLoading
                      ? "safe"
                      : isDeviceActive
                        ? "safe"
                        : isConnected
                          ? "warning"
                          : "danger"
                  }
                >
                  {isLoading
                    ? "Checking..."
                    : isDeviceActive
                      ? "Real-time"
                      : "Standby"}
                </StatusPill>
              </div>
            </div>

            <div className="h-64 sm:h-80 md:h-96 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={displayData}
                  margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
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
                    tick={{ fill: "#3f484b", fontSize: 10 }}
                    minTickGap={30}
                  />
                  <YAxis
                    yId="left"
                    tickLine={false}
                    axisLine={false}
                    tick={{ fill: "#004451", fontSize: 10, fontWeight: "bold" }}
                    width={40}
                  />
                  <YAxis
                    yId="right"
                    orientation="right"
                    tickLine={false}
                    axisLine={false}
                    tick={{ fill: "#8cd1e4", fontSize: 10, fontWeight: "bold" }}
                    width={40}
                  />
                  <Tooltip
                    contentStyle={{
                      borderRadius: 16,
                      border: "1px solid rgba(191, 200, 203, 0.35)",
                      background: "#ffffff",
                      boxShadow: "0 8px 24px rgba(23, 28, 31, 0.08)",
                      fontSize: "12px",
                    }}
                  />
                  <Legend wrapperStyle={{ fontSize: "12px", paddingTop: "10px" }} />
                  <Line
                    yId="left"
                    type="monotone"
                    dataKey="tide"
                    name="Tide Level (m)"
                    stroke="#004451"
                    strokeWidth={3}
                    dot={{ r: 3, strokeWidth: 0, fill: "#004451" }}
                    activeDot={{ r: 5 }}
                    connectNulls
                  />
                  <Line
                    yId="right"
                    type="monotone"
                    dataKey="distance"
                    name="Sensor Distance (cm)"
                    stroke="#8cd1e4"
                    strokeWidth={2}
                    strokeDasharray="5 5"
                    dot={{ r: 2, strokeWidth: 0, fill: "#8cd1e4" }}
                    activeDot={{ r: 4 }}
                    connectNulls
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="lg:col-span-4 flex flex-col gap-6">
            <div className="rounded-[1.75rem] border border-outline-variant/10 bg-surface-container-lowest p-6 shadow-sm md:p-8">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.22em] text-on-surface-variant">
                    System Notes
                  </p>
                  <h3 className="mt-2 text-2xl font-black tracking-tight text-primary">
                    Live Diagnostics
                  </h3>
                </div>
                <LuClipboardList className="text-primary" size={22} />
              </div>

              <div className="mt-6 space-y-4">
                <div className="flex items-center justify-between rounded-2xl bg-surface-container-low px-4 py-3">
                  <span className="text-sm font-semibold text-on-surface-variant">
                    WebSocket
                  </span>
                  <span
                    className={`text-sm font-bold ${isConnected ? "text-primary" : "text-error"}`}
                  >
                    {isConnected ? "Stable" : "Disconnected"}
                  </span>
                </div>
                <div className="flex items-center justify-between rounded-2xl bg-surface-container-low px-4 py-3">
                  <span className="text-sm font-semibold text-on-surface-variant">
                    Update Rate
                  </span>
                  <span className="text-sm font-bold text-primary">
                    Real-time
                  </span>
                </div>
              </div>
              <div className="mt-6 flex items-center gap-3 rounded-2xl bg-primary/5 px-4 py-4">
                <LuClock3 className="text-primary" size={18} />
                <p className="text-sm text-on-surface-variant">
                  {isConnected
                    ? `Latest reading: ${lastUpdatedStr}`
                    : "Waiting for connection..."}
                </p>
              </div>
            </div>

            <div className="rounded-[1.75rem] bg-secondary-container p-6 md:p-8">
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-on-secondary-container">
                Data Export
              </p>
              <p className="mt-4 text-sm leading-relaxed text-on-secondary-container/80">
                Download the currently visible telemetry data as a CSV file for
                offline analysis.
              </p>
              <button
                type="button"
                onClick={downloadCSV}
                disabled={displayData.length === 0}
                className="mt-6 inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-surface px-5 py-3.5 font-bold text-primary transition-all hover:bg-primary-fixed active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Download CSV
                <LuDownload size={16} />
              </button>
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
                History
              </p>
              <h2 className="mt-2 text-2xl font-black tracking-tight text-primary">
                Recent Records
              </h2>
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
                  <th className="px-6 py-4 text-[10px) font-black uppercase tracking-widest text-on-surface-variant">
                    Tide Level (m)
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant/10">
                {[...displayData].reverse().slice(0, 10).map((row) => (
                  <tr
                    key={row.ts}
                    className="transition-colors hover:bg-surface-container-low/50"
                  >
                    <td className="px-6 py-4 text-xs font-mono font-medium text-on-surface">
                      {new Date(row.ts).toLocaleString()}
                    </td>
                    <td className="px-6 py-4 text-xs font-bold text-primary">
                      {row.distanceLabel}
                    </td>
                    <td className="px-6 py-4 text-xs font-bold text-primary">
                      {row.tideLabel}
                    </td>
                  </tr>
                ))}
                {displayData.length === 0 && (
                  <tr>
                    <td
                      colSpan={4}
                      className="px-6 py-12 text-center text-sm font-medium text-on-surface-variant italic"
                    >
                      Waiting for field node to push telemetry...
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>

        <section
          id="alerts"
          className="mt-10 rounded-[1.75rem] border border-outline-variant/10 bg-surface-container-lowest p-6 shadow-sm md:p-8"
        >
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-on-surface-variant">
            Activity Stream
          </p>
          <div className="mt-6 space-y-4">
            {[...displayData].reverse().slice(0, 5).map((row) => (
              <div
                key={row.ts}
                className="rounded-2xl bg-surface-container-low px-4 py-4"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <StatusPill>Reading</StatusPill>
                    <p className="text-sm font-bold text-on-surface">
                      New telemetry received: {row.tideLabel}m (Dist: {row.distanceLabel}cm)
                    </p>
                  </div>
                  <span className="text-xs font-bold uppercase tracking-[0.22em] text-on-surface-variant">
                    {new Date(row.ts).toLocaleTimeString()}
                  </span>
                </div>
              </div>
            ))}

            {/* System default logs if no data */}
            <div className="rounded-2xl bg-surface-container-low px-4 py-4 opacity-60">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <StatusPill tone={isConnected ? "safe" : "danger"}>
                    System
                  </StatusPill>
                  <p className="text-sm font-bold text-on-surface">
                    {isConnected
                      ? "ThingsBoard WebSocket connection established."
                      : "Attempting to connect to ThingsBoard Cloud..."}
                  </p>
                </div>
                <span className="text-xs font-bold uppercase tracking-[0.22em] text-on-surface-variant">
                  Core
                </span>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
