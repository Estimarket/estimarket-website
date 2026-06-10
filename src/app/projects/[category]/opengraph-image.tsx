import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const alt = "Estimarket — itemized, comparable bids for your project";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  const image = await readFile(
    join(process.cwd(), "assets/og", `${category}.png`),
  );

  return new Response(new Uint8Array(image), {
    headers: { "Content-Type": contentType },
  });
}
