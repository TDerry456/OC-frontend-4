/**
 * Orbion Connect — About Us Page
 * Design: Clinical Precision Modernism
 */

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowRight } from "lucide-react";

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

const beliefs = [
  "Early expert input is not optional in healthcare",
  "Market readiness is built, not rushed",
  "The best products are shaped by those who understand real world healthcare delivery",
  "Expertise should be accessible, accountable, and aligned with outcomes",
];

const team = [
  {
    name: "Tristan Derry",
    role: "Co-Founder",
    bio: "Tristan is a final-year medical student and entrepreneur with a strong background in building and leading ventures that drive meaningful change in healthcare. Through his previous companies, he has led teams delivering digital strategy, innovation, and cross-sector collaboration across the UK and abroad. His work focuses on connecting clinical expertise with healthtech innovation globally and strengthening partnerships between doctors and startups. Tristan is also deeply committed to improving medical education and developing resources that help clinicians succeed in the evolving world of digital health.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face&auto=format&q=80",
    tags: ["Medical Student", "Entrepreneur", "Digital Health"],
  },
  {
    name: "Yosha Pathak",
    role: "Co-Founder",
    bio: "Yosha is a 4th year medical student, contributing to clinical insight, product direction and partnership work at Orbion Connect, drawing on her background in medicine at King's College London and her experience within UK and European MedTech networks. She has worked on research projects at Evelina London and King's, supported international innovation delegations and helped create communication links between clinicians and early stage companies. Her content platform, followed by more than thirty thousand learners, has strengthened her ability to translate complex clinical and regulatory ideas into clear guidance that shapes the development of Orbion Connect.",
    image: "https://drive.google.com/file/d/1j9nukll5pCiOfUJsjTLgna_s2ERHp5ZG/view?usp=drive_link",
    tags: ["King's College London", "Doctor", "Clinical Research"],
  },
];

export default function AboutUs() {
  return (
    <div className="overflow-x-hidden">
      {/* ── PAGE HERO ───────────────────────────────────────────────────── */}
      <section className="bg-[#0D174A] pt-32 pb-20 px-4 relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `url("https://d2xsxph8kpxj0f.cloudfront.net/310519663452370282/ViHDgSg2fjbgz8DVXExzGf/orbion-hero-bg-ZRgRpTUFkqovi6vboVjQSS.webp")`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div className="max-w-4xl mx-auto relative">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-sm font-semibold uppercase tracking-widest text-[#14967F] mb-4"
          >
            About Us
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight"
          >
            Connecting Healthcare Innovation with Clinical Expertise
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg text-white/70 max-w-2xl"
          >
            At Orbion Connect, we believe that the best healthtech products are shaped by those who understand real-world healthcare delivery. We're building the infrastructure that connects companies with verified clinicians and health experts.
          </motion.p>
        </div>
      </section>

      {/* ── OUR BELIEFS ──────────────────────────────────────────────────── */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          <FadeIn className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[#0D174A] mb-4">
              What We Believe
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Our mission is grounded in four core principles that guide everything we do.
            </p>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {beliefs.map((belief, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <div className="bg-[#F5F5F5] rounded-2xl p-8 border border-gray-100">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[#0077B6] text-white flex items-center justify-center font-bold">
                      {i + 1}
                    </div>
                    <p className="text-gray-700 text-lg font-medium leading-relaxed">
                      {belief}
                    </p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── TEAM ─────────────────────────────────────────────────────────── */}
      <section className="py-20 px-4 bg-[#F9F9F9]">
        <div className="max-w-5xl mx-auto">
          <FadeIn className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[#0D174A] mb-4">
              Meet the Founders
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Tristan and Yosha are building Orbion Connect to bridge the gap between healthcare innovation and clinical expertise.
            </p>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-5xl mx-auto">
            {team.map((member, i) => (
              <FadeIn key={i} delay={i * 0.15}>
                <div className="bg-[#F5F5F5] rounded-2xl overflow-hidden">
                  <div className="h-64 overflow-hidden">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover object-top"
                    />
                  </div>
                  <div className="p-8">
                    <h3 className="text-xl font-bold text-[#0D174A]">{member.name}</h3>
                    <p className="text-[#0077B6] text-sm font-semibold mt-1">{member.role}</p>
                    <div className="flex flex-wrap gap-2 mt-3">
                      {member.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-xs px-2.5 py-1 rounded-full bg-white border border-gray-200 text-gray-600"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <p className="text-gray-600 text-sm leading-relaxed mt-4">{member.bio}</p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>


    </div>
  );
}
