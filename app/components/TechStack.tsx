"use client";

import { motion } from "framer-motion";
import { useIsMobile, useIsTablet } from "../hooks/useMediaQuery";
import {
  SiReact, SiNextdotjs, SiTypescript, SiJavascript, SiTailwindcss, SiBootstrap, SiVuedotjs,
  SiNodedotjs, SiSocketdotio, SiPython,
  SiPostgresql, SiMysql, SiMongodb, SiPrisma,
  SiDocker, SiVercel,
  SiGit, SiPostman, SiSanity,
} from "react-icons/si";

const MONO: React.CSSProperties = { fontFamily: "var(--font-mono), monospace" };
const ease = [0.22, 1, 0.36, 1] as const;

type Skill = {
  name: string;
  icon: React.ReactNode;
  primary?: boolean;
};

type Group = {
  label: string;
  skills: Skill[];
};

const GROUPS: Group[] = [
  {
    label: "Frontend",
    skills: [
      { name: "Vue.js",      icon: <SiVuedotjs />,      primary: true },
      { name: "React",       icon: <SiReact />,         primary: true },
      { name: "Next.js",     icon: <SiNextdotjs />,     primary: true },
      { name: "JavaScript",  icon: <SiJavascript />,    primary: true },
      { name: "TypeScript",  icon: <SiTypescript />,    primary: true },
      { name: "Tailwind",    icon: <SiTailwindcss />               },
      { name: "Bootstrap",   icon: <SiBootstrap />                 },
    ],
  },
  {
    label: "Backend",
    skills: [
      { name: "Node.js",    icon: <SiNodedotjs />,   primary: true },
      { name: "Express",    icon: <span style={{ fontWeight: 700, fontSize: "11px" }}>Ex</span>, primary: true },
      { name: "Socket.IO",  icon: <SiSocketdotio />              },
      { name: "Python",     icon: <SiPython />                   },
    ],
  },
  {
    label: "Database",
    skills: [
      { name: "MySQL",      icon: <SiMysql />,      primary: true },
      { name: "PostgreSQL", icon: <SiPostgresql />, primary: true },
      { name: "MongoDB",    icon: <SiMongodb />                  },
      { name: "Prisma",     icon: <SiPrisma />                   },
    ],
  },
  {
    label: "Cloud & DevOps",
    skills: [
      { name: "Docker", icon: <SiDocker />,         primary: true },
      { name: "Azure",  icon: <span style={{ fontWeight: 700, fontSize: "11px" }}>Az</span>, primary: true },
      { name: "Vercel", icon: <SiVercel />                       },
    ],
  },
  {
    label: "Tools",
    skills: [
      { name: "Git",     icon: <SiGit />,     primary: true },
      { name: "Postman", icon: <SiPostman />              },
      { name: "Sanity",  icon: <SiSanity />               },
    ],
  },
];

function SkillCard({ skill, delay = 0 }: { skill: Skill; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      whileHover={{ y: -2 }}
      transition={{ duration: 0.4, ease, delay }}
      style={{
        display: "flex", alignItems: "center", gap: 8,
        padding: "8px 12px",
        background: "var(--surface)",
        border: `1px solid ${skill.primary ? "var(--hairline)" : "var(--hairline)"}`,
        borderRadius: "4px",
        cursor: "default",
        transition: "border-color 0.2s, background 0.2s",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = "rgba(240,78,0,0.5)";
        e.currentTarget.style.background = "rgba(240,78,0,0.08)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = "var(--hairline)";
        e.currentTarget.style.background = skill.primary ? "var(--surface)" : "var(--badge)";
      }}
    >
      <span style={{ fontSize: "14px", color: "var(--text-high)", display: "flex", alignItems: "center" }}>
        {skill.icon}
      </span>
      <span style={{ ...MONO, fontSize: "11px", fontWeight: 500, letterSpacing: "0.06em", color: "var(--text-mid)", whiteSpace: "nowrap" }}>
        {skill.name}
      </span>
    </motion.div>
  );
}

export default function TechStack() {
  const isMobile = useIsMobile();
  const isTablet = useIsTablet();

  const cols = isMobile ? "repeat(2, 1fr)" : isTablet ? "repeat(3, 1fr)" : "repeat(5, 1fr)";
  const px = isMobile ? "24px" : "64px";

  return (
    <section style={{
      background: "var(--canvas)",
      borderTop: "1px solid var(--hairline)",
      padding: `80px ${px}`,
    }}>
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.55, ease }}
        style={{ marginBottom: "52px" }}
      >
        <p style={{
          ...MONO, fontSize: "10px", letterSpacing: "0.14em",
          textTransform: "uppercase", color: "var(--text-subtle)",
          marginBottom: "16px",
        }}>
          Tech Stack
        </p>
        <h2 style={{
          fontSize: "clamp(24px, 3vw, 40px)", fontWeight: 700,
          letterSpacing: "-0.03em", color: "var(--text-high)", lineHeight: 1.1,
        }}>
          เครื่องมือที่ใช้งาน<br />
          <span style={{ color: "var(--text-subtle)" }}>จริงใน production.</span>
        </h2>
      </motion.div>

      {/* Groups */}
      <div style={{
        display: "grid",
        gridTemplateColumns: cols,
        gap: "40px 24px",
      }}>
        {GROUPS.map((group, gi) => (
          <motion.div
            key={group.label}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5, ease, delay: gi * 0.08 }}
          >
            <p style={{
              ...MONO, fontSize: "9px", letterSpacing: "0.14em",
              textTransform: "uppercase", color: "#F04E00",
              marginBottom: "16px",
            }}>
              {group.label}
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
              {group.skills.map((skill, si) => (
                <SkillCard key={skill.name} skill={skill} delay={gi * 0.08 + si * 0.05} />
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Footer note */}
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, ease, delay: 0.3 }}
        style={{ ...MONO, fontSize: "10px", color: "var(--text-subtle)", marginTop: "52px", letterSpacing: "0.06em" }}
      >
        * primary skills — used daily in production projects
      </motion.p>
    </section>
  );
}
