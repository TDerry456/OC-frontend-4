'use client';

import { useRef } from 'react';
import { useTransform, motion, useScroll, MotionValue } from 'framer-motion';
import { cn } from '@/lib/utils';

export interface StackingCardData {
  title: string;
  description: string;
  image: string;
  color: string;
  step: string;
}

interface CardProps {
  i: number;
  title: string;
  description: string;
  image: string;
  step: string;
  color: string;
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
  progress,
  range,
  targetScale,
}: CardProps) {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start end', 'start start'],
  });

  const imageScale = useTransform(scrollYProgress, [0, 1], [1.15, 1]);
  const scale = useTransform(progress, range, [1, targetScale]);

  return (
    <div
      ref={container}
      className="h-screen flex items-center justify-center sticky top-0"
    >
      <motion.div
        style={{
          backgroundColor: color,
          scale,
          top: `calc(-5vh + ${i * 25}px)`,
        }}
        className="flex flex-col relative h-[480px] w-[85%] max-w-5xl rounded-2xl p-8 md:p-10 origin-top shadow-xl"
      >
        {/* Step label */}
        <span className="text-xs font-bold uppercase tracking-widest text-white/50 mb-1">
          {step}
        </span>
        <h2 className="text-xl md:text-2xl font-bold text-white">{title}</h2>

        <div className="flex flex-col md:flex-row h-full mt-6 gap-8">
          {/* Left: description */}
          <div className="md:w-[38%] flex flex-col justify-start pt-2">
            <p className="text-white/80 text-sm md:text-base leading-relaxed">
              {description}
            </p>
          </div>

          {/* Right: image */}
          <div className="md:w-[62%] relative rounded-xl overflow-hidden flex-1 md:flex-none md:h-full">
            <motion.div className="w-full h-full" style={{ scale: imageScale }}>
              <img
                src={image}
                alt={title}
                className="absolute inset-0 w-full h-full object-cover"
              />
            </motion.div>
            {/* subtle gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent pointer-events-none" />
          </div>
        </div>
      </motion.div>
    </div>
  );
}

interface StackingCardsProps {
  cards: StackingCardData[];
  className?: string;
}

export function StackingCards({ cards, className }: StackingCardsProps) {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start start', 'end end'],
  });

  return (
    <div ref={container} className={cn('relative', className)}>
      {cards.map((card, i) => {
        const targetScale = 1 - (cards.length - i) * 0.04;
        return (
          <StackingCard
            key={i}
            i={i}
            title={card.title}
            description={card.description}
            image={card.image}
            step={card.step}
            color={card.color}
            progress={scrollYProgress}
            range={[i / cards.length, 1]}
            targetScale={targetScale}
          />
        );
      })}
    </div>
  );
}
