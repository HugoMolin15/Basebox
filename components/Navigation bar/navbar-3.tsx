'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Box } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ImagePrimitive } from '@/components/Media/image-primitive';

/**
 * CONFIGURATION FIRST
 * Centralized settings for easy modification.
 */
const SETTINGS = {
    brand: {
        name: "BASEBOX"
    },
    navItems: [
        { label: "Technology", href: "#" },
        { label: "Company", href: "#" },
        { label: "Careers", href: "#" },
        { label: "Journal", href: "#" },
        { label: "Beta", href: "#" }
    ],
    feature: {
        imageSrc: "https://i.pinimg.com/736x/69/eb/fc/69ebfc2cd709e990ca88b6f343945ae5.jpg", // Fallback
        imageAlt: "Robotics Showcase"
    }
};

export function Navbar3() {
    const [isOpen, setIsOpen] = useState(false);
    const [isHoveringCard, setIsHoveringCard] = useState(false);

    // Lock body scroll only when the card is open AND hovered
    useEffect(() => {
        if (isOpen && isHoveringCard) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen, isHoveringCard]);

    return (
        <div className="w-full relative flex flex-col items-center">
            {/* Expanding Card Container */}
            <motion.nav
                layout
                initial={false}
                transition={{
                    type: "spring",
                    stiffness: 220,
                    damping: 28,
                    mass: 0.8
                }}
                className={cn(
                    "fixed top-6 md:top-12 z-[100] w-[92%] overflow-hidden border-gray-thin bg-white/90 backdrop-blur-xl",
                    isOpen
                        ? "md:w-[1100px] p-8 md:p-14 h-auto"
                        : "md:w-[850px] rounded-full h-16 px-10 flex items-center justify-between"
                )}
                style={{ borderRadius: isOpen ? 'var(--radius-s)' : '' }}
            >
                {/* Header (Always visible, expands/contracts) */}
                <motion.div
                    layout
                    className={cn(
                        "flex items-center justify-between",
                        isOpen ? "w-full mb-16" : "w-full"
                    )}
                >
                    <motion.div layout className="flex items-center cursor-pointer group/logo">
                        <Box
                            className="size-6 transition-all duration-300 group-hover/logo:scale-110 group-hover/logo:rotate-12"
                            style={{ color: 'var(--color-black)' }}
                        />
                    </motion.div>

                    {/* Toggle Button */}
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="relative z-[110] size-12 flex flex-col items-center justify-center cursor-pointer group"
                    >
                        <div className="flex flex-col gap-[7px] items-end">
                            <motion.div
                                animate={isOpen ? { rotate: 45, y: 9, width: 24 } : { rotate: 0, y: 0, width: 28 }}
                                transition={{ duration: 0.3 }}
                                className="h-[2px] rounded-full transition-colors bg-[var(--color-black)] group-hover:bg-[var(--color-brand-normal)]"
                                style={{}}
                            />
                            <motion.div
                                animate={isOpen ? { rotate: -45, y: -1, width: 24 } : { rotate: 0, y: 0, width: 20 }}
                                transition={{ duration: 0.3 }}
                                className="h-[2px] rounded-full transition-colors bg-[var(--color-black)] group-hover:bg-[var(--color-brand-normal)]"
                                style={{}}
                            />
                        </div>
                    </button>
                </motion.div>

                {/* Content Section (Open State) */}
                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            layout
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 10, transition: { duration: 0.2 } }}
                            onMouseEnter={() => setIsHoveringCard(true)}
                            onMouseLeave={() => setIsHoveringCard(false)}
                            className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start max-h-[85vh] overflow-y-auto custom-scrollbar pr-2"
                        >
                            {/* Nav Links Column */}
                            <div className="flex flex-col gap-4">
                                {SETTINGS.navItems.map((item, idx) => (
                                    <motion.a
                                        key={idx}
                                        href={item.href}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.1 + idx * 0.05 }}
                                        className="tracking-tight transition-colors text-[var(--color-black)] hover:text-[var(--color-brand-normal)]"
                                        style={{ fontSize: '48px', fontWeight: 'var(--font-weight-black)' }}
                                    >
                                        {item.label}
                                    </motion.a>
                                ))}
                            </div>

                            {/* Clean Feature Image */}
                            <motion.div
                                layout
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.2 }}
                                className="relative overflow-hidden aspect-[16/10]"
                                style={{ borderRadius: 'var(--radius-s)' }}
                            >
                                <ImagePrimitive
                                    src={SETTINGS.feature.imageSrc}
                                    alt={SETTINGS.feature.imageAlt}
                                    className="w-full h-full object-cover grayscale-[0.2]"
                                    imageVariant="glass"
                                />
                                <div className="absolute inset-0 bg-black/5" />
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.nav>
        </div>
    );
}
