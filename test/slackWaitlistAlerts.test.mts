// Node-runnable tests for the waitlist Slack alert (EST-144; `npm run test:slack`).
// Pins the message layout and the environment rule, and proves the poster never throws — the
// alert runs in `after()` off the sign-up path and must stay a no-op on any failure.

import {
  buildWaitlistSignupMessage,
  escapeMrkdwn,
  isFoundingSignup,
  postSlackMessage,
  resolveAlertEnvironment,
  type WaitlistSignupEvent,
} from "../src/app/lib/slackWaitlistAlerts";

let failures = 0;
const ok = (cond: boolean, msg: string) => {
  if (cond) console.log(`  ✓ ${msg}`);
  else {
    failures += 1;
    console.error(`  ✗ ${msg}`);
  }
};

const base: WaitlistSignupEvent = {
  email: "sam@milehighbaths.com",
  zipCode: "80202",
  role: "homeowner",
  source: "waitlist_homeowner",
  founding: null,
  environment: "production",
  signedUpAt: "2026-09-07T22:00:00.000Z",
};

const blockText = (payload: { blocks: unknown[] }) => JSON.stringify(payload.blocks);

console.log("Environment rule:");
{
  ok(resolveAlertEnvironment({ VERCEL_ENV: "production" }) === "production", "Vercel production → production");
  ok(resolveAlertEnvironment({ VERCEL_ENV: "preview" }) === "preview", "Vercel preview → preview");
  ok(resolveAlertEnvironment({}) === "local", "no VERCEL_ENV → local");
}

console.log("Escaping + founding detection:");
{
  ok(escapeMrkdwn("a & <b>") === "a &amp; &lt;b&gt;", "escapes &, <, >");
  ok(isFoundingSignup({ role: "contractor", source: "denver-founding" }), "contractor + ref → founding");
  ok(!isFoundingSignup({ role: "homeowner", source: "denver-founding" }), "homeowner + ref → not founding");
  ok(!isFoundingSignup({ role: "contractor", source: "waitlist_contractor" }), "contractor without ref → not founding");
}

console.log("Plain homeowner message:");
{
  const p = buildWaitlistSignupMessage(base);
  ok(p.text === "New homeowner waitlist sign-up: sam@milehighbaths.com (80202)", "fallback text");
  ok(blockText(p).includes("New homeowner on the waitlist: sam@milehighbaths.com"), "header names the role and email");
  ok(blockText(p).includes("*Zip*\\n80202"), "zip field");
  ok(blockText(p).includes("*Source*\\nwaitlist_homeowner"), "source field");
  ok(!blockText(p).includes("founding"), "no founding section");
  ok(blockText(p).includes("waitlist_signups · production · 2026-09-07T22:00:00.000Z"), "footer");
  ok(p.blocks.length === 3, "header + fields + footer");
}

console.log("Source fallback + prefix:");
{
  const p = buildWaitlistSignupMessage({ ...base, source: null, environment: "preview" });
  ok(p.text.startsWith("[preview] "), "non-prod text prefixed");
  ok(blockText(p).includes("[preview] 📬"), "non-prod header prefixed");
  ok(blockText(p).includes("*Source*\\ndirect"), "null source → direct");
}

console.log("Founding contractor message:");
{
  const p = buildWaitlistSignupMessage({
    ...base,
    role: "contractor",
    source: "denver-founding",
    founding: { claimed: 3, total: 10 },
  });
  ok(p.text.endsWith(" — founding waitlist 3 of 10"), "text carries the count");
  ok(blockText(p).includes("Denver founding contractor — founding waitlist 3 of 10"), "founding section with count");
  ok(blockText(p).includes("EST-92"), "points at the hand-off ticket");
  ok(!blockText(p).includes("Past the cohort cap"), "no cap warning under the cap");
  ok(p.blocks.length === 4, "header + fields + founding + footer");
}

console.log("Founding variants:");
{
  const noCount = buildWaitlistSignupMessage({ ...base, role: "contractor", source: "denver-founding", founding: null });
  ok(noCount.text.endsWith(" — founding waitlist"), "count unavailable → no numbers");
  ok(blockText(noCount).includes("Denver founding contractor — founding waitlist*"), "section still present without count");

  const over = buildWaitlistSignupMessage({
    ...base,
    role: "contractor",
    source: "denver-founding",
    founding: { claimed: 11, total: 10 },
  });
  ok(blockText(over).includes("Past the cohort cap"), "over the cap → warning");
}

console.log("Escaping inside fields:");
{
  const p = buildWaitlistSignupMessage({ ...base, source: "a&b<c>" });
  ok(blockText(p).includes("a&amp;b&lt;c&gt;"), "source is mrkdwn-escaped");
}

console.log("Poster:");
await (async () => {
  const calls: { url: string; body: string }[] = [];
  const okFetch: typeof fetch = async (url, init) => {
    calls.push({ url: String(url), body: String(init?.body) });
    return new Response("ok", { status: 200 });
  };
  const r1 = await postSlackMessage("https://hooks.example/x", { text: "t", blocks: [] }, okFetch);
  ok(r1.ok, "200 → ok");
  ok(calls[0]?.url === "https://hooks.example/x" && calls[0]?.body === '{"text":"t","blocks":[]}', "posts JSON payload");

  const badFetch: typeof fetch = async () => new Response("invalid_payload", { status: 400 });
  const r2 = await postSlackMessage("u", { text: "t", blocks: [] }, badFetch);
  ok(!r2.ok && r2.reason === "slack responded 400: invalid_payload", "non-2xx → reason with body");

  const throwFetch: typeof fetch = async () => {
    throw new Error("ECONNRESET");
  };
  const r3 = await postSlackMessage("u", { text: "t", blocks: [] }, throwFetch);
  ok(!r3.ok && r3.reason === "ECONNRESET", "network error → reason, no throw");
})();

if (failures) {
  console.error(`\n${failures} check(s) failed`);
  process.exit(1);
}
console.log("\nAll checks passed.");
