import { useEffect, useState, type ReactNode } from "react";
import { CertificateButton } from "@/components/CertificateDialog";
import {
  profile,
  about,
  skills,
  projects,
  credentials,
  achievements,
  research,
  categories,
  type Category,
} from "@/lib/portfolio-data";

const NAV = [
  ["about", "About"],
  ["skills", "Skills"],
  ["projects", "Projects"],
  ["credentials", "Credentials"],
  ["experience", "Experience"],
  ["research", "Research"],
  ["contact", "Contact"],
] as const;

/* ---------- small building blocks ---------- */

function Tag({ children }: { children: ReactNode }) {
  return (
    <span className="rounded-md border border-border bg-secondary px-2 py-0.5 font-mono text-xs text-secondary-foreground">
      {children}
    </span>
  );
}

function Section({
  id,
  title,
  kicker,
  children,
}: {
  id: string;
  title: string;
  kicker: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className="reveal mx-auto max-w-5xl px-5 py-20">
      <p className="font-mono text-sm text-primary">{kicker}</p>
      <h2 className="mt-1 text-3xl font-bold tracking-tight sm:text-4xl">{title}</h2>
      <div className="mt-10">{children}</div>
    </section>
  );
}

const btn =
  "inline-flex items-center justify-center gap-2 rounded-lg px-5 py-2.5 text-sm font-semibold transition-all";
const btnPrimary = `${btn} bg-primary text-primary-foreground hover:-translate-y-0.5 hover:shadow-[var(--shadow-lift)]`;
const btnGhost = `${btn} border border-border bg-card text-foreground hover:border-primary hover:text-primary`;

const Icon = {
  github: (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden="true">
      <path d="M12 .5a12 12 0 0 0-3.8 23.4c.6.1.8-.3.8-.6v-2c-3.3.7-4-1.6-4-1.6-.6-1.4-1.4-1.8-1.4-1.8-1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1 1.8 2.8 1.3 3.5 1 .1-.8.4-1.3.7-1.6-2.7-.3-5.5-1.3-5.5-6 0-1.2.5-2.3 1.2-3.1-.1-.4-.5-1.6.1-3.2 0 0 1-.3 3.3 1.2a11.5 11.5 0 0 1 6 0C17.3 4.7 18.3 5 18.3 5c.7 1.6.2 2.8.1 3.2.8.8 1.2 1.9 1.2 3.1 0 4.6-2.8 5.6-5.5 6 .4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6A12 12 0 0 0 12 .5Z" />
    </svg>
  ),
  linkedin: (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden="true">
      <path d="M20.4 20.5h-3.6v-5.6c0-1.3 0-3-1.8-3s-2.1 1.4-2.1 2.9v5.7H9.3V9h3.4v1.6h.1c.5-.9 1.6-1.8 3.4-1.8 3.6 0 4.3 2.4 4.3 5.5v6.2ZM5.3 7.4a2.1 2.1 0 1 1 0-4.2 2.1 2.1 0 0 1 0 4.2ZM7.1 20.5H3.5V9h3.6v11.5ZM22.2 0H1.8C.8 0 0 .8 0 1.7v20.6c0 .9.8 1.7 1.8 1.7h20.4c1 0 1.8-.8 1.8-1.7V1.7C24 .8 23.2 0 22.2 0Z" />
    </svg>
  ),
  mail: (
    <svg
      viewBox="0 0 24 24"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden="true"
    >
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3 7 9 6 9-6" />
    </svg>
  ),
};

/* ---------- hero pipeline graphic ---------- */

