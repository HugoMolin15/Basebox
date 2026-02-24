'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ImagePrimitive } from '@/components/Media/image-primitive';
import { cn } from '@/lib/utils';

export interface StepItem {
    id: number;
    number: string;
    title: string;
    description: string;
    imageSrc: string;
}

export interface AutomaticImageProps {
    steps?: StepItem[];
    autoplayDuration?: number;
    className?: string;
}

const defaultSteps: StepItem[] = [
    {
        id: 1,
        number: '01',
        title: 'Stay in the loop',
        description: 'Designed to help you manage the flow of business and personal communication.',
        imageSrc: 'https://i.pinimg.com/1200x/f2/07/0c/f2070ca40e6b6106386849db1044c9d0.jpg',
    },
    {
        id: 2,
        number: '02',
        title: 'Express yourself',
        description: 'Tailor your workspace to reflect your personality and boost your productivity.',
        imageSrc: 'https://i.pinimg.com/1200x/ba/b4/a8/bab4a80dd3f989ca4fa305944639812d.jpg',
    },
    {
        id: 3,
        number: '03',
        title: 'Get ready for the future',
        description: 'Prepare for the upcoming digital era with tools designed for the next generation of work.',
        imageSrc: 'https://i.pinimg.com/1200x/39/fa/62/39fa62821f86b475f8faed3ab38cb124.jpg',
    },
    {
        id: 4,
        number: '04',
        title: 'Align Work with Meaning',
        description: 'Connect your daily tasks to higher goals and find deeper satisfaction in your achievements.',
        imageSrc: 'https://i.pinimg.com/1200x/ba/b4/a8/bab4a80dd3f989ca4fa305944639812d.jpg',
    }
];

export function AutomaticImage({
    steps = defaultSteps,
    autoplayDuration = 4000,
    className
}: AutomaticImageProps) {
    const [activeIndex, setActiveIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveIndex((prev) => (prev + 1) % steps.length);
        }, autoplayDuration);

        return () => clearInterval(interval);
    }, [steps.length, autoplayDuration, activeIndex]);

    return (
        <section className={cn("w-full py-24 bg-background", className)}>
            <div className="max-w-7xl mx-auto px-6">
                <div
                    className="flex flex-col lg:flex-row items-stretch"
                    style={{ gap: 'var(--spacing-l)' }}
                >

                    {/* Left Side: List with Integrated Progress Bars */}
                    <div className="w-full lg:w-[450px] flex flex-col p-4 lg:p-8">
                        <div className="flex flex-col gap-4">
                            {steps.map((step, index) => {
                                const isActive = activeIndex === index;
                                return (
                                    <div
                                        key={step.id}
                                        className={cn(
                                            "relative pt-1 pb-6 transition-opacity duration-300 cursor-pointer",
                                            !isActive && "opacity-40"
                                        )}
                                        onClick={() => setActiveIndex(index)}
                                    >
                                        {/* Progress Bar Container */}
                                        <div className="absolute top-0 left-0 w-full h-[2px] bg-zinc-200/50">
                                            {isActive && (
                                                <motion.div
                                                    key={activeIndex}
                                                    className="h-full absolute top-0 left-0"
                                                    style={{ backgroundColor: 'var(--color-brand-normal)' }}
                                                    initial={{ width: 0 }}
                                                    animate={{ width: "100%" }}
                                                    transition={{ duration: autoplayDuration / 1000, ease: "linear" }}
                                                />
                                            )}
                                        </div>

                                        <div className="mt-6 flex justify-between items-baseline mb-2">
                                            <h4
                                                className=""
                                                style={{ color: 'var(--color-black)', fontSize: 'var(--font-size-base)', fontWeight: 'var(--font-weight-bold)' }}
                                            >
                                                {step.title}
                                            </h4>
                                            <span
                                                className="tabular-nums tracking-widest"
                                                style={{ color: 'var(--color-brand-normal)', fontSize: 'var(--font-size-xs)', fontWeight: 'var(--font-weight-bold)' }}
                                            >
                                                {step.number}
                                            </span>
                                        </div>

                                        <AnimatePresence initial={false}>
                                            {isActive && (
                                                <motion.p
                                                    initial={{ height: 0, opacity: 0 }}
                                                    animate={{ height: "auto", opacity: 1 }}
                                                    exit={{ height: 0, opacity: 0 }}
                                                    transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
                                                    className="leading-relaxed overflow-hidden max-w-[95%]"
                                                    style={{ color: 'var(--color-black-lighter)', fontSize: 'var(--font-size-sm)', fontWeight: 'var(--font-weight-normal)' }}
                                                >
                                                    {step.description}
                                                </motion.p>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Right Side: Animated Visual Area */}
                    <div
                        className="w-full lg:flex-1 relative min-h-[400px] overflow-hidden"
                        style={{ borderRadius: 'var(--radius-s)' }}
                    >
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeIndex}
                                initial={{ scale: 1.05, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.5, ease: "easeOut" }}
                                className="absolute inset-0"
                            >
                                <ImagePrimitive
                                    src={steps[activeIndex].imageSrc}
                                    alt={steps[activeIndex].title}
                                    imageVariant="none"
                                    aspectRatio="none"
                                    className="w-full h-full object-cover"
                                    style={{ borderRadius: 'var(--radius-s)' }}
                                />
                            </motion.div>
                        </AnimatePresence>
                    </div>

                </div>
            </div>
        </section>
    );
}
