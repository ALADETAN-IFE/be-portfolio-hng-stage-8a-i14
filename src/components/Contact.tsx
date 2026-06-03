"use client";
import { motion } from "motion/react";
import { Mail, Globe, ExternalLink } from "lucide-react";

function GithubIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
    </svg>
  );
}

function XIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

const contacts = [
  {
    label: "Email",
    value: "famousfotune123@gmail.com",
    href: "mailto:famousfotune123@gmail.com",
    icon: <Mail size={16} />,
  },
  {
    label: "GitHub",
    value: "IfeCodes",
    href: "https://github.com/ALADETAN-IFE",
    icon: <GithubIcon className="w-4 h-4" />,
  },
  {
    label: "Main Portfolio",
    value: "ifecodes.xyz",
    href: "https://ifecodes.xyz",
    icon: <Globe size={16} />,
  },
  {
    label: "Twitter / X",
    value: "@IfeCodes",
    href: "https://twitter.com/IfeCodes",
    icon: <XIcon className="w-4 h-4" />,
  },
];

export default function Contact() {
  return (
    <section id="contact" className="py-24 max-w-5xl mx-auto px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
        className="mb-10"
      >
        <div className="flex items-center gap-3 mb-3">
          <span className="font-mono-custom text-xs text-(--accent)">06.</span>
          <h2 className="text-2xl font-bold text-(--text)">Contact</h2>
        </div>
        <p className="text-sm text-(--muted) max-w-xl">
          Open to backend roles, freelance API work, and interesting problems.
          Fastest reply is via email.
        </p>
      </motion.div>

      <div className="grid sm:grid-cols-2 gap-4 mb-12">
        {contacts.map(({ label, value, href, icon }, i) => (
          <motion.a
            key={label}
            href={href}
            target={label !== "Email" ? "_blank" : undefined}
            rel="noreferrer"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: i * 0.08 }}
            className="flex items-center gap-4 bg-(--surface) border border-(--border) rounded-lg p-4 card-hover group"
          >
            <div className="w-9 h-9 rounded-lg bg-(--surface-2) border border-(--border) flex items-center justify-center text-(--muted) group-hover:text-(--accent) group-hover:border-(--accent) transition-colors">
              {icon}
            </div>
            <div>
              <p className="text-xs text-(--muted) mb-0.5">{label}</p>
              <p className="text-sm text-(--text-dim) font-medium group-hover:text-(--accent) transition-colors">
                {value}
              </p>
            </div>
            <ExternalLink
              size={14}
              className="text-(--muted) ml-auto opacity-0 group-hover:opacity-100 transition-opacity"
            />
          </motion.a>
        ))}
      </div>

      <div className="section-divider mb-8" />
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-(--muted)">
        <p className="font-mono-custom">
          Built with <span className="text-(--accent)">Next.js</span> · Deployed
          on <span className="text-(--accent)">Vercel</span>
        </p>
        <p>HNG Internship i14 · Backend Portfolio · 2026</p>
      </div>
    </section>
  );
}
