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
  i: number;
  title: string;
  description: string;
  image: string;
  step: string;
  color: string;
  ctaHref?: string;
  ctaLabel?: string;
  progress: MotionValue<number>;
  range: [number, number];
  targetScale: number;
}

export function StackingCard({
  i,
  title,
  description,
  image,
  step,
  color,
  ctaHref = "#",
  ctaLabel = "See more",
  progress,
  range,
  targetScale,
}: CardProps) {
  const container = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start end", "start start"],
  });

  const imageScale = useTransform(scrollYProgress, [0, 1], [2, 1]);
  const scale = useTransform(progress, range, [1, targetScale]);

  return (
    <div
      ref={container}
      className="sticky top-0 flex h-screen items-center justify-center"
      style={{ zIndex: cardsZIndex(i) }}
    >
      <motion.div
        style={{
          backgroundColor: color,
          scale,
          top: `calc(-5vh + ${i * 25}px)`,
        }}
        className="relative -top-[20%] flex h-[450px] w-[70%] max-w-5xl origin-top flex-col rounded-2xl p-8 shadow-2xl md:p-10"
      >
        <span className="mb-2 text-xs font-bold uppercase tracking-[0.24em] text-white/55">
          {step}
        </span>
        <h2 className="text-2xl font-semibold text-white">{title}</h2>

        <div className="mt-5 flex h-full flex-col gap-8 md:flex-row md:gap-10">
          <div className="relative md:top-[10%] md:w-[40%]">
            <p className="text-sm leading-relaxed text-white/82">
              {description}
            </p>
            <span className="flex items-center gap-2 pt-4 text-white">
              <a
                href={ctaHref}
                className="underline underline-offset-4"
              >
                {ctaLabel}
              </a>
              <ArrowUpRight className="h-4 w-4" />
            </span>
          </div>

          <div className="relative h-full flex-1 overflow-hidden rounded-xl md:w-[60%]">
            <motion.div className="h-full w-full" style={{ scale: imageScale }}>
              <img
                src={image}
                alt={title}
                className="absolute inset-0 h-full w-full object-cover"
              />
            </motion.div>
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-white/10" />
          </div>
        </div>
      </motion.div>
    </div>
  );
}

function cardsZIndex(index: number) {
  return 100 + index;
}

interface StackingCardsProps {
  cards: StackingCardData[];
  className?: string;
}

export function StackingCards({ cards, className }: StackingCardsProps) {
  const container = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"],
  });

  return (
    <div
      ref={container}
      className={cn("relative bg-[#0D174A] pb-[20vh]", className)}
    >
      {cards.map((card, i) => {
        const targetScale = 1 - (cards.length - i) * 0.05;
        return (
          <StackingCard
            key={i}
            i={i}
            title={card.title}
            description={card.description}
            image={card.image}
            step={card.step}
            color={card.color}
            ctaHref={card.ctaHref}
            ctaLabel={card.ctaLabel}
            progress={scrollYProgress}
            range={[i * 0.25, 1]}
            targetScale={targetScale}
          />
        );
      })}
    </div>
  );
}

