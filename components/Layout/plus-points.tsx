'use client';

import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * CONFIGURATION FIRST
 */
const SETTINGS = {
    badgeText: "Platform",
    headingLine1: "Something new!",
    description: "Managing a small business today is already tough.",
    features: [
        {
            title: "Easy to use",
            description: "We've made it easy to use and understand.",
            icon: Check,
        },
        {
            title: "Fast and reliable",
            description: "We've made it fast and reliable.",
            icon: Check,
        },
        {
            title: "Beautiful and modern",
            description: "We've made it beautiful and modern.",
            icon: Check,
        },
        {
            title: "Easy to use",
            description: "We've made it easy to use and understand.",
            icon: Check,
        },
        {
            title: "Fast and reliable",
            description: "We've made it fast and reliable.",
            icon: Check,
        },
        {
            title: "Beautiful and modern",
            description: "We've made it beautiful and modern.",
            icon: Check,
        },
    ]
};

/**
 * PLUS POINTS EXPORT
 */
export function PlusPoints() {
    return (
        <main className="w-full bg-background flex flex-col items-center justify-center p-4 text-left">
            <div className="w-full max-w-5xl mx-auto px-6 lg:px-8 py-12 lg:py-24">
                <div className="flex flex-col items-start gap-8">

                    {/* Header Section */}
                    <div className="flex flex-col gap-4">
                        <div>
                            <div
                                className="inline-flex items-center rounded-md border px-3 py-1 uppercase tracking-widest shadow-sm"
                                style={{
                                    backgroundColor: 'color-mix(in srgb, var(--color-brand-normal) 10%, transparent)',
                                    borderColor: 'color-mix(in srgb, var(--color-brand-normal) 20%, transparent)',
                                    color: 'var(--color-brand-normal)',
                                    fontSize: '10px',
                                    fontWeight: 'var(--font-weight-bold)'
                                }}
                            >
                                {SETTINGS.badgeText}
                            </div>
                        </div>
                        <div className="flex flex-col gap-3">
                            <h2
                                className="tracking-tight"
                                style={{ color: 'var(--color-black)', fontSize: 'var(--font-size-4xl)', fontWeight: 'var(--font-weight-extrabold)' }}
                            >
                                {SETTINGS.headingLine1}
                            </h2>
                            <p
                                className="max-w-xl leading-relaxed"
                                style={{ color: 'var(--color-black-lighter)', fontSize: 'var(--font-size-lg)', fontWeight: 'var(--font-weight-normal)' }}
                            >
                                {SETTINGS.description}
                            </p>
                        </div>
                    </div>

                    {/* Features Grid */}
                    <div className="w-full pt-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
                            {SETTINGS.features.map((feature, idx) => (
                                <div key={idx} className="flex flex-row items-start gap-4">
                                    <div
                                        className="mt-1 flex-shrink-0 rounded-full p-1"
                                        style={{ backgroundColor: 'color-mix(in srgb, var(--color-brand-normal) 10%, transparent)', color: 'var(--color-brand-normal)' }}
                                    >
                                        <feature.icon className="h-4 w-4" />
                                    </div>
                                    <div className="flex flex-col gap-1.5">
                                        <h3
                                            className=""
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
                            ))}
                        </div>
                    </div>

                </div>
            </div>
        </main>
    );
}
