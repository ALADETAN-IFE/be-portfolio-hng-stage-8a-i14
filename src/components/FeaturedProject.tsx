"use client";

import { motion } from "motion/react";
import { useProjects } from "@/hooks/getProjectHook";
import type { Project } from "@/app/api/routes";

// Score projects — pick the most technically rich backend one
function scoreProject(p: Project): number {
  let score = 0;
  const text = JSON.stringify(p).toLowerCase();
  const signals = [
    "postgresql",
    "prisma",
    "mongodb",
    "mongoose",
    "express",
    "jwt",
    "auth",
    "oauth",
    "webhook",
    "rate-limit",
    "helmet",
    "jest",
    "supertest",
    "swagger",
    "openapi",
    "paystack",
    "mastra",
    "gemini",
    "zod",
    "redis",
    "docker",
  ];
  signals.forEach((s) => {
    if (text.includes(s)) score++;
  });
  if (p.featured) score += 3;
  if (p.difficulty === "Advanced") score += 2;
  return score;
}

// Deep dive content based on real Profiles Persistence API project
function ProfilesApiDeepDive({ project }: { project: Project }) {
  const endpoints = [
    {
      method: "POST",
      path: "/api/profiles",
      desc: "Accepts a name, calls Genderize/Agify/Nationalize in parallel, persists enriched profile",
    },
    {
      method: "GET",
      path: "/api/profiles",
      desc: "List all profiles with filters: gender, country_id, age_group (case-insensitive)",
    },
    {
      method: "GET",
      path: "/api/profiles/:id",
      desc: "Fetch a single profile by UUID",
    },
    {
      method: "DELETE",
      path: "/api/profiles/:id",
      desc: "Remove a profile record from the database",
    },
    {
      method: "GET",
      path: "/health",
      desc: "Service health check — total cached profiles + last refresh timestamp",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Problem */}
      <div>
        <h3 className="text-sm font-semibold text-(--accent) uppercase tracking-widest mb-3">
          The Problem
        </h3>
        <p className="text-sm text-(--muted) leading-relaxed">
          The task was to build a backend service that could accept a name,
          automatically enrich it with predicted gender, age, and nationality by
          orchestrating calls to three external APIs (Genderize, Agify,
          Nationalize), apply business classification rules, and persist the
          result — all with idempotent handling so duplicate names return the
          existing record rather than creating noise.
        </p>
      </div>

      {/* Architecture */}
      <div>
        <h3 className="text-sm font-semibold text-(--accent) uppercase tracking-widest mb-3">
          Architecture & Request Flow
        </h3>
        <div className="bg-(--surface-2) border border-(--border) rounded-lg p-4 font-mono-custom text-xs leading-7 text-(--muted)">
          <p>
            POST /api/profiles ←{" "}
            <span className="text-(--accent)">Express.js</span> + Helmet + Rate
            Limit + CORS
          </p>
          <p className="pl-4">→ Input validation (name: non-empty string)</p>
          <p className="pl-4">→ Check DB for existing profile (idempotent)</p>
          <p className="pl-4">
            →{" "}
            <span className="text-(--accent-2)">
              Promise.all([ Genderize, Agify, Nationalize ])
            </span>{" "}
            — parallel external calls
          </p>
          <p className="pl-4">
            → Merge + classify results (age_group, confidence flags)
          </p>
          <p className="pl-4">
            → <span className="text-(--accent-3)">Prisma ORM</span> →{" "}
            <span className="text-(--accent-3)">PostgreSQL (Supabase)</span>
          </p>
          <p className="pl-4">
            → Return enriched profile JSON (201 created / 200 existing)
          </p>
        </div>
        <p className="text-xs text-(--muted) mt-3 leading-relaxed">
          External API calls run in parallel via{" "}
          <code className="text-(--accent-2)">Promise.all</code> to minimise
          latency. Upstream failures (502) are caught and surfaced with
          structured error responses. Morgan logs every request; Helmet sets
          security headers; express-rate-limit prevents abuse.
        </p>
      </div>

      {/* Endpoints */}
      <div>
        <h3 className="text-sm font-semibold text-(--accent) uppercase tracking-widest mb-3">
          Key Endpoints
        </h3>
        <div className="space-y-2">
          {endpoints.map((e) => (
            <div key={e.path} className="flex gap-3 items-start text-xs">
              <span
                className={`shrink-0 font-mono-custom px-2 py-0.5 rounded text-[10px font-bold ${
                  e.method === "DELETE"
                    ? "bg-[rgba(255,100,100,0.15) text-red-400"
                    : e.method === "GET"
                      ? "bg-[rgba(63,185,80,0.15) text-(--accent-2)"
                      : "bg-[rgba(88,166,255,0.15) text-(--accent)"
                }`}
              >
                {e.method}
              </span>
              <div>
                <code className="text-(--text-dim) font-mono-custom">
                  {e.path}
                </code>
                <p className="text-(--muted) mt-0.5">{e.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Challenge */}
      <div>
        <h3 className="text-sm font-semibold text-(--accent) uppercase tracking-widest mb-3">
          One Technical Challenge
        </h3>
        <div className="border border-(--border) rounded-lg overflow-hidden">
          <div className="bg-(--surface-2) px-4 py-2 border-b border-(--border)">
            <span className="text-xs font-medium text-(--text-dim)">
              Problem: Idempotent creation + handling partial external API
              failures gracefully
            </span>
          </div>
          <div className="p-4 text-xs text-(--muted) leading-relaxed space-y-2">
            <p>
              When a name was submitted twice, the naive implementation would
              call all three external APIs again and attempt a duplicate DB
              insert — wasting quota and risking a unique constraint error.
            </p>
            <p>
              <span className="text-(--text-dim) font-medium">Fix: </span>
              Added a pre-check: query Prisma for an existing profile with the
              same name before hitting any external API. If found, return{" "}
              <code className="text-(--accent-2)">200</code> with the existing
              record immediately. If not, run the parallel enrichment and insert
              with
              <code className="text-(--accent-2)"> upsert</code> semantics as a
              safety net.
            </p>
            <p>
              <span className="text-(--text-dim) font-medium">
                Partial failures:{" "}
              </span>
              If one of the three APIs (e.g. Nationalize) returns a 502, the
              handler catches that specific rejection, fills the field with{" "}
              <code className="text-(--accent-3)">null</code>, and still
              persists the partial profile rather than rejecting the whole
              request — with a
              <code className="text-(--accent-2)"> data_partial: true</code>{" "}
              flag in the response.
            </p>
          </div>
        </div>
      </div>

      {/* Skills demonstrated */}
      {project.skillsDemonstrated && project.skillsDemonstrated.length > 0 && (
        <div>
          <h3 className="text-sm font-semibold text-(--accent) uppercase tracking-widest mb-3">
            Skills Demonstrated
          </h3>
          <div className="flex flex-wrap gap-2">
            {project.skillsDemonstrated.map((s: string) => (
              <span key={s} className="tag text-xs">
                {s}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// Generic deep dive for any backend project from the API
function GenericDeepDive({ project }: { project: Project }) {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-sm font-semibold text-(--accent) uppercase tracking-widest mb-3">
          What It Solves
        </h3>
        <p className="text-sm text-(--muted) leading-relaxed">
          {project.description}
        </p>
      </div>
      {project.features && project.features.length > 0 && (
        <div>
          <h3 className="text-sm font-semibold text-(--accent) uppercase tracking-widest mb-3">
            Key Features Built
          </h3>
          <ul className="space-y-2">
            {project.features.slice(0, 5).map((f: string, i: number) => (
              <li key={i} className="flex gap-2 text-xs text-(--muted)">
                <span className="text-(--accent) shrink-0 font-mono-custom">
                  →
                </span>
                {f}
              </li>
            ))}
          </ul>
        </div>
      )}
      {project.skillsDemonstrated && project.skillsDemonstrated.length > 0 && (
        <div>
          <h3 className="text-sm font-semibold text-(--accent) uppercase tracking-widest mb-3">
            Skills Demonstrated
          </h3>
          <div className="flex flex-wrap gap-2">
            {project.skillsDemonstrated.map((s: string) => (
              <span key={s} className="tag text-xs">
                {s}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default function FeaturedProject() {
  const { projects, loading } = useProjects();

  const best =
    projects.length > 0
      ? [...projects].sort((a, b) => scoreProject(b) - scoreProject(a))[0]
      : null;

  // Use Profiles Persistence API as the known-good mock for the deep dive
  const isProfilesApi = best?.title
    ?.toLowerCase()
    .includes("profiles persistence");

  return (
    <section id="featured" className="py-24 max-w-5xl mx-auto px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
        className="mb-10"
      >
        <div className="flex items-center gap-3 mb-3">
          <span className="font-mono-custom text-xs text-(--accent)">04.</span>
          <h2 className="text-2xl font-bold text-(--text)">
            Featured Project Deep Dive
          </h2>
          {loading && (
            <span className="text-xs text-(--muted) animate-pulse">
              selecting from API…
            </span>
          )}
        </div>
        <p className="text-sm text-(--muted) max-w-xl">
          One project, explained properly — problem, architecture, endpoints,
          and a real challenge I solved.
        </p>
      </motion.div>

      {loading ? (
        <div className="bg-(--surface) border border-(--border) rounded-xl p-8 animate-pulse space-y-4">
          <div className="h-5 w-1/3 rounded bg-(--surface-2)" />
          <div className="h-4 w-full rounded bg-(--surface-2)" />
          <div className="h-4 w-5/6 rounded bg-(--surface-2)" />
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="bg-(--surface) border border-(--accent)/30 rounded-xl overflow-hidden glow-blue"
        >
          {/* Project header */}
          <div className="border-b border-(--border) p-6">
            <span className="tag tag-green mb-3 inline-block">
              HNG i14 · Featured
            </span>
            <h3 className="text-xl font-bold text-(--text) mb-1">
              {best?.title ?? "Profiles Persistence API"}
            </h3>
            <p className="text-sm text-(--muted) max-w-2xl leading-relaxed">
              {best?.description?.slice(0, 220) ?? ""}
              {(best?.description?.length ?? 0) > 220 ? "…" : ""}
            </p>
            {best?.liveUrl && (
              <a
                href={best.liveUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 mt-3 text-xs text-(--accent) hover:underline"
              >
                View live → {best.liveUrl}
              </a>
            )}
            <div className="flex flex-wrap gap-1.5 mt-4">
              {(best?.tech ?? []).map((t: string) => (
                <span
                  key={t}
                  className="font-mono-custom text-[10px px-2 py-0.5 rounded bg-(--surface-2) border border-(--border) text-(--muted)"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* Deep dive body */}
          <div className="p-6">
            {best && isProfilesApi ? (
              <ProfilesApiDeepDive project={best} />
            ) : best ? (
              <GenericDeepDive project={best} />
            ) : (
              <p className="text-sm text-(--muted)">
                No featured project available.
              </p>
            )}
          </div>
        </motion.div>
      )}
    </section>
  );
}
