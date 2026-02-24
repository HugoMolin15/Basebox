'use client';

import React, { useRef } from 'react';
import { useScroll, motion, useTransform, MotionValue } from 'framer-motion';
import { cn } from '@/lib/utils';
import { ImagePrimitive } from '@/components/Media/image-primitive';
import { ArrowRight } from 'lucide-react';

/**
 * CONFIGURATION FIRST
 * All changeable text, links, and image URLs MUST be defined in a const SETTINGS = {} object at the top.
 */
const SETTINGS = {
    title: "Portfolio Highlights",
    subtitle: "A selection of curated photographic works from our global collective.",
    projects: [
        {
            title: "Matthias Leidinger",
            description: "Originally from Linz, Austria. Matthias Leidinger is a photographer whose work is mainly focused on landscape, architecture and coastal photography. His work is a meditative journey into the origins of regrets and the uncertainty of stepping into new unknowns.",
            imageSrc: "https://i.pinimg.com/1200x/f2/07/0c/f2070ca40e6b6106386849db1044c9d0.jpg",
            imageAlt: "Alpine mountains under a starry sky",
            link: "#",
            accentColor: "bg-blue-500"
        },
        {
            title: "Clément Chapillon",
            description: "Photographer based in Paris, Clément Chapillon explores the theme of geography and human connection. His latest series 'Les Rochers Fauves' is a visual study of the island of Amorgos in Greece, exploring the relationship between the islanders and their rugged environment.",
            imageSrc: "https://i.pinimg.com/1200x/39/fa/62/39fa62821f86b475f8faed3ab38cb124.jpg",
            imageAlt: "Golden hour over a rocky coast",
            link: "#",
            accentColor: "bg-amber-500"
        },
        {
            title: "Zissou",
            description: "Zissou is a collaborative project between photographers and explorers. Their work focuses on the intersection of nature and civilization, capturing the delicate balance between the wild and the built environment through a cinematic lens.",
            imageSrc: "https://i.pinimg.com/1200x/b1/1f/ec/b11fec719d9329e484e888ce13519bed.jpg",
            imageAlt: "Sunlight filtering through a dense forest",
            link: "#",
            accentColor: "bg-emerald-500"
        },
        {
            title: "Mark Rammers",
            description: "Dutch photographer Mark Rammers has shared with our library the first chapter of his latest photographic project, 'all over again'—captured while in residency at Hektor, an old farm in Los Valles, Lanzarote. Mesmerizing and meditative highlights.",
            imageSrc: "https://i.pinimg.com/1200x/79/ff/17/79ff17f6e2b2f8385ff63985e9fccbdb.jpg",
            imageAlt: "Minimalist desert landscape",
            link: "#",
            accentColor: "bg-zinc-500"
        }
    ]
};

interface CardProps {
    i: number;
    title: string;
    description: string;
    imageSrc: string;
    imageAlt: string;
    link: string;
    accentColor: string;
    progress: MotionValue<number>;
    range: [number, number];
    targetScale: number;
}

/**
 * Individual Parallax Card Component (Basebox Styling)
 */
function Card({ i, title, description, imageSrc, imageAlt, link, accentColor, progress, range, targetScale }: CardProps) {
    const container = useRef(null);
    const { scrollYProgress } = useScroll({
        target: container,
        offset: ['start end', 'start start']
    });

    const imageScale = useTransform(scrollYProgress, [0, 1], [2, 1]);
    const scale = useTransform(progress, range, [1, targetScale]);

    return (
        <div ref={container} className="h-screen flex items-center justify-center sticky top-0 px-4 md:px-0">
            <motion.div
                style={{
                    scale,
                    top: `calc(-5vh + ${i * 28}px)`,
                    borderRadius: 'var(--radius-s)'
                }}
                className={cn(
                    "relative h-[500px] w-full max-w-4xl p-8 md:p-12 origin-top flex flex-col bg-white border-gray-thin overflow-hidden"
                )}
            >
                <div className="flex items-start justify-between mb-6 md:mb-8">
                    <h2
                        className="leading-tight"
                        style={{ color: 'var(--color-black)', fontSize: 'var(--font-size-4xl)', fontWeight: 'var(--font-weight-extrabold)' }}
                    >
                        {title}
                    </h2>
                </div>

                <div className="flex flex-col md:flex-row gap-8 flex-1 min-h-0">
                    {/* Content Section */}
                    <div className="flex-1 flex flex-col justify-center text-left">
                        <p
                            className="leading-relaxed mb-8"
                            style={{ color: 'var(--color-black-lighter)', fontSize: 'var(--font-size-base)', fontWeight: 'var(--font-weight-medium)', opacity: 0.7 }}
                        >
                            {description}
                        </p>

                        <div className="mt-auto">
                            <a
                                href={link}
                                className="btn-primary btn-lg btn-pill inline-flex items-center justify-center px-10"
                            >
                                Learn More
                            </a>
                        </div>
                    </div>

                    {/* Image Section */}
                    <div
                        className="flex-[1.5] relative overflow-hidden bg-zinc-100 img-soft border-none"
                        style={{ borderRadius: 'var(--radius-s)' }}
                    >
                        <motion.div
                            style={{ scale: imageScale }}
                            className="w-full h-full"
                        >
                            <ImagePrimitive
                                src={imageSrc}
                                alt={imageAlt}
                                imageVariant="soft"
                                className="w-full h-full object-cover"
                            />
                        </motion.div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}

/**
 * Stacked Parallax Section (Basebox Design System)
 */
export function CardParallax() {
    const container = useRef(null);
    const { scrollYProgress } = useScroll({
        target: container,
        offset: ['start start', 'end end']
    });

    return (
        <div className="w-full min-h-screen bg-background transition-colors">
            {/* Semantic Header */}
            <div className="py-24 px-6 text-center">
                <h1
                    className="tracking-tighter mb-4"
                    style={{ color: 'var(--color-black)', fontSize: 'var(--font-size-6xl)', fontWeight: 'var(--font-weight-black)' }}
                >
                    {SETTINGS.title}
                </h1>
                <p
                    className="max-w-lg mx-auto"
                    style={{ color: 'var(--color-black-lighter)', fontSize: 'var(--font-size-lg)', fontWeight: 'var(--font-weight-medium)', opacity: 0.7 }}
                >
                    {SETTINGS.subtitle}
                </p>
            </div>

            <main ref={container} className="relative">
                {SETTINGS.projects.map((project, i) => {
                    const targetScale = 1 - ((SETTINGS.projects.length - i) * 0.05);
                    return (
                        <Card
                            key={`p_${i}`}
                            i={i}
                            {...project}
                            progress={scrollYProgress}
                            range={[i * (1 / SETTINGS.projects.length), 1]}
                            targetScale={targetScale}
                        />
                    );
                })}
            </main>

            {/* Outro context spacer */}
            <div className="h-screen flex items-center justify-center">
                <div className="text-center">
                    <h3
                        className="uppercase tracking-widest"
                        style={{ color: 'var(--color-black-lighter)', fontSize: 'var(--font-size-sm)', fontWeight: 'var(--font-weight-bold)', opacity: 0.5 }}
                    >
                        End of Gallery
                    </h3>
                </div>
            </div>
        </div>
    );
}
