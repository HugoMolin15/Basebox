'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ImagePrimitive } from '@/components/Media/image-primitive';
import { cn } from '@/lib/utils';

export interface ImageSelector1Feature {
    id: number;
    title: string;
    description: string;
    imageSrc: string;
}

export interface ImageSelector1Props {
    features?: ImageSelector1Feature[];
    className?: string;
}

const defaultFeatures: ImageSelector1Feature[] = [
    {
        id: 1,
        title: 'Outdoor Unit',
        description: 'Houses the compressor, condenser coil, and reversing valve, typically located outside the building for heat exchange.',
        imageSrc: 'https://i.pinimg.com/1200x/80/3c/c2/803cc24726e912cfdcf79e9b80a60ff0.jpg',
    },
    {
        id: 2,
        title: 'Indoor Unit',
        description: 'The heat pump component responsible for distributing conditioned air throughout the living or working space.',
        imageSrc: 'https://i.pinimg.com/1200x/2e/fc/7f/2efc7f0c0d539654cb0e52ca392db7bd.jpg',
    },
    {
        id: 3,
        title: 'Ducted Indoor Unit',
        description: 'Distribute conditioned air throughout buildings via a network of ducts, ensuring consistent and efficient climate control.',
        imageSrc: 'https://i.pinimg.com/1200x/4e/69/eb/4e69eb837afae4cf69e2a929a2e984e6.jpg',
    }
];

export function ImageSelector1({
    features = defaultFeatures,
    className
}: ImageSelector1Props) {
    const [activeIndex, setActiveIndex] = useState(0);

    return (
        <section className={cn("w-full py-24 bg-background", className)}>
            <div className="max-w-7xl mx-auto px-6">
                <div
                    className="flex flex-col lg:flex-row items-stretch"
                    style={{ gap: 'var(--spacing-l)' }}
                >

                    {/* Left Side: Images */}
                    <div
                        className="w-full lg:w-1/2 relative min-h-[400px] lg:min-h-[550px] overflow-hidden"
                        style={{ borderRadius: 'var(--radius-s)' }}
                    >
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeIndex}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                transition={{ duration: 0.4, ease: "easeInOut" }}
                                className="absolute inset-0"
                            >
                                <ImagePrimitive
                                    src={features[activeIndex].imageSrc}
                                    alt={features[activeIndex].title}
                                    imageVariant="none"
                                    aspectRatio="none"
                                    className="w-full h-full object-cover"
                                    style={{ borderRadius: 'var(--radius-s)' }}
                                />
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    {/* Right Side: Selection */}
                    <div className="w-full lg:w-1/2 flex flex-col justify-center gap-4 p-4 lg:pl-12">
                        {features.map((feature, index) => {
                            const isActive = activeIndex === index;
                            return (
                                <button
                                    key={feature.id}
                                    onClick={() => setActiveIndex(index)}
                                    className={cn(
                                        "text-left p-6 transition-all duration-300 cursor-pointer group border-gray-thin bg-white",
                                        isActive
                                            ? "ring-1"
                                            : "hover:bg-zinc-100/50 hover:opacity-80"
                                    )}
                                    style={{
                                        borderRadius: 'var(--radius-s)',
                                        borderColor: isActive ? 'var(--color-brand-normal)' : undefined,
                                        boxShadow: isActive ? '0 0 0 1px var(--color-brand-normal)' : undefined
                                    }}
                                >
                                    <h4
                                        className="mb-2 transition-colors"
                                        style={{ color: 'var(--color-black)', fontSize: 'var(--font-size-base)', fontWeight: 'var(--font-weight-bold)' }}
                                    >
                                        {feature.title}
                                    </h4>
                                    <p
                                        className="leading-relaxed transition-colors"
                                        style={{ color: 'var(--color-black-lighter)', fontSize: 'var(--font-size-sm)', fontWeight: 'var(--font-weight-normal)' }}
                                    >
                                        {feature.description}
                                    </p>
                                </button>
                            );
                        })}
                    </div>

                </div>
            </div>
        </section>
    );
}
