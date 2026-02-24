import React from 'react';
import { cn } from '@/lib/utils';

export interface StatItem {
    label: string;
    value: string;
}

export interface StatsSectionProps {
    stats?: StatItem[];
    className?: string;
}

const defaultStats: StatItem[] = [
    { label: "Threats Neutralized", value: "44 million" },
    { label: "Neural Response Time", value: "0.2ms" },
    { label: "Uptime Guarantee", value: "99.9%" }
];

export function StatsSection1({
    stats = defaultStats,
    className
}: StatsSectionProps) {
    return (
        <section className={cn("bg-background py-24 sm:py-32 debug-border", className)}>
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <dl className="grid grid-cols-1 gap-y-12 text-center lg:grid-cols-3 lg:gap-x-8">
                    {stats.map((stat, idx) => (
                        <div key={idx} className="mx-auto flex max-w-xs flex-col gap-y-2">
                            <dt
                                style={{ color: 'var(--color-black)', fontSize: 'var(--font-size-base)', fontWeight: 'var(--font-weight-normal)' }}
                            >
                                {stat.label}
                            </dt>
                            <dd
                                className="order-first tracking-tight"
                                style={{ color: 'var(--color-black)', fontSize: 'var(--font-size-6xl)', fontWeight: 'var(--font-weight-extrabold)' }}
                            >
                                {stat.value}
                            </dd>
                        </div>
                    ))}
                </dl>
            </div>
        </section>
    );
}
