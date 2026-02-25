"use client";

import React, { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { TrendingUp, ShieldCheck, Zap } from "lucide-react";
import { AnimatePresence, motion, MotionProps, useInView } from "framer-motion";

/**
 * SETTINGS
 * Configuration for all text, icons, and links.
 */
const SETTINGS = {
    title: {
        line1: "Designed to convert.",
        line2: "Built to scale.",
    },
    stats: [
        {
            value: "10.6x",
            label: "Faster onboarding",
        },
        {
            value: "37%",
            label: "Conversion increase",
        },
        {
            value: "4.8x",
            label: "Analyst efficiency",
        },
    ],
    features: [
        {
            icon: TrendingUp,
            title: "Drive revenue",
            description:
                "Duna's platform is built to help enterprises grow. Optimised to eliminate friction and instantly deliver higher conversion.",
        },
        {
            icon: ShieldCheck,
            title: "Future-proof compliance",
            description:
                "A powerful policy engine translates KYC, KYB and AML into code - enabling the industry's most detailed audit trails.",
        },
        {
            icon: Zap,
            title: "Reduce costs",
            description:
                "Eliminate manual checks, endless emails and lengthy reviews - by automating manual work with compliant, auditable AI.",
        },
    ],
};

const DEFAULT_CHARACTER_SET = Object.freeze(
    "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789".split("")
) as readonly string[];

const getRandomInt = (max: number): number => Math.floor(Math.random() * max);

interface HyperTextProps extends MotionProps {
    children: string;
    className?: string;
    duration?: number;
    delay?: number;
    as?: React.ElementType;
    startOnView?: boolean;
    animateOnHover?: boolean;
    characterSet?: string[] | readonly string[];
    triggerInView?: boolean;
}

function HyperText({
    children,
    className,
    duration = 800,
    delay = 0,
    as: Component = "div",
    startOnView = false,
    animateOnHover = true,
    characterSet = DEFAULT_CHARACTER_SET,
    triggerInView = false,
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
        if (triggerInView) {
            setIsAnimating(true);
        }
    }, [triggerInView]);

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
            className={cn("overflow-hidden", className)}
            onMouseEnter={handleAnimationTrigger}
            {...props}
        >
            <AnimatePresence>
                {displayText.map((letter, index) => (
                    <motion.span
                        key={index}
                        className={cn(letter === " " ? "w-3" : "")}
                    >
                        {letter}
                    </motion.span>
                ))}
            </AnimatePresence>
        </MotionComponent>
    );
}

export function StatsSection4() {
    const containerRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(containerRef, { once: true, margin: "-10%" });

    return (
        <section className="w-full bg-white">
            <div className="max-w-7xl mx-auto px-6 py-20 md:py-32 flex flex-col gap-12 md:gap-16">
                {/* Header Section */}
                <div className="flex flex-col gap-12 md:gap-16">
                    <div className="flex flex-col">
                        <h2
                            className="tracking-tighter leading-tight"
                            style={{ color: 'var(--color-black)', fontSize: 'var(--font-size-4xl)', fontWeight: 'var(--font-weight-medium)' }}
                        >
                            {SETTINGS.title.line1}
                            <br />
                            {SETTINGS.title.line2}
                        </h2>
                    </div>

                    {/* Stats Grid - 3 columns on all screens */}
                    <div
                        ref={containerRef}
                        className="grid grid-cols-3 gap-2 sm:gap-4 md:gap-8"
                    >
                        {SETTINGS.stats.map((stat, index) => (
                            <div key={index} className="flex flex-col gap-1 md:gap-2">
                                <HyperText
                                    className="tracking-tighter leading-none text-4xl sm:text-5xl md:text-6xl xl:text-7xl"
                                    style={{ color: 'var(--color-black)', fontWeight: 'var(--font-weight-extrabold)' }}
                                    triggerInView={isInView}
                                    animateOnHover={false}
                                >
                                    {stat.value}
                                </HyperText>
                                <span
                                    className="line-clamp-1 text-xs sm:text-sm md:text-base"
                                    style={{ color: 'var(--color-black-lighter)', fontWeight: 'var(--font-weight-normal)' }}
                                >
                                    {stat.label}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Features Grid with Unified Borders */}
                <div className="grid grid-cols-1 md:grid-cols-3">
                    {SETTINGS.features.map((feature, index) => (
                        <div
                            key={index}
                            className={cn(
                                "flex flex-col gap-6 pt-12 md:pt-16 pb-12 md:pb-0",
                                index === 0 && "md:pr-10 lg:pr-16",
                                index === 1 && "md:px-10 lg:px-16",
                                index === 2 && "md:pl-10 lg:pl-16"
                            )}
                        >
                            <div
                                className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-lg"
                                style={{ color: 'var(--color-black)' }}
                            >
                                <feature.icon className="w-5 h-5 md:w-6 md:h-6 stroke-[1.5]" />
                            </div>
                            <div className="flex flex-col gap-3">
                                <h3 style={{ color: 'var(--color-black)', fontSize: 'var(--font-size-base)', fontWeight: 'var(--font-weight-semibold)' }}>
                                    {feature.title}
                                </h3>
                                <p className="leading-relaxed" style={{ color: 'var(--color-black-lighter)', fontSize: 'var(--font-size-base)', fontWeight: 'var(--font-weight-normal)' }}>
                                    {feature.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
