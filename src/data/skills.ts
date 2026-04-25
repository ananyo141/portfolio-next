export interface SkillCategory {
  category: string;
  items: string[];
}

export const skills: SkillCategory[] = [
  {
    category: "Languages",
    items: ["TypeScript", "Rust", "Go", "Python", "SQL", "Elixir"],
  },
  {
    category: "Frameworks",
    items: ["Next.js", "React", "Node.js", "Django", "Phoenix", "Actix"],
  },
  {
    category: "Infrastructure",
    items: ["Kubernetes", "Terraform", "AWS", "PostgreSQL", "Redis", "Kafka"],
  },
  {
    category: "Currently Exploring",
    items: ["Zig", "WebAssembly Component Model", "Local-First Software"],
  },
];
