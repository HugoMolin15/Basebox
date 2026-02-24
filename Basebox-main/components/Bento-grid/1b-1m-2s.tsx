'use client';

import React from 'react';
import { LucideIcon, ShieldCheck, Lock, Eye, Fingerprint } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface BentoFeature {
    title: string;
    description: string;
    icon: LucideIcon;
    className: string;
}

export interface BentoGridProps {
    features?: BentoFeature[];
    className?: string;
}

const defaultFeatures: BentoFeature[] = [
    {
        title: 'Advanced Encryption',
        description: 'Military-grade AES-256 encryption protects your data at rest and in transit.',
        icon: ShieldCheck,
        className: 'md:col-span-2 md:row-span-2'
    },
    {
        title: 'Biometric Access',
        description: 'Seamless fingerprint and facial recognition integration.',
        icon: Fingerprint,
        className: 'md:col-span-1 md:row-span-1'
    },
    {
        title: 'Real-time Monitoring',
        description: '24/7 threat detection and response systems.',
        icon: Eye,
        className: 'md:col-span-1 md:row-span-1'
    },
    {
        title: 'Secure Vault',
        description: 'Isolated storage environment for your most sensitive digital assets.',
        icon: Lock,
        className: 'md:col-span-2 md:row-span-1'
    }
];

export function BentoGrid({
    features = defaultFeatures,
    className
}: BentoGridProps) {
    return (
        <section className={cn("py-24 px-4 max-w-7xl mx-auto bg-background debug-border", className)}>
            <div
                className="grid grid-cols-1 md:grid-cols-4 auto-rows-[200px]"
                style={{ gap: 'var(--spacing-l)' }}
            >
                {features.map((feature, idx) => (
                    <div
                        key={idx}
                        className={cn(
                            "relative border-gray-thin p-6 flex flex-col justify-between",
                            feature.className
                        )}
                        style={{ borderRadius: 'var(--radius-s)' }}
                    >
                        <div className="relative z-10">
                            <div
                                className="p-3 w-fit rounded-pill mb-4 border shadow-sm"
                                style={{ backgroundColor: 'color-mix(in srgb, var(--color-brand-normal) 10%, transparent)', borderColor: 'color-mix(in srgb, var(--color-brand-normal) 20%, transparent)', color: 'var(--color-brand-normal)' }}
                            >
                                <feature.icon className="w-6 h-6" />
                            </div>

                            <div>
                                <h3
                                    className="mb-2"
                                    style={{ color: 'var(--color-black)', fontSize: 'var(--font-size-base)', fontWeight: 'var(--font-weight-bold)' }}
                                >
                                    {feature.title}
                                </h3>
                                <p
                                    className="leading-relaxed"
                                    style={{ color: 'var(--color-black-lighter)', fontSize: 'var(--font-size-sm)', fontWeight: 'var(--font-weight-normal)' }}
                                >
                                    {feature.description}
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
