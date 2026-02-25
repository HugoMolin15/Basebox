"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ImagePrimitive } from '@/components/Media/image-primitive';

/**
 * SETTINGS
 * Configuration for all text, links, and background assets.
 */
const SETTINGS = {
    background: {
        src: "/img_1.png",
        alt: "Cinematic misty mountain landscape",
    },
    badge: {
        text: "GIGA LAUNCHES BROWSER AGENT",
        href: "#",
    },
    hero: {
        title: "AI that talks like a human.\nHandles millions of calls.",
        subtitle: "AI agents for enterprise support",
    },
    cta: {
        text: "Talk to us",
        href: "/contact",
    },
    logos: [
        { name: "POSTMAN", src: "" },
        { name: "RIO", src: "" },
        { name: "DOORDASH", src: "" },
        { name: "capital com", src: "" },
        { name: "afriex", src: "" },
        { name: "Sendoso", src: "" },
    ],
};

/**
 * Hero7 - A premium, cinematic hero section with an immersive mountain background.
 * Optimized for responsiveness and cross-resolution stability.
 */
export function Hero() {
    return (
        <section className="relative w-full min-h-screen mt-16 flex flex-col bg-black border-none overflow-hidden">
            {/* Background Image Layer */}
            <div className="absolute inset-0 z-0">
                <ImagePrimitive
                    src="https://cdn.cosmos.so/9233a96c-bef3-423d-8ebb-cb64280f06b8?format=jpeg"
                    alt={SETTINGS.background.alt}
                    aspectRatio="none"
                    imageVariant="none"
                    className="w-full debug-border min-h-screen h-full"
                    imageClassName="w-full debug-border min-h-screen h-full object-cover opacity-90"
                />
                {/* Cinematic Vignette */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/70" />
            </div>

            {/* Main Content Area - Uses Flex Grow to push logos down */}
            <div className="relative z-10 flex-grow flex flex-col items-center justify-center text-center px-6 pt-20 pb-10">
                <div className="max-w-7xl w-full flex flex-col items-center">
                    {/* badge */}
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="mb-8 md:mb-12"
                    >
                        <Link
                            href={SETTINGS.badge.href}
                            className="group inline-flex items-center gap-2 px-6 py-2 rounded-full bg-white/10 backdrop-blur-xl border border-white/10 uppercase transition-all"
                            style={{ color: 'var(--color-white)', fontWeight: 'var(--font-weight-normal)', fontSize: 'var(--font-size-xs)' }}
                        >
                            {SETTINGS.badge.text}
                        </Link>
                    </motion.div>

                    {/* Title & Subtitle */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.1, ease: [0.23, 1, 0.32, 1] }}
                        className="flex flex-col items-center gap-6 md:gap-8"
                    >
                        <h1 className="leading-[1.1] tracking-tight max-w-[90%] md:max-w-4xl whitespace-pre-line"
                            style={{ color: 'var(--color-white)', fontSize: 'var(--font-size-7xl)', fontWeight: 'var(--font-weight-bold)' }}>
                            {SETTINGS.hero.title}
                        </h1>
                        <p className="tracking-wide"
                            style={{ color: 'var(--color-white-dark)', fontSize: 'var(--font-size-xl)', fontWeight: 'var(--font-weight-normal)' }}>
                            {SETTINGS.hero.subtitle}
                        </p>
                    </motion.div>

                    {/* CTA */}
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        className="mt-10 md:mt-14"
                    >
                        <Link href={SETTINGS.cta.href} className="btn-white btn-lg btn-pill px-8">
                            {SETTINGS.cta.text}
                        </Link>
                    </motion.div>
                </div>
            </div>

            {/* Logo Cloud - Anchored at the bottom but part of flex flow to avoid overlap */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.6 }}
                className="relative z-10 w-full px-6 py-12 md:py-16 flex flex-wrap items-center justify-center gap-x-12 gap-y-8 md:gap-x-24 opacity-60 transition-all overflow-hidden"
            >
                {SETTINGS.logos.map((logo) => (
                    <span key={logo.name}
                        style={{ color: 'var(--color-white)', fontSize: 'var(--font-size-xl)', fontWeight: 'var(--font-weight-semibold)' }}
                        className="uppercase">
                        {logo.name}
                    </span>
                ))}
            </motion.div>
        </section>
    );
}

