'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { ImagePrimitive } from '@/components/Media/image-primitive';
import { LucideIcon, Fingerprint, Gavel, Brain, Plus, Minus } from 'lucide-react';

export interface ImageSelector2Item {
    id: number;
    title: string;
    description: string;
    icon: LucideIcon;
    imageSrc: string;
}

export interface ImageSelector2Props {
    tag?: string;
    title?: string | React.ReactNode;
    description?: string;
    ctaText?: string;
    items?: ImageSelector2Item[];
    className?: string;
}

const defaultItems: ImageSelector2Item[] = [
    {
        id: 1,
        title: "Deepfake Forensics",
        description: "Advanced pixel-level analysis to distinguish between authentic media and AI-generated fabrications in real-time.",
        icon: Fingerprint,
        imageSrc: "https://i.pinimg.com/1200x/f2/07/0c/f2070ca40e6b6106386849db1044c9d0.jpg",
    },
    {
        id: 2,
        title: "Automated Takedowns",
        description: "Instant API integration with major social platforms to flag and remove infringing synthetic content before it trends.",
        icon: Gavel,
        imageSrc: "https://i.pinimg.com/1200x/ba/b4/a8/bab4a80dd3f989ca4fa305944639812d.jpg",
    },
    {
        id: 3,
        title: "Cognitive Security",
        description: "Analyze the sentiment and rhetoric of AI-driven bot swarms to predict and neutralize coordinated brand attacks.",
        icon: Brain,
        imageSrc: "https://i.pinimg.com/1200x/39/fa/62/39fa62821f86b475f8faed3ab38cb124.jpg",
    }
];

export function ImageSelector2({
    tag = "Neural Defense",
    title = <>Securing truth in a <br /> <span className="text-muted-foreground">world of synthetic</span> <br /> <span className="text-muted-foreground">deception</span></>,
    description = "The line between human and machine blurs. Basebox provides the cryptographic proof of authenticity for the modern web.",
    ctaText = "Initialize Defense",
    items = defaultItems,
    className
}: ImageSelector2Props) {
    const [activeIndex, setActiveIndex] = useState(0);

    return (
        <section className={cn("w-full py-24 bg-background", className)}>
            <div
                className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 items-stretch"
                style={{ gap: 'var(--spacing-l)' }}
            >

                {/* Left Side: Header & Accordion */}
                <div className="flex flex-col p-4 lg:p-12">
                    <div className="mb-12">
                        {tag && (
                            <div className="flex justify-start mb-6">
                                <span
                                    className="px-3 py-1 rounded-md uppercase tracking-widest shadow-sm border block w-fit"
                                    style={{
                                        backgroundColor: 'color-mix(in srgb, var(--color-brand-normal) 10%, transparent)',
                                        borderColor: 'color-mix(in srgb, var(--color-brand-normal) 20%, transparent)',
                                        color: 'var(--color-brand-normal)',
                                        fontSize: '10px',
                                        fontWeight: 'var(--font-weight-bold)'
                                    }}
                                >
                                    {tag}
                                </span>
                            </div>
                        )}

                        <h2
                            className="mb-6"
                            style={{ color: 'var(--color-black)', fontSize: 'var(--font-size-4xl)', fontWeight: 'var(--font-weight-extrabold)' }}
                        >
                            {title}
                        </h2>

                        <p
                            className="mb-8 leading-relaxed max-w-sm"
                            style={{ color: 'var(--color-black-lighter)', fontSize: 'var(--font-size-base)', fontWeight: 'var(--font-weight-normal)' }}
                        >
                            {description}
                        </p>

                        <button className="btn-primary btn-lg btn-pill w-fit">
                            {ctaText}
                        </button>
                    </div>

                    {/* Accordion Logic */}
                    <div className="w-full">
                        {items.map((item, index) => {
                            const isActive = activeIndex === index;
                            const Icon = item.icon;

                            return (
                                <div
                                    key={index}
                                    className="w-full py-6 transition-all cursor-pointer group"
                                    onClick={() => setActiveIndex(index)}
                                >
                                    <div className="flex items-center gap-5">
                                        <div
                                            className="transition-colors duration-300 group-hover:[color:var(--color-brand-normal)]"
                                            style={{ color: isActive ? 'var(--color-brand-normal)' : 'var(--color-black-lighter)' }}
                                        >
                                            <Icon size={20} strokeWidth={isActive ? 2.5 : 2} />
                                        </div>

                                        <h3
                                            className="transition-colors"
                                            style={{
                                                color: isActive ? 'var(--color-black)' : 'var(--color-black-lighter)',
                                                fontSize: 'var(--font-size-base)',
                                                fontWeight: 'var(--font-weight-bold)'
                                            }}
                                        >
                                            {item.title}
                                        </h3>

                                        <div className="ml-auto transition-transform duration-300 group-hover:[color:var(--color-brand-normal)]" style={{ color: isActive ? 'var(--color-black)' : 'rgba(0,0,0,0.2)' }}>
                                            {isActive ? (
                                                <motion.div initial={{ rotate: -90 }} animate={{ rotate: 0 }}>
                                                    <Minus size={18} />
                                                </motion.div>
                                            ) : (
                                                <Plus size={18} />
                                            )}
                                        </div>
                                    </div>

                                    <AnimatePresence initial={false}>
                                        {isActive && (
                                            <motion.div
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: "auto", opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
                                                className="overflow-hidden"
                                            >
                                                <p
                                                    className="leading-relaxed max-w-sm pt-5 pl-[42px]"
                                                    style={{ color: 'var(--color-black-lighter)', fontSize: 'var(--font-size-sm)', fontWeight: 'var(--font-weight-normal)' }}
                                                >
                                                    {item.description}
                                                </p>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Right Side: Visual Display */}
                <div
                    className="relative aspect-[4/5] lg:h-auto w-full overflow-hidden"
                    style={{ borderRadius: 'var(--radius-s)' }}
                >
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeIndex}
                            initial={{ opacity: 0, scale: 1.05 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.5, ease: "easeOut" }}
                            className="absolute inset-0"
                        >
                            <ImagePrimitive
                                src={items[activeIndex].imageSrc}
                                alt={items[activeIndex].title}
                                imageVariant="none"
                                aspectRatio="none"
                                className="w-full h-full object-cover"
                                style={{ borderRadius: 'var(--radius-s)' }}
                            />
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>
        </section>
    );
}
