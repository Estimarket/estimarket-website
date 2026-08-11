import LegalDoc from "../components/LegalDoc";
import { TERMS } from "./content";

export const metadata = {
  title: "Terms of Service — Estimarket",
  description:
    "The agreement between you and Estimarket when you use the marketplace. Estimarket is a venue for homeowners and contractors to find each other — we are not a party to the work itself.",
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return <LegalDoc doc={TERMS} />;
}
