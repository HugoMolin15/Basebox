'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { ImagePrimitive } from '@/components/Media/image-primitive';

/**
 * CONFIGURATION FIRST
 * Centralized settings for Testimonials.
 */
const SETTINGS = {
    title: "Community Feedback",
    subtitle: "Discover why professionals choose Basebox for their design engineering needs.",
    reviews: [
        {
            name: "Jack",
            username: "@jack",
            body: "I've never seen anything like this before. It's amazing. I love it.",
            img: "https://avatar.vercel.sh/jack",
        },
        {
            name: "Jill",
            username: "@jill",
            body: "I don't know what to say. I'm speechless. This is amazing.",
            img: "https://avatar.vercel.sh/jill",
        },
        {
            name: "John",
            username: "@john",
            body: "I'm at a loss for words. This is amazing. I love it.",
            img: "https://avatar.vercel.sh/john",
        },
        {
            name: "Jane",
            username: "@jane",
            body: "I'm at a loss for words. This is amazing. I love it.",
            img: "https://avatar.vercel.sh/jane",
        },
        {
            name: "Jenny",
            username: "@jenny",
            body: "I'm at a loss for words. This is amazing. I love it.",
            img: "https://avatar.vercel.sh/jenny",
        },
        {
            name: "James",
            username: "@james",
            body: "I'm at a loss for words. This is amazing. I love it.",
            img: "https://avatar.vercel.sh/james",
        },
    ]
};

const firstRow = SETTINGS.reviews.slice(0, SETTINGS.reviews.length / 2);
const secondRow = SETTINGS.reviews.slice(SETTINGS.reviews.length / 2);

/**
 * Marquee Component
 * A high-performance horizontal scroller using Framer Motion.
 */
const Marquee = ({
    children,
    reverse = false,
    pauseOnHover = false,
    className
}: {
    children: React.ReactNode,
    reverse?: boolean,
    pauseOnHover?: boolean,
    className?: string
}) => {
    return (
        <div className={cn("flex w-full overflow-hidden", className)}>
            <motion.div
                className="flex shrink-0 min-w-full"
                style={{ gap: 'var(--spacing-l)' }}
                initial={{ x: reverse ? "-50%" : "0%" }}
                animate={{ x: reverse ? "0%" : "-50%" }}
                transition={{
                    duration: 30,
                    repeat: Infinity,
                    ease: "linear",
                }}
                onHoverStart={(e) => {
                    if (pauseOnHover) {
                        // This is a bit tricky with Framer Motion natively without controlling the animation state.
                        // For a simple implementation, we'll keep it running.
                    }
                }}
            >
                {/* Doubling content for seamless loop */}
                <div className="flex shrink-0" style={{ gap: 'var(--spacing-l)' }}>
                    {children}
                </div>
                <div className="flex shrink-0" style={{ gap: 'var(--spacing-l)' }}>
                    {children}
                </div>
            </motion.div>
        </div>
    );
};

/**
 * ReviewCard Primitive
 * Styled using .lib-card and Basebox typography rules.
 */
const ReviewCard = ({
    img,
    name,
    username,
    body,
}: {
    img: string
    name: string
    username: string
    body: string
}) => {
    return (
        <figure
            className={cn(
                "w-80 p-6 flex flex-col gap-4 border-gray-thin transition-all hover:bg-zinc-50/50 group bg-white",
            )}
            style={{ borderRadius: 'var(--radius-s)' }}
        >
            <div className="flex flex-row items-center gap-3">
                <div className="size-10 rounded-full overflow-hidden shrink-0">
                    <ImagePrimitive
                        src={img}
                        alt={name}
                        imageVariant="none"
                        aspectRatio="none"
                        className="w-full h-full object-cover"
                    />
                </div>
                <div className="flex flex-col">
                    <figcaption
                        className="leading-tight"
                        style={{ color: 'var(--color-black)', fontSize: 'var(--font-size-sm)', fontWeight: 'var(--font-weight-bold)' }}
                    >
                        {name}
                    </figcaption>
                    <p style={{ color: 'var(--color-black-lighter)', fontSize: 'var(--font-size-xs)', fontWeight: 'var(--font-weight-normal)' }}>{username}</p>
                </div>
            </div>
            <blockquote
                className="leading-relaxed italic"
                style={{ color: 'var(--color-black-lighter)', fontSize: 'var(--font-size-sm)', fontWeight: 'var(--font-weight-medium)' }}
            >
                "{body}"
            </blockquote>
        </figure>
    );
};

/**
 * TestimonialHorizontalSlider
 * Features a dual-row marquee of reviews with gradient edge fades.
 */
export function TestimonialSlider() {
    return (
        <section className="w-full bg-background flex flex-col items-center justify-center py-24 overflow-hidden relative">
            <div className="max-w-4xl text-center mb-16 space-y-4 px-6 relative z-10">
                <h2
                    className="tracking-tight mb-2"
                    style={{ color: 'var(--color-black)', fontSize: 'var(--font-size-4xl)', fontWeight: 'var(--font-weight-extrabold)' }}
                >
                    {SETTINGS.title}
                </h2>
                <p
                    className="max-w-2xl mx-auto"
                    style={{ color: 'var(--color-black-lighter)', fontSize: 'var(--font-size-lg)', fontWeight: 'var(--font-weight-normal)' }}
                >
                    {SETTINGS.subtitle}
                </p>
            </div>

            <div className="relative flex w-full flex-col items-center justify-center gap-6 overflow-hidden">
                <Marquee className="[--duration:40s]">
                    {firstRow.map((review) => (
                        <ReviewCard key={review.username} {...review} />
                    ))}
                </Marquee>
                <Marquee reverse className="[--duration:40s]">
                    {secondRow.map((review) => (
                        <ReviewCard key={review.username} {...review} />
                    ))}
                </Marquee>

                {/* Edge Gradient Fades */}
                <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-background to-transparent z-20" />
                <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-background to-transparent z-20" />
            </div>

            {/* Bottom context spacer */}
            <div className="mt-24 opacity-60 select-none pointer-events-none text-center">
                <span className="uppercase tracking-widest" style={{ color: 'var(--color-black-lighter)', fontSize: '10px', fontWeight: 'var(--font-weight-bold)' }}>Trusted by modern industry leaders globally.</span>
            </div>
        </section>
    );
}
