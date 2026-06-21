import { Metadata } from "next";
import Link from "next/link";
import Eyebrow from "@components/eyebrow";
import site from "@data/site.json";
import JWTInspector from "./jwt-inspector";

export const metadata: Metadata = {
  title: `JWT Inspector | ${site.name}`,
  description:
    "Decode JWT headers and payloads locally in the browser without verifying signatures.",
};

export default function JWTInspectorPage() {
  return (
    <div className="bg-bg-primary min-h-screen px-6 py-32 md:px-8">
      <div className="mx-auto max-w-6xl">
        <Link
          href="/tools"
          className="text-text-muted hover:text-text-primary font-mono text-[11px] tracking-[0.16em] uppercase transition-colors"
        >
          Back to tools
        </Link>

        <section className="mt-10 grid gap-10 md:grid-cols-[1.05fr_0.95fr] md:items-end">
          <div>
            <Eyebrow>JWT Inspector</Eyebrow>
            <h1 className="text-text-primary mt-5 font-serif text-4xl leading-[1.02] font-[440] tracking-[-0.015em] md:text-6xl">
              Decode tokens <em className="text-text-muted italic">without leaving the browser</em>.
            </h1>
          </div>
          <p className="text-text-muted max-w-xl text-[15px] leading-relaxed md:justify-self-end">
            Paste a JWT to inspect the header and payload JSON. The token is decoded locally in this
            page; it is not sent to an API, stored, or verified.
          </p>
        </section>

        <JWTInspector />
      </div>
    </div>
  );
}
