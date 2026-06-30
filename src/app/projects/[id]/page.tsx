import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ArchitectureDiagram from "@components/architecture-diagram";
import Eyebrow from "@components/eyebrow";
import projects from "@data/projects.json";
import site from "@data/site.json";
import type { Project } from "@data/types";

interface Props {
  params: Promise<{ id: string }>;
}

interface CaseStudyContent {
  problem: string;
  constraints: string[];
  architecture: {
    summary: string;
    nodes: string[];
    edges: string[];
  };
  tradeoffs: string[];
  failureModes: string[];
  next: string[];
}

const projectList: Project[] = projects;

const caseStudies: Record<string, CaseStudyContent> = {
  vimero: {
    problem:
      "Video upload, processing, and playback pull in different directions: the interface should stay responsive while expensive media work happens outside the request path.",
    constraints: [
      "Keep upload and processing work separated so slow transcoding does not block user-facing flows.",
      "Expose status changes clearly enough for the frontend to explain what is happening.",
      "Use infrastructure pieces that make queueing, realtime state, and delivery boundaries visible.",
    ],
    architecture: {
      summary:
        "The system is framed as separate upload, processing, realtime, and delivery responsibilities connected by a queue and shared status state.",
      nodes: [
        "Next.js interface",
        "Upload/API service",
        "RabbitMQ work queue",
        "Media processing worker",
        "Redis status channel",
        "Delivery/viewing path",
      ],
      edges: [
        "Interface sends upload intent to the API service",
        "API service queues processing work instead of doing media work inline",
        "Worker consumes queued jobs and updates processing state",
        "Redis-backed status lets the interface show progress without polling every service",
        "Processed media moves through the delivery path for playback",
      ],
    },
    tradeoffs: [
      "Splitting services makes scaling boundaries easier to discuss, but it also increases local development and deployment coordination.",
      "Queueing protects request paths from media work, but it introduces job ordering, retry, and visibility concerns.",
      "Realtime status improves feedback, but every status transition needs a clear source of truth.",
    ],
    failureModes: [
      "A processing worker can fail after accepting a job, so retries need idempotent job handling.",
      "A queue backlog can make uploads appear stuck unless the UI distinguishes queued, processing, failed, and complete states.",
      "Status updates can drift from stored media state if processing and persistence are not updated consistently.",
    ],
    next: [
      "Add a small operational dashboard for queue depth, failed jobs, and oldest pending upload.",
      "Document retry and dead-letter behavior around media jobs.",
      "Tighten the contract between processing state and the playback-ready delivery path.",
    ],
  },
  "code-grader": {
    problem:
      "Learners need feedback that is more explanatory than a pass/fail check, while submitted code still has to move through a backend grading flow in a controlled way.",
    constraints: [
      "Keep grading orchestration in the backend instead of pushing evaluation logic into the interface.",
      "Return feedback in categories that are understandable to a learner: correctness, complexity, and style.",
      "Treat LLM output as assistance that needs structure, not as an unquestioned source of truth.",
    ],
    architecture: {
      summary:
        "A FastAPI backend receives submissions and coordinates LangChain/CodeLlama evaluation before returning structured feedback to the product surface.",
      nodes: [
        "Submission UI",
        "FastAPI grading API",
        "Submission normalization",
        "LangChain orchestration",
        "CodeLlama feedback pass",
        "Structured feedback response",
      ],
      edges: [
        "The UI submits code and problem context to the grading API",
        "The backend normalizes inputs before model orchestration",
        "LangChain coordinates the prompt and model interaction",
        "Model output is shaped into correctness, complexity, and style feedback",
        "The interface receives feedback as a product response, not raw model text",
      ],
    },
    tradeoffs: [
      "LLM-backed review can explain tradeoffs better than static checks alone, but it needs guardrails around vague or inconsistent output.",
      "A backend grading boundary keeps the UI simpler, but it makes API contracts and error handling more important.",
      "Category-based feedback is easier to consume, but it can hide uncertainty if the response format is too rigid.",
    ],
    failureModes: [
      "Model output can be incomplete, contradictory, or too generic for the submitted code.",
      "Large or malformed submissions can exceed practical prompt or processing limits.",
      "A grading request can fail after submission, so the caller needs a clear retry or error state.",
    ],
    next: [
      "Add deterministic pre-checks for syntax and obvious runtime constraints before invoking model feedback.",
      "Store anonymized grading examples to compare feedback quality over time.",
      "Make uncertainty visible when feedback cannot be confidently categorized.",
    ],
  },
  "analytics-api": {
    problem:
      "A dashboard needs activity and engagement data shaped for presentation without spreading aggregation rules across frontend components.",
    constraints: [
      "Keep data shaping on the server side so dashboard views stay focused on display logic.",
      "Expose a REST boundary that makes analytics queries explicit.",
      "Avoid claiming performance wins without measured evidence from the deployment.",
    ],
    architecture: {
      summary:
        "The dashboard talks to a Django REST API that owns analytics endpoints and aggregation-focused data access before the Next.js UI renders the result.",
      nodes: [
        "Next.js dashboard",
        "Django REST API",
        "Analytics endpoint layer",
        "Aggregation/query logic",
        "Activity data store",
        "Dashboard visual states",
      ],
      edges: [
        "Dashboard requests a specific analytics view from the REST API",
        "API endpoint validates the requested shape and delegates aggregation",
        "Aggregation logic queries activity and engagement data",
        "The API returns presentation-ready summaries",
        "The dashboard renders the response without duplicating backend query rules",
      ],
    },
    tradeoffs: [
      "Server-side aggregation simplifies frontend code, but API changes need careful coordination with dashboard views.",
      "REST keeps the boundary straightforward, but each new analytics shape needs an intentional endpoint contract.",
      "Pre-shaped responses reduce UI work, but they can become too specific if dashboard needs change quickly.",
    ],
    failureModes: [
      "Expensive aggregation can slow dashboard responses if query shape and indexes are not revisited as data grows.",
      "A partial backend failure can make charts look empty unless the UI distinguishes no data from failed data.",
      "Time-window and filtering assumptions can produce misleading summaries if they are not visible in the interface.",
    ],
    next: [
      "Add explicit empty, loading, and failed states per dashboard panel.",
      "Document endpoint contracts with example request and response payloads.",
      "Introduce measured query profiling before making any optimization claims.",
    ],
  },
  snappio: {
    problem:
      "A social/chat backend has to combine realtime messaging with durable API state so conversations are interactive without treating all data as temporary socket traffic.",
    constraints: [
      "Use WebSockets for realtime messaging while keeping durable records in PostgreSQL-backed API flows.",
      "Stay within the Django ecosystem through Django REST and Django Channels.",
      "Keep Redis as realtime infrastructure rather than the primary record of user-facing data.",
    ],
    architecture: {
      summary:
        "Django REST owns durable resources, Django Channels handles WebSocket traffic, Redis supports realtime channel infrastructure, and PostgreSQL remains the persistence layer.",
      nodes: [
        "Client app",
        "Django REST endpoints",
        "Django Channels consumers",
        "Redis channel layer",
        "PostgreSQL database",
        "Swagger API documentation",
      ],
      edges: [
        "Client uses REST endpoints for durable resources and documented API flows",
        "Client opens WebSocket connections for chat-style updates",
        "Channels consumers coordinate realtime events through Redis",
        "Durable state is persisted through PostgreSQL-backed Django models",
        "Swagger exposes the REST API surface for inspection and integration",
      ],
    },
    tradeoffs: [
      "Django Channels keeps realtime work close to the REST API, but WebSocket behavior still needs separate operational thinking.",
      "PostgreSQL persistence protects durable state, but chat workloads need careful transaction and delivery semantics.",
      "Redis is useful for channel infrastructure, but it should not be treated as the only source of message truth.",
    ],
    failureModes: [
      "WebSocket disconnects can leave clients with stale conversation state unless reconnect behavior is deliberate.",
      "Realtime delivery and database persistence can disagree if message writes and broadcasts are not ordered carefully.",
      "Redis or worker availability can affect realtime updates even when REST endpoints remain reachable.",
    ],
    next: [
      "Define message acknowledgement and reconnect behavior in the API documentation.",
      "Add health checks that separate REST availability from realtime channel availability.",
      "Make persistence-versus-delivery ordering explicit in tests and documentation.",
    ],
  },
};

