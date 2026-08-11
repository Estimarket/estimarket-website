import LegalDoc from "../components/LegalDoc";
import { PRIVACY } from "./content";

export const metadata = {
  title: "Privacy policy — Estimarket",
  description:
    "What we collect, who sees it, and how we keep your home’s location private. We do not sell your personal information or use it for advertising.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return <LegalDoc doc={PRIVACY} />;
}
