import Link from "next/link";

type LogoProps = {
  className?: string;
  /** Tailwind text-size class for the wordmark, e.g. "text-xl" */
  wordmarkClassName?: string;
  markSize?: number;
};

export default function Logo({
  className,
  wordmarkClassName = "text-xl",
  markSize = 32,
}: LogoProps) {
  return (
    <Link
      href="/"
      aria-label="Estimarket home"
      className={`flex items-center gap-2 ${className ?? ""}`}
    >
      <svg
        width={markSize}
        height={markSize}
        viewBox="0 0 32 32"
        fill="none"
        aria-hidden="true"
        className="shrink-0"
      >
        <rect width="32" height="32" rx="8" fill="var(--color-navy)" />
        <rect x="7" y="9" width="18" height="3.2" rx="1.6" fill="#ffffff" />
        <rect x="7" y="14.4" width="12" height="3.2" rx="1.6" fill="var(--color-brand)" />
        <rect x="7" y="19.8" width="15" height="3.2" rx="1.6" fill="#ffffff" />
      </svg>
      <span className={`font-bold tracking-tight ${wordmarkClassName}`}>
        <span className="text-navy">Esti</span>
        <span className="text-brand">market</span>
      </span>
    </Link>
  );
}
