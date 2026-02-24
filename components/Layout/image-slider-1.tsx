'use client';

import React, { useState, useRef } from 'react';
import { Plus, ChevronLeft, ChevronRight, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { ImagePrimitive } from '@/components/Media/image-primitive';

export interface ImageSlider1Item {
    id: number;
    title: string;
    description: string;
    details: string;
    imageSrc?: string;
}

export interface ImageSlider1Props {
    title?: string | React.ReactNode;
    items?: ImageSlider1Item[];
    className?: string;
}

const defaultItems: ImageSlider1Item[] = [
    {
        id: 1,
        title: "Integrated Precision",
        description: "Experience the ultimate convenience with our integrated grinding and brewing system. Freshly ground beans every time for the perfect cup.",
        details: "High-precision ceramic grinder with adjustable settings to match your taste profile.",
        imageSrc: "https://i.pinimg.com/1200x/f2/07/0c/f2070ca40e6b6106386849db1044c9d0.jpg"
    },
    {
        id: 2,
        title: "Automated Extraction",
        description: "Perfect pressure every time. Our automated tamping system ensures consistent extraction and rich crema without the manual effort.",
        details: "Constant 15kg pressure application for professional-grade espresso quality at home.",
        imageSrc: "https://i.pinimg.com/1200x/ba/b4/a8/bab4a80dd3f989ca4fa305944639812d.jpg"
    },
    {
        id: 3,
        title: "Aroma Profile Control",
        description: "Customize your coffee's character. Choose from three different aroma profiles to perfectly match your morning mood or afternoon break.",
        details: "Advanced water flow control system that extracts maximum flavor from every bean.",
        imageSrc: "https://i.pinimg.com/1200x/39/fa/62/39fa62821f86b475f8faed3ab38cb124.jpg"
    },
    {
        id: 4,
        title: "Space-Saving Footprint",
        description: "Sleek, modern, and space-saving. Designed to fit perfectly in any kitchen without compromising on professional performance.",
        details: "Minimal footprint with maximum efficiency. Engineered for modern living spaces.",
        imageSrc: "https://i.pinimg.com/1200x/f0/2d/6c/f02d6cd899dda88d7d59df3ad3e6c930.jpg"
    },
    {
        id: 5,
        title: "Digital Brew Guide",
        description: "Access a library of professional recipes or create your own. Your machine learns your preferences over time.",
        details: "Personalized AI feedback on every extraction to help you become a home barista.",
        imageSrc: "https://i.pinimg.com/1200x/b1/1f/ec/b11fec719d9329e484e888ce13519bed.jpg"
    },
    {
        id: 6,
        title: "Sustainable Sourcing",
        description: "Direct-to-farm traceability built into every cup. Ethical, sustainable, and transparent flavor you can trust.",
        details: "Blockchain-verified supply chain ensures every bean is ethically produced.",
        imageSrc: "https://i.pinimg.com/1200x/f0/2d/6c/f02d6cd899dda88d7d59df3ad3e6c930.jpg"
    }
];

export function ImageSlider1({
    title = <>Make every moment perfect. <br /> Compact, easy, and built for your daily brew.</>,
    items = defaultItems,
    className
}: ImageSlider1Props) {
    const [openId, setOpenId] = useState<number | null>(null);
    const scrollRef = useRef<HTMLDivElement>(null);

    const scroll = (direction: 'left' | 'right') => {
        if (scrollRef.current) {
            const { scrollLeft, clientWidth } = scrollRef.current;
            const scrollAmount = clientWidth * 0.4;
            const newScrollLeft = direction === 'left' ? scrollLeft - scrollAmount : scrollLeft + scrollAmount;

            scrollRef.current.scrollTo({
                left: newScrollLeft,
                behavior: 'smooth'
            });
        }
    };

    return (
        <section className={cn("w-full bg-background flex flex-col py-24 overflow-hidden", className)}>
            {/* Header stays constrained */}
            <div className="max-w-7xl mx-auto w-full px-8 md:px-12 mb-12">
                <h2
                    className="max-w-3xl leading-tight"
                    style={{ color: 'var(--color-black)', fontSize: 'var(--font-size-4xl)', fontWeight: 'var(--font-weight-extrabold)' }}
                >
                    {title}
                </h2>
            </div>

            {/* Scroll Area constrained and rounded */}
            <div className="max-w-7xl mx-auto w-full px-8 md:px-12">
                <div
                    className="relative w-full overflow-hidden"
                    style={{ borderRadius: 'var(--radius-s)' }}
                >
                    {/* Left Fade */}
                    <div className="absolute left-0 top-0 bottom-12 w-12 md:w-24 bg-gradient-to-r from-background via-background/50 to-transparent z-20 pointer-events-none" />

                    <div
                        ref={scrollRef}
                        className="flex-grow relative flex items-center overflow-x-auto no-scrollbar pb-12 scroll-smooth"
                        style={{ gap: 'var(--spacing-l)' }}
                    >
                        {items.map((item) => (
                            <div
                                key={item.id}
                                className="flex-shrink-0 w-[320px] md:w-[450px] h-[550px] relative group cursor-default overflow-hidden"
                                style={{ borderRadius: 'var(--radius-s)' }}
                            >
                                {/* Image System */}
                                <ImagePrimitive
                                    src={item.imageSrc || "https://i.pinimg.com/1200x/f2/07/0c/f2070ca40e6b6106386849db1044c9d0.jpg"}
                                    imageVariant="none"
                                    aspectRatio="none"
                                    className="absolute inset-0 w-full h-full"
                                    style={{ borderRadius: 'var(--radius-s)' }}
                                />

                                {/* Bottom Bar */}
                                <div className="absolute bottom-0 inset-x-0 p-8 flex items-center justify-between bg-gradient-to-t from-black/60 via-black/20 to-transparent pointer-events-none z-10">
                                    <span style={{ color: 'var(--color-white)', fontSize: 'var(--font-size-lg)', fontWeight: 'var(--font-weight-bold)' }}>{item.title}</span>
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setOpenId(item.id);
                                        }}
                                        className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30 text-white cursor-pointer hover:bg-white hover:text-black transition-all duration-300 pointer-events-auto active:scale-90"
                                    >
                                        <Plus className="w-5 h-5" />
                                    </button>
                                </div>

                                {/* Glassmorphism Overlay */}
                                <AnimatePresence>
                                    {openId === item.id && (
                                        <motion.div
                                            initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
                                            animate={{ opacity: 1, backdropFilter: "blur(24px)" }}
                                            exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
                                            transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
                                            className="absolute inset-0 z-30 bg-black/60 p-10 flex flex-col justify-center text-white"
                                            style={{ borderRadius: 'var(--radius-s)' }}
                                        >
                                            <button
                                                onClick={() => setOpenId(null)}
                                                className="absolute top-8 right-8 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center border border-white/20 text-white cursor-pointer hover:bg-white hover:text-black transition-all active:scale-95"
                                            >
                                                <X className="w-5 h-5" />
                                            </button>

                                            <h3
                                                className="mb-4"
                                                style={{ color: 'var(--color-white)', fontSize: 'var(--font-size-xl)', fontWeight: 'var(--font-weight-bold)' }}
                                            >
                                                {item.title}
                                            </h3>
                                            <p
                                                className="leading-relaxed mb-8"
                                                style={{ color: 'var(--color-white-light)', fontSize: 'var(--font-size-base)', fontWeight: 'var(--font-weight-medium)' }}
                                            >
                                                {item.description}
                                            </p>
                                            <div className="pt-8 border-t border-white/10">
                                                <p
                                                    className="italic leading-relaxed"
                                                    style={{ color: 'rgba(255, 255, 255, 0.6)', fontSize: 'var(--font-size-sm)', fontWeight: 'var(--font-weight-medium)' }}
                                                >
                                                    {item.details}
                                                </p>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        ))}
                    </div>

                    {/* Right Fade */}
                    <div className="absolute right-0 top-0 bottom-12 w-12 md:w-24 bg-gradient-to-l from-background via-background/50 to-transparent z-20 pointer-events-none" />
                </div>
            </div>

            {/* Navigation Arrows stay constrained */}
            <div className="max-w-7xl mx-auto w-full px-8 md:px-12 mt-6 flex gap-3">
                <button
                    onClick={() => scroll('left')}
                    className="w-12 h-12 rounded-full border-gray-thin flex items-center justify-center hover:bg-zinc-50 transition-colors cursor-pointer group active:scale-95"
                >
                    <ChevronLeft size={20} className="transition-colors group-hover:text-black" style={{ color: 'var(--color-black-lighter)' }} />
                </button>
                <button
                    onClick={() => scroll('right')}
                    className="w-12 h-12 rounded-full border-gray-thin flex items-center justify-center hover:bg-zinc-50 transition-colors cursor-pointer group active:scale-95"
                >
                    <ChevronRight size={20} className="transition-colors group-hover:text-black" style={{ color: 'var(--color-black-lighter)' }} />
                </button>
            </div>

            <style jsx>{`
                .no-scrollbar::-webkit-scrollbar {
                    display: none;
                }
                .no-scrollbar {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }
            `}</style>
        </section>
    );
}
