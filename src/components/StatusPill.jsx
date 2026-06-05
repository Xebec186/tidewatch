export default function StatusPill({ label, tone = "safe" }) {
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
