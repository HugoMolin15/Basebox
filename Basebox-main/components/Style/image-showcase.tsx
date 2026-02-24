'use client';

import React from 'react';
import { ImagePrimitive } from '../Media/image-primitive';
import { cn } from '@/lib/utils';

export function ImageShowcase() {
    const variants = [
        { id: 'glass', name: 'Glass', description: 'Default library style with subtle borders.' },
        { id: 'soft', name: 'Soft', description: 'Deep roundness and soft shadows for friendly UIs.' },
        { id: 'sharp', name: 'Sharp', description: 'Zero radius and clean borders for technical feels.' },
        { id: 'glow', name: 'Glow', description: 'Adds a brand-colored outer radiance.' },
        { id: 'outline', name: 'Outline', description: 'Heavy 2px border that pops on backgrounds.' },
    ] as const;

    return (
        <div className="w-full bg-background p-8 md:p-12">
            <div className="max-w-7xl mx-auto">
                <div className="mb-12">
                    <h2 className="heading-md text-foreground mb-2">Image System</h2>
                    <p className="text-muted-foreground font-medium">
                        Standardized image primitives with robust fallback logic and global style variants.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
                    {variants.map((variant) => (
                        <div key={variant.id} className="flex flex-col gap-4">
                            <div className="flex flex-col gap-1">
                                <span className="text-xs uppercase font-bold tracking-widest text-brand-primary">
                                    {variant.name}
                                </span>
                                <p className="text-sm text-muted-foreground font-medium">
                                    {variant.description}
                                </p>
                            </div>

                            <ImagePrimitive
                                src="" // Testing fallback state
                                aspectRatio="aspect-video"
                                imageVariant={variant.id}
                                className="w-full"
                            />

                            <div className="text-[10px] font-mono text-muted-foreground/50">
                                variant="{variant.id}"
                            </div>
                        </div>
                    ))}
                </div>

                {/* Aspect Ratio Sample */}
                <div className="mt-24 mb-12 border-t border-library-border pt-12">
                    <h2 className="heading-md text-foreground mb-2">Aspect Ratios</h2>
                    <p className="text-muted-foreground font-medium">
                        Standardized ratios for consistent grid layouts.
                    </p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    <div className="flex flex-col gap-2">
                        <ImagePrimitive aspectRatio="aspect-square" src="" imageVariant="soft" />
                        <span className="text-[10px] font-mono text-center opacity-50">aspect-square (Soft)</span>
                    </div>
                    <div className="flex flex-col gap-2">
                        <ImagePrimitive aspectRatio="aspect-video" src="" imageVariant="glass" />
                        <span className="text-[10px] font-mono text-center opacity-50">aspect-video (Glass)</span>
                    </div>
                    <div className="flex flex-col gap-2">
                        <ImagePrimitive aspectRatio="aspect-bento-tall" src="" imageVariant="sharp" />
                        <span className="text-[10px] font-mono text-center opacity-50">aspect-bento-tall (Sharp)</span>
                    </div>
                    <div className="flex flex-col gap-2">
                        <ImagePrimitive aspectRatio="aspect-height" src="" imageVariant="glow" className="h-full" />
                        <span className="text-[10px] font-mono text-center opacity-50">aspect-height (Glow)</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
