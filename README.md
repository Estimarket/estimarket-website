This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Preview deployments

Every PR gets a Vercel preview built with the Preview env scope, which points the
founder CTA and spots meter at the staging platform (`stg.estimarket.com`) in
`signup` mode. Use the preview URL to test the founder sign-up flow end to end.

## Slack waitlist alerts (EST-144)

Every new `waitlist_signups` row posts one Block Kit message to Slack: email, role, zip, source,
and — when the sign-up arrived via the founding ref — the running founding-waitlist count against
the cohort cap and a reminder to hand them off to real sign-up (EST-92). It fires from the
`joinWaitlist` server action inside `after()` (see `src/app/lib/slackWaitlistAlerts.server.ts`),
only for a genuinely new row (duplicates and honeypot hits are silent), and is best-effort:
failures are logged as `[slack-waitlist]`, never shown to the visitor.

- **Env:** `SLACK_SIGNUPS_WEBHOOK_URL` — Slack incoming-webhook URL. Unset = no alerts. Same
  variable name and webhook as the platform's contractor sign-up alert (EST-126), so one channel
  hears about both. Set it on Vercel project `project-xzuw7`; Production only unless you want PR
  previews to post too (their messages carry a `[preview]` prefix).
- **Verify:** submit the form on a PR preview with the var set on the Preview scope, or run
  `npm run dev` with the var in `.env.local` and submit at `/waitlist/homeowner`. Expect one
  message; submit the same email again and expect none.
- **Mute:** delete the var and redeploy.
- **Tests:** `npm test` (message layout, environment rule, poster never throws).

