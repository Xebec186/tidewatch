export default function StatusPill({ children, tone = "safe" }) {
  const styles =
    tone === "danger"
      ? "bg-error-container text-on-error-container"
      : "bg-tertiary-container/10 text-primary";

  return (
    <span
      className={`inline-flex items-center rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-[0.22em] ${styles}`}
    >
      {children}
    </span>
  );
}
