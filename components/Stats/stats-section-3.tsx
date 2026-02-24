"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { useInView, useMotionValue, useSpring } from "framer-motion";

/**
 * CONFIGURATION FIRST
 */
const SETTINGS = {
    header: {
        title: "Performance Metrics",
        description: "Real-time tracking of the core operations in your digital infrastructure.",
    },
    stats: [
        {
            id: "stat-1",
            title: "Total Revenue",
            value: 1234567,
            prefix: "$",
            separator: ",",
            subtitle: "15% increase from last month",
            colors: ["#3B82F6", "#60A5FA", "#93C5FD"],
            colSpan: "md:col-span-2",
        },
        {
            id: "stat-2",
            title: "New Users",
            value: 1234,
            separator: ",",
            subtitle: "Daily signups",
            colors: ["#60A5FA", "#34D399", "#93C5FD"],
            colSpan: "md:col-span-1",
        },
        {
            id: "stat-3",
            title: "Conversion Rate",
            value: 3.45,
            suffix: "%",
            subtitle: "0.5% increase from last week",
            colors: ["#F59E0B", "#A78BFA", "#FCD34D"],
            colSpan: "md:col-span-1",
        },
        {
            id: "stat-4",
            title: "Active Projects",
            value: 42,
            subtitle: "8 completed this month",
            colors: ["#3B82F6", "#A78BFA", "#FBCFE8"],
            colSpan: "md:col-span-2",
        },
        {
            id: "stat-5",
            title: "Customer Satisfaction",
            value: 4.8,
            suffix: "/5",
            subtitle: "Based on 1,000+ reviews from verified customers across all product categories",
            colors: ["#EC4899", "#F472B6", "#3B82F6"],
            colSpan: "md:col-span-3",
        }
    ]
};

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

interface BentoCardProps {
    title: string;
    value: number;
    prefix?: string;
    suffix?: string;
    separator?: string;
    subtitle?: string;
    colors: string[];
    colSpan: string;
    triggerInView?: boolean;
}

const BentoCard: React.FC<BentoCardProps> = ({
    title,
    value,
    prefix,
    suffix,
    separator,
    subtitle,
    colors,
    colSpan,
    triggerInView
}) => {
    return (
        <div
            className={cn("relative w-full h-full p-6 md:p-8 min-h-[12rem] flex flex-col justify-end rounded-none border-gray-thin bg-card", colSpan)}
        >
            <div
                className="relative z-10"
                style={{ color: 'var(--color-black)' }}
            >
                <h3
                    className="mb-2"
                    style={{ color: 'var(--color-black)', fontSize: 'var(--font-size-base)', fontWeight: 'var(--font-weight-bold)' }}
                >
                    {title}
                </h3>
                <div
                    className="mb-4 flex items-baseline gap-0.5"
                    style={{ color: 'var(--color-black)', fontSize: 'var(--font-size-4xl)', fontWeight: 'var(--font-weight-extrabold)' }}
                >
                    {prefix && <span>{prefix}</span>}
                    <CountUp to={value} separator={separator} duration={1.5} triggerInView={triggerInView} />
                    {suffix && <span>{suffix}</span>}
                </div>
                {subtitle && (
                    <p
                        className="font-medium"
                        style={{ color: 'var(--color-black)', fontSize: 'var(--font-size-sm)', fontWeight: 'var(--font-weight-normal)' }}
                    >
                        {subtitle}
                    </p>
                )}
            </div>
        </div>
    );
};

// --- MAIN COMPONENT ---
export function StatsSection3() {
    const containerRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(containerRef, { once: true, margin: "-10%" });

    return (
        <section className="w-full bg-background flex items-center justify-center p-4 py-24 debug-border">
            <div className="w-full max-w-5xl mx-auto flex flex-col gap-12">

                <div className="text-center md:text-left flex flex-col gap-4">
                    <h2 className="heading-xl" style={{ color: 'var(--color-black)' }}>{SETTINGS.header.title}</h2>
                    <p className="max-w-2xl leading-relaxed" style={{ color: 'var(--color-black)', fontSize: 'var(--font-size-base)', fontWeight: 'var(--font-weight-medium)' }}>
                        {SETTINGS.header.description}
                    </p>
                </div>

                <div
                    ref={containerRef}
                    className="grid grid-cols-1 md:grid-cols-3 gap-0 w-full h-full rounded-none overflow-hidden"
                >
                    {SETTINGS.stats.map((stat) => (
                        <BentoCard
                            key={stat.id}
                            title={stat.title}
                            value={stat.value}
                            prefix={stat.prefix}
                            suffix={stat.suffix}
                            separator={stat.separator}
                            subtitle={stat.subtitle}
                            colors={stat.colors}
                            colSpan={stat.colSpan}
                            triggerInView={isInView}
                        />
                    ))}
                </div>

            </div>
        </section>
    );
}
