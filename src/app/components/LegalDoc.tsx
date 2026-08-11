import { Fragment } from "react";
import CTABand from "./CTABand";
import ReadingProgress from "./ReadingProgress";

/**
 * Shared shell for the long-form legal pages (/terms, /privacy).
 *
 * Section `id`s are written out in the content files rather than derived from
 * headings: these anchors get pasted into emails and cited in support threads,
 * so they must survive a copy edit to the heading text.
 */
export type LegalBlock =
  | { type: "h"; id: string; n: number; title: string; short?: string }
  | { type: "p"; text: string }
  | { type: "ul"; items: string[] }
  /** All-caps statutory notices (arbitration, warranty disclaimers, etc.). */
  | { type: "note"; text: string };

export type LegalDocContent = {
  title: string;
  breadcrumb: string;
  subtitle: string;
  byline?: string;
  /** ISO date. Rendered as the visible "Last updated" stamp. */
  updated: string;
  blocks: LegalBlock[];
};

/** Splits `**bold**` runs out of a string into React nodes. */
function richText(text: string) {
  return text.split(/\*\*(.+?)\*\*/g).map((chunk, i) =>
    i % 2 === 1 ? (
      <strong key={i} className="font-semibold text-ink">
        {chunk}
      </strong>
    ) : (
      <Fragment key={i}>{chunk}</Fragment>
    ),
  );
}

function formatUpdated(iso: string) {
  const [y, m, d] = iso.split("-");
  return `${m}/${d}/${y}`;
}

export default function LegalDoc({ doc }: { doc: LegalDocContent }) {
  const sections = doc.blocks.filter((b) => b.type === "h");

  return (
    <>
      <header className="bg-navy px-5 py-14 sm:px-10 sm:py-20">
        <div className="mx-auto max-w-[1080px]">
          <nav className="text-[13px] text-[#a8ceff]">
            <span>Legal</span>
            <span className="px-2 text-[#4b6cb7]">/</span>
            <span>{doc.breadcrumb}</span>
          </nav>
          <h1 className="mt-8 font-serif text-[40px] font-normal leading-[1.1] text-white sm:text-[52px]">
            {doc.title}
          </h1>
          <p className="mt-5 text-xs font-medium uppercase tracking-[0.24px] text-[#a8ceff]">
            Last updated{" "}
            <time dateTime={doc.updated}>{formatUpdated(doc.updated)}</time> ·{" "}
            {sections.length} sections
          </p>
          <p className="mt-5 max-w-[720px] text-[17px] leading-[26px] text-[#a8ceff]">
            {doc.subtitle}
          </p>
          {doc.byline ? (
            <p className="mt-6 text-[13px] text-[#4b6cb7]">{doc.byline}</p>
          ) : null}
        </div>
      </header>

      <ReadingProgress />

      <div className="bg-white px-5 py-14 sm:px-10">
        <div className="mx-auto flex max-w-[1080px] flex-col gap-12 lg:flex-row lg:gap-10">
          <nav
            aria-label="Contents"
            className="hidden lg:block lg:w-[240px] lg:shrink-0"
          >
            <div className="lg:sticky lg:top-[110px]">
              <h2 className="text-base font-semibold text-ink">Contents</h2>
              <ul className="mt-4 flex flex-col gap-[9px]">
                {sections.map((s) => (
                  <li key={s.id}>
                    <a
                      href={`#${s.id}`}
                      className="text-[13px] leading-5 text-muted transition-colors hover:text-navy"
                    >
                      {s.n}. {s.short ?? s.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </nav>

          <article className="lg:w-[720px] lg:shrink-0">
            {doc.blocks.map((block, i) => {
              if (block.type === "h") {
                return (
                  <h2
                    key={block.id}
                    id={block.id}
                    className="mt-10 mb-4 scroll-mt-[130px] text-[26px] font-semibold leading-[34px] text-ink first:mt-0"
                  >
                    {block.n}. {block.title}
                  </h2>
                );
              }
              if (block.type === "note") {
                return (
                  <p
                    key={i}
                    className="mb-6 text-[18px] font-bold leading-[28px] text-ink"
                  >
                    {richText(block.text)}
                  </p>
                );
              }
              if (block.type === "ul") {
                return (
                  <ul
                    key={i}
                    className="mb-6 list-disc space-y-3 pl-5 text-[18px] leading-[28px] text-slate"
                  >
                    {block.items.map((item, j) => (
                      <li key={j}>{richText(item)}</li>
                    ))}
                  </ul>
                );
              }
              return (
                <p key={i} className="mb-6 text-[18px] leading-[28px] text-slate">
                  {richText(block.text)}
                </p>
              );
            })}
          </article>
        </div>
      </div>

      <CTABand role="homeowner" />
    </>
  );
}
