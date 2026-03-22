"use client";

import { ArrowUpRight } from "lucide-react";
import { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { cn } from "@/lib/utils";

export interface StackingCardData {
  title: string;
  description: string;
  image: string;
  color: string;
  step: string;
  ctaHref?: string;
  ctaLabel?: string;
}

interface StackingCardsProps {
  cards: StackingCardData[];
  className?: string;
}

interface CardLayerProps {
  card: StackingCardData;
  index: number;
  total: number;
  progress: MotionValue<number>;
}

function CardLayer({ card, index, total, progress }: CardLayerProps) {
  const transitions = Math.max(total - 1, 1);
  const start = index === 0 ? 0 : (index - 1) / transitions;
  const end = index / transitions;

  const y = useTransform(progress, [0, start, end, 1], [80, 80, index * 18, index * 18]);
  const scale = useTransform(
    progress,
    [0, start, end, 1],
    [0.98, 0.98, 1 - (total - index - 1) * 0.04, 1 - (total - index - 1) * 0.04]
  );
  const opacity = useTransform(
    progress,
    [start - 0.08, start, end, 1],
    [index === 0 ? 1 : 0, index === 0 ? 1 : 0, 1, 1]
  );

  return (
    <motion.div
      className="absolute inset-0 flex items-start justify-center px-4 md:px-8"
      style={{ y, scale, opacity, zIndex: index + 1 }}
    >
      <div
        className="relative flex h-[390px] w-full max-w-5xl flex-col overflow-hidden rounded-[28px] p-6 shadow-2xl md:h-[440px] md:p-10"
        style={{ backgroundColor: card.color }}
      >
        <span className="mb-3 text-[11px] font-semibold uppercase tracking-[0.24em] text-white/60">
          {card.step}
        </span>

        <h2 className="text-center text-2xl font-semibold text-white md:text-4xl">
          {card.title}
        </h2>

        <div className="mt-6 flex h-full flex-col gap-6 md:mt-8 md:flex-row md:gap-10">
          <div className="flex md:w-[40%] md:items-center">
            <div>
              <p className="text-sm leading-relaxed text-white/85 md:text-[15px]">
                {card.description}
              </p>

              <a
                href={card.ctaHref ?? "#"}
                className="mt-5 inline-flex items-center gap-2 text-white underline underline-offset-4"
              >
                <span>{card.ctaLabel ?? "See more"}</span>
                <ArrowUpRight className="h-4 w-4" />
              </a>
            </div>
          </div>

          <div className="relative min-h-[220px] flex-1 overflow-hidden rounded-2xl md:min-h-0 md:w-[60%]">
            <img
              src={card.image}
              alt={card.title}
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-white/10" />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export function StackingCards({ cards, className }: StackingCardsProps) {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  return (
    <section
      ref={sectionRef}
      className={cn("relative bg-[#0D174A]", className)}
      style={{
        height: `calc(520px + ${Math.max(cards.length - 1, 1) * 26}vh)`,
      }}
    >
      <div className="sticky top-16 h-[470px] overflow-hidden md:top-20 md:h-[520px]">
        <div className="relative mx-auto h-full w-full pt-4 md:pt-6">
          {cards.map((card, index) => (
            <CardLayer
              key={`${card.title}-${index}`}
              card={card}
              index={index}
              total={cards.length}
              progress={scrollYProgress}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default StackingCards;
