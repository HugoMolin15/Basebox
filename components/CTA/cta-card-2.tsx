'use client';

import React from 'react';
import Link from "next/link";
import {
    Code2, Database, Cloud, Terminal, Blocks, Cpu, Network, Monitor,
    Layers, Lock, Server, Webhook, Box, Globe, Binary, Rocket
} from "lucide-react";
import { cn } from "@/lib/utils";
import { ImagePrimitive } from '@/components/Media/image-primitive';

/**
 * CONFIGURATION FIRST
 */
const SETTINGS = {
    header: {
        title: "Build your idea",
        description: "Basebox is a modern, responsive library of completely functional React UI primitives mapped perfectly to your standard Tailwind config.",
    },
    actions: {
        primary: {
            text: "Get Started",
            href: "#",
        },
        secondary: {
            text: "Learn More",
            href: "#",
        }
    },
    orbit: {
        count: 3,
        gapRem: 8,
        centerIcon: { Icon: Rocket, color: "#3b82f6" }, // brand primary mapping
        icons: [
            { Icon: Code2, color: "#3b82f6" },
            { Icon: Database, color: "#eab308" },
            { Icon: Cloud, color: "#06b6d4" },
            { Icon: Terminal, color: "#22c55e" },
            { Icon: Blocks, color: "#0ea5e9" },
            { Icon: Cpu, color: "#8b5cf6" },
            { Icon: Network, color: "#f43f5e" },
            { Icon: Monitor, color: "#14b8a6" },
            { Icon: Layers, color: "#6366f1" },
            { Icon: Lock, color: "#d946ef" },
            { Icon: Server, color: "#ec4899" },
            { Icon: Webhook, color: "#f97316" },
            { Icon: Box, color: "#64748b" },
            { Icon: Globe, color: "#10b981" },
            { Icon: Binary, color: "#0ea5e9" },
            { Icon: null, imageSrc: "https://images.unsplash.com/photo-1614680376408-81e91ffe3ab7?w=100", imageAlt: "Abstract UI element" },
            { Icon: null, imageSrc: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=100", imageAlt: "Abstract mesh" },
        ]
    }
};

export function CtaCard2() {
    const { count: orbitCount, gapRem: orbitGap, centerIcon, icons } = SETTINGS.orbit;
    const iconsPerOrbit = Math.ceil(icons.length / orbitCount);

    return (
        <div className="w-full bg-background flex items-center justify-center p-4 py-24">
            <section
                className="relative w-full max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between min-h-[40rem] md:h-[30rem] border-gray-thin overflow-hidden p-8 md:p-12 gap-12 md:gap-0 bg-white"
                style={{ borderRadius: 'var(--radius-s)' }}
            >

                {/* Left side: Heading and Text */}
                <div className="w-full md:w-1/2 z-10 flex flex-col gap-6 relative">
                    <h1
                        className="text-balance"
                        style={{ color: 'var(--color-black)', fontSize: 'var(--font-size-5xl)', fontWeight: 'var(--font-weight-black)' }}
                    >
                        {SETTINGS.header.title}
                    </h1>
                    <p
                        className="max-w-lg leading-relaxed"
                        style={{ color: 'var(--color-black-lighter)', fontSize: 'var(--font-size-lg)', fontWeight: 'var(--font-weight-normal)' }}
                    >
                        {SETTINGS.header.description}
                    </p>
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                        <Link href={SETTINGS.actions.primary.href} className="w-full sm:w-auto">
                            <button className="btn-primary btn-lg btn-pill w-full">
                                {SETTINGS.actions.primary.text}
                            </button>
                        </Link>
                        <Link href={SETTINGS.actions.secondary.href} className="w-full sm:w-auto">
                            <button className="btn-white btn-lg btn-pill w-full">
                                {SETTINGS.actions.secondary.text}
                            </button>
                        </Link>
                    </div>
                </div>

                {/* Right side: Orbit animation */}
                <div className="relative w-full md:w-1/2 h-[20rem] md:h-full flex items-center justify-center mt-12 md:mt-0 right-0 md:absolute md:translate-x-1/4">
                    <div className="absolute w-[40rem] md:w-[60rem] h-[40rem] md:h-[60rem] flex items-center justify-center">

                        {/* Center Circle */}
                        <div className="z-10 w-20 h-20 md:w-24 md:h-24 rounded-full bg-white border-gray-thin shadow-md flex items-center justify-center relative inner-glow">
                            <centerIcon.Icon className="w-10 h-10 md:w-12 md:h-12" style={{ color: centerIcon.color }} />
                        </div>

                        {/* Generate Orbits */}
                        {[...Array(orbitCount)].map((_, orbitIdx) => {
                            // Adjust orbit size responsive to standard rems
                            const size = `${14 + orbitGap * (orbitIdx + 1)}rem`;
                            const angleStep = (2 * Math.PI) / iconsPerOrbit;
                            const orbitIcons = icons.slice(orbitIdx * iconsPerOrbit, orbitIdx * iconsPerOrbit + iconsPerOrbit);

                            return (
                                <div
                                    key={orbitIdx}
                                    className="absolute rounded-full border border-dashed border-gray-thin opacity-30"
                                    style={{
                                        width: size,
                                        height: size,
                                        animation: `spin-orbit ${20 + orbitIdx * 8}s linear infinite`,
                                        animationDirection: orbitIdx % 2 === 0 ? "normal" : "reverse" // Alternate spin direction
                                    }}
                                >
                                    {orbitIcons.map((cfg, iconIdx) => {
                                        const angle = iconIdx * angleStep;
                                        const x = 50 + 50 * Math.cos(angle);
                                        const y = 50 + 50 * Math.sin(angle);

                                        return (
                                            <div
                                                key={iconIdx}
                                                className="absolute bg-white border-gray-thin rounded-full p-2.5 shadow-sm overflow-hidden"
                                                style={{
                                                    left: `${x}%`,
                                                    top: `${y}%`,
                                                    transform: "translate(-50%, -50%)",
                                                    // Counter-rotate the inner items so they stay upright
                                                    animation: `spin-orbit-counter ${20 + orbitIdx * 8}s linear infinite`,
                                                    animationDirection: orbitIdx % 2 === 0 ? "reverse" : "normal"
                                                }}
                                            >
                                                {cfg.Icon ? (
                                                    <cfg.Icon className="w-5 h-5 md:w-6 md:h-6" style={{ color: cfg.color }} />
                                                ) : cfg.imageSrc ? (
                                                    <div className="w-5 h-5 md:w-6 md:h-6 relative overflow-hidden rounded-full">
                                                        <ImagePrimitive
                                                            src={cfg.imageSrc}
                                                            alt={cfg.imageAlt || "Orbit item"}
                                                            className="img-glass rounded-full object-cover"
                                                        />
                                                    </div>
                                                ) : null}
                                            </div>
                                        );
                                    })}
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Local Animation Keyframes for structural integrity without polluting globals.css unnecessarily */}
                <style dangerouslySetInnerHTML={{
                    __html: `
          @keyframes spin-orbit {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
          @keyframes spin-orbit-counter {
            from { transform: translate(-50%, -50%) rotate(0deg); }
            to { transform: translate(-50%, -50%) rotate(-360deg); }
          }
        `}} />
            </section>
        </div>
    );
}
