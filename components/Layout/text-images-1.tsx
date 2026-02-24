"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { Plus, Minus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { ImagePrimitive } from '@/components/Media/image-primitive';

/**
 * SETTINGS
 * Configuration for all text, links, and image fallbacks.
 */
const SETTINGS = {
    header: {
        title: "Ada ACX: The AI customer experience operating model",
        description: "Power personalized customer experiences, maximize business impact, and scale AI agent performance across the enterprise",
    },
    cards: [
        {
            id: "platform",
            title: "ACX Platform",
            description: "Guided by thousands of deployments and millions of conversations, the ACX Platform helps you scale from cost savings to customer lifetime value",
            image: { src: "https://i.pinimg.com/1200x/f2/07/0c/f2070ca40e6b6106386849db1044c9d0.jpg", alt: "ACX Platform" },
        },
        {
            id: "practice",
            title: "ACX Practice",
            description: "Guided by thousands of deployments and millions of conversations, the ACX Practice helps you scale from cost savings to customer lifetime value",
            image: { src: "https://i.pinimg.com/1200x/39/fa/62/39fa62821f86b475f8faed3ab38cb124.jpg", alt: "ACX Practice" },
        },
        {
            id: "experts",
            title: "ACX Experts",
            description: "Guided by thousands of deployments and millions of conversations, the ACX Experts helps you scale from cost savings to customer lifetime value",
            image: { src: "https://i.pinimg.com/1200x/b1/1f/ec/b11fec719d9329e484e888ce13519bed.jpg", alt: "ACX Experts" },
        },
    ],
};

/**
 * Animation Variants for synchronized motion
 */
const animConfig = {
    transition: {
        duration: 0.6
    }
};

export function TextImages1() {
    return (
        <section className="w-full bg-white py-14 md:py-20 lg:py-24 px-6 md:px-12 flex flex-col items-center">
            <div className="max-w-7xl w-full">
                {/* Header Section */}
                <div className="text-center mb-10 md:mb-16 lg:mb-24">
                    <h2
                        className="tracking-tighter mx-auto leading-tight"
                        style={{ color: 'var(--color-black)', fontSize: 'var(--font-size-5xl)', fontWeight: 'var(--font-weight-black)' }}
                    >
                        {SETTINGS.header.title}
                    </h2>
                    <p
                        className="mt-4 md:mt-6 lg:mt-8 mx-auto leading-relaxed"
                        style={{ color: 'var(--color-black-lighter)', fontSize: 'var(--font-size-base)', fontWeight: 'var(--font-weight-normal)' }}
                    >
                        {SETTINGS.header.description}
                    </p>
                </div>

                {/* Interactive Image Grid */}
                <div
                    className="grid grid-cols-1 md:grid-cols-3"
                    style={{ gap: 'var(--spacing-l)' }}
                >
                    {SETTINGS.cards.map((card) => (
                        <CardItem key={card.id} card={card} />
                    ))}
                </div>
            </div>
        </section>
    );
}

function CardItem({ card }: { card: typeof SETTINGS.cards[0] }) {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <motion.div
            className="relative aspect-[3/4] overflow-hidden cursor-pointer transform-gpu"
            style={{ borderRadius: 'var(--radius-s)' }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            initial={false}
        >
            {/* Image Layer */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                <ImagePrimitive
                    src={card.image.src}
                    alt={card.image.alt}
                    aspectRatio="none"
                    imageVariant="none"
                    className="w-full h-full"
                    imageClassName="w-full h-full object-cover"
                    style={{ borderRadius: 'var(--radius-s)' }}
                />

                {/* Hover States: Darkening & Zoom */}
                <motion.div
                    className="absolute inset-0 bg-black/40 backdrop-blur-[1px] z-10"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: isHovered ? 1 : 0 }}
                    transition={{ duration: 0.4 }}
                />
            </div>

            {/* Persistent Gradient Overlay */}
            <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/80 via-black/30 to-transparent z-20 pointer-events-none" />

            {/* Card Content Interior */}
            <div className="absolute inset-0 p-6 md:p-8 lg:p-10 flex flex-col justify-end z-30">
                <motion.div
                    layout
                    transition={animConfig.transition}
                    className="w-full flex flex-col"
                >
                    <div className="flex items-center justify-between gap-4">
                        <motion.h3
                            layout
                            transition={animConfig.transition}
                            className="tracking-tight"
                            style={{ color: 'var(--color-white)', fontSize: 'var(--font-size-2xl)', fontWeight: 'var(--font-weight-bold)' }}
                        >
                            {card.title}
                        </motion.h3>

                        <motion.div
                            layout
                            transition={animConfig.transition}
                            className="w-8 h-8 md:w-9 md:h-9 lg:w-10 lg:h-10 rounded-full flex items-center justify-center text-white shrink-0 shadow-lg border border-white/10"
                            style={{ backgroundColor: isHovered ? 'var(--color-brand-normal)' : '#1a1a1a' }}
                            animate={{ rotate: isHovered ? 180 : 0 }}
                        >
                            {isHovered ? <Minus size={16} /> : <Plus size={16} />}
                        </motion.div>
                    </div>

                    <AnimatePresence>
                        {isHovered && (
                            <motion.div
                                key="content"
                                initial={{ height: 0, opacity: 0, y: 15 }}
                                animate={{ height: 'auto', opacity: 1, y: 0 }}
                                exit={{ height: 0, opacity: 0, y: 15 }}
                                transition={animConfig.transition}
                                className="overflow-hidden"
                            >
                                <p
                                    className="leading-relaxed opacity-90 mt-3 md:mt-4 lg:mt-5 pr-10"
                                    style={{ color: 'var(--color-white-light)', fontSize: 'var(--font-size-base)', fontWeight: 'var(--font-weight-medium)' }}
                                >
                                    {card.description}
                                </p>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>
            </div>
        </motion.div>
    );
}
