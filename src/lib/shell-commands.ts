export type Tone = "out" | "dim" | "acc" | "err";
export interface Line {
  text: string;
  tone: Tone;
}
export interface Entry {
  cmd: string | null;
  out: Line[];
}
export interface ShellContext {
  posts: { title: string; date: string }[];
}

export const SECTIONS = ["work", "experience", "writing", "contact", "stack"] as const;
export const QUICK_COMMANDS = ["help", "whoami", "projects", "writing", "contact", "sudo hire-me"];
const MAX_ENTRIES = 14;

const L = (text: string, tone: Tone = "out"): Line => ({ text, tone });

export function commandOutput(name: string, ctx: ShellContext): Line[] | null {
  switch (name) {
    case "help":
      return [
        L("Available commands:", "dim"),
        L("  whoami         who is behind this page"),
        L("  projects       selected work, one line each"),
        L("  experience     the career trace"),
        L("  stack          languages, frameworks, infra"),
        L("  writing        latest essays"),
        L("  contact        how to reach me"),
        L("  open <name>    jump to work | experience | writing | contact"),
        L("  clear          wipe the screen"),
        L("psst — there is a sudo command too.", "dim"),
      ];
    case "whoami":
      return [
        L("Ananyobrata Pal", "acc"),
        L("Software Engineer @ rtCamp · Kolkata, India"),
        L("Backend, distributed systems and developer tooling."),
        L("Building systems that outlast the hype.", "dim"),
      ];
    case "projects":
      return [
        L("01  Code Grader      LLM-backed code grading · FastAPI, LangChain"),
        L("02  Vimero           queue-backed video platform · Go, Rust, RabbitMQ"),
        L("03  Analytics API    aggregation-first dashboard · Django REST"),
        L("04  Snappio          realtime chat backend · Channels, Redis"),
        L("05  PeerMessaging    P2P messaging and calls · PeerJS"),
        L("→ try: open work", "dim"),
      ];
    case "experience":
      return [
        L("2024 ─ now    rtCamp Solutions      Software Engineer", "acc"),
        L("2023 ─ 2024   ScalenowTech          Full Stack Developer"),
        L("2023 ─ 2024   Varlyq Technologies   Backend Developer"),
        L("→ try: open experience", "dim"),
      ];
    case "stack":
      return [
        L("lang    TypeScript  Python  Go  Rust  SQL"),
        L("fw      Next.js  React  Node.js  Express  Django  FastAPI"),
        L("infra   Docker  PostgreSQL  MongoDB  Redis  RabbitMQ  AWS  Vercel"),
        L("next    LangChain · LLM orchestration · distributed systems", "acc"),
      ];
    case "writing":
      return [
        ...ctx.posts.slice(0, 5).map((p) => L(`${p.date}  ${p.title}`)),
        L("→ try: open writing", "dim"),
      ];
    case "contact":
      return [
        L("email      ananyo141@gmail.com", "acc"),
        L("github     github.com/ananyo141"),
        L("linkedin   linkedin.com/in/ananyo141"),
        L("x          @ananyo141"),
        L("or try: sudo hire-me", "dim"),
      ];
    case "ls":
      return [L("work/  experience/  writing/  contact/")];
    case "sudo hire-me":
      return [
        L("[sudo] password for recruiter: ********", "dim"),
        L("Permission granted.", "acc"),
        L("Scrolling you to the contact form…"),
      ];
    default:
      return null;
  }
}

export function initialHistory(ctx: ShellContext): Entry[] {
  return [
    { cmd: null, out: [L("ap-shell v1.0 — type `help` to begin.", "dim")] },
    { cmd: "whoami", out: commandOutput("whoami", ctx) ?? [] },
  ];
}

export function runCommand(
  history: Entry[],
  raw: string,
  ctx: ShellContext
): { history: Entry[]; jump: string | null } {
  const cmd = String(raw ?? "").trim();
  const key = cmd.toLowerCase().replace(/\s+/g, " ");
  if (key === "clear") return { history: [], jump: null };

  let out: Line[];
  let jump: string | null = null;
  if (key === "") {
    out = [];
  } else if (key.startsWith("open ") || key.startsWith("cd ")) {
    const target = key.split(" ")[1].replace(/\/$/, "");
    if ((SECTIONS as readonly string[]).includes(target)) {
      out = [L(`opening ${target}…`, "acc")];
      jump = target;
    } else {
      out = [L(`open: no such section: ${target}`, "err")];
    }
  } else {
    const found = commandOutput(key, ctx);
    if (key === "sudo hire-me") jump = "contact";
    out = found ?? [
      L(`command not found: ${cmd}`, "err"),
      L("type `help` to see what is here", "dim"),
    ];
  }
  return { history: [...history, { cmd, out }].slice(-MAX_ENTRIES), jump };
}