function PipelineGraphic() {
  const nodes = [
    { x: 30, y: 60, l: "raw" },
    { x: 130, y: 25, l: "etl" },
    { x: 130, y: 95, l: "feat" },
    { x: 230, y: 60, l: "model" },
    { x: 320, y: 60, l: "api" },
  ];
  const edges: [number, number][] = [
    [0, 1],
    [0, 2],
    [1, 3],
    [2, 3],
    [3, 4],
  ];
  return (
    <svg
      viewBox="0 0 350 140"
      className="w-full max-w-md"
      role="img"
      aria-label="Animated data pipeline: raw data to ETL and features, into a model, served by an API"
    >
      {edges.map(([a, b], i) => (
        <line
          key={i}
          x1={nodes[a]!.x}
          y1={nodes[a]!.y}
          x2={nodes[b]!.x}
          y2={nodes[b]!.y}
          className="animate-flow stroke-primary"
          strokeWidth="1.5"
          strokeDasharray="4 8"
          opacity="0.7"
        />
      ))}
      {nodes.map((n, i) => (
        <g key={n.l}>
          <circle
            cx={n.x}
            cy={n.y}
            r="14"
            className="fill-card stroke-primary animate-node"
            strokeWidth="1.5"
            style={{ animationDelay: `${i * 0.3}s` }}
          />
          <text
            x={n.x}
            y={n.y + 30}
            textAnchor="middle"
            className="fill-muted-foreground font-mono"
            fontSize="10"
          >
            {n.l}
          </text>
        </g>
      ))}
    </svg>
  );
}

/* ---------- page ---------- */

export default function App() {
  if (window.location.pathname !== "/") {
    return (
      <main className="flex min-h-screen items-center justify-center px-5">
        <div className="text-center">
          <h1 className="text-6xl font-bold text-primary">404</h1>
          <p className="mt-4 text-muted-foreground">This page could not be found.</p>
          <a href="/" className={`${btnPrimary} mt-6`}>
            Back to portfolio
          </a>
        </div>
      </main>
    );
  }
  return <Portfolio />;
}

