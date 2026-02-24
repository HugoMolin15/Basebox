'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

const logos = [
    "https://i.ibb.co/Vv5rkDK/api-partner-verzon.png",
    "https://i.ibb.co/J399KDg/api-partner-netflix.png",
    "https://i.ibb.co/TKT0F5L/api-partner-yelp.png",
    "https://i.ibb.co/HG6KR89/api-partner-adobe.png",
    "https://i.ibb.co/hMSJ1sg/api-partner-ring.png",
    "https://i.ibb.co/4RWQcMS/api-partner-nespresso.png"
];

interface InfiniteScrollerProps {
    speed?: number;
    direction?: 'left' | 'right';
    className?: string;
}

export function InfiniteScroller({
    speed = 20,
    direction = 'left',
    className,
}: InfiniteScrollerProps) {
    // We triple the array to ensure there's always enough content to fill the screen width
    // preventing the "overlapping" or "gap" issue.
    const duplicatedLogos = [...logos, ...logos, ...logos];

    return (
        <section className={cn("w-full py-12 bg-white overflow-hidden relative debug-border", className)}>
            {/* Edge Fades */}
            <div className="absolute inset-y-0 left-0 w-24 md:w-48 bg-gradient-to-r from-white to-transparent z-20 pointer-events-none" />
            <div className="absolute inset-y-0 right-0 w-24 md:w-48 bg-gradient-to-l from-white to-transparent z-20 pointer-events-none" />

            <div className="flex overflow-hidden">
                <motion.div
                    className="flex whitespace-nowrap gap-24 md:gap-32"
                    animate={{
                        x: direction === 'left' ? [0, "-33.33%"] : ["-33.33%", 0]
                    }}
                    transition={{
                        duration: speed,
                        repeat: Infinity,
                        ease: "linear",
                    }}
                >
                    {duplicatedLogos.map((logo, index) => (
                        <div key={index} className="flex-shrink-0">
                            <img
                                src={logo}
                                alt="Partner"
                                className="h-8 md:h-12 w-auto object-contain grayscale opacity-40 contrast-125"
                            />
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
