"use client";

import { motion } from "motion/react";
import { useState, useEffect } from "react";
import { Code2, Briefcase, Wrench, Star, BookOpen, Mail } from "lucide-react";

const links = [
  { label: "Profile", href: "#profile", id: "profile", icon: Code2 },
  { label: "Projects", href: "#projects", id: "projects", icon: Briefcase },
  { label: "Skills", href: "#skills", id: "skills", icon: Wrench },
  { label: "Featured", href: "#featured", id: "featured", icon: Star },
  {
    label: "Reflection",
    href: "#reflection",
    id: "reflection",
    icon: BookOpen,
  },
  { label: "Contact", href: "#contact", id: "contact", icon: Mail },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("profile");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // IntersectionObserver — whichever section is most visible wins
  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    links.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return;

      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActive(id);
        },
        { rootMargin: "-40% 0px -55% 0px", threshold: 0 },
      );

      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#0D1117]/90 backdrop-blur-md border-b border-(--border)"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-5xl mx-auto px-6 flex items-center justify-between h-14">
        <a
          href="#profile"
          className="font-mono-custom text-sm text-(--accent) font-semibold tracking-wider"
        >
          IfeCodes
        </a>

        <div className="hidden md:flex items-center gap-6">
          {links.map(({ label, href, id, icon: Icon }) => {
            const isActive = active === id;
            return (
              <a
                key={href}
                href={href}
                className={`relative flex items-center gap-1.5 text-xs font-medium tracking-wide transition-colors duration-200 ${
                  isActive
                    ? "text-(--accent)"
                    : "text-(--muted) hover:text-(--text)"
                }`}
              >
                <Icon size={12} />
                {label}
                {isActive && (
                  <motion.span
                    layoutId="nav-underline"
                    className="absolute -bottom-1 left-0 right-0 h-px bg-(--accent)"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </a>
            );
          })}
        </div>

        <a
          href="#contact"
          className="text-xs font-medium px-3 py-1.5 rounded border border-(--accent) text-(--accent) hover:bg-(--accent) hover:text-[#0D1117] transition-all duration-200"
        >
          Hire me
        </a>
      </div>
    </motion.nav>
  );
}
