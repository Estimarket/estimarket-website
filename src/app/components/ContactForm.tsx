"use client";

const CONTACT_EMAIL = "hello@estimarket.com";

const TOPICS = [
  "Choose a topic",
  "Question about an estimate",
  "Press & media",
  "Partnerships & business",
  "Product request",
  "Something else",
];

export default function ContactForm() {
  const inputClass =
    "h-11 rounded-[8px] border border-line bg-white px-3 text-sm text-navy placeholder:text-muted outline-none focus:ring-2 focus:ring-accent";
  const labelClass = "text-[13px] font-semibold text-slate";

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const firstName = String(data.get("first_name") ?? "").trim();
    const lastName = String(data.get("last_name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const topic = String(data.get("topic") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();

    const subject = topic ? `Estimarket: ${topic}` : "Estimarket inquiry";
    const body = [
      `Name: ${firstName} ${lastName}`.trim(),
      `Email: ${email}`,
      topic ? `Topic: ${topic}` : null,
      "",
      message,
    ]
      .filter((line) => line !== null)
      .join("\n");

    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <div>
        <p className="font-serif text-[30px] font-normal text-navy">
          Leave us a <span className="italic text-accent">note:</span>
        </p>
        <div className="mt-6 h-px w-full bg-line" />
      </div>

      <div className="flex flex-col gap-5 sm:flex-row">
        <label className="flex flex-1 flex-col gap-1.5">
          <span className={labelClass}>First name</span>
          <input name="first_name" required className={inputClass} />
        </label>
        <label className="flex flex-1 flex-col gap-1.5">
          <span className={labelClass}>Last name</span>
          <input name="last_name" required className={inputClass} />
        </label>
      </div>

      <label className="flex flex-col gap-1.5">
        <span className={labelClass}>Email</span>
        <input
          type="email"
          name="email"
          required
          placeholder="you@example.com"
          className={inputClass}
        />
      </label>

      <label className="flex flex-col gap-1.5">
        <span className={labelClass}>What&apos;s this about?</span>
        <select
          name="topic"
          className={`${inputClass} text-muted`}
          defaultValue={TOPICS[0]}
        >
          {TOPICS.map((t) => (
            <option key={t} value={t === TOPICS[0] ? "" : t}>
              {t}
            </option>
          ))}
        </select>
      </label>

      <label className="flex flex-col gap-1.5">
        <span className={labelClass}>Message</span>
        <textarea
          name="message"
          required
          rows={4}
          placeholder="Tell us what's going on. The more context, the better."
          className="rounded-[8px] border border-line bg-white px-3 py-2.5 text-sm text-navy placeholder:text-muted outline-none focus:ring-2 focus:ring-accent"
        />
        <span className="text-xs text-muted">
          We typically reply in under one business day.
        </span>
      </label>

      <div className="mt-2 flex flex-col items-start justify-between gap-4 border-t border-line pt-6 sm:flex-row sm:items-center">
        <p className="max-w-[340px] text-xs leading-5 text-muted">
          By submitting, you agree to our privacy policy. We&apos;ll only use
          your email to reply to this message.
        </p>
        <button
          type="submit"
          className="shrink-0 rounded-[10px] bg-accent px-6 py-3 text-[15px] font-semibold text-white transition-colors hover:bg-[#d4521b]"
        >
          Send message
        </button>
      </div>
    </form>
  );
}
