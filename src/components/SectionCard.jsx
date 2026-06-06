export default function SectionCard({ children, className = "" }) {
  return (
    <section
      className={`rounded-[1.75rem] border border-outline-variant/10 bg-surface-container-lowest p-6 shadow-sm md:p-8 ${className}`}
    >
      {children}
    </section>
  );
}
