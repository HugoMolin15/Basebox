'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { ArrowRight } from 'lucide-react';
import { ImagePrimitive } from '@/components/Media/image-primitive';

/**
 * CONFIGURATION FIRST
 * All changeable text, links, and image URLs MUST be defined in a const SETTINGS = {} object at the very top.
 */
const SETTINGS = {
    header: "Trusted by fast-growing startups",
    sponsors: [
        { id: 1, name: "OpenAI", logo: "https://assets.thehansindia.com/h-upload/2025/02/05/1520649-openai.webp", href: "#" },
        { id: 2, name: "Retool", logo: "", href: "#" },
        { id: 3, name: "Stripe", logo: "", href: "#" },
        { id: 4, name: "Wise", logo: "", href: "#" },
        { id: 5, name: "Loom", logo: "", href: "#" },
        { id: 6, name: "Medium", logo: "", href: "#" },
        { id: 7, name: "Cash App", logo: "", href: "#" },
        { id: 8, name: "Linear", logo: "", href: "#" },
    ]
};

/**
 * Classic Sponsor Grid
 * Features a clean logo layout with interactive hover states and "Learn More" prompts.
 */
export function SponsorSection() {
    return (
        <section className="w-full bg-white flex flex-col py-24">
            <div className="max-w-7xl mx-auto w-full px-6">

                {/* Header Context */}
                <div className="text-center mb-16 animate-in fade-in slide-in-from-bottom-4 duration-700">
                    <p
                        className="tracking-[0.25em] uppercase"
                        style={{ color: 'var(--color-black-lighter)', fontSize: 'var(--font-size-xs)', fontWeight: 'var(--font-weight-black)', opacity: 0.5 }}
                    >
                        {SETTINGS.header}
                    </p>
                </div>

                {/* Collaborative Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border-l border-t border-gray-thin">
                    {SETTINGS.sponsors.map((sponsor) => (
                        <a
                            key={sponsor.id}
                            href={sponsor.href}
                            className={cn(
                                "group relative flex flex-col items-center justify-center p-12 h-56",
                                "border-r border-b border-gray-thin bg-white transition-all duration-500 ease-out",
                                "hover:bg-[var(--color-white-light)] cursor-pointer overflow-hidden"
                            )}
                        >
                            {/* Brand Visual */}
                            <div className="w-40 h-16 flex items-center justify-center transition-all duration-500 ease-out group-hover:scale-90 group-hover:-translate-y-4">
                                <ImagePrimitive
                                    src={sponsor.logo}
                                    alt={sponsor.name}
                                    aspectRatio="none"
                                    imageVariant="none"
                                    fallbackText={sponsor.name}
                                    className="opacity-70 group-hover:opacity-100 transition-all grayscale group-hover:grayscale-0"
                                    style={{ color: 'var(--color-black)', fontWeight: 'var(--font-weight-bold)' }}
                                />
                            </div>

                            {/* Interactive Hint */}
                            <div className="absolute bottom-10 left-0 right-0 flex justify-center items-center opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 ease-out pointer-events-none">
                                <span
                                    className="flex items-center gap-1.5 uppercase tracking-widest"
                                    style={{ color: 'var(--color-brand-normal)', fontSize: 'var(--font-size-xs)', fontWeight: 'var(--font-weight-extrabold)' }}
                                >
                                    Learn More <ArrowRight size={12} strokeWidth={3} className="transition-transform group-hover:translate-x-1" />
                                </span>
                            </div>

                            {/* Dynamic Depth Surface */}
                            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,var(--color-brand-normal),transparent)] opacity-0 group-hover:opacity-[0.03] transition-opacity duration-700 pointer-events-none" />
                        </a>
                    ))}
                </div>
            </div>
        </section>
    );
}
