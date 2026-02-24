'use client';

import React from 'react';
import { ImagePrimitive, ImagePrimitiveProps } from '@/components/Media/image-primitive';
import { cn } from '@/lib/utils';

export interface BigTextImageProps {
    tag?: string;
    title?: string;
    description?: React.ReactNode;
    quote?: React.ReactNode;
    imageSrc?: string;
    imageAlt?: string;
    imageVariant?: ImagePrimitiveProps['imageVariant'];
    visualContent?: React.ReactNode;
    className?: string;
}

export function BigTextImage({
    tag = "Efficiency",
    title = "Accelerate your workflow with intuitive tools.",
    description = (
        <p>
            Harness the power of <strong className="text-foreground font-semibold">automated pipelines</strong> that integrate directly with your existing stack. Don't just build faster — build smarter with tools designed for high-performance teams.
        </p>
    ),
    quote = (
        <p className="text-muted-foreground text-base italic lg:pr-6">
            Transform complex operations into <strong className="text-foreground not-italic">simple, repeatable actions</strong> that scale with your business needs.
        </p>
    ),
    imageSrc = "https://i.pinimg.com/1200x/e6/90/01/e69001a816bda50b18e21aa520ff5a2f.jpg",
    imageAlt = "Efficiency Visualization",
    imageVariant = "none",
    visualContent,
    className
}: BigTextImageProps) {
    return (
        <section className={cn("w-full bg-background overflow-hidden", className)}>
            <div className="w-full grid grid-cols-1 lg:grid-cols-2 items-stretch lg:h-[70vh] min-h-[500px] lg:min-h-0">

                {/* Content Side (Appears on Left on Desktop) */}
                <div
                    className="w-full lg:order-1 p-8 md:p-12 lg:p-16 flex flex-col justify-center items-center lg:items-start relative z-10 overflow-y-auto"
                    style={{ backgroundColor: 'var(--color-black-light)' }}
                >

                    {/* Content Block */}
                    <div className="w-full max-w-xl text-center lg:text-left">

                        {/* Tag */}
                        <div className="flex justify-center lg:justify-start mb-6">
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

                        <h2
                            className="mb-8"
                            style={{ color: 'var(--color-white)', fontSize: 'var(--font-size-4xl)', fontWeight: 'var(--font-weight-extrabold)' }}
                        >
                            {title}
                        </h2>

                        <div
                            className="space-y-6 leading-relaxed"
                            style={{ color: 'rgba(255, 255, 255, 0.8)', fontSize: 'var(--font-size-lg)', fontWeight: 'var(--font-weight-medium)' }}
                        >
                            <div className="[&_strong]:text-[var(--color-brand-normal)]">
                                {description}
                            </div>

                            {/* Quote Section */}
                            <div className="relative mt-8 flex flex-col items-center lg:block">
                                {/* The Accent Bar: Horizontal on mobile, Vertical on desktop */}
                                <div
                                    className="w-12 h-1.5 mb-4 lg:mb-0 lg:w-1.5 lg:h-auto lg:absolute lg:left-0 lg:top-1 lg:bottom-1 rounded-full"
                                    style={{ backgroundColor: 'var(--color-brand-normal)' }}
                                ></div>
                                <div className="[&_strong]:text-[var(--color-brand-normal)] italic lg:pl-6">
                                    {quote}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Visual Side (Appears on Right on Desktop) */}
                <div className="w-full lg:order-2 relative flex items-center justify-center overflow-hidden bg-muted/30">
                    <div className="relative w-full h-full min-h-[400px] lg:min-h-0">
                        {visualContent || (
                            <ImagePrimitive
                                src={imageSrc}
                                alt={imageAlt}
                                imageVariant="none"
                                aspectRatio="none"
                                className="w-full h-full object-cover"
                            />
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}
