"use client";

import { useEffect, useState } from "react";
import contact from "@data/contact.json";

const TOPICS = ["Backend / APIs", "System design", "Dev tooling", "Just saying hi"];
const SOCIAL = [
  ["GitHub", contact.social.github],
  ["LinkedIn", contact.social.linkedin],
  ["X / Twitter", contact.social.twitter],
  ["RSS", contact.social.rss],
] as const;

const LABEL = "text-muted font-mono text-[11px] tracking-[0.12em] uppercase";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [topic, setTopic] = useState(TOPICS[0]);
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const t = setTimeout(() => setCopied(false), 1800);
    return () => clearTimeout(t);
  }, [copied]);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(contact.email);
    } catch {
      // clipboard unavailable; still show feedback
    }
    setCopied(true);
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    setError(null);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, topic }),
      });
      if (res.status === 201) {
        setStatus("sent");
        return;
      }
      const data = await res.json().catch(() => ({}));
      setError(
        res.status === 429
          ? "Too many messages. Please try again in a few minutes."
          : data.message || "Failed to send message."
      );
      setStatus("idle");
    } catch {
      setError("Something went wrong. Please try again.");
      setStatus("idle");
    }
  };

  const count = form.message.length;
  const firstName = form.name.trim().split(" ")[0];

  return (
    <section
      id="contact"
      className="inv border-line2 bg-bg2 relative mt-[clamp(80px,9vw,140px)] overflow-hidden border-t"
    >
      <div className="wrap flex flex-col gap-16 pt-[clamp(80px,9vw,128px)] pb-16">
        <div className="flex flex-col gap-6">
          <span className="eyebrow">[06] Contact</span>
          <h2 className="h2-display text-[clamp(56px,9.4vw,152px)] leading-[0.86] tracking-[-0.055em] [text-wrap:balance]">
            Got a system that needs to <span className="si text-accent">last?</span>
          </h2>
        </div>
        <div className="flex flex-wrap items-start gap-x-20 gap-y-14">
          <div className="flex flex-[1_1_420px] flex-col gap-8">
            <p className="text-muted m-0 max-w-[44ch] text-lg leading-[1.6]">
              Backend architecture, API migrations, developer tooling, or a gnarly debugging story —
              I read everything that lands in my inbox.
            </p>
            <div className="flex flex-wrap items-center gap-x-5 gap-y-4">
              <a
                href={`mailto:${contact.email}`}
                className="border-accent border-b-[3px] pb-1.5 text-[clamp(28px,3.4vw,48px)] font-semibold tracking-[-0.04em] [overflow-wrap:anywhere] no-underline"
              >
                {contact.email}
              </a>
              <button
                type="button"
                onClick={copyEmail}
                aria-label="Copy email address"
                className={`pill font-mono text-[12.5px] font-normal ${copied ? "border-accent" : ""}`}
              >
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <rect x="9" y="9" width="12" height="12" rx="2" />
                  <path d="M5 15V5a2 2 0 0 1 2-2h10" />
                </svg>
                <span aria-live="polite">{copied ? "Copied" : "Copy"}</span>
              </button>
            </div>
            <div className="flex flex-wrap gap-2.5">
              {SOCIAL.map(([label, href]) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith("/") ? undefined : "_blank"}
                  rel="noopener noreferrer"
                  className="pill"
                >
                  {label} <span aria-hidden="true">↗</span>
                </a>
              ))}
            </div>
          </div>

          <form
            onSubmit={submit}
            className="border-line2 bg-surface flex flex-[1_1_440px] flex-col gap-7 rounded-[24px] border p-[clamp(28px,3vw,40px)]"
          >
            {status === "sent" ? (
              <div className="fadein flex flex-col gap-3 py-10">
                <span className="si text-accent text-[44px] leading-none">Message queued.</span>
                <p className="text-muted m-0 text-base leading-[1.6]">
                  Thanks{firstName ? `, ${firstName}` : ""} — I&apos;ll get back to you soon.
                  Delivery is retried, naturally.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setStatus("idle");
                    setForm((f) => ({ ...f, message: "" }));
                  }}
                  className="pill mt-3 self-start"
                >
                  Send another
                </button>
              </div>
            ) : (
              <div className="flex flex-col gap-7">
                <div className="grid grid-cols-[repeat(auto-fit,minmax(min(180px,100%),1fr))] gap-7">
                  <label className="flex flex-col gap-1">
                    <span className={LABEL}>Name</span>
                    <input
                      className="field"
                      type="text"
                      name="name"
                      autoComplete="name"
                      placeholder="Your name"
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                    />
                  </label>
                  <label className="flex flex-col gap-1">
                    <span className={LABEL}>Email</span>
                    <input
                      className="field"
                      type="email"
                      name="email"
                      autoComplete="email"
                      placeholder="you@company.com"
                      required
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                    />
                  </label>
                </div>
                <label className="flex flex-col gap-1">
                  <span className={`${LABEL} flex justify-between gap-3`}>
                    <span>What are you building?</span>
                    <span className={count > 540 ? "text-accent-ink" : ""}>{count} / 600</span>
                  </span>
                  <textarea
                    className="field resize-y leading-[1.5]"
                    name="message"
                    rows={4}
                    maxLength={600}
                    placeholder="A few lines about the problem"
                    required
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                  />
                </label>
                <div className="flex flex-wrap gap-2" role="group" aria-label="Topic">
                  {TOPICS.map((t) => (
                    <button
                      key={t}
                      type="button"
                      aria-pressed={topic === t}
                      onClick={() => setTopic(t)}
                      className={`chip h-10 px-3.5 text-[13.5px] ${
                        topic === t ? "border-accent bg-accent text-on-accent" : ""
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
                {error && (
                  <p role="alert" className="text-accent-ink m-0 text-sm">
                    {error}
                  </p>
                )}
                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="pill pill-solid h-[52px] self-start border-0 px-7 text-[15px] disabled:opacity-60"
                >
                  {status === "sending" ? "Sending…" : "Send message"}{" "}
                  <span aria-hidden="true">→</span>
                </button>
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
