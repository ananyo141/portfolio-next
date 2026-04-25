export interface Experience {
  company: string;
  role: string;
  period: string;
  current?: boolean;
  description: string;
  tags: string[];
}

export const experiences: Experience[] = [
  {
    company: "Vercel",
    role: "Senior Software Engineer",
    period: "2022 — Present",
    current: true,
    description:
      "Working on the core platform team building the infrastructure that powers millions of deployments. Led the migration from a monolithic deployment pipeline to a distributed event-driven architecture, cutting average build times by 40%. Mentoring junior engineers and driving technical design for the edge runtime.",
    tags: ["Infrastructure", "Edge Computing", "TypeScript"],
  },
  {
    company: "Stripe",
    role: "Software Engineer II",
    period: "2019 — 2022",
    description:
      "Built payment reconciliation systems processing billions of dollars daily. Designed and implemented a ledger consistency checker that caught a class of double-credit bugs before they hit production. Worked closely with financial operations to automate manual reconciliation workflows.",
    tags: ["Distributed Systems", "PostgreSQL", "Ruby"],
  },
  {
    company: "Netlify",
    role: "Full-Stack Engineer",
    period: "2017 — 2019",
    description:
      "Early employee on the team that shipped Netlify Functions and Identity. Built the first version of the serverless functions platform on AWS Lambda. Also worked on the CMS integration layer, making it possible for non-technical teams to manage content on JAMstack sites.",
    tags: ["Serverless", "React", "Node.js"],
  },
];
