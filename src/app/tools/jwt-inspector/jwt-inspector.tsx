"use client";

import { useState } from "react";

type DecodeResult =
  | {
      header: unknown;
      payload: unknown;
      error: null;
    }
  | {
      header: null;
      payload: null;
      error: string;
    };

const emptyResult: DecodeResult = {
  header: null,
  payload: null,
  error: null,
};

function normalizeBase64Url(value: string) {
  const normalized = value.replace(/-/g, "+").replace(/_/g, "/");
  const remainder = normalized.length % 4;

  if (remainder === 1) {
    throw new Error("Invalid base64url segment.");
  }

  return normalized.padEnd(normalized.length + ((4 - remainder) % 4), "=");
}

function decodeSegment(segment: string) {
  if (!segment) {
    throw new Error("JWT header and payload segments cannot be empty.");
  }

  const binary = atob(normalizeBase64Url(segment));
  const bytes = Uint8Array.from(binary, (character) => character.charCodeAt(0));

  return new TextDecoder().decode(bytes);
}

function decodeJWT(token: string): DecodeResult {
  const trimmedToken = token.trim();

  if (!trimmedToken) {
    return emptyResult;
  }

  const parts = trimmedToken.split(".");

  if (parts.length !== 3) {
    return {
      header: null,
      payload: null,
      error: "JWTs must contain three dot-separated parts: header, payload, and signature.",
    };
  }

  try {
    const header = JSON.parse(decodeSegment(parts[0]));
    const payload = JSON.parse(decodeSegment(parts[1]));

    if (
      !header ||
      !payload ||
      typeof header !== "object" ||
      typeof payload !== "object" ||
      Array.isArray(header) ||
      Array.isArray(payload)
    ) {
      return {
        header: null,
        payload: null,
        error: "JWT header and payload must decode to JSON objects.",
      };
    }

    return { header, payload, error: null };
  } catch {
    return {
      header: null,
      payload: null,
      error:
        "Token could not be decoded as base64url JSON. Check that the header and payload are valid.",
    };
  }
}

function JSONPanel({ label, value }: { label: string; value: unknown }) {
  return (
    <article className="border-border-subtle bg-bg-deep rounded-2xl border p-5">
      <h2 className="text-text-primary font-mono text-[11px] tracking-[0.18em] uppercase">
        {label}
      </h2>
      <pre className="text-text-muted mt-4 max-h-[440px] overflow-auto rounded-xl text-[13px] leading-relaxed whitespace-pre-wrap">
        {JSON.stringify(value, null, 2)}
      </pre>
    </article>
  );
}

export default function JWTInspector() {
  const [token, setToken] = useState("");
  const result = decodeJWT(token);
  const hasDecodedToken =
    result.error === null && result.header !== null && result.payload !== null;

  return (
    <section className="bg-surface border-border-subtle mt-16 rounded-2xl border p-5 shadow-[0_18px_40px_rgba(0,0,0,0.06)] md:p-7 dark:shadow-[0_24px_50px_rgba(0,0,0,0.5)]">
      <div className="border-border-subtle bg-accent-soft rounded-2xl border p-4">
        <p className="text-text-primary font-mono text-[11px] tracking-[0.16em] uppercase">
          Decoded locally. Signature is not verified.
        </p>
        <p className="text-text-muted mt-2 text-[13px] leading-relaxed">
          This tool only decodes the header and payload in your browser. Never use decoded claims as
          proof that a token is trusted unless the signature is verified by your application.
        </p>
      </div>

      <label htmlFor="jwt-token" className="mt-7 block">
        <span className="text-text-primary font-mono text-[11px] tracking-[0.18em] uppercase">
          JWT token
        </span>
        <textarea
          id="jwt-token"
          value={token}
          onChange={(event) => setToken(event.target.value)}
          placeholder="eyJhbGciOiJub25lIiwidHlwIjoiSldUIn0.eyJzdWIiOiIxMjM0IiwibmFtZSI6IkFuYW55byJ9."
          spellCheck={false}
          className="border-border-subtle bg-bg-primary text-text-primary placeholder:text-text-muted focus:border-accent mt-3 min-h-40 w-full resize-y rounded-2xl border px-4 py-3 font-mono text-[13px] leading-relaxed outline-none"
        />
      </label>

      {result.error && (
        <p
          role="alert"
          className="border-border-subtle text-accent mt-4 rounded-xl border px-4 py-3 text-[13px] leading-relaxed"
        >
          {result.error}
        </p>
      )}

      {hasDecodedToken && (
        <div className="mt-6 grid gap-5 lg:grid-cols-2">
          <JSONPanel label="Header" value={result.header} />
          <JSONPanel label="Payload" value={result.payload} />
        </div>
      )}
    </section>
  );
}
