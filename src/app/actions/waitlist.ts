"use server";

import { z } from "zod";
import { supabaseAdmin } from "@/app/lib/supabaseServer";

const WaitlistSchema = z.object({
  email: z.string().email(),
  zip_code: z.string().min(3).max(12),
  role: z.enum(["homeowner", "contractor"]),
  source: z.string().max(40).optional(),
  company_website: z.string().max(0).optional(), // honeypot
});

export async function joinWaitlist(_prev: unknown, formData: FormData) {
  const parsed = WaitlistSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) {
    return { ok: false, error: "Please enter a valid email and zip." };
  }
  if (parsed.data.company_website) return { ok: true, zip: "" };

  const { company_website: _honeypot, ...row } = parsed.data;
  const { error } = await supabaseAdmin
    .from("waitlist_signups")
    .upsert(row, { onConflict: "email,role", ignoreDuplicates: true });

  if (error) return { ok: false, error: "Something went wrong. Please retry." };
  return { ok: true, zip: row.zip_code };
}
