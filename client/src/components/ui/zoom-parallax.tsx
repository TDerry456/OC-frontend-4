'use client';

import { useScroll, useTransform, motion } from 'framer-motion';
import { useRef } from 'react';

interface ExpertProfile {
  src: string;
  alt?: string;
  name: string;
  role: string;
  location: string;
  tags: string[];
  isCTA?: boolean;
}

interface ZoomParallaxProps {
  profiles: ExpertProfile[];
}

export function ZoomParallax({ profiles }: ZoomParallaxProps) {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start start', 'end end'],
  });

  const scale4 = useTransform(scrollYProgress, [0, 1], [1, 4]);
  const scale5 = useTransform(scrollYProgress, [0, 1], [1, 5]);
  const scale6 = useTransform(scrollYProgress, [0, 1], [1, 6]);
  const scale8 = useTransform(scrollYProgress, [0, 1], [1, 8]);
  const scale9 = useTransform(scrollYProgress, [0, 1], [1, 9]);

  const scales = [scale4, scale5, scale6, scale5, scale6, scale8, scale9];

  return (
    <div ref={container} className="relative h-[150vh]" style={{ marginBottom: '-1px' }}>
      <div className="sticky top-0 h-screen overflow-hidden">
        {profiles.map((profile, index) => {
          const scale = scales[index % scales.length];
          return (
            <motion.div
              key={index}
              style={{ scale }}
              className={`absolute top-0 flex h-full w-full items-center justify-center
                ${index === 1 ? '[&>div]:!-top-[30vh] [&>div]:!left-[5vw] [&>div]:!h-[30vh] [&>div]:!w-[35vw]' : ''}
                ${index === 2 ? '[&>div]:!-top-[10vh] [&>div]:!-left-[25vw] [&>div]:!h-[45vh] [&>div]:!w-[20vw]' : ''}
                ${index === 3 ? '[&>div]:!left-[27.5vw] [&>div]:!h-[25vh] [&>div]:!w-[25vw]' : ''}
                ${index === 4 ? '[&>div]:!top-[27.5vh] [&>div]:!left-[5vw] [&>div]:!h-[25vh] [&>div]:!w-[20vw]' : ''}
                ${index === 5 ? '[&>div]:!top-[27.5vh] [&>div]:!-left-[22.5vw] [&>div]:!h-[25vh] [&>div]:!w-[30vw]' : ''}
                ${index === 6 ? '[&>div]:!top-[22.5vh] [&>div]:!left-[25vw] [&>div]:!h-[15vh] [&>div]:!w-[15vw]' : ''}
              `}
            >
              {profile.isCTA ? (
                <div className="relative h-[25vh] w-[25vw] rounded-2xl overflow-hidden group bg-gradient-to-br from-[#0077B6] to-[#0055a0] flex items-center justify-center">
                  <div className="text-center text-white px-6">
                    <p className="font-bold text-xl mb-2">{profile.name}</p>
                    <p className="text-white/90 text-sm">{profile.role}</p>
                    <div className="flex flex-wrap gap-1 mt-3 justify-center">
                      {profile.tags.map((tag) => (
                        <span key={tag} className="text-[10px] bg-white/30 text-white px-1.5 py-0.5 rounded-full">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="relative h-[25vh] w-[25vw] rounded-2xl overflow-hidden group">
                  <img
                    src={profile.src}
                    alt={profile.alt || profile.name}
                    className="h-full w-full object-cover"
                  />
                  {/* Profile overlay card */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-3">
                    <p className="text-white font-semibold text-sm leading-tight">{profile.name}</p>
                    <p className="text-white/80 text-xs">{profile.role}</p>
                    <p className="text-white/60 text-xs">{profile.location}</p>
                    <div className="flex flex-wrap gap-1 mt-1.5">
                      {profile.tags.slice(0, 2).map((tag) => (
                        <span key={tag} className="text-[10px] bg-white/20 text-white px-1.5 py-0.5 rounded-full backdrop-blur-sm">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
