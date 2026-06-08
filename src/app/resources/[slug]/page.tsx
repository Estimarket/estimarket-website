import Link from "next/link";
import { notFound } from "next/navigation";
import CTABand from "../../components/CTABand";
import { ARTICLES, getArticle } from "../articles";

export const dynamicParams = false;

export function generateStaticParams() {
  return ARTICLES.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) return {};
  return {
    title: `${article.title} — Estimarket`,
    description: article.subtitle,
  };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();

  return (
    <>
      <header className="bg-navy px-5 py-14 sm:px-10 sm:py-20">
        <div className="mx-auto max-w-[860px]">
          <nav className="text-[13px] text-[#a8ceff]">
            <Link href="/resources" className="hover:underline">
              Insights
            </Link>
            <span className="px-2 text-[#4b6cb7]">/</span>
            <span>{article.category}</span>
          </nav>
          <p className="mt-8 text-xs font-medium uppercase tracking-[0.24px] text-[#a8ceff]">
            {article.kicker}
          </p>
          <h1 className="mt-3 font-serif text-[40px] font-normal leading-[1.1] text-white sm:text-[52px]">
            {article.title}
          </h1>
          <p className="mt-5 max-w-[720px] text-[17px] leading-[26px] text-[#a8ceff]">
            {article.subtitle}
          </p>
          <p className="mt-6 text-[13px] text-[#4b6cb7]">{article.byline}</p>
        </div>
      </header>

      <article className="bg-white px-5 py-14 sm:px-10">
        <div className="mx-auto max-w-[720px]">
          {article.intro.map((p, i) => (
            <p
              key={i}
              className="mb-6 text-[18px] leading-[28px] text-slate"
            >
              {p}
            </p>
          ))}

          {article.blocks.map((block, i) => {
            if (block.type === "h") {
              return (
                <h2
                  key={i}
                  className="mt-10 mb-4 text-[26px] font-semibold leading-[34px] text-ink"
                >
                  {block.text}
                </h2>
              );
            }
            if (block.type === "quote") {
              return (
                <blockquote
                  key={i}
                  className="my-8 border-l-4 border-accent pl-6 font-serif text-[22px] leading-[32px] text-ink"
                >
                  {block.text}
                </blockquote>
              );
            }
            return (
              <p key={i} className="mb-6 text-[18px] leading-[28px] text-slate">
                {block.text}
              </p>
            );
          })}

          {article.sources?.length ? (
            <div className="mt-12 border-t border-line pt-6">
              <h3 className="text-base font-semibold text-ink">Sources</h3>
              <ol className="mt-3 list-decimal space-y-1 pl-5 text-[13px] leading-5 text-muted">
                {article.sources.map((s, i) => (
                  <li key={i}>{s}</li>
                ))}
              </ol>
            </div>
          ) : null}

          <div className="mt-12">
            <Link
              href="/resources"
              className="text-sm font-semibold text-accent hover:underline"
            >
              ← Back to The Rebuild
            </Link>
          </div>
        </div>
      </article>

      <CTABand role="homeowner" />
    </>
  );
}
