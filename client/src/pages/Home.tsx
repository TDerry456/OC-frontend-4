/**
 * Orbion Connect — Homepage
 * Design: Clinical Precision Modernism
 * Colors: Navy #0D174A | Blue #0077B6 | Green #14967F
 * Typography: Plus Jakarta Sans (display) + Inter (body)
 * Layout: Asymmetric editorial, scroll-driven animations
 */

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { ContainerScroll } from "@/components/ui/container-scroll-animation";
import { StackingCards, type StackingCardData } from "@/components/ui/stacking-card";
import { ZoomParallax } from "@/components/ui/zoom-parallax";
import { ChevronDown, ChevronUp, CheckCircle2, ArrowRight } from "lucide-react";

// ─── Lenis smooth scroll ────────────────────────────────────────────────────
function useLenis() {
  useEffect(() => {
    let lenis: any;
    import("@studio-freight/lenis").then(({ default: Lenis }) => {
      lenis = new Lenis();
      function raf(time: number) {
        lenis.raf(time);
        requestAnimationFrame(raf);
      }
      requestAnimationFrame(raf);
    });
    return () => {
      if (lenis) lenis.destroy();
    };
  }, []);
}

// ─── Animated count-up ──────────────────────────────────────────────────────
function CountUp({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 1800;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [inView, target]);

  return (
    <span ref={ref}>
      {count.toLocaleString()}
      {suffix}
    </span>
  );
}

// ─── FAQ Accordion ──────────────────────────────────────────────────────────
const faqs = [
  {
    q: "What is Orbion Connect?",
    a: "Orbion Connect is a two-sided platform that connects Medtech and HealthTech companies with verified clinicians and health experts. We provide rapid access to clinical, technical, and regulatory expertise.",
  },
  {
    q: "How does the matching process work?",
    a: "Our platform uses RAG-powered search to find the best possible match between your needs and verified experts. We analyse your requirements, product stage, and expertise gaps to surface the most relevant clinicians and specialists.",
  },
  {
    q: "Who can join as an expert?",
    a: "Clinicians, regulatory specialists, health economists, AI/data scientists, and any verified healthcare professional with relevant expertise can join. We verify all expert profiles before they appear on the platform.",
  },
  {
    q: "How much does it cost?",
    a: "You only pay when you connect with an expert who meets your needs. There are no upfront subscription fees for companies — you pay only for successful connections.",
  },
  {
    q: "How are experts verified?",
    a: "All experts go through a thorough verification process including credential checks, professional registration verification, and CV review. We ensure every expert on the platform has the qualifications they claim.",
  },
  {
    q: "What types of expertise are available?",
    a: "Our network spans clinical medicine (all specialties), regulatory affairs (MHRA, MDR 2017, FDA), health economics (NICE, HTA), digital health, AI/ML, HL7 FHIR, and much more.",
  },
  {
    q: "How quickly can I find an expert?",
    a: "Most companies receive tailored expert matches within 24-48 hours of submitting their requirements. Urgent requests can often be fulfilled faster.",
  },
  {
    q: "Is my information kept confidential?",
    a: "Yes. All company briefs and expert profiles are treated with strict confidentiality. NDAs can be arranged before any sensitive information is shared.",
  },
  {
    q: "Can experts work on multiple projects?",
    a: "Yes. Experts can take on multiple advisory or project engagements simultaneously, subject to their availability and any existing commitments.",
  },
  {
    q: "What happens after I connect with an expert?",
    a: "Once connected, you can schedule intro calls directly through the platform. From there, you agree on scope, timeline, and compensation directly with the expert.",
  },
];

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-gray-200 last:border-0">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-5 text-left gap-4"
      >
        <span className="text-base font-semibold text-[#0D174A]">{q}</span>
        {open ? (
          <ChevronUp size={18} className="text-[#0077B6] flex-shrink-0" />
        ) : (
          <ChevronDown size={18} className="text-gray-400 flex-shrink-0" />
        )}
      </button>
      {open && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.2 }}
          className="pb-5"
        >
          <p className="text-gray-600 text-sm leading-relaxed">{a}</p>
        </motion.div>
      )}
    </div>
  );
}

