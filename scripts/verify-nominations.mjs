import { readFileSync } from "node:fs";
import { createClient } from "@supabase/supabase-js";

const env = Object.fromEntries(
  readFileSync(new URL("../.env.local", import.meta.url), "utf8")
    .split("\n")
    .filter((l) => l && !l.trimStart().startsWith("#") && l.includes("="))
    .map((l) => {
      const i = l.indexOf("=");
      return [l.slice(0, i).trim(), l.slice(i + 1).trim()];
    })
);

const supabase = createClient(
  env.NEXT_PUBLIC_SUPABASE_URL,
  env.SUPABASE_SERVICE_ROLE_KEY,
  { auth: { persistSession: false } }
);

const testCity = `Verify City ${Date.now()}`;

console.log("URL:", env.NEXT_PUBLIC_SUPABASE_URL);

// 1) Can we read the table at all?
const read = await supabase.from("city_nominations").select("*").limit(1);
if (read.error) {
  console.error("READ FAILED:", read.error);
  process.exit(1);
}
console.log("READ ok. Sample columns:", Object.keys(read.data[0] ?? {}));

// 2) Insert a row.
const ins = await supabase
  .from("city_nominations")
  .insert({ city: testCity, source: "verify-script" });
if (ins.error) {
  console.error("INSERT FAILED:", ins.error);
  process.exit(1);
}
console.log("INSERT ok.");

// 3) Clean up the test row.
const del = await supabase
  .from("city_nominations")
  .delete()
  .eq("city", testCity);
console.log("CLEANUP:", del.error ? `failed: ${del.error.message}` : "ok");

console.log("\nAll checks passed.");
