"use client";

import { motion } from "motion/react";
import { MapPin, ArrowRight, Mail, CircleDot } from "lucide-react";

export default function Profile() {
  return (
    <section
      id="profile"
      className="relative min-h-screen flex flex-col justify-center pt-14 overflow-hidden"
    >
      <div className="absolute inset-0 grid-bg opacity-60 pointer-events-none" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-150 h-150 rounded-full bg-[rgba(88,166,255,0.04) blur-3xl pointer-events-none" />

      <div className="relative max-w-5xl lg:w-5xl mx-auto px-6 py-24">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <div className="flex items-center gap-2 mb-6">
            <span className="tag tag-green">HNG Internship i14</span>
            <span className="tag">Backend Engineer</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-none mb-4">
            <span className="text-(--text)">Ife</span>
            <span className="text-(--accent)">Codes</span>
          </h1>

          <p className="text-lg md:text-xl text-(--muted) max-w-2xl leading-relaxed mt-6 mb-8">
            Backend engineer building production APIs with Node.js, Express,
            FastAPI PostgreSQL, and MongoDB. During HNG i14, I shipped REST
            services, external API integrations, AI agent backends, and data
            pipelines — all tested, documented, and deployed. But this portfolio
            is for I14 so I&apos;d focus on that
          </p>

          <div className="flex flex-wrap items-center gap-6 text-sm text-(--muted) mb-10">
            <span className="flex items-center gap-1.5">
              <MapPin size={14} />
              Nigeria · UTC+1
            </span>
            <span className="flex items-center gap-1.5">
              <CircleDot
                size={14}
                className="text-(--accent-2) animate-pulse"
              />
              Available for opportunities
            </span>
          </div>

          <div className="flex flex-wrap gap-4">
            <a
              href="#projects"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded bg-(--accent) text-[#0D1117] font-semibold text-sm hover:opacity-90 transition-opacity"
            >
              View my work
              <ArrowRight size={16} />
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded border border-(--border) text-(--text-dim) text-sm hover:border-(--accent) hover:text-(--accent) transition-colors"
            >
              <Mail size={14} />
              Get in touch
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-16 max-w-lg"
        >
          <div className="bg-(--surface) border border-(--border) rounded-lg overflow-hidden">
            <div className="flex items-center gap-1.5 px-4 py-3 border-b border-(--border)">
              <span className="w-3 h-3 rounded-full bg-[#FF5F57]" />
              <span className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
              <span className="w-3 h-3 rounded-full bg-[#28CA41]" />
              <span className="font-mono-custom text-xs text-(--muted) ml-2">
                stack.sh
              </span>
            </div>
            <div className="p-4 font-mono-custom text-xs leading-6">
              <p>
                <span className="text-(--accent-2)">$</span>{" "}
                <span className="text-(--text-dim)">whoami</span>
              </p>
              <p className="text-(--accent)">
                IfeCodes — Backend Engineer, HNG i14
              </p>
              <p className="mt-2">
                <span className="text-(--accent-2)">$</span>{" "}
                <span className="text-(--text-dim)">cat stack.txt</span>
              </p>
              <p className="text-(--muted)">
                Node.js · TypeScript · Express.js · FastAPI · Prisma
              </p>
              <p className="text-(--muted)">
                PostgreSQL · MongoDB · Mongoose · Supabase
              </p>
              <p className="text-(--muted)">
                Zod · Jest · Supertest · Mastra · Railway
              </p>
              <p className="mt-2">
                <span className="text-(--accent-2)">$</span>{" "}
                <span className="text-(--accent)">█</span>
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
