"use client";

import { useState } from "react";
import { toast } from "react-toastify";
import contact from "@data/contact.json";
import { User, Mail, Phone, MessageSquare, Github, LinkedIn, Twitter, Rss } from "@assets/icons";
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
    <section id="contact" className="bg-bg-warm px-5 py-16 sm:px-6 md:px-8 md:py-32">
      <div className="mx-auto max-w-6xl">
        <StaggerContainer>
          <StaggerItem>
            <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between sm:gap-0">
              <h2 className="text-text-primary font-serif text-2xl leading-tight font-bold tracking-tight sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl">
                {"Let's think out loud together."}
              </h2>
              <span className="text-accent-warm hidden font-mono text-sm sm:block">05</span>
            </div>
          </StaggerItem>

          <StaggerItem className="mt-6">
            <a
              href={`mailto:${contact.email}`}
              className="text-text-primary hover:decoration-accent-warm inline-block cursor-pointer font-serif text-base underline decoration-transparent underline-offset-8 transition-all sm:text-lg md:text-2xl lg:text-3xl"
            >
              {contact.email}
            </a>
          </StaggerItem>

          <StaggerItem className="mt-8">
            <form onSubmit={handleSubmit} className="max-w-2xl">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="relative w-full">
                  <User
                    className="text-text-muted absolute top-1/2 left-3.5 -translate-y-1/2 opacity-50"
                    size={16}
                  />
                  <input
                    name="name"
                    type="text"
                    required
                    placeholder="Name"
                    value={form.name}
                    onChange={handleChange}
                    className="border-border-subtle bg-surface text-text-primary placeholder:text-text-muted focus:border-accent focus:ring-accent/20 w-full rounded-lg border py-2 pr-4 pl-10 text-base transition-all outline-none focus:ring-2"
                  />
                </div>
                <div className="relative w-full">
                  <Mail
                    className="text-text-muted absolute top-1/2 left-3.5 -translate-y-1/2 opacity-50"
                    size={16}
                  />
                  <input
                    name="email"
                    type="email"
                    required
                    placeholder="Email"
                    value={form.email}
                    onChange={handleChange}
                    className="border-border-subtle bg-surface text-text-primary placeholder:text-text-muted focus:border-accent focus:ring-accent/20 w-full rounded-lg border py-2 pr-4 pl-10 text-base transition-all outline-none focus:ring-2"
                  />
                </div>
                <div className="relative w-full sm:col-span-2">
                  <Phone
                    className="text-text-muted absolute top-1/2 left-3.5 -translate-y-1/2 opacity-50"
                    size={16}
                  />
                  <input
                    name="phone"
                    type="tel"
                    placeholder="Phone (optional)"
                    value={form.phone}
                    onChange={handleChange}
                    className="border-border-subtle bg-surface text-text-primary placeholder:text-text-muted focus:border-accent focus:ring-accent/20 w-full rounded-lg border py-2 pr-4 pl-10 text-base transition-all outline-none focus:ring-2"
                  />
                </div>
                <div className="relative w-full sm:col-span-2">
                  <MessageSquare
                    className="text-text-muted absolute top-3 left-3.5 opacity-50 sm:top-3.5"
                    size={16}
                  />
                  <textarea
                    name="message"
                    required
                    placeholder="Your message..."
                    rows={3}
                    value={form.message}
                    onChange={handleChange}
                    className="border-border-subtle bg-surface text-text-primary placeholder:text-text-muted focus:border-accent focus:ring-accent/20 w-full resize-none rounded-lg border py-2 pr-4 pl-10 text-base transition-all outline-none focus:ring-2"
                  />
                </div>
              </div>
              <button
                type="submit"
                disabled={loading}
                className="group bg-accent hover:bg-accent-warm hover:shadow-accent-warm/20 relative mt-4 cursor-pointer overflow-hidden rounded-lg px-5 py-2 font-mono text-sm font-medium text-white transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg disabled:opacity-50 disabled:hover:translate-y-0 sm:mt-6 sm:px-6 sm:py-2.5 md:px-8 md:py-3"
              >
                <span className="relative z-10">{loading ? "Sending..." : "Send Message →"}</span>
                <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 ease-in-out group-hover:translate-x-full" />
              </button>
            </form>
          </StaggerItem>

          <StaggerItem className="mt-8">
            <div className="flex gap-5">
              <a
                href={contact.social.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="text-text-muted hover:text-accent-warm cursor-pointer transition-colors"
              >
                <Github size={24} />
              </a>
              <a
                href={contact.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="text-text-muted hover:text-accent-warm cursor-pointer transition-colors"
              >
                <LinkedIn size={24} />
              </a>
              <a
                href={contact.social.twitter}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter / X"
                className="text-text-muted hover:text-accent-warm cursor-pointer transition-colors"
              >
                <Twitter size={24} />
              </a>
              <a
                href={contact.social.rss}
                aria-label="RSS Feed"
                className="text-text-muted hover:text-accent-warm cursor-pointer transition-colors"
              >
                <Rss size={24} />
              </a>
            </div>
          </StaggerItem>
        </StaggerContainer>
      </div>
    </section>
  );
}
