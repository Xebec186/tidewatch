export default function Footer() {
  return (
    <footer className="w-full border-t border-black/5 bg-surface py-10 mt-auto">
      <div className="mx-auto max-w-7xl px-6 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-lg font-extrabold tracking-tight text-primary">
            TideWatch
          </p>
          <p className="mt-2 text-xs uppercase tracking-[0.22em] text-neutral">
            © {new Date().getFullYear()} TideWatch IoT. Fluid Intelligence
            Systems.
          </p>
        </div>

        <div className="flex flex-wrap gap-x-8 gap-y-3 md:justify-end">
          {["Privacy Policy", "Terms of Service", "Contact Support"].map(
            (item) => (
              <a
                key={item}
                href="#"
                className="text-xs uppercase tracking-[0.18em] text-neutral underline underline-offset-4 hover:text-primary transition-colors"
              >
                {item}
              </a>
            ),
          )}
        </div>
      </div>
    </footer>
  );
}
