"use client";

import { motion } from "motion/react";

const reflections = [
  {
    title: "External APIs fail in ways docs don't mention",
    body: "Building the Name Classifier API taught me to never trust an upstream API to behave consistently. The Genderize API sometimes returned null confidence values and missing fields. I started writing transformation layers defensively — normalising every response before it touched my application logic or went into a response contract.",
  },
  {
    title: "Idempotency is a design decision, not an afterthought",
    body: "On the Profiles Persistence API, I initially let duplicate name submissions create new records. It caused data noise immediately. Refactoring to check for an existing profile before hitting three external APIs taught me that idempotency needs to be designed in from the first endpoint, not patched in later.",
  },
  {
    title: "Middleware order is not obvious until it breaks",
    body: "I spent time debugging why rate limiting wasn't applying correctly on some routes. The issue was middleware registration order in Express — rate limiter mounted after the router meant certain routes never saw it. I now treat middleware ordering as part of the architecture, not boilerplate.",
  },
  {
    title: "Shipping under deadline sharpens what matters",
    body: "HNG stage timelines gave me no room for over-engineering. On both backend projects I had to decide quickly what the API absolutely had to do correctly versus what was nice to have. That pressure made me a better scoper. I shipped working, tested, deployed APIs instead of polished but incomplete ones.",
  },
];

export default function Reflection() {
  return (
    <section
      id="reflection"
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
              05.
            </span>
            <h2 className="text-2xl font-bold text-(--text)">
              Learning Reflection
            </h2>
          </div>
          <p className="text-sm text-(--muted) max-w-xl">
            What HNG i14 actually changed about how I think and work as a
            backend engineer.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-5">
          {reflections.map((r, i) => (
            <motion.div
              key={r.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="bg-(--surface) border border-(--border) rounded-lg p-5 card-hover"
            >
              <div className="flex items-start gap-3 mb-3">
                <span className="font-mono-custom text-(--accent) text-xs shrink-0 mt-0.5">
                  0{i + 1}
                </span>
                <h3 className="text-sm font-semibold text-(--text)">
                  {r.title}
                </h3>
              </div>
              <p className="text-sm text-(--muted) leading-relaxed pl-6">
                {r.body}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
