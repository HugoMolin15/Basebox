"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { Briefcase, PenTool, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

/**
 * SETTINGS
 * Configuration for all text, icons, and branding.
 * Part of the Basebox Design System protocol.
 */
const SETTINGS = {
    title: "Built to handle complexity",
    features: [
        {
            icon: Briefcase,
            title: "Extremely customizable",
            description: "Fine-tune every nuance to match your business",
        },
        {
            icon: PenTool,
            title: "Auto policy writing",
            description: "Get started with just a transcript",
        },
        {
            icon: Sparkles,
            title: "Built-in Copilot",
            description: "AI helps you build your ideal support agent",
        },
    ],
};

/**
 * PlusPoints2 - A sleek, light-themed feature highlight section.
 * Optimized for high-density information layout with responsive separators.
 */
export function PlusPoints2() {
    return (
        <section className="w-full min-h-[40vh] bg-white py-24 px-6 md:px-12 flex flex-col items-center justify-center">
            <div className="max-w-7xl w-full flex flex-col lg:flex-row items-start lg:items-center justify-between gap-16 lg:gap-32">

                {/* Left Aspect: Title */}
                <div className="flex flex-col gap-10 max-w-xl shrink-0">
                    <h2
                        className="tracking-tighter leading-[0.95] max-w-sm"
                        style={{ color: 'var(--color-black)', fontSize: 'var(--font-size-5xl)', fontWeight: 'var(--font-weight-black)' }}
                    >
                        {SETTINGS.title}
                    </h2>
                </div>

                {/* Right Aspect: Feature Grid with Responsive Dividers */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 w-full">
                    {SETTINGS.features.map((feature, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, x: 10 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className="flex flex-col gap-6 group h-full justify-start"
                        >
                            {/* Icon */}
                            <div style={{ color: 'var(--color-brand-normal)' }}>
                                <feature.icon size={24} strokeWidth={1.5} />
                            </div>

                            {/* Text Content */}
                            <div className="flex flex-col gap-3">
                                <h3
                                    className="tracking-tight"
                                    style={{ color: 'var(--color-black)', fontSize: 'var(--font-size-base)', fontWeight: 'var(--font-weight-bold)' }}
                                >
                                    {feature.title}
                                </h3>
                                <p
                                    className="leading-relaxed max-w-[200px]"
                                    style={{ color: 'var(--color-black-lighter)', fontSize: 'var(--font-size-sm)', fontWeight: 'var(--font-weight-normal)' }}
                                >
                                    {feature.description}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>

            </div>
        </section>
    );
}
