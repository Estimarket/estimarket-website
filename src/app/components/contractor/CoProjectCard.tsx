import Image from "next/image";
import { bidLine, dollars, type CoProject } from "./coDemoData";

// The contractor-facing project tile from (contractor)/marketplace/page.tsx,
// in the sizes /contractors uses: the hero inbox's 2-up grid (104px photo),
// step 01's 3-up grid (132px), and the horizontal row both mobile
// compositions use.

const WELL = "#efe6d6";

function Badge({
  children,
  side,
  tone,
}: {
  children: React.ReactNode;
  side: "left" | "right";
  tone: "navy" | "brand" | "scrim";
}) {
  const bg =
    tone === "brand" ? "bg-brand" : tone === "scrim" ? "bg-navy/75" : "bg-navy";
  return (
    <span
      className={`absolute top-[7px] rounded-[6px] px-[7px] py-[2px] text-[8.5px] font-bold text-white ${bg} ${
        side === "left" ? "left-[7px]" : "right-[7px]"
      }`}
    >
      {children}
    </span>
  );
}

/** The stacked tile. `photoH` is 104 in the hero inbox, 132 in step 01. */
export function ProjectTile({
  project,
  photoH,
  showBadge = true,
}: {
  project: CoProject;
  photoH: 104 | 132;
  /** Step 01's grid drops the NEW / bid-count badge; the hero inbox keeps it. */
  showBadge?: boolean;
}) {
  return (
    <div className="overflow-hidden rounded-[10px] border border-line bg-white">
      <div className="relative" style={{ height: photoH, background: WELL }}>
        <Image
          src={project.photo}
          alt=""
          fill
          sizes="220px"
          className="object-cover"
          style={{ objectPosition: project.focal ?? "50% 50%" }}
        />
        <Badge side="left" tone="navy">
          {project.type}
        </Badge>
        {showBadge &&
          (project.isNew ? (
            <Badge side="right" tone="brand">
              NEW
            </Badge>
          ) : project.bids ? (
            <Badge side="right" tone="scrim">
              {project.bids}
            </Badge>
          ) : null)}
      </div>

      <div className={photoH === 104 ? "p-[9px_10px_10px]" : "p-[10px]"}>
        <div className="text-[11.5px] font-bold leading-[1.3] tracking-[-0.01em] text-ink">
          {project.title}
        </div>
        <div
          className={`text-[9px] text-muted ${photoH === 104 ? "mt-1" : "mt-[5px]"}`}
        >
          {project.meta}
        </div>

        {photoH === 104 ? (
          <>
            <div className="mt-2 text-[8px] font-medium tracking-[0.04em] text-muted">
              Budget
            </div>
            <div className="mt-px flex items-end justify-between">
              <span className="text-[11px] font-bold tabular-nums text-ink">
                {dollars(project.budget)}
              </span>
              <ReviewButton />
            </div>
          </>
        ) : (
          <div className="mt-[9px] flex items-end justify-between">
            <div>
              <div className="text-[8px] font-medium tracking-[0.04em] text-muted">
                Budget
              </div>
              <div className="text-[11px] font-bold tabular-nums text-ink">
                {dollars(project.budget)}
              </div>
            </div>
            <ReviewButton />
          </div>
        )}
      </div>
    </div>
  );
}

function ReviewButton() {
  return (
    <span className="inline-flex h-5 items-center whitespace-nowrap rounded-[6px] bg-accent px-[9px] text-[8.5px] font-bold text-white">
      Review + bid
    </span>
  );
}

/** The horizontal row both mobile compositions use. `thumb` is 58 in the hero
 * inbox, 56 in step 01. */
export function ProjectRow({
  project,
  thumb,
  style,
}: {
  project: CoProject;
  thumb: 56 | 58;
  style?: React.CSSProperties;
}) {
  return (
    <div
      className="flex items-center gap-[10px] rounded-[10px] border border-line p-2"
      style={style}
    >
      <div
        className="relative flex-none overflow-hidden rounded-[8px]"
        style={{ width: thumb, height: thumb, background: WELL }}
      >
        <Image
          src={project.photo}
          alt=""
          fill
          sizes="60px"
          className="object-cover"
          style={{ objectPosition: project.focal ?? "50% 50%" }}
        />
      </div>
      <div className="min-w-0 flex-1">
        {project.isNew ? (
          <div className="flex items-center gap-[6px]">
            <span className="rounded-[4px] bg-brand px-[6px] py-px text-[9.5px] font-bold text-white">
              NEW
            </span>
            <span className="text-[10px] text-muted">{project.type}</span>
          </div>
        ) : (
          <div className="text-[10px] text-muted">{bidLine(project)}</div>
        )}
        <div className="mt-[3px] text-[12.5px] font-bold text-ink">
          {project.title}
        </div>
        <div className="mt-1 flex items-center justify-between">
          <span className="text-[12.5px] font-bold tabular-nums text-ink">
            {dollars(project.budget)}
          </span>
          <span className="inline-flex h-6 items-center whitespace-nowrap rounded-[6px] bg-accent px-[10px] text-[10.5px] font-bold text-white">
            Review + bid
          </span>
        </div>
      </div>
    </div>
  );
}
