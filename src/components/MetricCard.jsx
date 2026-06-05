import { LuTrendingUp, LuTrendingDown } from "react-icons/lu";

export default function MetricCard({
  label,
  value,
  helper,
  icon: Icon,
  tone = "default",
  trend = null,
}) {
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
      <div className="flex items-start justify-between">
        <div
          className={`mb-5 flex h-12 w-12 items-center justify-center rounded-xl ${iconWrap}`}
        >
          <Icon size={22} />
        </div>
        {trend && (
          <div
            className={`flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest ${trend === "up" ? "text-emerald-500" : "text-amber-500"}`}
          >
            {trend === "up" ? (
              <LuTrendingUp size={14} />
            ) : (
              <LuTrendingDown size={14} />
            )}
            {trend === "up" ? "Rising" : "Falling"}
          </div>
        )}
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
