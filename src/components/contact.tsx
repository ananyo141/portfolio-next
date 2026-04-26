"use client";

import { useState } from "react";
import { toast } from "react-toastify";
import contact from "@data/contact.json";
import { StaggerContainer, StaggerItem } from "./motion-wrapper";

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (response.status === 201) {
        toast.success("Message sent successfully!");
        setForm({ name: "", email: "", phone: "", message: "" });
      } else if (response.status === 429) {
        toast.error("Too many messages. Please try again in a few minutes.");
      } else {
        toast.error(data.message || "Failed to send message.");
      }
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="bg-bg-warm px-6 py-20 md:px-8 md:py-32">
      <div className="mx-auto max-w-6xl">
        <StaggerContainer>
          <StaggerItem>
            <div className="mb-4 flex items-end justify-between">
              <h2 className="text-text-primary font-serif text-5xl leading-tight font-bold tracking-tight md:text-6xl">
                {"Let's think out loud together."}
              </h2>
              <span className="text-accent-warm hidden font-mono text-sm md:block">05</span>
            </div>
          </StaggerItem>

          <StaggerItem className="mt-8">
            <a
              href={`mailto:${contact.email}`}
              className="text-text-primary hover:decoration-accent-warm inline-block cursor-pointer font-serif text-2xl underline decoration-transparent underline-offset-8 transition-all md:text-3xl"
            >
              {contact.email}
            </a>
          </StaggerItem>

          <StaggerItem className="mt-12">
            <form onSubmit={handleSubmit} className="max-w-2xl">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <input
                  name="name"
                  type="text"
                  required
                  placeholder="Name"
                  value={form.name}
                  onChange={handleChange}
                  className="border-border-subtle bg-surface text-text-primary placeholder:text-text-muted focus:border-accent focus:ring-accent/20 rounded-lg border px-4 py-3 text-base transition-all outline-none focus:ring-2"
                />
                <input
                  name="email"
                  type="email"
                  required
                  placeholder="Email"
                  value={form.email}
                  onChange={handleChange}
                  className="border-border-subtle bg-surface text-text-primary placeholder:text-text-muted focus:border-accent focus:ring-accent/20 rounded-lg border px-4 py-3 text-base transition-all outline-none focus:ring-2"
                />
                <input
                  name="phone"
                  type="tel"
                  placeholder="Phone (optional)"
                  value={form.phone}
                  onChange={handleChange}
                  className="border-border-subtle bg-surface text-text-primary placeholder:text-text-muted focus:border-accent focus:ring-accent/20 rounded-lg border px-4 py-3 text-base transition-all outline-none focus:ring-2 md:col-span-2"
                />
                <textarea
                  name="message"
                  required
                  placeholder="Your message..."
                  rows={5}
                  value={form.message}
                  onChange={handleChange}
                  className="border-border-subtle bg-surface text-text-primary placeholder:text-text-muted focus:border-accent focus:ring-accent/20 resize-none rounded-lg border px-4 py-3 text-base transition-all outline-none focus:ring-2 md:col-span-2"
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="bg-accent hover:bg-accent-warm hover:shadow-accent-warm/20 mt-6 cursor-pointer rounded-lg px-8 py-3 font-mono text-sm font-medium text-white transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg disabled:opacity-50 disabled:hover:translate-y-0"
              >
                {loading ? "Sending..." : "Send Message →"}
              </button>
            </form>
          </StaggerItem>

          <StaggerItem className="mt-10">
            <div className="flex gap-6">
              <a
                href={contact.social.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="text-text-muted hover:text-accent-warm cursor-pointer transition-colors"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
              </a>
              <a
                href={contact.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="text-text-muted hover:text-accent-warm cursor-pointer transition-colors"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
              <a
                href={contact.social.twitter}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter / X"
                className="text-text-muted hover:text-accent-warm cursor-pointer transition-colors"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              <a
                href={contact.social.rss}
                aria-label="RSS Feed"
                className="text-text-muted hover:text-accent-warm cursor-pointer transition-colors"
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M4 11a9 9 0 0 1 9 9" />
                  <path d="M4 4a16 16 0 0 1 16 16" />
                  <circle cx="5" cy="19" r="1" />
                </svg>
              </a>
            </div>
          </StaggerItem>
        </StaggerContainer>
      </div>
    </section>
  );
}
