'use client';

import React from 'react';
import { ImagePrimitive, ImagePrimitiveProps } from '@/components/Media/image-primitive';
import { cn } from '@/lib/utils';

export interface MediumTextImageProps {
    title?: string | React.ReactNode;
    description?: string;
    ctaText?: string;
    imageSrc?: string;
    imageAlt?: string;
    imageVariant?: ImagePrimitiveProps['imageVariant'];
    visualContent?: React.ReactNode;
    className?: string;
}

export function MediumTextImage({
    title = <>Start your journey <br className="hidden md:block" /> with confidence.</>,
    description = "Unlock the potential of your ideas with our comprehensive toolkit. From initial concept to final deployment, we provide the resources you need to succeed in a digital-first world.",
    ctaText = "Get Started",
    imageSrc = "https://i.pinimg.com/1200x/f2/07/0c/f2070ca40e6b6106386849db1044c9d0.jpg",
    imageAlt = "Visual Area",
    imageVariant = "soft",
    visualContent,
    className
}: MediumTextImageProps) {
    return (
        <section className={cn("w-full bg-background py-24 px-6 md:px-12", className)}>
            <div
                className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 items-stretch"
                style={{ gap: 'var(--spacing-l)' }}
            >

                {/* Text Side - Left on Desktop, Bottom on Mobile */}
                <div
                    className="flex flex-col items-start text-left order-2 lg:order-1 p-4 lg:p-12 justify-center"
                    style={{ gap: 'var(--spacing-l)' }}
                >
                    <div className="space-y-4">
                        <h2
                            className=""
                            style={{ color: 'var(--color-black)', fontSize: 'var(--font-size-4xl)', fontWeight: 'var(--font-weight-extrabold)' }}
                        >
                            {title}
                        </h2>
                        <p
                            className="leading-relaxed max-w-xl"
                            style={{ color: 'var(--color-black-lighter)', fontSize: 'var(--font-size-base)', fontWeight: 'var(--font-weight-normal)' }}
                        >
                            {description}
                        </p>
                    </div>

                    <div className="pt-4 flex flex-wrap gap-4 justify-start">
                        <button className="btn-primary btn-lg btn-pill">
                            {ctaText}
                        </button>
                    </div>
                </div>

                {/* Image Side - Right on Desktop, Top on Mobile */}
                <div
                    className="relative w-full aspect-[4/3] order-1 lg:order-2 overflow-hidden"
                    style={{ borderRadius: 'var(--radius-s)' }}
                >
                    {visualContent || (
                        <ImagePrimitive
                            src={imageSrc}
                            alt={imageAlt}
                            imageVariant="none"
                            aspectRatio="none"
                            className="w-full h-full object-cover"
                            style={{ borderRadius: 'var(--radius-s)' }}
                        />
                    )}
                </div>

            </div>
        </section>
    );
}
