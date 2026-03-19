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

interface CardProps {
  index: number;
  total: number;
  card: StackingCardData;
  progress: MotionValue<number>;
}

interface StackingCardsProps {
  cards: StackingCardData[];
  className?: string;
}

function StackingCardItem({ index, total, card, progress }: CardProps) {
  const start = index / total;
  const end = 1;

  const scale = useTransform(progress, [start, end], [1, 1 - (total - index - 1) * 0.04]);
  const imageScale = useTransform(progress, [start, Math.min(start + 0.2, 1)], [1.15, 1]);

  return (
    <div
      className="sticky flex items-center justify-center px-4 md:px-8"
      style={{
        top: "5rem",
        height: "calc(100vh - 5rem)",
        zIndex: index + 1,
      }}
    >
      <motion.div
        style={{
          backgroundColor: card.color,
          scale,
          top: `calc(-2vh + ${index * 18}px)`,
        }}
        className="relative flex h-[420px] w-full max-w-5xl origin-top flex-col overflow-hidden rounded-[28px] p-6 shadow-2xl md:h-[460px] md:p-10"
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
            <motion.img
              src={card.image}
              alt={card.title}
              className="absolute inset-0 h-full w-full object-cover"
              style={{ scale: imageScale }}
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-white/10" />
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export function StackingCards({ cards, className }: StackingCardsProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  return (
    <section
      ref={containerRef}
      className={cn("relative bg-[#030B2F] py-8 md:py-10", className)}
      style={{
        height: `${cards.length * 85}vh`,
      }}
    >
      <div className="relative h-full">
        {cards.map((card, index) => (
          <StackingCardItem
            key={`${card.title}-${index}`}
            index={index}
            total={cards.length}
            card={card}
            progress={scrollYProgress}
          />
        ))}
      </div>
    </section>
  );
}

export default StackingCards;

