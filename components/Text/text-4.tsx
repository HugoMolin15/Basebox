"use client";

import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, MotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * SETTINGS
 * Configuration for the focused HyperText showcase.
 */
const SETTINGS = {
    mainText: "BASEBOX",
    characterSet: "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789".split(""),
};

type CharacterSet = string[] | readonly string[];

interface HyperTextProps extends MotionProps {
    /** The text content to be animated */
    children: string;
    /** Optional className for styling */
    className?: string;
    /** Duration of the animation in milliseconds */
    duration?: number;
    /** Delay before animation starts in milliseconds */
    delay?: number;
    /** Component to render as - defaults to div */
    as?: React.ElementType;
    /** Whether to start animation when element comes into view */
    startOnView?: boolean;
    /** Whether to trigger animation on hover */
    animateOnHover?: boolean;
    /** Custom character set for scramble effect. Defaults to uppercase alphabet */
    characterSet?: CharacterSet;
}

const DEFAULT_CHARACTER_SET = Object.freeze(
    "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("")
) as readonly string[];

const getRandomInt = (max: number): number => Math.floor(Math.random() * max);

/**
 * HyperText - Scramble animation component.
 */
export function HyperText({
    children,
    className,
    duration = 800,
    delay = 0,
    as: Component = "div",
    startOnView = false,
    animateOnHover = true,
    characterSet = DEFAULT_CHARACTER_SET,
    ...props
}: HyperTextProps) {
    const MotionComponent = motion.create(Component, {
        forwardMotionProps: true,
    });

    const [displayText, setDisplayText] = useState<string[]>(() =>
        children.split("")
    );
    const [isAnimating, setIsAnimating] = useState(false);
    const iterationCount = useRef(0);
    const elementRef = useRef<HTMLElement>(null);

    const handleAnimationTrigger = () => {
        if (animateOnHover && !isAnimating) {
            iterationCount.current = 0;
            setIsAnimating(true);
        }
    };

    useEffect(() => {
        if (!startOnView) {
            const startTimeout = setTimeout(() => {
                setIsAnimating(true);
            }, delay);
            return () => clearTimeout(startTimeout);
        }

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        setIsAnimating(true);
                    }, delay);
                    observer.disconnect();
                }
            },
            { threshold: 0.1, rootMargin: "-30% 0px -30% 0px" }
        );

        if (elementRef.current) {
            observer.observe(elementRef.current);
        }

        return () => observer.disconnect();
    }, [delay, startOnView]);

    useEffect(() => {
        if (!isAnimating) return;

        const maxIterations = children.length;
        const startTime = performance.now();
        let animationFrameId: number;

        const animate = (currentTime: number) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);

            iterationCount.current = progress * maxIterations;

            setDisplayText((currentText) =>
                currentText.map((letter, index) =>
                    letter === " "
                        ? letter
                        : index <= iterationCount.current
                            ? children[index]
                            : characterSet[getRandomInt(characterSet.length)]
                )
            );

            if (progress < 1) {
                animationFrameId = requestAnimationFrame(animate);
            } else {
                setIsAnimating(false);
            }
        };

        animationFrameId = requestAnimationFrame(animate);

        return () => cancelAnimationFrame(animationFrameId);
    }, [children, duration, isAnimating, characterSet]);

    return (
        <MotionComponent
            ref={elementRef}
            className={cn("overflow-hidden py-2", className)}
            onMouseEnter={handleAnimationTrigger}
            {...props}
        >
            <AnimatePresence>
                {displayText.map((letter, index) => (
                    <motion.span
                        key={index}
                        className={cn("font-mono", letter === " " ? "w-3" : "")}
                    >
                        {letter.toUpperCase()}
                    </motion.span>
                ))}
            </AnimatePresence>
        </MotionComponent>
    );
}

/**
 * Text4 - A focused section showcasing the HyperText scrambling effect.
 */
export function Text4() {
    return (
        <section className="w-full min-h-screen bg-white flex flex-col items-center justify-center">
            <div className="w-fit text-center">
                <HyperText
                    className="text-6xl md:text-8xl lg:text-9xl xl:text-[12rem] font-bold tracking-tighter text-slate-900 leading-none select-none"
                    duration={1000}
                    animateOnHover={false}
                    characterSet={SETTINGS.characterSet}
                >
                    {SETTINGS.mainText}
                </HyperText>
            </div>
        </section>
    );
}
