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

const testRow = {
  email: `verify+${Date.now()}@estimarket.test`,
  zip_code: "00000",
  role: "homeowner",
  source: "verify-script",
};

console.log("URL:", env.NEXT_PUBLIC_SUPABASE_URL);

// 1) Can we read the table at all?
const read = await supabase.from("waitlist_signups").select("*").limit(1);
if (read.error) {
  console.error("READ FAILED:", read.error);
  process.exit(1);
}
console.log("READ ok. Sample columns:", Object.keys(read.data[0] ?? {}));

// 2) Does the upsert (with onConflict email,role) work? This requires the
//    unique constraint to exist, otherwise Postgres returns code 42P10.
const up1 = await supabase
  .from("waitlist_signups")
  .upsert(testRow, { onConflict: "email,role", ignoreDuplicates: true });
if (up1.error) {
  console.error("UPSERT FAILED:", up1.error);
  if (up1.error.code === "42P10") {
    console.error(
      "\n>>> Missing unique constraint on (email, role). Add one in Supabase."
    );
  }
  process.exit(1);
}
console.log("UPSERT ok (insert).");

// 3) Repeat to confirm duplicate is ignored, not errored.
const up2 = await supabase
  .from("waitlist_signups")
  .upsert(testRow, { onConflict: "email,role", ignoreDuplicates: true });
console.log(
  "UPSERT ok (duplicate ignored):",
  up2.error ? `ERROR ${up2.error.message}` : "no error"
);

// 4) Clean up the test row.
const del = await supabase
  .from("waitlist_signups")
  .delete()
  .eq("email", testRow.email);
console.log("CLEANUP:", del.error ? `failed: ${del.error.message}` : "ok");

console.log("\nAll checks passed.");
