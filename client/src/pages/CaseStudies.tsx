/**
 * Orbion Connect — Case Studies / Our Work Page
 * Design: Clinical Precision Modernism
 */

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Link } from "wouter";
import { ArrowRight, Building2, Stethoscope, Cpu } from "lucide-react";

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

export const caseStudiesData = [
  {
    slug: "for-companies",
    title: "For Healthtech Companies",
    excerpt:
      "Find experts relevant to your needs using intelligent RAG search. Get verified clinical expertise, smart matching to your field and product, and hassle-free collaboration so you can focus on building.",
    icon: Building2,
    color: "#0077B6",
    bgColor: "#0077B6/10",
    tag: "Companies",
    body: `
## Find the Right Expert, Fast

Orbion Connect gives healthtech companies a direct line to the clinical and regulatory expertise they need — when they need it.

### Intelligent Matching
Our RAG-powered search engine analyses your company's product stage, therapeutic area, and specific expertise gaps to surface the most relevant verified clinicians and specialists in our network.

### Verified Clinical Expertise
Every expert on our platform has been thoroughly vetted. We verify credentials, professional registrations, and relevant experience before any expert appears in search results.

### Smart Matching to Your Field
Whether you're building a cardiac monitoring device, a mental health app, or a regulatory submission tool, our system understands the nuances of your domain and matches accordingly.

### Hassle-Free Collaboration
Once you've found your expert, the platform handles scheduling, communication, and project management — so you can focus on building.

### Pay Only When You Connect
There are no upfront subscription fees. You only pay when you successfully connect with an expert who meets your needs.

### What Companies Say
"Orbion Connect helped us find a consultant cardiologist with NHS experience and HL7 FHIR knowledge within 48 hours. That would have taken us months through traditional channels." — Healthtech Startup, London

### Get Started
Join hundreds of healthtech companies already using Orbion Connect to accelerate their development cycles and reduce regulatory risk.
    `,
  },
  {
    slug: "for-experts",
    title: "Join as a Clinician",
    excerpt:
      "Work on your terms with flexible opportunities, fair and transparent compensation, and the chance to drive real-world impact in health technologies and patient care.",
    icon: Stethoscope,
    color: "#14967F",
    bgColor: "#14967F/10",
    tag: "Experts",
    body: `
## Shape the Future of Healthcare Technology

Orbion Connect gives clinicians and health professionals a structured, rewarding route into the healthtech industry.

### Work on Your Terms
Choose projects that fit your schedule and interests. Whether you're available for a single advisory call or a multi-month engagement, there are opportunities that match your availability.

### Fair and Transparent Compensation
All compensation is clearly stated upfront. No ambiguity, no hidden terms. You know exactly what you're being paid before you commit.

### Real-World Impact
The products you help shape will reach real patients. Your clinical insight can directly improve patient outcomes, reduce adverse events, and accelerate the delivery of better healthcare.

### Build Your Portfolio
Advisory and project work with leading healthtech companies builds your professional portfolio and opens doors to board positions, speaking opportunities, and further industry roles.

### A Fast-Growing Sector
Digital health is one of the fastest-growing sectors globally. Getting involved now positions you at the forefront of a transformation in how healthcare is delivered.

### Who Can Join
- Clinicians of all specialties (GPs, consultants, registrars)
- Regulatory affairs specialists (MHRA, FDA, MDR 2017)
- Health economists (NICE, HTA)
- Digital health and AI/ML specialists
- Clinical safety officers
- Health informaticists

### Get Started
Upload your CV and create your profile. Our team will review your application and match you with relevant opportunities.
    `,
  },
  {
    slug: "how-it-works",
    title: "How We Match You",
    excerpt:
      "Our platform uses RAG-powered search to find the best possible match between your needs and verified experts, then connects you and schedules meetings so collaboration can start quickly.",
    icon: Cpu,
    color: "#0D174A",
    bgColor: "#0D174A/10",
    tag: "Platform",
    body: `
## Intelligent Matching Technology

Orbion Connect uses cutting-edge AI to ensure every connection is the right connection.

### RAG-Powered Search
Our Retrieval-Augmented Generation (RAG) system goes beyond keyword matching. It understands the semantic meaning of your requirements and matches them against detailed expert profiles to find the best possible fit.

### Step 1: Define Your Needs
Companies submit a brief describing their product, stage, therapeutic area, and specific expertise gaps. The more detail you provide, the better the match.

### Step 2: AI-Powered Analysis
Our system analyses your brief against our database of verified expert profiles, considering factors like:
- Clinical specialty and sub-specialty
- Regulatory experience (MHRA, FDA, CE marking)
- NHS vs. private sector experience
- Technology familiarity (HL7 FHIR, clinical NLP, etc.)
- Geographic location and availability

### Step 3: Curated Results
You receive a shortlist of the most relevant experts, ranked by match quality. Each profile includes detailed credentials, experience summaries, and availability.

### Step 4: Connect and Collaborate
Select your preferred expert and the platform handles the rest — scheduling intro calls, facilitating communication, and managing the engagement.

### Why It Works
Traditional expert networks rely on manual curation and personal networks. Our AI-powered approach is faster, more accurate, and scales to cover the full breadth of healthtech expertise.

### Data Privacy
All company briefs and expert profiles are handled with strict confidentiality. NDAs can be arranged before any sensitive information is shared.
    `,
  },
];

export default function CaseStudies() {
  return (
    <div className="overflow-x-hidden">
      {/* ── PAGE HERO ───────────────────────────────────────────────────── */}
      <section className="bg-[#0D174A] pt-32 pb-20 px-4 relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `url("https://d2xsxph8kpxj0f.cloudfront.net/310519663452370282/ViHDgSg2fjbgz8DVXExzGf/orbion-connection-abstract-VnPkJXxFZNAPuhBH2ZV6xf.webp")`,
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
            Our Work
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-8"
          >
            A Platform to Connect Medical Experts with Innovation
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-white/70 text-lg leading-relaxed max-w-3xl"
          >
            A new platform connecting medical professionals with medtech, healthtech, and digital
            health companies, to build smarter, safer, and more successful products, built
            alongside clinicians.
          </motion.p>
        </div>
      </section>

      {/* ── CASE STUDY CARDS ────────────────────────────────────────────── */}
      <section className="bg-[#F5F5F5] py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {caseStudiesData.map((cs, i) => {
              const Icon = cs.icon;
              return (
                <FadeIn key={cs.slug} delay={i * 0.1}>
                  <Link href={`/case-studies/${cs.slug}`}>
                    <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer group h-full flex flex-col">
                      <div
                        className="w-12 h-12 rounded-xl flex items-center justify-center mb-6"
                        style={{ backgroundColor: `${cs.color}15` }}
                      >
                        <Icon size={24} style={{ color: cs.color }} />
                      </div>
                      <div
                        className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold uppercase tracking-wider mb-4 w-fit"
                        style={{ backgroundColor: `${cs.color}15`, color: cs.color }}
                      >
                        {cs.tag}
                      </div>
                      <h3 className="text-xl font-bold text-[#0D174A] mb-3 group-hover:text-[#0077B6] transition-colors">
                        {cs.title}
                      </h3>
                      <p className="text-gray-500 text-sm leading-relaxed flex-1">{cs.excerpt}</p>
                      <div
                        className="inline-flex items-center gap-2 mt-6 text-sm font-semibold group-hover:gap-3 transition-all"
                        style={{ color: cs.color }}
                      >
                        Read more <ArrowRight size={16} />
                      </div>
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
