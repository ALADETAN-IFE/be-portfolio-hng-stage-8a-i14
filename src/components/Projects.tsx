"use client";

import { motion } from "motion/react";
import { ExternalLink } from "lucide-react";
import { useProjects } from "@/hooks/getProjectHook";
import { Project } from "@/app/api/projects/route";

function GithubIcon() {
  return (
    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
    </svg>
  );
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const tech = project.tech ?? [];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="bg-(--surface) border border-(--border) rounded-lg p-6 card-hover flex flex-col"
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-4 mb-3">
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap gap-1.5 mb-2">
            <span className="tag tag-green text-xs">HNG i14</span>
            <span className="tag tag-purple text-xs">{project.type}</span>
          </div>
          <h3 className="text-base font-semibold text-(--text) leading-snug">
            {project.title}
          </h3>
        </div>
        <div className="flex gap-2 shrink-0">
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noreferrer"
              className="text-(--muted) hover:text-(--accent) transition-colors"
              title="GitHub"
            >
              <GithubIcon />
            </a>
          )}
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noreferrer"
              className="text-(--muted) hover:text-(--accent) transition-colors"
              title="Live demo"
            >
              <ExternalLink size={16} />
            </a>
          )}
        </div>
      </div>

      {/* Description */}
      <p className="text-sm text-(--muted) leading-relaxed mb-4 line-clamp-3">
        {project.description}
      </p>

      {/* Contribution */}
      {project.contribution && (
        <div className="mb-4 pl-3 border-l-2 border-(--accent)/40">
          <p className="text-xs text-(--text-dim) leading-relaxed">
            <span className="text-(--accent) font-medium">
              My contribution:{" "}
            </span>
            {project.contribution}
          </p>
        </div>
      )}

      {/* Tech stack */}
      <div className="flex flex-wrap gap-1.5 mt-auto pt-2">
        {tech.slice(0, 8).map((t: string) => (
          <span
            key={t}
            className="font-mono-custom text-[10px] px-2 py-0.5 rounded bg-(--surface-2) border border-(--border) text-(--muted)"
          >
            {t}
          </span>
        ))}
      </div>
    </motion.div>
  );
}

function SkeletonCard() {
  return (
    <div className="bg-(--surface) border border-(--border) rounded-lg p-6 animate-pulse">
      <div className="flex gap-2 mb-3">
        <div className="h-4 w-16 rounded-full bg-(--surface-2)" />
        <div className="h-4 w-12 rounded-full bg-(--surface-2)" />
      </div>
      <div className="h-5 w-3/4 rounded bg-(--surface-2) mb-3" />
      <div className="space-y-2 mb-4">
        <div className="h-3 w-full rounded bg-(--surface-2)" />
        <div className="h-3 w-5/6 rounded bg-(--surface-2)" />
        <div className="h-3 w-4/6 rounded bg-(--surface-2)" />
      </div>
      <div className="flex gap-1.5">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="h-4 w-14 rounded bg-(--surface-2)" />
        ))}
      </div>
    </div>
  );
}

export default function Projects() {
  const { projects, loading } = useProjects();

  return (
    <section id="projects" className="py-24 max-w-5xl mx-auto px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
        className="mb-10"
      >
        <div className="flex items-center gap-3 mb-3">
          <span className="font-mono-custom text-xs text-(--accent)">02.</span>
          <h2 className="text-2xl font-bold text-(--text)">HNG Projects</h2>
          {loading && (
            <span className="text-xs text-(--muted) animate-pulse">
              loading projects…
            </span>
          )}
        </div>
        <p className="text-sm text-(--muted) max-w-xl">
          Backend systems completed during HNG Internship i14. Each entry
          reflects what I personally designed, built, and shipped.
        </p>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-5">
        {loading ? (
          <>
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
          </>
        ) : projects.length === 0 ? (
          <p className="text-sm text-(--muted) col-span-2">
            No backend projects found.
          </p>
        ) : (
          projects.map((project, i) => (
            <ProjectCard key={project.projectId} project={project} index={i} />
          ))
        )}
      </div>
    </section>
  );
}
