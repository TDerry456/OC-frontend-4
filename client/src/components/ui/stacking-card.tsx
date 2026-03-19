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

interface CardLayerProps {
  i: number;
  total: number;
  card: StackingCardData;
  progress: MotionValue<number>;
}

function CardLayer({ i, total, card, progress }: CardLayerProps) {
  const start = i / total;
  const end = (i + 1) / total;

  const y = useTransform(progress, [start, end], [120, 0]);
  const scale = useTransform(progress, [start, end], [0.92, 1]);
  const opacity = useTransform(progress, [start, end], [0.6, 1]);

  return (
    <motion.div
      className="absolute left-1/2 top-1/2 w-[70%] max-w-5xl -translate-x-1/2 -translate-y-1/2"
      style={{
        y,
        scale,
        opacity,
        zIndex: 100 + i,
      }}
    >
      <div
        className="flex h-[450px] flex-col rounded-2xl p-8 shadow-2xl md:p-10"
        style={{ backgroundColor: card.color }}
      >
        <span className="mb-2 text-xs font-bold uppercase tracking-[0.24em] text-white/55">
          {card.step}
        </span>

        <h2 className="text-2xl font-semibold text-white">{card.title}</h2>

        <div className="mt-5 flex h-full flex-col gap-8 md:flex-row md:gap-10">
          <div className="relative md:top-[10%] md:w-[40%]">
            <p className="text-sm leading-relaxed text-white/82">
              {card.description}
            </p>

            <span className="flex items-center gap-2 pt-4 text-white">
              <a
                href={card.ctaHref || "#"}
                className="underline underline-offset-4"
              >
                {card.ctaLabel || "See more"}
              </a>
              <ArrowUpRight className="h-4 w-4" />
            </span>
          </div>

          <div className="relative h-full flex-1 overflow-hidden rounded-xl md:w-[60%]">
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

interface StackingCardsProps {
  cards: StackingCardData[];
  className?: string;
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
      className={cn("relative bg-[#0D174A]", className)}
      style={{ height: `${cards.length * 100}vh` }}
    >
      <div className="sticky top-0 h-screen overflow-hidden">
        {cards.map((card, i) => (
          <CardLayer
            key={i}
            i={i}
            total={cards.length}
            card={card}
            progress={scrollYProgress}
          />
        ))}
      </div>
    </section>
  );
}

