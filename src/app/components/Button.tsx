import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost" | "marine";

const VARIANTS: Record<Variant, string> = {
  primary: "bg-accent text-white hover:bg-[#d4521b]",
  secondary: "border-[1.5px] border-line bg-white text-slate hover:bg-surface",
  ghost:
    "border-[1.5px] border-white bg-navy text-white hover:bg-white hover:text-navy",
  marine: "bg-marine text-white hover:bg-[#163a7d]",
};

const BASE =
  "inline-flex items-center justify-center rounded-[10px] px-5 py-2.5 text-sm font-semibold transition-colors";

type ButtonAsLink = {
  href: string;
  variant?: Variant;
  className?: string;
  children: ReactNode;
} & Omit<ComponentProps<typeof Link>, "href" | "className" | "children">;

export function ButtonLink({
  href,
  variant = "primary",
  className,
  children,
  ...rest
}: ButtonAsLink) {
  return (
    <Link
      href={href}
      className={`${BASE} ${VARIANTS[variant]} ${className ?? ""}`}
      {...rest}
    >
      {children}
    </Link>
  );
}

type ButtonProps = {
  variant?: Variant;
  className?: string;
  children: ReactNode;
} & ComponentProps<"button">;

export default function Button({
  variant = "primary",
  className,
  children,
  ...rest
}: ButtonProps) {
  return (
    <button
      className={`${BASE} ${VARIANTS[variant]} ${className ?? ""}`}
      {...rest}
    >
      {children}
    </button>
  );
}
