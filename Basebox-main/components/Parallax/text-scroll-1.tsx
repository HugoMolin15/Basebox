'use client';

import React, { useRef } from 'react';
import { useScroll, useTransform, motion, MotionValue } from 'framer-motion';
import { ImagePrimitive } from '@/components/Media/image-primitive';
import { cn } from '@/lib/utils';
import { ArrowUpRight } from 'lucide-react';

/**
 * CONFIGURATION FIRST
 * All changeable text, links, and image URLs MUST be defined in a const SETTINGS = {} object at the top.
 */
const SETTINGS = {
    title: "Dynamic Text Parallax",
    subtitle: "A smooth, horizontal scrolling text effect with integrated imagery.",
    slides: [
        {
            text: "Front End Developer",
            image: "https://i.pinimg.com/1200x/f2/07/0c/f2070ca40e6b6106386849db1044c9d0.jpg",
            direction: "left",
            left: "-5%"
        },
        {
            text: "UI/UX Designer",
            image: "https://i.pinimg.com/1200x/39/fa/62/39fa62821f86b475f8faed3ab38cb124.jpg",
            direction: "right",
            left: "-25%"
        },
        {
            text: "Creative Engineering",
            image: "https://i.pinimg.com/1200x/b1/1f/ec/b11fec719d9329e484e888ce13519bed.jpg",
            direction: "left",
            left: "-15%"
        }
    ]
};

interface PhraseProps {
    text: string;
    image: string;
}

const Phrase = ({ text, image }: PhraseProps) => {
    return (
        <div className="px-8 flex gap-8 items-center">
            <p
                className="text-[8vw] uppercase tracking-tighter whitespace-nowrap leading-none"
                style={{ color: 'var(--color-black)', fontWeight: 'var(--font-weight-black)' }}
            >
                {text}
            </p>
            <div
                className="relative h-[8vw] aspect-[2.5/1] overflow-hidden"
                style={{ borderRadius: 'var(--radius-s)' }}
            >
                <ImagePrimitive
                    src={image}
                    alt={text}
                    className="w-full h-full object-cover"
                    imageVariant="soft"
                    aspectRatio="none"
                />
            </div>
        </div>
    );
};

interface SlideProps {
    text: string;
    image: string;
    direction: 'left' | 'right';
    left: string;
    progress: MotionValue<number>;
}

const Slide = ({ text, image, direction, left, progress }: SlideProps) => {
    const dir = direction === 'left' ? -1 : 1;
    // Map the scroll progress [0, 1] to a translation range
    const translateX = useTransform(progress, [0, 1], [300 * dir, -300 * dir]);

    return (
        <motion.div
            style={{ x: translateX, left }}
            className="relative flex whitespace-nowrap py-4"
        >
            <Phrase text={text} image={image} />
            <Phrase text={text} image={image} />
            <Phrase text={text} image={image} />
        </motion.div>
    );
};

/**
 * Text Parallax Scroll Component
 */
export function TextParallaxScroll() {
    const container = useRef(null);
    const { scrollYProgress } = useScroll({
        target: container,
        offset: ['start end', 'end start']
    });

    return (
        <div className="w-full min-h-screen bg-white overflow-hidden">
            {/* Introductory Header */}
            <div className="h-[40vh] flex flex-col items-center justify-center text-center px-6">
                <span
                    className="mb-4 tracking-[0.3em] uppercase"
                    style={{ color: 'var(--color-black-lighter)', fontSize: 'var(--font-size-xs)', fontWeight: 'var(--font-weight-black)', opacity: 0.5 }}
                >
                    Interactive Motion
                </span>
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

            {/* Parallax Content Section */}
            <main ref={container} className="relative flex flex-col gap-8 md:gap-12 py-20 bg-white">
                {SETTINGS.slides.map((slide, i) => (
                    <Slide
                        key={i}
                        {...(slide as any)}
                        progress={scrollYProgress}
                    />
                ))}
            </main>

            {/* Outro context spacer */}
            <div className="h-[60vh] flex flex-col items-center justify-center p-12">
                <div className="max-w-2xl text-center">
                    <h2
                        className="mb-6 leading-tight"
                        style={{ color: 'var(--color-black)', fontSize: 'var(--font-size-4xl)', fontWeight: 'var(--font-weight-extrabold)' }}
                    >
                        Experience smooth, high-performance web animations.
                    </h2>
                    <p
                        className="mb-10 leading-relaxed"
                        style={{ color: 'var(--color-black-lighter)', fontSize: 'var(--font-size-lg)', fontWeight: 'var(--font-weight-medium)', opacity: 0.7 }}
                    >
                        Built with Framer Motion and Next.js, this effect combines typography
                        and imagery into a seamless interactive experience that responds to user scroll.
                    </p>
                    <button className="btn-primary btn-lg btn-pill inline-flex items-center justify-center px-10">
                        View Documentation
                    </button>
                </div>
            </div>
        </div>
    );
}
