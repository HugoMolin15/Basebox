"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { motion, useInView, useMotionValue, useSpring } from "framer-motion";

/**
 * SETTINGS
 * Configuration for all text, metrics, and colors.
 * This allows for easy content management without touching the JSX.
 */
const SETTINGS = {
    header: {
        title: "Elevate your CX with AI agents proven to outperform humans",
    },
    stats: [
        {
            value: 8,
            suffix: "X",
            label: "more productive than human agents",
            accentColor: "bg-[#064e3b]", // Dark green
        },
        {
            value: 162,
            suffix: "%",
            label: "increase in CSAT scores",
            accentColor: "bg-[#fbcfe8]", // Light pink
        },
        {
            value: 357,
            suffix: "%",
            label: "ROI on AI investment",
            accentColor: "bg-[#bfdbfe]", // Light blue
        },
        {
            value: 84,
            suffix: "%",
            label: "automated resolution rate",
            accentColor: "bg-[#fef08a]", // Light yellow
        },
    ],
};

/**
 * Internal CountUp component.
 */
function CountUp({
    to,
    from = 0,
    direction = "up",
    delay = 0,
    duration = 2,
    className = "",
    startWhen = true,
    separator = "",
    onStart,
    onEnd,
    triggerInView = false,
}: {
    to: number;
    from?: number;
    direction?: "up" | "down";
    delay?: number;
    duration?: number;
    className?: string;
    startWhen?: boolean;
    separator?: string;
    onStart?: () => void;
    onEnd?: () => void;
    triggerInView?: boolean;
}) {
    const ref = useRef<HTMLSpanElement>(null);
    const motionValue = useMotionValue(direction === "down" ? to : from);

    const damping = 20 + 40 * (1 / duration);
    const stiffness = 100 * (1 / duration);

    const springValue = useSpring(motionValue, {
        damping,
        stiffness,
    });

    const getDecimalPlaces = (num: number) => {
        const str = num.toString();
        if (str.includes(".")) {
            const decimals = str.split(".")[1];
            if (parseInt(decimals) !== 0) {
                return decimals.length;
            }
        }
        return 0;
    };

    const maxDecimals = Math.max(getDecimalPlaces(from), getDecimalPlaces(to));

    const formatValue = useCallback(
        (latest: number) => {
            const hasDecimals = maxDecimals > 0;
            const options = {
                useGrouping: !!separator,
                minimumFractionDigits: hasDecimals ? maxDecimals : 0,
                maximumFractionDigits: hasDecimals ? maxDecimals : 0,
            };

            const formattedNumber = Intl.NumberFormat("en-US", options).format(latest);
            return separator ? formattedNumber.replace(/,/g, separator) : formattedNumber;
        },
        [maxDecimals, separator]
    );

    useEffect(() => {
        if (ref.current) {
            ref.current.textContent = formatValue(direction === "down" ? to : from);
        }
    }, [from, to, direction, formatValue]);

    useEffect(() => {
        if (triggerInView && startWhen) {
            if (typeof onStart === "function") onStart();

            const timeoutId = setTimeout(() => {
                motionValue.set(direction === "down" ? from : to);
            }, delay * 1000);

            const durationTimeoutId = setTimeout(() => {
                if (typeof onEnd === "function") onEnd();
            }, delay * 1000 + duration * 1000);

            return () => {
                clearTimeout(timeoutId);
                clearTimeout(durationTimeoutId);
            };
        }
    }, [triggerInView, startWhen, motionValue, direction, from, to, delay, onStart, onEnd, duration]);

    useEffect(() => {
        const unsubscribe = springValue.on("change", (latest) => {
            if (ref.current) {
                ref.current.textContent = formatValue(latest);
            }
        });

        return () => unsubscribe();
    }, [springValue, formatValue]);

    return <span className={className} ref={ref} />;
}

/**
 * StatsSection5 - A high-impact metrics section featuring thick-accented cards.
 * Ultra-clean refinement: lighter background, no card shadows, and normal-weight header.
 */
export function StatsSection5() {
    const containerRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(containerRef, { once: true, margin: "-10%" });

    return (
        <section className="w-full bg-[#fafafa] py-24 px-6 md:px-12 flex flex-col items-center justify-center">
            <div className="max-w-[1400px] w-full mx-auto">
                {/* Header */}
                <div className="text-center mb-16 md:mb-24 px-4">
                    <h2
                        className="max-w-4xl mx-auto leading-[1.1] tracking-tight"
                        style={{ color: 'var(--color-black)', fontSize: 'var(--font-size-4xl)', fontWeight: 'var(--font-weight-medium)' }}
                    >
                        {SETTINGS.header.title}
                    </h2>
                </div>

                {/* Stats Grid */}
                <div
                    ref={containerRef}
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[var(--spacing-library-gap)]"
                >
                    {SETTINGS.stats.map((stat, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.5 }}
                            className="bg-white flex p-0 overflow-hidden min-h-[260px] items-stretch rounded-xl border-none"
                        >
                            {/* Vertical Accent Bar */}
                            <div className={cn("w-3.5 shrink-0", stat.accentColor)} />

                            {/* Content Area */}
                            <div className="flex flex-col justify-start p-8 md:p-10 w-full overflow-hidden">
                                <div className="flex flex-col gap-8">
                                    <div
                                        className="flex items-baseline tracking-tighter"
                                        style={{ color: 'var(--color-black)', fontSize: 'var(--font-size-6xl)', fontWeight: 'var(--font-weight-bold)' }}
                                    >
                                        <CountUp
                                            to={stat.value}
                                            duration={1.5}
                                            triggerInView={isInView}
                                        />
                                        <span>{stat.suffix}</span>
                                    </div>
                                    <p
                                        className="leading-tight max-w-[200px]"
                                        style={{ color: 'var(--color-black-lighter)', fontSize: 'var(--font-size-base)', fontWeight: 'var(--font-weight-normal)' }}
                                    >
                                        {stat.label}
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
