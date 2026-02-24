'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useScroll, motion, useTransform, MotionValue } from 'framer-motion';
import { cn } from '@/lib/utils';
import { ImagePrimitive } from '@/components/Media/image-primitive';

/**
 * CONFIGURATION FIRST
 * All changeable text, links, and image URLs MUST be defined in a const SETTINGS = {} object at the top.
 */
const SETTINGS = {
    title: "Smooth Parallax Gallery",
    subtitle: "A multi-column vertical scroll effect with varying speeds.",
    images: [
        { src: "https://i.pinimg.com/1200x/f2/07/0c/f2070ca40e6b6106386849db1044c9d0.jpg", alt: "Architecture study 1" },
        { src: "https://i.pinimg.com/1200x/39/fa/62/39fa62821f86b475f8faed3ab38cb124.jpg", alt: "Coastal landscape" },
        { src: "https://i.pinimg.com/1200x/b1/1f/ec/b11fec719d9329e484e888ce13519bed.jpg", alt: "Minimalist interior" },
        { src: "https://i.pinimg.com/1200x/79/ff/17/79ff17f6e2b2f8385ff63985e9fccbdb.jpg", alt: "Urban geometry" },
        { src: "https://i.pinimg.com/1200x/f2/07/0c/f2070ca40e6b6106386849db1044c9d0.jpg", alt: "Nature detail" },
        { src: "https://i.pinimg.com/1200x/39/fa/62/39fa62821f86b475f8faed3ab38cb124.jpg", alt: "Modern pavilion" },
        { src: "https://i.pinimg.com/1200x/b1/1f/ec/b11fec719d9329e484e888ce13519bed.jpg", alt: "Desert textures" },
        { src: "https://i.pinimg.com/1200x/79/ff/17/79ff17f6e2b2f8385ff63985e9fccbdb.jpg", alt: "Skyscraper perspective" },
        { src: "https://i.pinimg.com/1200x/f2/07/0c/f2070ca40e6b6106386849db1044c9d0.jpg", alt: "Forest light" },
        { src: "https://i.pinimg.com/1200x/39/fa/62/39fa62821f86b475f8faed3ab38cb124.jpg", alt: "Concrete form" },
        { src: "https://i.pinimg.com/1200x/b1/1f/ec/b11fec719d9329e484e888ce13519bed.jpg", alt: "Alpine lake" },
        { src: "https://i.pinimg.com/1200x/79/ff/17/79ff17f6e2b2f8385ff63985e9fccbdb.jpg", alt: "Abstract shadow" },
    ]
};

interface ColumnProps {
    images: { src: string; alt: string }[];
    y: MotionValue<number>;
    className?: string;
}

/**
 * Parallax Column Component
 */
const Column = ({ images, y, className }: ColumnProps) => {
    return (
        <motion.div
            style={{ y }}
            className={cn(
                "relative h-full w-full md:w-1/4 min-w-[250px] flex flex-col items-center",
                "gap-(--spacing-library-gap)",
                className
            )}
        >
            {images.map((img, i) => (
                <div
                    key={i}
                    className={cn(
                        "relative w-full h-full aspect-[4/5] overflow-hidden",
                        "img-soft" // Global primitive for image containers
                    )}
                    style={{ borderRadius: 'var(--radius-s)' }}
                >
                    <ImagePrimitive
                        src={img.src}
                        alt={img.alt}
                        imageVariant="soft"
                        className="w-full h-full object-cover"
                    />
                </div>
            ))}
        </motion.div>
    );
};

/**
 * Smooth Multi-Column Parallax Scroll Section
 */
export function SmoothParallaxScroll() {
    const galleryContainer = useRef(null);
    const [dimension, setDimension] = useState({ width: 0, height: 0 });

    const { scrollYProgress } = useScroll({
        target: galleryContainer,
        offset: ['start end', 'end start']
    });

    const { height } = dimension;

    // Different scroll speeds for each column
    const y1 = useTransform(scrollYProgress, [0, 1], [0, height * 2]);
    const y2 = useTransform(scrollYProgress, [0, 1], [0, height * 3.3]);
    const y3 = useTransform(scrollYProgress, [0, 1], [0, height * 1.25]);
    const y4 = useTransform(scrollYProgress, [0, 1], [0, height * 3]);

    useEffect(() => {
        const resize = () => {
            setDimension({ width: window.innerWidth, height: window.innerHeight });
        };

        window.addEventListener("resize", resize);
        resize();

        return () => {
            window.removeEventListener("resize", resize);
        };
    }, []);

    const imgs = SETTINGS.images;

    return (
        <div className="w-full min-h-screen bg-background">
            {/* Introductory Header */}
            <header className="h-[50vh] flex flex-col items-center justify-center text-center px-6">
                <h1
                    className="mb-4"
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
                <div
                    className="mt-12 w-8 h-12 border-gray-thin rounded-full flex items-start justify-center p-2"
                >
                    <motion.div
                        animate={{ y: [0, 16, 0] }}
                        transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                        className="w-1 h-2 rounded-full"
                        style={{ backgroundColor: 'var(--color-white-dark)' }}
                    />
                </div>
            </header>

            {/* Parallax Gallery Container */}
            <div
                ref={galleryContainer}
                className="relative h-[175vh] flex gap-(--spacing-library-gap) p-(--spacing-library-gap) box-border overflow-hidden bg-zinc-50"
            >
                <Column images={[imgs[0], imgs[1], imgs[2]]} y={y1} className="-top-[45%]" />
                <Column images={[imgs[3], imgs[4], imgs[5]]} y={y2} className="-top-[95%]" />
                <Column images={[imgs[6], imgs[7], imgs[8]]} y={y3} className="-top-[45%]" />
                <Column images={[imgs[9], imgs[10], imgs[11]]} y={y4} className="-top-[75%]" />
            </div>

            {/* Semantic Footer Spacer */}
            <footer className="h-screen flex items-center justify-center bg-white">
                <div className="text-center group cursor-default">
                    <span
                        className="uppercase tracking-widest transition-colors"
                        style={{ color: 'var(--color-black-lighter)', fontSize: 'var(--font-size-xs)', fontWeight: 'var(--font-weight-black)', opacity: 0.5 }}
                    >
                        Discover more inspiration below
                    </span>
                    <div className="mt-4 flex gap-2 justify-center">
                        {[1, 2, 3].map(i => (
                            <div
                                key={i}
                                className="w-1.5 h-1.5 rounded-full"
                                style={{ backgroundColor: 'var(--color-white-dark)' }}
                            />
                        ))}
                    </div>
                </div>
            </footer>
        </div>
    );
}
