export default function SectionCard({ children, className = "" }) {
  return (
    <section
      className={`rounded-[1.75rem] border border-outline-variant/10 bg-surface-container-lowest p-5 sm:p-6 md:p-8 shadow-sm ${className}`}
    >
      {children}
    </section>
  );
}
