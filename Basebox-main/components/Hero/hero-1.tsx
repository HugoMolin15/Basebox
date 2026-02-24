import React from 'react';
import { cn } from '@/lib/utils';
import { ImagePrimitive, ImagePrimitiveProps } from '@/components/Media/image-primitive';

export interface HeroProps {
    tag?: string;
    title?: string | React.ReactNode;
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
    tag: "NEXT-GEN BRAND DEFENSE",
    title: <>Shield Your Identity <br /> in the Synthetic Era.</>,
    description: "Sentinel Veda deploys a proprietary neural layer to detect deepfakes, unauthorized brand clones, and AI-driven misinformation before they reach your audience.",
    primaryCta: "Initialize Defense",
    secondaryCta: "View Threat Map",
    imageSrc: "https://i.pinimg.com/1200x/f2/07/0c/f2070ca40e6b6106386849db1044c9d0.jpg",
    imageAlt: "Neural Defense Visualization",
    imageVariant: "soft"
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
        <section
            style={{ maxWidth: 'var(--width-section-standard)' }}
            className={cn("debug-border min-h-screen mt-20",
                "grid grid-cols-1 lg:grid-cols-2 gap-[var(--spacing-library-gap)] items-start mb-8 md:mb-32 px-8 md:px-16 lg:px-24 py-12 md:py-20 mx-auto pt-32 bg-background",
                className
            )}>
            <div className="max-w-2xl">
                {tag && <p className="text-status-medium mb-6 uppercase tracking-wider" style={{ color: 'var(--color-black-lighter)', fontSize: 'var(--font-size-base)', fontWeight: 'var(--font-weight-normal)' }}>{tag}</p>}
                <h1 style={{ color: 'var(--color-black)', fontWeight: 'var(--font-weight-bold)', fontSize: 'var(--font-size-5xl)' }}>
                    {title}
                </h1>
                <div className="flex gap-3 sm:gap-4 w-full mt-10">
                    <button className="flex-1 sm:flex-none btn-primary btn-lg btn-pill truncate">
                        {primaryCta}
                    </button>
                    <button className="flex-1 sm:flex-none btn-glass btn-lg btn-pill truncate">
                        {secondaryCta}
                    </button>
                </div>
            </div>

            <div className="col-span-full mt-2 md:mt-4 flex justify-center w-full">
                {visualContent || (
                    <ImagePrimitive
                        src={imageSrc}
                        alt={imageAlt}
                        aspectRatio="aspect-[21/9]"
                        imageVariant={imageVariant}
                        className="h-[400px] md:h-[600px]"
                        style={{ borderRadius: 'var(--radius-s)' }}
                    />
                )}
            </div>
        </section>
    );
}

