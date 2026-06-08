"use server";

import { z } from "zod";
import { supabaseAdmin } from "@/app/lib/supabaseServer";

const NominateSchema = z.object({
  city: z.string().min(2).max(120),
  company_website: z.string().max(0).optional(), // honeypot
});

export async function nominateCity(_prev: unknown, formData: FormData) {
  const parsed = NominateSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) {
    return { ok: false, error: "Please enter a city and state." };
  }
  if (parsed.data.company_website) return { ok: true };

  const { error } = await supabaseAdmin
    .from("city_nominations")
    .insert({ city: parsed.data.city, source: "about_nominate" });

  if (error) return { ok: false, error: "Something went wrong. Please retry." };
  return { ok: true };
}
