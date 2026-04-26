import React from "react";

interface GraphicProps {
  className?: string;
}

export function HeroGeometric({ className }: GraphicProps) {
  return (
    <svg width="280" height="280" viewBox="0 0 280 280" fill="none" className={className}>
      {/* Large outer ring */}
      <circle
        cx="140"
        cy="140"
        r="120"
        stroke="var(--color-accent)"
        strokeWidth="1"
        opacity="0.3"
      />
      {/* Medium ring */}
      <circle
        cx="140"
        cy="140"
        r="80"
        stroke="var(--color-accent-warm)"
        strokeWidth="1"
        opacity="0.25"
      />
      {/* Inner ring */}
      <circle
        cx="140"
        cy="140"
        r="40"
        stroke="var(--color-accent)"
        strokeWidth="1.5"
        opacity="0.4"
      />
      {/* Cross lines */}
      <line
        x1="140"
        y1="20"
        x2="140"
        y2="260"
        stroke="var(--color-accent)"
        strokeWidth="0.5"
        opacity="0.15"
      />
      <line
        x1="20"
        y1="140"
        x2="260"
        y2="140"
        stroke="var(--color-accent)"
        strokeWidth="0.5"
        opacity="0.15"
      />
      {/* Diagonal lines */}
      <line
        x1="55"
        y1="55"
        x2="225"
        y2="225"
        stroke="var(--color-accent-warm)"
        strokeWidth="0.5"
        opacity="0.12"
      />
      <line
        x1="225"
        y1="55"
        x2="55"
        y2="225"
        stroke="var(--color-accent-warm)"
        strokeWidth="0.5"
        opacity="0.12"
      />
      {/* Accent dots at cardinal directions */}
      <circle cx="140" cy="20" r="3" fill="var(--color-accent-warm)" opacity="0.5" />
      <circle cx="260" cy="140" r="3" fill="var(--color-accent)" opacity="0.4" />
      <circle cx="140" cy="260" r="3" fill="var(--color-accent-warm)" opacity="0.5" />
      <circle cx="20" cy="140" r="3" fill="var(--color-accent)" opacity="0.4" />
      {/* Corner squares */}
      <rect
        x="45"
        y="45"
        width="14"
        height="14"
        stroke="var(--color-accent)"
        strokeWidth="1"
        opacity="0.25"
        transform="rotate(45 52 52)"
      />
      <rect
        x="221"
        y="45"
        width="14"
        height="14"
        stroke="var(--color-accent-warm)"
        strokeWidth="1"
        opacity="0.2"
        transform="rotate(45 228 52)"
      />
      <rect
        x="45"
        y="221"
        width="14"
        height="14"
        stroke="var(--color-accent-warm)"
        strokeWidth="1"
        opacity="0.2"
        transform="rotate(45 52 228)"
      />
      <rect
        x="221"
        y="221"
        width="14"
        height="14"
        stroke="var(--color-accent)"
        strokeWidth="1"
        opacity="0.25"
        transform="rotate(45 228 228)"
      />
    </svg>
  );
}
