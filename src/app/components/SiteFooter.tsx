import Link from "next/link";
import Logo from "./Logo";

const COLUMNS: { title: string; links: { label: string; href: string }[] }[] = [
  {
    title: "Product",
    links: [
      { label: "Projects", href: "/projects" },
      { label: "Marketplace", href: "#" },
      { label: "For contractors", href: "/contractors" },
      { label: "For homeowners", href: "/homeowners" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About us", href: "/about" },
      { label: "Blog", href: "/resources" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "FAQ", href: "#" },
      { label: "Contact", href: "/contact" },
      { label: "Privacy policy", href: "#" },
      { label: "Terms of service", href: "#" },
    ],
  },
];

export default function SiteFooter() {
  return (
    <footer className="bg-surface">
      <div className="mx-auto max-w-[1440px] px-4 py-12 sm:px-6 lg:px-20">
        <div className="flex flex-col gap-10 lg:flex-row lg:justify-between">
          <div className="max-w-[300px]">
            <Logo height={40} />
            <p className="mt-5 text-base leading-normal text-band-faint">
              A real marketplace for home improvement.
            </p>
            <p className="mt-4 text-base leading-normal text-band-faint">
              Proudly built in Denver, Colorado
            </p>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:gap-16">
            {COLUMNS.map((col) => (
              <div key={col.title}>
                <h3 className="text-[13px] font-bold text-ink">{col.title}</h3>
                <ul className="mt-4 flex flex-col gap-3">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="text-[13px] text-slate transition-colors hover:text-navy"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <hr className="my-8 border-slate/30" />
        <p className="text-xs text-muted">
          © 2025 Estimarket Inc. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
