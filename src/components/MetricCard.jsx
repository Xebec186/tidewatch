export default function MetricCard({ label, value, helper, icon: Icon }) {
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