function Portfolio() {
  const [dark, setDark] = useState(() => {
    try {
      return localStorage.getItem("theme") !== "light";
    } catch {
      return true;
    }
  });
  const [filter, setFilter] = useState<"All" | Category>("All");
  const [copied, setCopied] = useState(false);
  const [menu, setMenu] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
    try {
      localStorage.setItem("theme", dark ? "dark" : "light");
    } catch {
      // Theme switching still works when browser storage is unavailable.
    }
  }, [dark]);

  // fade-in on scroll
  useEffect(() => {
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => e.isIntersecting && e.target.classList.add("is-visible")),
      { threshold: 0.1 },
    );
    document.querySelectorAll(".reveal").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  const shown = filter === "All" ? projects : projects.filter((p) => p.category === filter);

  const copyEmail = async () => {
    await navigator.clipboard.writeText(profile.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  // Contact form opens the visitor's mail app (no backend needed)
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const subject = encodeURIComponent(`Portfolio contact from ${f.get("name")}`);
    const body = encodeURIComponent(
      `${f.get("message")}\n\n— ${f.get("name")} (${f.get("email")})`,
    );
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
  };

  return (
    <div className="min-h-screen">
      {/* NAV */}
      <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur">
        <nav
          className="mx-auto flex max-w-5xl items-center justify-between px-5 py-3"
          aria-label="Main"
        >
          <a href="#top" className="font-mono text-sm font-medium">
            <span className="text-primary">~/</span>
            {profile.name.toLowerCase().replace(/\s+/g, "")}
          </a>
          <ul className="hidden gap-6 text-sm text-muted-foreground lg:flex">
            {NAV.map(([id, l]) => (
              <li key={id}>
                <a href={`#${id}`} className="transition-colors hover:text-primary">
                  {l}
                </a>
              </li>
            ))}
          </ul>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setDark(!dark)}
              aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
              className="rounded-lg border border-border p-2 text-muted-foreground transition-colors hover:text-primary"
            >
              {dark ? (
                <svg
                  viewBox="0 0 24 24"
                  className="h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  aria-hidden="true"
                >
                  <circle cx="12" cy="12" r="4" />
                  <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
                </svg>
              ) : (
                <svg
                  viewBox="0 0 24 24"
                  className="h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  aria-hidden="true"
                >
                  <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z" />
                </svg>
              )}
            </button>
            <a href={profile.resume} download className={`${btnPrimary} px-3 py-2 text-xs`}>
              Resume
            </a>
            <button
              className="rounded-lg border border-border p-2 lg:hidden"
              aria-label="Toggle menu"
              aria-expanded={menu}
              onClick={() => setMenu(!menu)}
            >
              <svg
                viewBox="0 0 24 24"
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                aria-hidden="true"
              >
                <path d="M4 7h16M4 12h16M4 17h16" />
              </svg>
            </button>
          </div>
        </nav>
        {menu && (
          <ul className="border-t border-border px-5 py-3 lg:hidden">
            {NAV.map(([id, l]) => (
              <li key={id}>
                <a
                  href={`#${id}`}
                  onClick={() => setMenu(false)}
                  className="block py-2 text-muted-foreground hover:text-primary"
                >
                  {l}
                </a>
              </li>
            ))}
          </ul>
        )}
      </header>

      <main id="top">
        {/* HERO */}
        <section className="relative overflow-hidden">
          <div className="bg-grid pointer-events-none absolute inset-0" aria-hidden="true" />
          <div className="relative mx-auto grid max-w-5xl items-center gap-10 px-5 pb-20 pt-16 md:grid-cols-[1.3fr_1fr] md:pt-24">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-primary/40 bg-accent px-3 py-1 font-mono text-xs text-accent-foreground">
                <span className="h-2 w-2 rounded-full bg-primary animate-node" /> Open to work ·{" "}
                {profile.openTo}
              </span>
              <h1 className="mt-5 text-4xl font-bold tracking-tight sm:text-6xl">{profile.name}</h1>
              <p className="mt-3 text-xl font-medium text-primary sm:text-2xl">
                {profile.tagline.split(" · ").map((role, index, roles) => (
                  <span key={role} className="inline-block">
                    {role}
                    {index < roles.length - 1 && " ·\u00a0"}
                  </span>
                ))}
              </p>
              <p className="mt-4 max-w-xl text-muted-foreground">{profile.intro}</p>
              <div className="mt-4 flex flex-wrap gap-2" aria-label="Engineering specialisations">
                {profile.roles.map((role) => (
                  <Tag key={role}>{role}</Tag>
                ))}
              </div>
              <p className="mt-2 font-mono text-xs text-muted-foreground">{profile.location}</p>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <a href="#projects" className={btnPrimary}>
                  View Projects
                </a>
                <a href={profile.resume} download className={btnGhost}>
                  Download Resume
                </a>
                {profile.github && (
                  <a
                    href={profile.github}
                    target="_blank"
                    rel="noreferrer"
                    aria-label="GitHub"
                    className="p-2 text-muted-foreground hover:text-primary"
                  >
                    {Icon.github}
                  </a>
                )}
                <a
                  href={profile.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="LinkedIn"
                  className="p-2 text-muted-foreground hover:text-primary"
                >
                  {Icon.linkedin}
                </a>
              </div>
            </div>
            <div className="rounded-2xl border border-border bg-card/70 p-5 shadow-card">
              <p className="mb-3 font-mono text-xs text-muted-foreground">
                $ pipeline --status <span className="text-primary">running</span>
              </p>
              <PipelineGraphic />
            </div>
          </div>
        </section>

        {/* ABOUT */}
        <Section id="about" kicker="01 / about" title="About me">
          <div className="grid items-start gap-10 md:grid-cols-[1.5fr_1fr]">
            <div className="rounded-2xl border border-border bg-card p-6 shadow-card sm:p-8">
              <div className="space-y-5 leading-relaxed text-muted-foreground">
                {about.map((p, i) => (
                  <p key={i} className={i === 0 ? "text-foreground" : undefined}>
                    {p}
                  </p>
                ))}
              </div>
            </div>
            <dl className="space-y-4 rounded-2xl border border-border bg-card p-6 shadow-card">
              {[
                ["Education", profile.education],
                ["Location", profile.location],
                ["Interests", profile.interests],
                ["Open to", profile.openTo],
                ["Experience", profile.experience],
              ].map(([k, v]) => (
                <div key={k}>
                  <dt className="font-mono text-xs uppercase text-primary">{k}</dt>
                  <dd className="mt-0.5 text-sm">{v}</dd>
                </div>
              ))}
            </dl>
          </div>
        </Section>

        {/* SKILLS */}
        <Section id="skills" kicker="02 / skills" title="Toolkit">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {Object.entries(skills).map(([group, items]) => (
              <div key={group} className="card-lift rounded-2xl border border-border bg-card p-5">
                <h3 className="font-semibold">{group}</h3>
                <div className="mt-3 flex flex-wrap gap-2">
                  {items.map((s) => (
                    <Tag key={s}>{s}</Tag>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Section>

        {/* PROJECTS */}
        <Section id="projects" kicker="03 / projects" title="Projects">
          <div className="mb-8 flex flex-wrap gap-2" role="group" aria-label="Filter projects">
            {(["All", ...categories] as const).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                aria-pressed={filter === f}
                className={`rounded-full border px-4 py-1.5 font-mono text-xs transition-colors ${filter === f ? "border-primary bg-primary text-primary-foreground" : "border-border text-muted-foreground hover:border-primary hover:text-primary"}`}
              >
                {f}
              </button>
            ))}
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            {shown.map((p) => (
              <article
                key={p.title}
                className="card-lift flex flex-col rounded-2xl border border-border bg-card p-6"
              >
                <span className="font-mono text-xs text-primary">{p.category}</span>
                <h3 className="mt-1 text-xl font-semibold">{p.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{p.problem}</p>
                {p.diagram && (
                  <div
                    className="mt-4 flex flex-wrap items-center gap-1 rounded-xl border border-dashed border-border bg-secondary/50 p-3 font-mono text-[11px]"
                    aria-label="Architecture diagram"
                  >
                    {p.diagram.map((s, i) => (
                      <span key={s} className="flex items-center gap-1">
                        <span className="rounded border border-primary/40 bg-card px-2 py-1">
                          {s}
                        </span>
                        {i < p.diagram!.length - 1 && <span className="text-primary">→</span>}
                      </span>
                    ))}
                  </div>
                )}
                <ul className="mt-4 space-y-1.5 text-sm">
                  {p.impact.map((b) => (
                    <li key={b} className="flex gap-2">
                      <span className="text-primary">▸</span>
                      {b}
                    </li>
                  ))}
                </ul>
                <p className="mt-4 text-xs text-muted-foreground">
                  <span className="font-mono text-primary">role:</span> {p.role}
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {p.stack.map((s) => (
                    <Tag key={s}>{s}</Tag>
                  ))}
                </div>
                <div className="mt-auto flex gap-4 pt-5 text-sm font-medium">
                  {p.github && (
                    <a
                      href={p.github}
                      target="_blank"
                      rel="noreferrer"
                      className="text-primary hover:underline"
                    >
                      GitHub →
                    </a>
                  )}
                  {p.demo && (
                    <a
                      href={p.demo}
                      target="_blank"
                      rel="noreferrer"
                      className="text-primary hover:underline"
                    >
                      Live demo →
                    </a>
                  )}
                </div>
              </article>
            ))}
          </div>
        </Section>

        {/* CREDENTIALS */}
        <Section id="credentials" kicker="04 / credentials" title="Education & certificates">
          <div className="grid gap-4 sm:grid-cols-2">
            {credentials.map((c) => (
              <div key={c.title} className="card-lift rounded-2xl border border-border bg-card p-5">
                <span className="font-mono text-xs text-primary">
                  {c.kind}
                  {c.year && ` · ${c.year}`}
                </span>
                <h3 className="mt-1 font-semibold">{c.title}</h3>
                {c.org && <p className="text-sm text-muted-foreground">{c.org}</p>}
                {c.detail && !c.certificateId && (
                  <p className="mt-2 text-sm text-muted-foreground">{c.detail}</p>
                )}
                {c.certificateId && <CertificateButton certificateId={c.certificateId} />}
              </div>
            ))}
          </div>
        </Section>

        {/* EXPERIENCE — omitted automatically if the array is empty */}
        {achievements.length > 0 && (
          <Section id="experience" kicker="05 / experience" title="Professional experience">
            <ol className="relative space-y-8 border-l border-border pl-6">
              {achievements.map((a) => (
                <li key={`${a.org}-${a.title}`} className="relative">
                  <span className="absolute -left-[31px] top-1.5 h-3 w-3 rounded-full border-2 border-primary bg-background" />
                  <span className="font-mono text-xs text-primary">{a.year}</span>
                  <h3 className="font-semibold">
                    {a.title} <span className="font-normal text-muted-foreground">· {a.org}</span>
                  </h3>
                  <p className="mt-1 font-mono text-xs text-primary">{a.location}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{a.detail}</p>
                  {a.certificateId && <CertificateButton certificateId={a.certificateId} />}
                </li>
              ))}
            </ol>
          </Section>
        )}

        <Section id="research" kicker="06 / research" title="Research & publications">
          <div className="grid gap-6 md:grid-cols-2">
            {research.map((paper) => (
              <article
                key={paper.title}
                className="card-lift rounded-2xl border border-border bg-card p-6"
              >
                <p className="font-mono text-xs text-primary">{paper.date}</p>
                <h3 className="mt-2 text-xl font-semibold">{paper.title}</h3>
                <p className="mt-3 text-sm text-muted-foreground">{paper.publication}</p>
                <p className="mt-2 font-mono text-xs text-primary">{paper.identifier}</p>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{paper.detail}</p>
              </article>
            ))}
          </div>
        </Section>

        {/* CONTACT */}
        <Section id="contact" kicker="07 / contact" title="Let's talk">
          <div className="grid gap-8 md:grid-cols-2">
            <div>
              <p className="text-muted-foreground">
                Looking for a Software Engineer with experience in full-stack development, AI/ML,
                distributed systems, and cloud services? I'd love to hear about your team and the
                problems you're solving. I'm based in Delhi and ready to relocate.
              </p>
              <div className="mt-6 flex flex-wrap items-center gap-2 rounded-xl border border-border bg-card p-3">
                <a
                  href={`mailto:${profile.email}`}
                  className="font-mono text-sm hover:text-primary"
                >
                  {profile.email}
                </a>
                <button
                  onClick={copyEmail}
                  className={`${btnGhost} ml-auto px-3 py-1.5 text-xs`}
                  aria-live="polite"
                >
                  {copied ? "Copied ✓" : "Copy"}
                </button>
              </div>
              <a
                href={profile.phoneHref}
                className="mt-4 inline-block font-mono text-sm text-muted-foreground hover:text-primary"
              >
                {profile.phone}
              </a>
              <div className="mt-4 flex gap-3">
                {profile.github && (
                  <a
                    href={profile.github}
                    target="_blank"
                    rel="noreferrer"
                    aria-label="GitHub"
                    className={`${btnGhost} px-3`}
                  >
                    {Icon.github}
                  </a>
                )}
                <a
                  href={profile.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="LinkedIn"
                  className={`${btnGhost} px-3`}
                >
                  {Icon.linkedin}
                </a>
                <a
                  href={`mailto:${profile.email}`}
                  aria-label="Email"
                  className={`${btnGhost} px-3`}
                >
                  {Icon.mail}
                </a>
              </div>
            </div>
            <form
              onSubmit={onSubmit}
              className="space-y-4 rounded-2xl border border-border bg-card p-6 shadow-card"
            >
              {[
                ["name", "Name", "text"],
                ["email", "Email", "email"],
              ].map(([n, l, t]) => (
                <label key={n} className="block text-sm">
                  {l}
                  <input
                    name={n}
                    type={t}
                    required
                    maxLength={200}
                    className="mt-1 w-full rounded-lg border border-input bg-background px-3 py-2 outline-none focus:border-primary"
                  />
                </label>
              ))}
              <label className="block text-sm">
                Message
                <textarea
                  name="message"
                  required
                  rows={4}
                  maxLength={2000}
                  className="mt-1 w-full rounded-lg border border-input bg-background px-3 py-2 outline-none focus:border-primary"
                />
              </label>
              <button type="submit" className={`${btnPrimary} w-full`}>
                Send message
              </button>
            </form>
          </div>
        </Section>
      </main>

      <footer className="border-t border-border">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-5 py-6 font-mono text-xs text-muted-foreground">
          <span>
            © {new Date().getFullYear()} {profile.name}
          </span>
          <a href="#top" className="hover:text-primary">
            Back to top ↑
          </a>
        </div>
      </footer>
    </div>
  );
}
