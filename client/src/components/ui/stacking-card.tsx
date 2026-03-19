"use client";

import { ArrowUpRight } from "lucide-react";
import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
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
  const segment = 1 / total;

  const start = index * segment;
  const enterStart = Math.max(0, start - segment * 0.18);
  const enterEnd = start + segment * 0.38;

  const finalY = index * 16;
  const finalScale = 1 - (total - index - 1) * 0.035;

  const y = useTransform(
    progress,
    [0, enterStart, enterEnd, 1],
    [90, 90, finalY, finalY]
  );

  const scale = useTransform(
    progress,
    [0, enterStart, enterEnd, 1],
    [0.98, 0.98, finalScale, finalScale]
  );

  const opacity = useTransform(
    progress,
    [0, enterStart * 0.8, enterStart, enterEnd],
    [index === 0 ? 1 : 0, index === 0 ? 1 : 0, index === 0 ? 1 : 0.88, 1]
  );

  return (
    <motion.div
      className="absolute inset-0 flex items-center justify-center px-4 md:px-8"
      style={{
        y,
        scale,
        opacity,
        zIndex: index + 1,
      }}
    >
      <div
        className="relative flex h-[400px] w-full max-w-5xl flex-col overflow-hidden rounded-[28px] p-6 shadow-2xl md:h-[440px] md:p-10"
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
      className={cn("relative bg-[#030B2F]", className)}
      style={{
        height: `${cards.length * 50}vh`,
      }}
    >
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <div className="relative h-[440px] w-full">
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