// ─── How It Works data ───────────────────────────────────────────────────────
const howItWorksCards: StackingCardData[] = [
  {
    step: "Step 01",
    title: "Define what you're looking for",
    description:
      "Share your goals, product stage, and expertise gaps. The more context you provide, the sharper the match — from clinical specialty to regulatory experience and technology domain.",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1000&h=600&fit=crop&auto=format&q=80",
    color: "#0D174A",
  },
  {
    step: "Step 02",
    title: "Let our AI do the searching",
    description:
      "Our RAG-powered algorithm scans the verified expert network to surface the best-fit clinicians, regulatory specialists, and technical experts for your specific needs.",
    image: "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=1000&h=600&fit=crop&auto=format&q=80",
    color: "#0077B6",
  },
  {
    step: "Step 03",
    title: "Browse tailored profiles",
    description:
      "Review detailed, verified profiles matched to your brief. See credentials, specialties, past industry work, and availability — all in one place.",
    image: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=1000&h=600&fit=crop&auto=format&q=80",
    color: "#14967F",
  },
  {
    step: "Step 04",
    title: "Build connections that move fast",
    description:
      "Only pay once you connect. Schedule intro calls, agree on scope, and start collaborating instantly — no procurement delays, no endless back-and-forth.",
    image: "https://images.unsplash.com/photo-1556761175-4b46a572b786?w=1000&h=600&fit=crop&auto=format&q=80",
    color: "#1a3a5c",
  },
];

// ─── Expert profiles ─────────────────────────────────────────────────────────
const expertProfiles = [
  {
    name: "Find the exact expert you need",
    role: "Intelligent matching powered by AI",
    location: "",
    tags: ["RAG Search", "Verified"],
    src: "",
    alt: "Find expert CTA",
    isCTA: true,
  },
  {
    name: "Dr. Priya Sharma",
    role: "Consultant Cardiologist",
    location: "London, UK",
    tags: ["NHS", "Cardiology"],
    src: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=600&h=800&fit=crop&crop=face&auto=format&q=80",
    alt: "Dr. Priya Sharma, Cardiologist",
  },
  {
    name: "Dr. Amara Okafor",
    role: "Regulatory Affairs Specialist",
    location: "Oxford, UK",
    tags: ["MHRA", "MDR 2017"],
    src: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&h=800&fit=crop&crop=face&auto=format&q=80",
    alt: "Dr. Amara Okafor, Regulatory Specialist",
    isCTA: false,
  },
  {
    name: "Dr. Tom Gallagher",
    role: "Emergency Medicine Physician",
    location: "Edinburgh, UK",
    tags: ["NHS", "Clinical Safety"],
    src: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=600&h=800&fit=crop&crop=face&auto=format&q=80",
    alt: "Dr. Tom Gallagher, Emergency Medicine",
  },
  {
    name: "Sophia Chen",
    role: "AI & Data Scientist",
    location: "Cambridge, UK",
    tags: ["ML", "Clinical NLP"],
    src: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=600&h=800&fit=crop&crop=face&auto=format&q=80",
    alt: "Sophia Chen, AI Scientist",
  },
  {
    name: "Dr. Ravi Patel",
    role: "GP & Digital Health Lead",
    location: "Birmingham, UK",
    tags: ["Primary Care", "mHealth"],
    src: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=600&h=800&fit=crop&crop=face&auto=format&q=80",
    alt: "Dr. Ravi Patel, GP",
  },
  {
    name: "Charlotte Hughes",
    role: "Health Economist",
    location: "Bristol, UK",
    tags: ["NICE", "HTA"],
    src: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=600&h=800&fit=crop&crop=face&auto=format&q=80",
    alt: "Charlotte Hughes, Health Economist",
  },
];

// ─── Section fade-in wrapper ─────────────────────────────────────────────────
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

