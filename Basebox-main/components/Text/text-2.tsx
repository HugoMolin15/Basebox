'use client';

import { useState, useCallback, useEffect, useRef } from 'react';
import { motion, useMotionValue, useAnimationFrame, useTransform } from 'framer-motion';
import { cn } from '@/lib/utils';

/**
 * CONFIGURATION FIRST
 */
const SETTINGS = {
    text: "Kinetic Gradient Text",
    colors: ['#5227FF', '#FF9FFC', '#B19EEF'],
    animationSpeed: 8,
    showBorder: false,
    direction: 'horizontal' as const, // 'horizontal' | 'vertical' | 'diagonal'
    pauseOnHover: false,
    yoyo: true
};

export function Text2({
    children,
    className = '',
    colors = SETTINGS.colors,
    animationSpeed = SETTINGS.animationSpeed,
    showBorder = SETTINGS.showBorder,
    direction = SETTINGS.direction,
    pauseOnHover = SETTINGS.pauseOnHover,
    yoyo = SETTINGS.yoyo
}: {
    children?: React.ReactNode;
    className?: string;
    colors?: string[];
    animationSpeed?: number;
    showBorder?: boolean;
    direction?: 'horizontal' | 'vertical' | 'diagonal';
    pauseOnHover?: boolean;
    yoyo?: boolean;
}) {
    const [isPaused, setIsPaused] = useState(false);
    const progress = useMotionValue(0);
    const elapsedRef = useRef(0);
    const lastTimeRef = useRef<number | null>(null);

    const animationDuration = animationSpeed * 1000;

    useAnimationFrame((time) => {
        if (isPaused) {
            lastTimeRef.current = null;
            return;
        }

        if (lastTimeRef.current === null) {
            lastTimeRef.current = time;
            return;
        }

        const deltaTime = time - lastTimeRef.current;
        lastTimeRef.current = time;
        elapsedRef.current += deltaTime;

        if (yoyo) {
            const fullCycle = animationDuration * 2;
            const cycleTime = elapsedRef.current % fullCycle;

            if (cycleTime < animationDuration) {
                progress.set((cycleTime / animationDuration) * 100);
            } else {
                progress.set(100 - ((cycleTime - animationDuration) / animationDuration) * 100);
            }
        } else {
            // Continuously increase position for seamless looping
            progress.set((elapsedRef.current / animationDuration) * 100);
        }
    });

    useEffect(() => {
        elapsedRef.current = 0;
        progress.set(0);
    }, [animationSpeed, progress, yoyo]);

    const backgroundPosition = useTransform(progress, p => {
        if (direction === 'horizontal') {
            return `${p}% 50%`;
        } else if (direction === 'vertical') {
            return `50% ${p}%`;
        } else {
            // For diagonal, move only horizontally to avoid interference patterns
            return `${p}% 50%`;
        }
    });

    const handleMouseEnter = useCallback(() => {
        if (pauseOnHover) setIsPaused(true);
    }, [pauseOnHover]);

    const handleMouseLeave = useCallback(() => {
        if (pauseOnHover) setIsPaused(false);
    }, [pauseOnHover]);

    const gradientAngle =
        direction === 'horizontal' ? 'to right' : direction === 'vertical' ? 'to bottom' : 'to bottom right';

    // Duplicate first color at the end for seamless looping
    const gradientColors = [...colors, colors[0]].join(', ');

    const gradientStyle = {
        backgroundImage: `linear-gradient(${gradientAngle}, ${gradientColors})`,
        backgroundSize: direction === 'horizontal' ? '300% 100%' : direction === 'vertical' ? '100% 300%' : '300% 300%',
        backgroundRepeat: 'repeat'
    };

    return (
        <div className="w-full min-h-screen bg-background flex items-center justify-center p-4">
            <motion.div
                className={cn(
                    "relative inline-block w-fit",
                    showBorder && "p-[2px] rounded-xl overflow-hidden",
                    className
                )}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            >
                {showBorder && (
                    <motion.div
                        className="absolute inset-0 z-0 h-full w-full rounded-xl"
                        style={{ ...gradientStyle, backgroundPosition }}
                    />
                )}
                <motion.div
                    className={cn(
                        "relative z-10 w-full h-full bg-clip-text text-transparent heading-xl",
                        showBorder && "bg-background rounded-[10px] px-8 py-4 flex items-center justify-center"
                    )}
                    style={{ ...gradientStyle, backgroundPosition }}
                >
                    {children || SETTINGS.text}
                </motion.div>
            </motion.div>
        </div>
    );
}
