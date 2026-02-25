'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { ImagePrimitive, ImagePrimitiveProps } from '@/components/Media/image-primitive';

export interface HeroProps {
    tag?: string;
    title?: string;
    description?: string;
    primaryCta?: string;
    secondaryCta?: string;
    imageSrc?: string;
    imageAlt?: string;
    imageVariant?: ImagePrimitiveProps['imageVariant'];
    className?: string;
    visualContent?: React.ReactNode;
}

const defaultProps: HeroProps = {
    tag: "",
    title: "Revenue-first  web analytics",
    description: "See every visitor in realtime and witness the moment they become a customer. Optimized for the modern web infrastructure.",
    primaryCta: "Get started",
    secondaryCta: "See demo",
    imageSrc: "https://i.pinimg.com/1200x/7a/76/1d/7a761d0c69df3858fceff11ef8708f48.jpg",
    imageAlt: "Neural Defense Visualization",
    imageVariant: "soft",
};

export function Hero({
    tag = defaultProps.tag,
    title = defaultProps.title,
    description = defaultProps.description,
    primaryCta = defaultProps.primaryCta,
    secondaryCta = defaultProps.secondaryCta,
    imageSrc = defaultProps.imageSrc,
    imageAlt = defaultProps.imageAlt,
    imageVariant = defaultProps.imageVariant,
    className,
    visualContent
}: HeroProps) {
    return (
        <div className={cn("w-full debug-border bg-background relative overflow-hidden mt-16", className)}>

            {/* Header Section */}
            <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 pt-24 pb-16 text-center">
                {tag && (
                    <p className="mb-4 uppercase tracking-wider" style={{ color: 'var(--color-black)', fontSize: 'var(--font-size-base)', fontWeight: 'var(--font-weight-bold)' }}>
                        {tag}
                    </p>
                )}
                <h1 className="mb-6" style={{ color: 'var(--color-black)', fontWeight: 'var(--font-weight-bold)', fontSize: 'var(--font-size-5xl)' }}>
                    {title}
                </h1>
                <p className="mb-10 max-w-2xl mx-auto leading-relaxed" style={{ fontSize: 'var(--font-size-base)', color: 'var(--color-black-lighter)', fontWeight: 'var(--font-weight-normal)' }}>
                    {description}
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <button className="btn-primary btn-lg btn-pill w-full sm:w-auto min-w-[180px]">
                        {primaryCta}
                    </button>
                    <button className="btn-white btn-lg btn-pill w-full sm:w-auto min-w-[180px]">
                        {secondaryCta}
                    </button>
                </div>
            </div>

            {/* Visual Section with Background */}
            <div className="w-full debug-border relative">
                <div className="max-w-5xl mx-auto px-6 pt-0 pb-24">
                    <div className="relative">
                        {visualContent || (
                            <ImagePrimitive
                                src={imageSrc}
                                alt={imageAlt}
                                aspectRatio="aspect-video"
                                imageVariant={imageVariant}
                                className="w-full"
                                style={{ borderRadius: 'var(--radius-s)' }}
                            />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

