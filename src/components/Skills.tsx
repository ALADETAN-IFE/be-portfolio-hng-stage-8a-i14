"use client";

import { motion } from "motion/react";
import {
  Zap,
  Shield,
  Database,
  Link,
  TestTube,
  Rocket,
  FileText,
} from "lucide-react";

type Skill = {
  name: string;
  project: string;
  detail: string;
};

type Category = {
  label: string;
  icon: React.ReactNode;
  skills: Skill[];
};

const SKILL_CATEGORIES: Category[] = [
  {
    label: "API Design",
    icon: <Zap size={15} />,
    skills: [
      {
        name: "RESTful endpoint design",
        project: "Name Classifier API",
        detail:
          "Structured GET /api/classify with correct HTTP status codes (400, 422, 502, 500) and consistent JSON response contracts including computed fields and timestamps.",
      },
      {
        name: "Idempotent resource creation",
        project: "Profiles Persistence API",
        detail:
          "POST /api/profiles checks for an existing record by name before hitting external APIs, returning 200 with the existing profile instead of creating a duplicate.",
      },
      {
        name: "Advanced query filtering",
        project: "Profiles Persistence API",
        detail:
          "GET /api/profiles supports case-insensitive filtering by gender, country_id, and age_group via query parameters.",
      },
    ],
  },
  {
    label: "Security & Middleware",
    icon: <Shield size={15} />,
    skills: [
      {
        name: "Security headers with Helmet",
        project: "Name Classifier API, Profiles Persistence API",
        detail:
          "Helmet middleware applied on both APIs to set HTTP security headers and reduce common attack surface.",
      },
      {
        name: "Rate limiting",
        project: "Name Classifier API, Profiles Persistence API",
        detail:
          "express-rate-limit configured on all endpoints to prevent abuse and ensure service stability under load.",
      },
      {
        name: "CORS configuration",
        project: "Name Classifier API, Profiles Persistence API",
        detail:
          "Cross-origin requests handled with explicit origin policies to control which clients can consume the APIs.",
      },
      {
        name: "Automated code quality gates",
        project: "Name Classifier API, Profiles Persistence API",
        detail:
          "Husky pre-commit hooks enforcing ESLint, Prettier, and TypeScript type-checks before every commit.",
      },
    ],
  },
  {
    label: "Databases",
    icon: <Database size={15} />,
    skills: [
      {
        name: "PostgreSQL + Prisma ORM",
        project: "Profiles Persistence API",
        detail:
          "Defined schema with Prisma, ran automated migrations, and used type-safe CRUD queries with Supabase as the managed PostgreSQL host.",
      },
    ],
  },
  {
    label: "External API Integration",
    icon: <Link size={15} />,
    skills: [
      {
        name: "Single external API integration",
        project: "Name Classifier API",
        detail:
          "Fetched from the Genderize API, transformed the raw response to add computed fields (is_confident, processed_at), and normalized the output format.",
      },
      {
        name: "Parallel external API calls",
        project: "Profiles Persistence API",
        detail:
          "Used Promise.all to call Genderize, Agify, and Nationalize simultaneously, reducing latency and handling partial upstream failures gracefully.",
      },
      {
        name: "Data transformation & classification",
        project: "Name Classifier API, Profiles Persistence API",
        detail:
          "Applied business rules to enrich raw API responses — renaming fields, computing confidence flags, deriving age groups, and adding metadata before persisting.",
      },
    ],
  },
  {
    label: "Testing & Observability",
    icon: <TestTube size={15} />,
    skills: [
      {
        name: "Request logging with Morgan",
        project: "Name Classifier API, Profiles Persistence API",
        detail:
          "Structured HTTP request/response logging configured on both APIs for runtime observability and debugging.",
      },
      {
        name: "Health check endpoints",
        project: "Name Classifier API",
        detail:
          "Dedicated /health endpoint returning service status and uptime, enabling basic monitoring and discovery.",
      },
      {
        name: "Error handling contracts",
        project: "Name Classifier API, Profiles Persistence API",
        detail:
          "Consistent structured JSON error responses across all failure scenarios: 400 (bad input), 404 (not found), 422 (unprocessable), 502 (upstream failure), 500 (internal).",
      },
    ],
  },
  {
    label: "Deployment",
    icon: <Rocket size={15} />,
    skills: [
      {
        name: "Railway deployment",
        project: "Name Classifier API",
        detail:
          "Node.js + Express service deployed on Railway with environment variable management and a live public URL.",
      },
      {
        name: "Render + Supabase deployment",
        project: "Profiles Persistence API",
        detail:
          "Node.js + Prisma backend deployed on Render, connected to Supabase PostgreSQL via a pooled connection string.",
      },
    ],
  },
  {
    label: "Tooling & Standards",
    icon: <FileText size={15} />,
    skills: [
      {
        name: "TypeScript throughout",
        project: "Name Classifier API, Profiles Persistence API",
        detail:
          "Both APIs written in TypeScript with strict type checking, typed request/response shapes, and no implicit any.",
      },
      {
        name: "Environment variable management",
        project: "Name Classifier API, Profiles Persistence API",
        detail:
          "dotenv used for centralised configuration, keeping secrets out of source control and supporting multiple environments.",
      },
    ],
  },
];

function SkillCard({ cat, index }: { cat: Category; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.07 }}
      className="bg-(--surface) border border-(--border) rounded-lg p-5"
    >
      <div className="flex items-center gap-2 mb-4 text-(--accent)">
        {cat.icon}
        <h3 className="text-sm font-semibold text-(--text)">{cat.label}</h3>
      </div>
      <ul className="space-y-3">
        {cat.skills.map((s) => (
          <li key={s.name}>
            <div className="flex items-start justify-between gap-2 mb-0.5">
              <span className="text-xs font-medium text-(--text-dim)">
                {s.name}
              </span>
              <span className="tag shrink-0 text-[10px] leading-tight whitespace-nowrap">
                {s.project.length > 24 ? "Both APIs" : s.project}
              </span>
            </div>
            <p className="text-[11px] text-(--muted) leading-relaxed">
              {s.detail}
            </p>
          </li>
        ))}
      </ul>
    </motion.div>
  );
}

export default function Skills() {
  return (
    <section
      id="skills"
      className="py-24 bg-(--surface)/30 border-y border-(--border)"
    >
      <div className="max-w-5xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="mb-10"
        >
          <div className="flex items-center gap-3 mb-3">
            <span className="font-mono-custom text-xs text-(--accent)">
              03.
            </span>
            <h2 className="text-2xl font-bold text-(--text)">
              Backend Skills
            </h2>
          </div>
          <p className="text-sm text-(--muted) max-w-xl">
            Every skill listed here is tied to a project I built during HNG i14.
            If I can&apos;t point to where I used it, it&apos;s not on this list.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {SKILL_CATEGORIES.map((cat, i) => (
            <SkillCard key={cat.label} cat={cat} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}