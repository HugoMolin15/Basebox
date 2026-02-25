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
    title: "Project Showcase",
    subtitle: "A deep dive into our latest architectural and design explorations.",
    projects: [
        {
            title: "Mountain Retreat",
            description: "A sanctuary built into the side of a mountain, blending modern luxury with the raw beauty of the alpine environment. Every window offers a unique perspective on the world below.",
            imageSrc: "https://i.pinimg.com/1200x/f2/07/0c/f2070ca40e6b6106386849db1044c9d0.jpg",
            imageAlt: "Modern cabin in the mountains",
            link: "#"
        },
        {
            title: "Glass Pavilion",
            description: "Minimalism at its peak. This crystalline structure disappears into its surroundings, offering 360-degree views and a constant connection to the rhythm of nature.",
            imageSrc: "https://i.pinimg.com/1200x/39/fa/62/39fa62821f86b475f8faed3ab38cb124.jpg",
            imageAlt: "Glass house in the woods",
            link: "#"
        },
        {
            title: "Brutalist Echo",
            description: "The honesty of raw concrete and geometric form. This project explores the permanence of the built environment and the way light transforms large planes of material.",
            imageSrc: "https://i.pinimg.com/1200x/b1/1f/ec/b11fec719d9329e484e888ce13519bed.jpg",
            imageAlt: "Concrete architecture building",
            link: "#"
        },
        {
            title: "Urban Oasis",
            description: "Reimagining the city roof as a thriving ecosystem. A lush garden and social space that provides a vital escape from the fast-paced energy of the metropolis.",
            imageSrc: "https://i.pinimg.com/1200x/79/ff/17/79ff17f6e2b2f8385ff63985e9fccbdb.jpg",
            imageAlt: "Rooftop garden with city skyline",
            link: "#"
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
    progress: MotionValue<number>;
    range: [number, number];
    targetScale: number;
}

/**
 * Full-Stacked Parallax Card Component
 * Optimized for "True Stacking" where cards cover each other completely.
 */
function Card({ i, title, description, imageSrc, imageAlt, link, progress, range, targetScale }: CardProps) {
    const container = useRef(null);
    const { scrollYProgress } = useScroll({
        target: container,
        offset: ['start end', 'start start']
    });

    const imageScale = useTransform(scrollYProgress, [0, 1], [1.2, 1]);
    const scale = useTransform(progress, range, [1, targetScale]);

    return (
        <div ref={container} className="h-screen flex items-center justify-center sticky top-0 px-4 md:px-0">
            <motion.div
                style={{
                    scale,
                    // One card fully over the other (no offset, just stacking)
                    top: `calc(-2vh)`,
                    borderRadius: 'var(--radius-s)'
                }}
                className={cn(
                    "relative h-[500px] w-full max-w-5xl p-4 flex flex-col md:flex-row gap-8 origin-top bg-white border-gray-thin overflow-hidden"
                )}
            >
                {/* Content Section (Left) */}
                <div className="flex-1 p-10 md:p-16 flex flex-col justify-center">
                    <div>
                        <span
                            className="mb-4 block uppercase tracking-widest"
                            style={{ color: 'var(--color-black-lighter)', fontSize: 'var(--font-size-xs)', fontWeight: 'var(--font-weight-black)', opacity: 0.5 }}
                        >
                            Case Study 0{i + 1}
                        </span>
                        <h2
                            className="mb-6"
                            style={{ color: 'var(--color-black)', fontSize: 'var(--font-size-4xl)', fontWeight: 'var(--font-weight-extrabold)' }}
                        >
                            {title}
                        </h2>
                        <p
                            className="leading-relaxed mb-8"
                            style={{ color: 'var(--color-black-lighter)', fontSize: 'var(--font-size-base)', fontWeight: 'var(--font-weight-medium)', opacity: 0.7 }}
                        >
                            {description}
                        </p>
                    </div>

                    <div>
                        <a
                            href={link}
                            className="btn-primary btn-lg btn-pill inline-flex items-center justify-center px-10"
                        >
                            Read Full Story
                        </a>
                    </div>
                </div>

                {/* Image Section (Right) */}
                <div
                    className="flex-[0.8] relative overflow-hidden bg-zinc-100 img-soft border-none"
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
            </motion.div>
        </div>
    );
}

/**
 * Full Stack Parallax Cards Section (Basebox Style)
 */
export function CardStackParallax() {
    const container = useRef(null);
    const { scrollYProgress } = useScroll({
        target: container,
        offset: ['start start', 'end end']
    });

    return (
        <div className="w-full bg-background text-foreground">
            <main ref={container} className="relative">
                {SETTINGS.projects.map((project, i) => {
                    // Slight scale down for cards in the background to create depth
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
        </div>
    );
}
