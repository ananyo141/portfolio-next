export interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  tech: string[];
  github?: string;
  live?: string;
  featured: boolean;
}

export const projects: Project[] = [
  {
    id: "distributed-task-queue",
    title: "Distributed Task Queue",
    description:
      "A Redis-backed job queue with at-least-once delivery guarantees, dead-letter handling, and graceful worker shutdown. Built because I got tired of fighting with Celery.",
    tags: ["Systems", "Backend"],
    tech: ["Rust", "Redis", "Tokio", "gRPC"],
    github: "https://github.com",
    live: "https://example.com",
    featured: true,
  },
  {
    id: "real-time-collab",
    title: "Real-Time Collab Editor",
    description:
      "Operational-transform-based collaborative text editor with WebSocket sync, cursor presence, and offline support. CRDTs are overrated—OT is still faster for most cases.",
    tags: ["Frontend", "Real-Time"],
    tech: ["TypeScript", "React", "WebSockets", "Node.js"],
    github: "https://github.com",
    featured: false,
  },
  {
    id: "observability-platform",
    title: "Observability Platform",
    description:
      "Lightweight metrics aggregation and tracing pipeline that replaces Datadog for early-stage teams. Pull-based Prometheus scraping with custom storage backend.",
    tags: ["Infrastructure", "DevOps"],
    tech: ["Go", "ClickHouse", "gRPC", "Kubernetes"],
    github: "https://github.com",
    featured: false,
  },
  {
    id: "wasm-image-processor",
    title: "WASM Image Processor",
    description:
      "Client-side image transformation pipeline compiled to WebAssembly. Resize, compress, and apply filters without ever touching a server. Surprisingly fast.",
    tags: ["Frontend", "WebAssembly"],
    tech: ["Rust", "WASM", "WebGL", "Vite"],
    github: "https://github.com",
    live: "https://example.com",
    featured: false,
  },
  {
    id: "schema-migration-tool",
    title: "Schema Migration Tool",
    description:
      "Declarative database schema management with versioned migrations, rollback safety, and automatic conflict detection. Think Terraform but for SQL.",
    tags: ["Tooling", "Database"],
    tech: ["Python", "PostgreSQL", "SQLAlchemy", "Click"],
    github: "https://github.com",
    featured: false,
  },
];
