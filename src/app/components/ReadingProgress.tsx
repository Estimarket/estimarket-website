"use client";

import { useEffect, useState } from "react";

/**
 * Thin progress rail pinned under the sticky 72px header.
 *
 * Legal pages run long (the Terms are ~9k px tall), so the rail is the only
 * affordance telling a reader how much of a document is left.
 */
export default function ReadingProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const update = () => {
      const scrollable =
        document.documentElement.scrollHeight - window.innerHeight;
      setProgress(scrollable > 0 ? window.scrollY / scrollable : 0);
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <div
      aria-hidden
      className="pointer-events-none sticky top-[110px] z-40 h-[4px] w-full bg-[#f3f4f6]"
    >
      <div
        className="h-full bg-brand"
        style={{ width: `${Math.min(1, Math.max(0, progress)) * 100}%` }}
      />
    </div>
  );
}
