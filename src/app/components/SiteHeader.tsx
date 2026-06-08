"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import Logo from "./Logo";
import { ButtonLink } from "./Button";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/homeowners", label: "For homeowners" },
  { href: "/contractors", label: "For contractors" },
  { href: "/projects", label: "Projects" },
  { href: "/resources", label: "Resources" },
];

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

function PromoBar() {
  return (
    <div className="bg-navy text-white">
      <div className="relative mx-auto flex max-w-[1440px] items-center justify-center px-4 py-2.5">
        <p className="flex items-center gap-2 text-[13px]">
          <span className="size-2 rounded-[4px] bg-promo-dot" aria-hidden="true" />
          Now live in Denver, CO.
        </p>
        <p className="absolute right-20 hidden text-[11px] font-medium text-muted lg:block">
          DENVER · 412 contractors live
        </p>
      </div>
    </div>
  );
}

export default function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50">
      <PromoBar />

      <div className="border-b border-line bg-white">
        <div className="mx-auto flex h-[72px] max-w-[1440px] items-center justify-between px-4 sm:px-6 lg:px-20">
          <Logo wordmarkClassName="text-[22px]" />

          <nav className="hidden items-center gap-8 lg:flex">
            {NAV_LINKS.map((link) => {
              const active = isActive(pathname, link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative text-sm transition-colors ${
                    active
                      ? "font-semibold text-navy"
                      : "font-normal text-muted hover:text-navy"
                  }`}
                >
                  {link.label}
                  {active ? (
                    <span className="absolute -bottom-[26px] left-0 h-[3px] w-full bg-accent" />
                  ) : null}
                </Link>
              );
            })}
          </nav>

          <div className="hidden items-center gap-3 lg:flex">
            <Link
              href="#"
              className="rounded-lg border-[1.5px] border-line px-4 py-2 text-sm font-medium text-slate transition-colors hover:bg-surface"
            >
              Sign in
            </Link>
            <ButtonLink href="/waitlist/homeowner" className="px-5 py-2">
              Get started
            </ButtonLink>
          </div>

          {/* Mobile actions */}
          <div className="flex items-center gap-3 lg:hidden">
            <ButtonLink
              href="/waitlist/homeowner"
              className="bg-brand px-3.5 py-2 text-[13px] hover:bg-[#cf4f1e]"
            >
              Get started
            </ButtonLink>
            <button
              type="button"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
              className="flex flex-col gap-[5px] p-1"
            >
              <span className="h-[2.4px] w-[22px] rounded-[2px] bg-navy" />
              <span className="h-[2.4px] w-[22px] rounded-[2px] bg-navy" />
              <span className="h-[2.4px] w-[22px] rounded-[2px] bg-navy" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile flyout */}
      {open ? (
        <div className="border-b border-line bg-white lg:hidden">
          <nav className="mx-auto flex max-w-[1440px] flex-col px-4 py-2">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className={`border-b border-line py-3 text-base last:border-b-0 ${
                  isActive(pathname, link.href)
                    ? "font-semibold text-navy"
                    : "text-slate"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="#"
              onClick={() => setOpen(false)}
              className="py-3 text-base text-slate"
            >
              Sign in
            </Link>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
