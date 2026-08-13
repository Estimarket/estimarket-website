import type { LegalDocContent } from "../components/LegalDoc";

export const PRIVACY: LegalDocContent = {
  title: "Privacy policy",
  breadcrumb: "Privacy policy",
  subtitle:
    "What we collect, who sees it, and how we keep your home’s location private. We do not sell your personal information or use it for advertising.",
  byline: "Estimarket LLC · Applies to users in the United States",
  updated: "2026-08-11",
  blocks: [
    {
      type: "p",
      text: "This Privacy Policy explains how Estimarket LLC (“Estimarket,” “we,” “us,” or “our”) collects, uses, and shares personal information when you use our websites, applications, and services (the “Services”). Estimarket operates an online marketplace that connects homeowners (“Homeowners”) with independent contractors (“Contractors”). By using the Services, you agree to this Policy. The Services are intended for users in the United States.",
    },

    {
      type: "h",
      id: "information-we-collect",
      n: 1,
      title: "Information we collect",
    },
    { type: "p", text: "**Information you provide to us.**" },
    {
      type: "ul",
      items: [
        "**Account information** — name, email address, and (optionally for Homeowners) phone number.",
        "**Project information (Homeowners)** — your property address, project details and scope, and photos you upload.",
        "**Contractor profile information** — business name, license number, service area, and the quotes you submit.",
        "**Reviews and ratings** — content you post about Contractors or about Estimarket.",
        "**Payment information** — handled by our payment processors (Stripe and/or Apple). We do not store full card numbers; we retain only limited details such as the last four digits.",
      ],
    },
    {
      type: "p",
      text: "**Information collected automatically.** When you use the Services, we automatically collect your IP address, device and browser information, and usage data through cookies and similar technologies (see Section 7).",
    },
    {
      type: "p",
      text: "**Inferences.** We derive limited inferences from the project information you provide — for example, the materials, products, or types of vendors that may be relevant to your project — in order to make recommendations to you (see Section 6).",
    },

    {
      type: "h",
      id: "sensitive-information",
      n: 2,
      title: "Sensitive personal information",
    },
    {
      type: "p",
      text: "Your property address is treated as sensitive personal information because it can identify your precise location. We use it only to operate the Services — primarily to match your project with Contractors who serve your area. We do **not** use your address, or any other sensitive information, to build advertising profiles or for any purpose beyond providing and improving the Services. Because of this, the “right to limit the use of sensitive personal information” does not apply to our use of this data.",
    },

    {
      type: "h",
      id: "how-we-use",
      n: 3,
      title: "How we use your information",
    },
    { type: "p", text: "We use personal information to:" },
    {
      type: "ul",
      items: [
        "Create and manage your account and provide the Services;",
        "Match Homeowners with Contractors and facilitate quotes and communication;",
        "Recommend relevant products, materials, and vendors based on your project (see Section 6);",
        "Process Contractor subscription payments;",
        "Send transactional messages and, where permitted, marketing communications;",
        "Maintain security, prevent fraud, debug, and analyze and improve the Services; and",
        "Comply with legal obligations and enforce our Terms.",
      ],
    },

    {
      type: "h",
      id: "how-we-share",
      n: 4,
      title: "How we share your information",
    },
    {
      type: "p",
      text: "**With other users.** The Services work by sharing certain information between Users. Contractors who bid on a project can see the project details and photos. To protect your privacy, your full property address is **not** disclosed to a Contractor until you choose to invite that Contractor; before then, Contractors only see whether a project falls within their stated service area. Your name, license, and quotes are shared with the relevant counterpart as needed to transact.",
    },
    {
      type: "p",
      text: "**With service providers.** We share information with vendors that help us run the Services, under contracts that limit their use of the data. These include **Vercel** (hosting), **Supabase** (database, authentication, and photo storage), **Stripe and/or Apple** (payments), our email delivery provider (transactional and marketing email), and Google Analytics (usage analytics).",
    },
    {
      type: "p",
      text: "**For legal reasons and business transfers.** We may disclose information to comply with law, to protect rights and safety, or in connection with a merger, acquisition, or sale of assets.",
    },
    {
      type: "note",
      text: "WE DO NOT SELL YOUR PERSONAL INFORMATION, AND WE DO NOT SHARE IT FOR CROSS-CONTEXT BEHAVIORAL ADVERTISING. We do not display third-party advertising networks on the Services. We do not use Google Analytics for advertising or remarketing. Because we do not sell or “share” personal information as those terms are defined under U.S. state privacy laws, we are not required to offer a “Do Not Sell or Share My Personal Information” opt-out — but we honor the rights described in Section 9 regardless.",
    },

    {
      type: "h",
      id: "addresses-and-photos",
      n: 5,
      title: "Property addresses and project photos",
      short: "Property addresses and photos",
    },
    {
      type: "p",
      text: "We design the Services to limit exposure of your home’s location. Your exact address is withheld from Contractors until you invite a specific Contractor to visit, and matching otherwise relies on service-area radius rather than your precise address.",
    },
    {
      type: "p",
      text: "Project photos you upload are visible to Contractors who bid on your project, so they can prepare accurate quotes. To prevent your location from being revealed through images, **we remove location (EXIF/GPS) metadata from photos when they are uploaded.**",
    },
    {
      type: "p",
      text: "**Please do not include sensitive content in your photos** — such as faces, documents, account numbers, or other personal details — since photos are visible to Contractors who bid. You can delete photos you have uploaded, and we will remove photos with sensitive content from active project listings.",
    },

    {
      type: "h",
      id: "recommendations",
      n: 6,
      title: "Product and vendor recommendations; affiliate links",
      short: "Recommendations; affiliate links",
    },
    {
      type: "p",
      text: "Based on the project information you provide, we may recommend products, materials, and vendors that are relevant to your project. These recommendations are based on the details you give us for your own project — **not** on tracking your activity across other companies’ websites or apps. Some recommendations contain affiliate links, which means Estimarket may earn a commission if you click a link or make a purchase. We disclose these affiliate relationships at or near the relevant links. Commissions may influence which products or vendors are recommended. Your dealings with any third-party vendor are solely between you and that vendor.",
    },

    {
      type: "h",
      id: "cookies",
      n: 7,
      title: "Cookies and tracking technologies",
      short: "Cookies and tracking",
    },
    {
      type: "p",
      text: "We use cookies and similar technologies for essential functions (such as keeping you logged in) and for analytics through Google Analytics. Essential cookies are required to operate the Services. Analytics cookies are used to understand and improve usage; where required by law, we obtain consent through a cookie banner before setting non-essential cookies, and you can manage your preferences there. We do not use advertising or cross-site tracking cookies.",
    },

    {
      type: "h",
      id: "retention",
      n: 8,
      title: "Data retention",
    },
    {
      type: "p",
      text: "We keep personal information for as long as needed to provide the Services and for legitimate business or legal purposes. In general: account information is retained for the life of your account; project details and photos are retained for the life of the project (or your account); and payment records are retained as required for tax and accounting. When information is no longer needed, we delete or de-identify it. Specific retention periods may be refined as the Services develop.",
    },

    {
      type: "h",
      id: "your-rights",
      n: 9,
      title: "Your privacy rights",
    },
    {
      type: "p",
      text: "Depending on your state of residence (including California, Colorado, and other states with comprehensive privacy laws), you may have the right to:",
    },
    {
      type: "ul",
      items: [
        "Know and access the personal information we hold about you;",
        "Correct inaccurate personal information;",
        "Delete your personal information, subject to legal exceptions;",
        "Receive a portable copy of your information; and",
        "Appeal a denial of any request.",
      ],
    },
    {
      type: "p",
      text: "We will not discriminate against you for exercising these rights. Because we do not sell personal information, share it for cross-context behavioral advertising, or use sensitive information for advertising, the related opt-out and “limit use” rights do not apply to our practices. Our product recommendations are based on first-party project data and do not constitute “targeted advertising” or significant-decision profiling under applicable state laws.",
    },

    {
      type: "h",
      id: "exercise-rights",
      n: 10,
      title: "How to exercise your rights",
    },
    {
      type: "p",
      text: "To make a request, contact us at **support@estimarket.com**. We will verify your request and respond within the timeframe required by law (generally 45 days). You may use an authorized agent where permitted. If we deny your request, you may appeal by contacting us at the same address.",
    },

    {
      type: "h",
      id: "security",
      n: 11,
      title: "Data security",
    },
    {
      type: "p",
      text: "We use reasonable administrative, technical, and physical safeguards to protect personal information, including access controls and encryption in transit. No method of transmission or storage is completely secure, and we cannot guarantee absolute security.",
    },

    {
      type: "h",
      id: "childrens-privacy",
      n: 12,
      title: "Children’s privacy",
    },
    {
      type: "p",
      text: "The Services are intended for users who are at least 18 years old. We do not knowingly collect personal information from anyone under 18 (or from any individual we know to be under 16). If you believe a minor has provided us information, contact us and we will delete it.",
    },

    {
      type: "h",
      id: "third-party-links",
      n: 13,
      title: "Third-party links and services",
      short: "Third-party links",
    },
    {
      type: "p",
      text: "The Services may link to third-party websites and services, including affiliate partners and our payment processors. We are not responsible for their privacy practices. We encourage you to review their privacy policies.",
    },

    {
      type: "h",
      id: "changes",
      n: 14,
      title: "Changes to this policy",
    },
    {
      type: "p",
      text: "We may update this Policy from time to time. If we make material changes, we will update the “Last Updated” date and, where appropriate, provide additional notice. Your continued use of the Services after changes take effect constitutes acceptance of the updated Policy.",
    },

    {
      type: "h",
      id: "contact",
      n: 15,
      title: "Contact us",
    },
    {
      type: "p",
      text: "If you have questions about this Policy or our privacy practices, contact us at **support@estimarket.com**, or by mail at:",
    },
    {
      type: "address",
      lines: ["Estimarket LLC", "1990 Depew St. Unit 140083", "Denver, CO 80214"],
    },
  ],
};