function getProject(id: string) {
  return projectList.find((project) => project.id === id && project.caseStudy);
}

export function generateStaticParams() {
  return projectList.filter((project) => project.caseStudy).map((project) => ({ id: project.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const project = getProject(id);
  const content = caseStudies[id];

  if (!project || !content) {
    return {
      title: "Project not found",
    };
  }

  return {
    title: `${project.title} Case Study`,
    description: `${project.title} case study: ${content.problem}`,
    openGraph: {
      title: `${project.title} Case Study | ${site.name}`,
      description: content.problem,
    },
  };
}

function Section({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="border-border-subtle scroll-mt-28 border-t pt-10">
      <h2 className="text-text-primary font-serif text-3xl leading-tight font-[440] tracking-[-0.01em]">
        {title}
      </h2>
      <div className="mt-5">{children}</div>
    </section>
  );
}

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-3">
      {items.map((item) => (
        <li key={item} className="text-text-muted flex gap-3 text-[15px] leading-relaxed">
          <span className="text-accent mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-current" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export default async function ProjectCaseStudyPage({ params }: Props) {
  const { id } = await params;
  const project = getProject(id);
  const content = caseStudies[id];

  if (!project || !content) {
    notFound();
  }

  return (
    <div className="bg-bg-primary min-h-screen px-6 py-32 md:px-8">
      <article className="mx-auto max-w-6xl">
        <Link
          href="/#projects"
          className="text-text-muted hover:text-accent font-mono text-[11px] tracking-[0.18em] uppercase transition-colors"
        >
          ← Back to selected work
        </Link>

        <header className="mt-10 grid gap-10 md:grid-cols-[1.12fr_0.88fr] md:items-end">
          <div>
            <Eyebrow>Project Case Study</Eyebrow>
            <h1 className="text-text-primary mt-5 font-serif text-5xl leading-[0.98] font-[440] tracking-[-0.02em] md:text-7xl">
              {project.title}
            </h1>
            <p className="text-text-muted mt-6 max-w-2xl text-[16px] leading-relaxed">
              {project.highlight ?? project.description}
            </p>
          </div>

          <aside className="bg-surface border-border-subtle rounded-2xl border p-6 shadow-[0_18px_40px_rgba(0,0,0,0.06)] dark:shadow-[0_24px_50px_rgba(0,0,0,0.5)]">
            <span className="numeral text-[88px]">{project.id.slice(0, 2).toUpperCase()}</span>
            <dl className="mt-5 space-y-5">
              <div>
                <dt className="text-text-primary font-mono text-[11px] tracking-[0.18em] uppercase">
                  Role
                </dt>
                <dd className="text-text-muted mt-2 text-[14px] leading-relaxed">
                  {project.role ?? "Project engineering"}
                </dd>
              </div>
              <div>
                <dt className="text-text-primary font-mono text-[11px] tracking-[0.18em] uppercase">
                  Primary constraint
                </dt>
                <dd className="text-text-muted mt-2 text-[14px] leading-relaxed">
                  {project.constraint}
                </dd>
              </div>
              <div>
                <dt className="text-text-primary font-mono text-[11px] tracking-[0.18em] uppercase">
                  Stack
                </dt>
                <dd className="mt-3 flex flex-wrap gap-2">
                  {project.tech.map((tech, index) => (
                    <span
                      key={tech}
                      className={`rounded-md border px-2.5 py-1 font-mono text-[10.5px] ${
                        index === 0
                          ? "border-accent/50 text-accent"
                          : "border-border-subtle text-text-muted"
                      }`}
                    >
                      {tech}
                    </span>
                  ))}
                </dd>
              </div>
            </dl>
          </aside>
        </header>

        <div className="mt-16 grid gap-12 lg:grid-cols-[220px_1fr]">
          <nav
            aria-label="Case study sections"
            className="bg-bg-primary border-border-subtle top-24 hidden self-start border-l pl-5 lg:sticky lg:block"
          >
            {[
              "Problem",
              "Constraints",
              "Architecture",
              "Tradeoffs",
              "Failure modes",
              "What I would improve next",
            ].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase().replaceAll(" ", "-")}`}
                className="text-text-muted hover:text-accent block py-2 font-mono text-[11px] tracking-[0.14em] uppercase transition-colors"
              >
                {item}
              </a>
            ))}
          </nav>

          <div className="bg-surface border-border-subtle space-y-10 rounded-2xl border p-6 shadow-[0_18px_40px_rgba(0,0,0,0.06)] md:p-10 dark:shadow-[0_24px_50px_rgba(0,0,0,0.5)]">
            <Section id="problem" title="Problem">
              <p className="text-text-muted text-[16px] leading-relaxed">{content.problem}</p>
            </Section>

            <Section id="constraints" title="Constraints">
              <BulletList items={content.constraints} />
            </Section>

            <Section id="architecture" title="Architecture">
              <div className="space-y-5">
                <p className="text-text-muted text-[15px] leading-relaxed">
                  {content.architecture.summary}
                </p>
                <ArchitectureDiagram
                  nodes={content.architecture.nodes}
                  edges={content.architecture.edges}
                />
              </div>
            </Section>

            <Section id="tradeoffs" title="Tradeoffs">
              <BulletList items={content.tradeoffs} />
            </Section>

            <Section id="failure-modes" title="Failure modes">
              <BulletList items={content.failureModes} />
            </Section>

            <Section id="what-i-would-improve-next" title="What I would improve next">
              <BulletList items={content.next} />
            </Section>
          </div>
        </div>
      </article>
    </div>
  );
}
