export default function AuthFooter() {
  return (
    <footer className="mt-12 text-center">
      <p className="text-[10px] uppercase tracking-[0.2em] text-slate-500">
        © {new Date().getFullYear()} TideWatch IoT. Fluid Intelligence Systems.
      </p>
      <div className="mt-4 flex justify-center gap-6">
        <a
          href="#"
          className="text-[10px] uppercase tracking-widest text-slate-400 transition-colors hover:text-primary"
        >
          Privacy Policy
        </a>
        <a
          href="#"
          className="text-[10px] uppercase tracking-widest text-slate-400 transition-colors hover:text-primary"
        >
          Terms of Service
        </a>
      </div>
    </footer>
  );
}