// ─── Main Component ──────────────────────────────────────────────────────────
export default function Home() {
  useLenis();

  // Simulated stats (would come from /api/public/stats)
  const stats = { expertsCount: 1200, companiesCount: 340 };

  return (
    <div className="overflow-x-hidden">
      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section className="bg-white pt-16 relative overflow-hidden">
        {/* Subtle background grid pattern */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%230D174A' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
        <div className="relative z-10">
        <ContainerScroll
          titleComponent={
            <div className="flex flex-col items-center gap-4 px-4">
              <motion.p
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-sm uppercase tracking-widest text-[#0077B6] font-semibold"
              >
                Healthtech Expertise, On Demand
              </motion.p>
              <motion.h1
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight text-[#0D174A]"
              >
                Find <span className="text-[#0077B6]">Trusted Experts</span> for
                <br />
                Your Healthtech Company
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-gray-500 text-lg md:text-xl mt-2 max-w-2xl"
              >
                Rapid Access to Clinical, Technical and Regulatory Expertise
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="flex flex-col sm:flex-row gap-4 mt-12 mb-12"
              >
                <a
                  href="/company/sign-up/company-details"
                  className="px-6 py-3 bg-[#0D174A] text-white rounded-lg font-semibold hover:bg-[#0a1235] transition-all duration-200 text-center"
                >
                  Find your Expert
                </a>
                <a
                  href="/expert/sign-up/cv-upload"
                  className="px-6 py-3 bg-[#14967F] text-white rounded-lg font-semibold hover:bg-[#117a65] transition-all duration-200 text-center"
                >
                  Join as an Expert
                </a>
              </motion.div>
            </div>
          }
        >
          {/* Platform dashboard mockup inside the scroll card */}
          <video
            src="https://d2xsxph8kpxj0f.cloudfront.net/310519663452370282/ViHDgSg2fjbgz8DVXExzGf/ScreenRecording2026-03-18at17.31.50_65bf1b89.mov"
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover rounded-xl"
          />
        </ContainerScroll>
        </div>
      </section>

      {/* ── STATS BAR ────────────────────────────────────────────────────── */}
      <section className="bg-[#0D174A] py-10">
        <div className="max-w-5xl mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 text-center">
            <FadeIn>
              <div>
                <p className="text-4xl md:text-5xl font-bold text-white">
                  <CountUp target={stats.expertsCount} suffix="+" />
                </p>
                <p className="text-white/60 text-sm mt-2 uppercase tracking-wider">
                  Verified Clinicians & Experts
                </p>
              </div>
            </FadeIn>
            <FadeIn delay={0.1}>
              <div>
                <p className="text-4xl md:text-5xl font-bold text-white">
                  <CountUp target={stats.companiesCount} suffix="+" />
                </p>
                <p className="text-white/60 text-sm mt-2 uppercase tracking-wider">
                  Regulatory & Technical Specialists
                </p>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ─────────────────────────────────────────────────── */}
      <section className="bg-[#F5F5F5]">
        <FadeIn className="text-center pt-20 pb-4 px-4">
          <p className="text-sm font-semibold uppercase tracking-widest text-[#0077B6] mb-3">
            The Process
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-[#0D174A]">
            How it works
          </h2>
          <p className="text-gray-500 text-lg mt-3 max-w-xl mx-auto">
            From brief to collaboration in four steps.
          </p>
        </FadeIn>

        <StackingCards cards={howItWorksCards} />

        <div className="flex flex-col sm:flex-row gap-4 justify-center py-16 px-4">
          <a
            href="/company/login"
            className="inline-flex items-center justify-center px-6 py-3 bg-[#0077B6] text-white font-semibold rounded-lg hover:bg-[#0066a0] transition-all duration-200"
          >
            Find Your Expert
          </a>
          <a
            href="/expert/sign-up/cv-upload"
            className="inline-flex items-center justify-center px-6 py-3 bg-[#14967F] text-white font-semibold rounded-lg hover:bg-[#117a65] transition-all duration-200"
          >
            Join as an Expert
          </a>
        </div>
      </section>

      {/* ── EXPERTS ACROSS THE HEALTHTECH STACK ──────────────────────────── */}
      <section className="bg-white">
        <FadeIn className="text-center py-16 px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-[#0D174A]">
            Experts Across the Healthtech Stack
          </h2>
          <p className="text-gray-500 text-lg mt-3">
            From early product validation to regulation and scale.
          </p>
        </FadeIn>

        <ZoomParallax profiles={expertProfiles} />

        <div className="flex flex-col sm:flex-row gap-4 justify-center py-12 px-4">
          <a
            href="/company/login"
            className="inline-flex items-center justify-center px-6 py-3 bg-[#0077B6] text-white font-semibold rounded-lg hover:bg-[#0066a0] transition-all duration-200"
          >
            Find Your Expert
          </a>
          <a
            href="/expert/sign-up/cv-upload"
            className="inline-flex items-center justify-center px-6 py-3 bg-[#14967F] text-white font-semibold rounded-lg hover:bg-[#117a65] transition-all duration-200"
          >
            Join as an Expert
          </a>
        </div>
      </section>

      {/* ── WHY SIGN UP ──────────────────────────────────────────────────── */}
      <section className="bg-[#F5F5F5] py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <FadeIn className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-[#0D174A]">Why Sign Up?</h2>
            {/* Partner logos placeholder */}
            <div className="flex items-center justify-center gap-6 mt-8 flex-wrap">
              <p className="text-sm text-gray-400 uppercase tracking-wider">Trusted by</p>
              {[1, 2, 3, 4, 5].map((i) => (
                <div
                  key={i}
                  className="h-8 w-24 bg-gray-200 rounded-md animate-pulse"
                  aria-label={`Partner logo ${i}`}
                />
              ))}
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* For Companies */}
            <FadeIn delay={0.1}>
              <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm hover:shadow-md transition-shadow h-full flex flex-col">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0077B6]/10 text-[#0077B6] text-xs font-semibold uppercase tracking-wider mb-6 w-fit">
                  For Companies
                </div>
                <h3 className="text-2xl font-bold text-[#0D174A] mb-2">
                  <span className="text-[#0077B6]">FIND</span> Experts Who Drive Innovation
                </h3>
                <ul className="space-y-4 mt-6">
                  {[
                    "Match with verified specialists who fit your product stage and challenges.",
                    "Get real clinical and regulatory insight that reduces development cycles.",
                    "Pay only when you connect with an expert who meets your needs.",
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle2 size={18} className="text-[#0077B6] mt-0.5 flex-shrink-0" />
                      <span className="text-gray-600 text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
                <a
                  href="/case-studies"
                  className="inline-flex items-center gap-2 mt-auto text-sm font-semibold text-[#0077B6] hover:gap-3 transition-all"
                >
                  Read Case Study <ArrowRight size={16} />
                </a>
              </div>
            </FadeIn>

            {/* For Experts */}
            <FadeIn delay={0.2}>
              <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm hover:shadow-md transition-shadow h-full flex flex-col">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#14967F]/10 text-[#14967F] text-xs font-semibold uppercase tracking-wider mb-6 w-fit">
                  For Experts / Clinicians
                </div>
                <h3 className="text-2xl font-bold text-[#0D174A] mb-2">
                  <span className="text-[#14967F]">CONNECT</span> with Companies
                </h3>
                <ul className="space-y-4 mt-6">
                  {[
                    "Access paid advisory and project opportunities with leading healthtech teams.",
                    "Use your clinical or technical expertise to shape products that reach real patients.",
                    "Build your portfolio and gain experience in a fast growing sector.",
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle2 size={18} className="text-[#14967F] mt-0.5 flex-shrink-0" />
                      <span className="text-gray-600 text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
                <a
                  href="/case-studies"
                  className="inline-flex items-center gap-2 mt-auto text-sm font-semibold text-[#14967F] hover:gap-3 transition-all"
                >
                  Read Case Study <ArrowRight size={16} />
                </a>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ── SPACING BUFFER ───────────────────────────────────────────────── */}
      <div className="h-0" />

      {/* ── WHO ARE WE ───────────────────────────────────────────────────── */}
      <section className="bg-white py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <FadeIn>
              <p className="text-sm font-semibold uppercase tracking-widest text-[#0077B6] mb-4">
                Our Mission
              </p>
              <h2 className="text-3xl md:text-4xl font-bold text-[#0D174A] mb-6">
                Who are we?
              </h2>
              <p className="text-gray-600 leading-relaxed text-lg">
                Healthcare innovation is moving too slowly. Too many great ideas fall because the
                right expertise arrives too late. We're building the infrastructure that connects
                healthtech companies with the experts they need, from day one.
              </p>
              <a
                href="/about-us"
                className="inline-flex items-center gap-2 mt-8 text-sm font-semibold text-[#0D174A] hover:text-[#0077B6] hover:gap-3 transition-all"
              >
                Learn more about us <ArrowRight size={16} />
              </a>
            </FadeIn>
            <FadeIn delay={0.15}>
              <div className="relative rounded-2xl overflow-hidden aspect-video bg-gray-100 shadow-xl">
                <img
                  src="https://d2xsxph8kpxj0f.cloudfront.net/310519663452370282/ViHDgSg2fjbgz8DVXExzGf/orbion-about-hero-23FQwewusTJjDZZSNMg9b7.webp"
                  alt="Orbion Connect team"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-[#0D174A]/20 to-transparent" />
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────────────────────── */}
      <section className="bg-[#F5F5F5] py-20 px-4">
        <div className="max-w-3xl mx-auto">
          <FadeIn className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#0D174A]">
              Frequently Asked Questions
            </h2>
          </FadeIn>
          <FadeIn delay={0.1}>
            <div className="bg-white rounded-2xl px-6 md:px-10 shadow-sm">
              {faqs.map((faq, i) => (
                <FAQItem key={i} q={faq.q} a={faq.a} />
              ))}
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
