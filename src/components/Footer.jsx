import { Link } from "react-router-dom";

export default function Footer() {
  const footerLinks = [
    { name: "Privacy Policy", path: "/privacy" },
    { name: "Terms of Service", path: "/terms" },
    { name: "Contact Support", path: "/support" },
  ];

  return (
    <footer className="w-full border-t border-black/5 bg-surface py-8 mt-auto">
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
          {footerLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className="text-xs uppercase tracking-[0.18em] text-neutral underline underline-offset-4 hover:text-primary transition-colors"
            >
              {link.name}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}
