import { Metadata } from "next";
import BlogList from "@components/blog-list";
import contact from "@data/contact.json";
import { toSummary } from "@lib/blog";
import { getPosts } from "@src/network/cmsHandlers";

export const metadata: Metadata = {
  title: "Writing",
  description:
    "Essays on system design, backend engineering, developer tools, debugging, and operations.",
};

export const revalidate = 360;

export default async function BlogPage() {
  const posts = ((await getPosts()) ?? []) as unknown[];
  const summaries = posts.map((p, i) => toSummary(p, i));
  const totalMins = summaries.reduce((a, p) => a + p.readTime, 0);

  return (
    <div className="fadein">
      <section id="top" className="border-line relative overflow-hidden border-b">
        <div className="grid-bg pointer-events-none absolute inset-0" aria-hidden="true" />
        <div className="wrap relative flex flex-col gap-10 pt-[clamp(56px,7vw,104px)] pb-[clamp(48px,5vw,72px)]">
          <div className="rise text-muted flex flex-wrap gap-x-7 gap-y-2.5 font-mono text-[11.5px] tracking-[0.14em] uppercase">
            <span className="text-accent-ink">[04] Writing</span>
            <span>
              {summaries.length} essays · {totalMins} min of reading
            </span>
            <span>System design · Backend · Tooling</span>
          </div>
          <h1
            className="rise d1 m-0 text-[clamp(56px,8.4vw,132px)] leading-[0.88] font-bold tracking-[-0.055em] [text-wrap:balance]"
            style={{ fontVariationSettings: "'opsz' 96" }}
          >
            Notes from the{" "}
            <span className="si text-accent text-[1.06em] tracking-[-0.03em]">systems edge.</span>
          </h1>
          <div className="rise d3 flex flex-wrap items-end justify-between gap-x-12 gap-y-6">
            <p className="text-muted m-0 max-w-[52ch] text-[clamp(17px,1.4vw,20px)] leading-[1.55] [text-wrap:pretty]">
              Essays on backend boundaries, system design tradeoffs, tooling, debugging, and the
              operational details that shape reliable software.
            </p>
            <a href={contact.social.rss} className="pill h-12 px-5 text-[14.5px]">
              <svg
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.9"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M4 11a9 9 0 0 1 9 9" />
                <path d="M4 4a16 16 0 0 1 16 16" />
                <circle cx="5" cy="19" r="1.2" />
              </svg>
              Subscribe via RSS
            </a>
          </div>
        </div>
      </section>
      <BlogList posts={summaries} />
    </div>
  );
}
