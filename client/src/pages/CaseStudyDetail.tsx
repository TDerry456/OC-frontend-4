/**
 * Orbion Connect — Case Study Detail Page
 * Design: Clinical Precision Modernism
 */

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Link, useParams } from "wouter";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { caseStudiesData } from "./CaseStudies";

function FadeIn({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Simple markdown-like renderer for the body content
function BodyContent({ content }: { content: string }) {
  const lines = content.trim().split("\n");
  const elements: React.ReactNode[] = [];

  lines.forEach((line, i) => {
    const trimmed = line.trim();
    if (!trimmed) {
      elements.push(<div key={i} className="h-4" />);
    } else if (trimmed.startsWith("## ")) {
      elements.push(
        <h2 key={i} className="text-2xl md:text-3xl font-bold text-[#0D174A] mt-8 mb-4">
          {trimmed.slice(3)}
        </h2>
      );
    } else if (trimmed.startsWith("### ")) {
      elements.push(
        <h3 key={i} className="text-xl font-bold text-[#0D174A] mt-6 mb-3">
          {trimmed.slice(4)}
        </h3>
      );
    } else if (trimmed.startsWith("- ")) {
      elements.push(
        <li key={i} className="text-gray-600 ml-4 mb-1 list-disc">
          {trimmed.slice(2)}
        </li>
      );
    } else {
      elements.push(
        <p key={i} className="text-gray-600 leading-relaxed">
          {trimmed}
        </p>
      );
    }
  });

  return <div className="space-y-1">{elements}</div>;
}

export default function CaseStudyDetail() {
  const params = useParams<{ slug: string }>();
  const slug = params.slug;
  const caseStudy = caseStudiesData.find((cs) => cs.slug === slug);

  if (!caseStudy) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-[#0D174A] mb-4">Case study not found</h1>
          <Link href="/case-studies">
            <span className="text-[#0077B6] hover:underline cursor-pointer">
              ← Back to Our Work
            </span>
          </Link>
        </div>
      </div>
    );
  }

  const Icon = caseStudy.icon;
  const otherStudies = caseStudiesData.filter((cs) => cs.slug !== slug);

  return (
    <div className="overflow-x-hidden">
      {/* ── PAGE HERO ───────────────────────────────────────────────────── */}
      <section
        className="pt-32 pb-20 px-4 relative overflow-hidden"
        style={{ backgroundColor: caseStudy.color }}
      >
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(ellipse_at_top_right,_white_0%,_transparent_70%)]" />
        <div className="max-w-4xl mx-auto relative">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link href="/case-studies">
              <span className="inline-flex items-center gap-2 text-white/70 hover:text-white text-sm font-medium transition-colors cursor-pointer mb-6">
                <ArrowLeft size={16} /> Back to Our Work
              </span>
            </Link>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="flex items-center gap-3 mb-6"
          >
            <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
              <Icon size={20} className="text-white" />
            </div>
            <span className="text-white/80 text-sm font-semibold uppercase tracking-wider">
              {caseStudy.tag}
            </span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold text-white leading-tight mb-6"
          >
            {caseStudy.title}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-white/80 text-lg leading-relaxed max-w-3xl"
          >
            {caseStudy.excerpt}
          </motion.p>
        </div>
      </section>

      {/* ── BODY ────────────────────────────────────────────────────────── */}
      <section className="bg-white py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <FadeIn>
            <BodyContent content={caseStudy.body} />
          </FadeIn>
        </div>
      </section>

      {/* ── CTA ─────────────────────────────────────────────────────────── */}
      <section className="bg-[#F5F5F5] py-16 px-4">
        <FadeIn className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-[#0D174A] mb-6">
            Ready to get started?
          </h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/company/sign-up/company-details"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#0077B6] text-white font-semibold rounded-lg hover:bg-[#0066a0] transition-all"
            >
              Join as a Company <ArrowRight size={16} />
            </a>
            <a
              href="/expert/sign-up/cv-upload"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#14967F] text-white font-semibold rounded-lg hover:bg-[#117a65] transition-all"
            >
              Join as an Expert <ArrowRight size={16} />
            </a>
          </div>
        </FadeIn>
      </section>

      {/* ── OTHER CASE STUDIES ──────────────────────────────────────────── */}
      <section className="bg-white py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <FadeIn className="mb-10">
            <h3 className="text-xl font-bold text-[#0D174A]">More from Our Work</h3>
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {otherStudies.map((cs, i) => {
              const OtherIcon = cs.icon;
              return (
                <FadeIn key={cs.slug} delay={i * 0.1}>
                  <Link href={`/case-studies/${cs.slug}`}>
                    <div className="bg-[#F5F5F5] rounded-2xl p-6 border border-gray-100 hover:shadow-md transition-all cursor-pointer group">
                      <div className="flex items-center gap-3 mb-3">
                        <div
                          className="w-9 h-9 rounded-lg flex items-center justify-center"
                          style={{ backgroundColor: `${cs.color}15` }}
                        >
                          <OtherIcon size={18} style={{ color: cs.color }} />
                        </div>
                        <span
                          className="text-xs font-semibold uppercase tracking-wider"
                          style={{ color: cs.color }}
                        >
                          {cs.tag}
                        </span>
                      </div>
                      <h4 className="font-bold text-[#0D174A] group-hover:text-[#0077B6] transition-colors mb-2">
                        {cs.title}
                      </h4>
                      <p className="text-gray-500 text-sm line-clamp-2">{cs.excerpt}</p>
                    </div>
                  </Link>
                </FadeIn>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
