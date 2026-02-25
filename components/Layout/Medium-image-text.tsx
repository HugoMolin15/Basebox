'use client';

import React from 'react';
import { ImagePrimitive, ImagePrimitiveProps } from '@/components/Media/image-primitive';
import { cn } from '@/lib/utils';

export interface MediumImageTextProps {
    title?: string | React.ReactNode;
    description?: string;
    ctaText?: string;
    imageSrc?: string;
    imageAlt?: string;
    imageVariant?: ImagePrimitiveProps['imageVariant'];
    visualContent?: React.ReactNode;
    className?: string;
}

export function MediumImageText({
    title = <>Design that speaks <br className="hidden md:block" /> louder than words.</>,
    description = "We create digital experiences that blend aesthetic beauty with functional precision. Every pixel is crafted to tell a story, engaging your users from the first glance to the final interaction.",
    ctaText = "Get Started",
    imageSrc = "https://i.pinimg.com/1200x/f2/07/0c/f2070ca40e6b6106386849db1044c9d0.jpg",
    imageAlt = "Visual Showcase",
    imageVariant = "soft",
    visualContent,
    className
}: MediumImageTextProps) {
    return (
        <section className={cn("w-full bg-background py-24 px-6 md:px-12", className)}>
            <div
                className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 items-stretch"
                style={{ gap: 'var(--spacing-l)' }}
            >

                {/* Image Side - Left on Desktop, Top on Mobile */}
                <div
                    className="relative w-full aspect-[4/3] overflow-hidden"
                    style={{ borderRadius: 'var(--radius-s)' }}
                >
                    {visualContent || (
                        <ImagePrimitive
                            src="https://i.pinimg.com/1200x/f2/07/0c/f2070ca40e6b6106386849db1044c9d0.jpg"
                            alt={imageAlt}
                            imageVariant="none"
                            aspectRatio="none"
                            className="w-full h-full object-cover"
                            style={{ borderRadius: 'var(--radius-s)' }}
                        />
                    )}
                </div>

                {/* Text Side - Right on Desktop, Bottom on Mobile */}
                <div
                    className="flex flex-col items-start text-left lg:items-end lg:text-right p-4 lg:p-12 justify-center"
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

                    <div className="pt-4 flex flex-wrap gap-4 justify-start lg:justify-end">
                        <button className="btn-primary btn-lg btn-pill">
                            {ctaText}
                        </button>
                    </div>
                </div>

            </div>
        </section>
    );
}
