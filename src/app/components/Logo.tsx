import Image from "next/image";
import Link from "next/link";

// Lockups are SVG and come straight from the logo package — see
// .claude/skills/estimarket-design/assets/logo/LOGO-PACKAGE.md. The wordmark is Staatliches
// converted to outlines, so nothing here needs the font, and the spacing between mark and
// wordmark is part of the artwork: place the file, never rebuild it from parts.
const VIEWBOX = { w: 470.1, h: 100 };

const LOCKUPS = {
  // Two-tone on light. In the nav its orange sits a long way from the Get started button,
  // so the two oranges don't compete.
  primary: "/brand/lockup-primary.svg",
  // On navy and other dark fields.
  reverse: "/brand/lockup-reverse.svg",
  // Single-colour, for anywhere the logo lands next to a CTA or on an orange-heavy page.
  navy: "/brand/lockup-navy.svg",
} as const;

type LogoVariant = keyof typeof LOCKUPS;

type LogoProps = {
  className?: string;
  /** Lockup height in pixels; width scales from the asset aspect ratio. The package's
   *  minimum is 120px wide — height 26 and up. */
  height?: number;
  variant?: LogoVariant;
};

export default function Logo({
  className,
  height = 32,
  variant = "primary",
}: LogoProps) {
  const width = Math.round((height / VIEWBOX.h) * VIEWBOX.w);

  return (
    <Link
      href="/"
      aria-label="Estimarket home"
      className={`inline-flex shrink-0 ${className ?? ""}`}
    >
      <Image
        src={LOCKUPS[variant]}
        alt="Estimarket"
        width={width}
        height={height}
        priority
        // An SVG has nothing for the image optimizer to do, and Next blocks it there
        // unless dangerouslyAllowSVG is on — which would also open up remote SVGs.
        unoptimized
        className="h-auto w-auto"
        style={{ height, width: "auto", maxWidth: "none" }}
      />
    </Link>
  );
}
