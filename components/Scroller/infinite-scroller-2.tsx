'use client';

import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Github, Twitter, Figma, Chrome, Gitlab, Trello, Slack, Twitch } from 'lucide-react';
import { useMotionValue, animate, motion } from 'framer-motion';
import useMeasure from 'react-use-measure';

/**
 * CONFIGURATION FIRST
 */
const SETTINGS = {
    logosTitle: "Trusted by ",
    logosTitleHighlight: "experts",
};

const LOGOS = [
    { icon: Github, name: "GitHub" },
    { icon: Twitter, name: "Twitter" },
    { icon: Figma, name: "Figma" },
    { icon: Chrome, name: "Chrome" },
    { icon: Gitlab, name: "GitLab" },
    { icon: Trello, name: "Trello" },
    { icon: Slack, name: "Slack" },
    { icon: Twitch, name: "Twitch" },
];

/**
 * INFINITE SLIDER COMPONENT 
 */
type InfiniteSliderProps = {
    children: React.ReactNode;
    gap?: number;
    duration?: number;
    durationOnHover?: number;
    direction?: 'horizontal' | 'vertical';
    reverse?: boolean;
    className?: string;
    speed?: number; // Added from original prompt LogoCloud prop call but mapped to duration inside
    speedOnHover?: number;
};

export function InfiniteSlider({
    children,
    gap = 16,
    duration = 25,
    durationOnHover,
    direction = 'horizontal',
    reverse = false,
    className,
    speed,
    speedOnHover,
}: InfiniteSliderProps) {
    // If speed is provided via prompt's LogoCloud, map it to duration
    const activeDuration = speed || duration;
    const activeHover = speedOnHover || durationOnHover;

    const [currentDuration, setCurrentDuration] = useState(activeDuration);
    const [ref, { width, height }] = useMeasure();
    const translation = useMotionValue(0);
    const [isTransitioning, setIsTransitioning] = useState(false);
    const [key, setKey] = useState(0);

    useEffect(() => {
        let controls;
        const size = direction === 'horizontal' ? width : height;
        const contentSize = size + gap;
        const from = reverse ? -contentSize / 2 : 0;
        const to = reverse ? 0 : -contentSize / 2;

        if (isTransitioning) {
            controls = animate(translation, [translation.get(), to], {
                ease: 'linear',
                duration:
                    currentDuration * Math.abs((translation.get() - to) / contentSize),
                onComplete: () => {
                    setIsTransitioning(false);
                    setKey((prevKey) => prevKey + 1);
                },
            });
        } else {
            controls = animate(translation, [from, to], {
                ease: 'linear',
                duration: currentDuration,
                repeat: Infinity,
                repeatType: 'loop',
                repeatDelay: 0,
                onRepeat: () => {
                    translation.set(from);
                },
            });
        }

        return controls?.stop;
    }, [
        key,
        translation,
        currentDuration,
        width,
        height,
        gap,
        isTransitioning,
        direction,
        reverse,
    ]);

    const hoverProps = activeHover
        ? {
            onHoverStart: () => {
                setIsTransitioning(true);
                setCurrentDuration(activeHover);
            },
            onHoverEnd: () => {
                setIsTransitioning(true);
                setCurrentDuration(activeDuration);
            },
        }
        : {};

    return (
        <div className={cn('overflow-hidden', className)}>
            <motion.div
                className='flex w-max'
                style={{
                    ...(direction === 'horizontal'
                        ? { x: translation }
                        : { y: translation }),
                    gap: `${gap}px`,
                    flexDirection: direction === 'horizontal' ? 'row' : 'column',
                }}
                ref={ref}
                {...hoverProps}
            >
                {children}
                {children}
            </motion.div>
        </div>
    );
}

function LogosSection() {
    return (
        <section className="relative w-full max-w-5xl mx-auto space-y-4 pt-12 pb-16">
            <h2 className="text-center tracking-tight" style={{ color: 'var(--color-black)', fontSize: 'var(--font-size-base)', fontWeight: 'var(--font-weight-normal)' }}>
                {SETTINGS.logosTitle} <span style={{ fontWeight: 'var(--font-weight-semibold)' }}>{SETTINGS.logosTitleHighlight}</span>
            </h2>
            <div className="relative z-10 mx-auto max-w-4xl py-4 [mask-image:linear-gradient(to_right,transparent,black,transparent)]">
                <InfiniteSlider gap={42} reverse speed={80}>
                    {LOGOS.map((Logo, idx) => (
                        <div key={idx} className="flex items-center gap-2" style={{ color: 'var(--color-black)' }}>
                            <Logo.icon className="size-5 md:size-6" />
                            <span style={{ fontSize: 'var(--font-size-xl)', fontWeight: 'var(--font-weight-normal)' }}>{Logo.name}</span>
                        </div>
                    ))}
                </InfiniteSlider>
            </div>
        </section>
    );
}

export function InfiniteScroller2() {
    return (
        <main className="w-full bg-white flex flex-col items-center justify-center relative overflow-hidden debug-border">
            <LogosSection />
        </main>
    );
}
