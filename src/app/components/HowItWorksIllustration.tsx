import fs from "fs";
import path from "path";

type HowItWorksIllustrationProps = {
  src: string;
};

function prepareInlineSvg(svg: string): string {
  return svg
    .replace(/<svg[^>]*>/, (tag) => {
      const viewBoxMatch = tag.match(/viewBox="([^"]+)"/);
      const viewBox = viewBoxMatch?.[1] ?? "0 0 596 578";
      return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${viewBox}" width="100%" preserveAspectRatio="xMidYMid meet" aria-hidden="true" style="display:block;max-width:100%;height:auto">`;
    })
    .replace(/<style>@import[^<]*<\/style>/, "");
}

export default function HowItWorksIllustration({
  src,
}: HowItWorksIllustrationProps) {
  const filePath = path.join(process.cwd(), "public", src.replace(/^\//, ""));
  const svg = prepareInlineSvg(fs.readFileSync(filePath, "utf8"));

  return (
    <div
      className="mx-auto min-w-0 w-full max-w-[min(560px,calc(100dvw-2.5rem))] overflow-hidden [&_svg]:mx-auto [&_svg]:block [&_svg]:h-auto [&_svg]:max-w-full"
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
}
