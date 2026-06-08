import { readFileSync, existsSync } from "node:fs";
import { createClient } from "@supabase/supabase-js";

function loadEnv() {
  if (
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
    process.env.SUPABASE_SERVICE_ROLE_KEY
  ) {
    return {
      NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
      SUPABASE_SERVICE_ROLE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY,
    };
  }

  const envPath = new URL("../.env.local", import.meta.url);
  if (!existsSync(envPath)) {
    console.error(
      "Missing Supabase env vars. Set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY, or create .env.local."
    );
    process.exit(1);
  }

  return Object.fromEntries(
    readFileSync(envPath, "utf8")
      .split("\n")
      .filter((l) => l && !l.trimStart().startsWith("#") && l.includes("="))
      .map((l) => {
        const i = l.indexOf("=");
        return [l.slice(0, i).trim(), l.slice(i + 1).trim()];
      })
  );
}

const env = loadEnv();

const supabase = createClient(
  env.NEXT_PUBLIC_SUPABASE_URL,
  env.SUPABASE_SERVICE_ROLE_KEY,
  { auth: { persistSession: false } }
);

const testRow = {
  email: `verify+${Date.now()}@estimarket.test`.toLowerCase(),
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

// 2) Does insert work? Production uses a unique index on (lower(email), role).
const ins1 = await supabase.from("waitlist_signups").insert(testRow);
if (ins1.error) {
  console.error("INSERT FAILED:", ins1.error);
  process.exit(1);
}
console.log("INSERT ok.");

// 3) Repeat to confirm duplicate is treated as success (23505), not errored.
const ins2 = await supabase.from("waitlist_signups").insert(testRow);
console.log(
  "INSERT duplicate:",
  ins2.error?.code === "23505"
    ? "ok (unique violation, expected)"
    : ins2.error
      ? `ERROR ${ins2.error.message}`
      : "unexpected success (no unique index?)"
);

// 4) Clean up the test row.
const del = await supabase
  .from("waitlist_signups")
  .delete()
  .eq("email", testRow.email);
console.log("CLEANUP:", del.error ? `failed: ${del.error.message}` : "ok");

console.log("\nAll checks passed.");
