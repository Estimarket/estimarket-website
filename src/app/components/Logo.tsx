import Image from "next/image";
import Link from "next/link";

const LOCKUPS = {
  color: { src: "/brand/lockup-color.png", w: 630, h: 128 },
  "mono-navy": { src: "/brand/lockup-mono-navy.png", w: 630, h: 128 },
  reverse: { src: "/brand/lockup-reverse.png", w: 630, h: 128 },
} as const;

type LogoVariant = keyof typeof LOCKUPS;

type LogoProps = {
  className?: string;
  /** Lockup height in pixels; width scales from the asset aspect ratio. */
  height?: number;
  variant?: LogoVariant;
};

export default function Logo({
  className,
  height = 32,
  variant = "color",
}: LogoProps) {
  const lockup = LOCKUPS[variant];
  const width = Math.round((height / lockup.h) * lockup.w);

  return (
    <Link
      href="/"
      aria-label="Estimarket home"
      className={`inline-flex shrink-0 ${className ?? ""}`}
    >
      <Image
        src={lockup.src}
        alt="Estimarket"
        width={width}
        height={height}
        priority
        className="h-auto w-auto"
        style={{ height, width: "auto", maxWidth: "none" }}
      />
    </Link>
  );
}
