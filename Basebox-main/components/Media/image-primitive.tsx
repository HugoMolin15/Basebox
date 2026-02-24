'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { ImageOff } from 'lucide-react';

export interface ImagePrimitiveProps {
    src?: string;
    alt?: string;
    aspectRatio?: 'aspect-video' | 'aspect-square' | 'aspect-bento-tall' | 'aspect-bento-wide' | 'aspect-bento-square' | 'none' | string;
    imageVariant?: 'glass' | 'soft' | 'sharp' | 'glow' | 'outline' | 'none';
    className?: string;
    imageClassName?: string;
    style?: React.CSSProperties;
    fallbackText?: string;
}

/**
 * A robust image primitive with failsafe fallbacks and standardized aspect ratios.
 */
export function ImagePrimitive({
    src,
    alt = "Component image",
    aspectRatio = "aspect-video",
    imageVariant = "glass",
    className,
    imageClassName,
    style,
    fallbackText = "Image missing"
}: ImagePrimitiveProps) {
    const variantClass = imageVariant !== 'none' ? `img-${imageVariant}` : "";

    return (
        <div
            style={style}
            className={cn(
                "relative overflow-hidden flex items-center justify-center",
                variantClass,
                aspectRatio !== 'none' && aspectRatio,
                className
            )}>
            {src ? (
                <img
                    src={src}
                    alt={alt}
                    referrerPolicy="no-referrer"
                    className={cn(
                        "w-full h-full object-cover transition-opacity duration-300",
                        imageClassName
                    )}
                    onError={(e) => {
                        // Handle runtime broken links by hiding the img tag
                        (e.target as HTMLImageElement).style.display = 'none';
                        (e.target as HTMLImageElement).parentElement?.classList.add('is-broken');
                    }}
                />
            ) : null}

            {/* Failsafe UI (Visible if src is missing OR if image breaks at runtime) */}
            <div className={cn(
                "absolute inset-0 flex flex-col items-center justify-center gap-2 text-muted-foreground/30",
                src ? "opacity-0 [.is-broken_&]:opacity-100" : "opacity-100"
            )}>
                <ImageOff size={24} strokeWidth={1.5} />
                <span className="text-[10px] uppercase font-bold tracking-widest">{fallbackText}</span>
            </div>
        </div>
    );
}

/**
 * A specialized version of ImagePrimitive that wraps the image in a card-like container.
 */
export function ImageCard({
    src,
    alt,
    aspectRatio = "aspect-video",
    className,
    ...props
}: ImagePrimitiveProps) {
    return (
        <div className={cn(className)}>
            <ImagePrimitive
                src={src}
                alt={alt}
                aspectRatio={aspectRatio}
                {...props}
            />
        </div>
    );
}
