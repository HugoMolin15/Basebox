'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { ImagePrimitive } from '@/components/Media/image-primitive';

/**
 * Configuration First: All changeable text, links, and image URLs MUST be defined here.
 */
const SETTINGS = {
    topRow: [
        {
            title: "Instant Preview Sharing",
            description: "Share your layout live with one link. No deployment needed.",
            image: "https://i.pinimg.com/1200x/67/c3/5a/67c35a73477d88518aac9c45541227e5.jpg", // Fallback
        },
        {
            title: "One-Click Color Themes",
            description: "Instantly switch between modern presets or make your own.",
            image: "https://i.pinimg.com/736x/ba/b4/a8/bab4a80dd3f989ca4fa305944639812d.jpg", // Fallback
        }
    ],
    bottomRow: [
        {
            title: "AI-Powered Layouts",
            description: "Generate responsive UI with smart AI assistance.",
            image: "https://i.pinimg.com/736x/7d/f3/e2/7df3e2e4405feed1dd45927ab3ef0dee.jpg", // Fallback
        },
        {
            title: "Seamless Integration",
            description: "Pick-and-drop design that scales beautifully across all devices.",
            image: "https://i.pinimg.com/736x/51/49/6b/51496b38e31eba7d82d7f8f059da943e.jpg", // Fallback
        },
        {
            title: "Auto-Responsive by Default",
            description: "Mobile-first design that works flawlessly across all devices.",
            image: "https://i.pinimg.com/1200x/39/fa/62/39fa62821f86b475f8faed3ab38cb124.jpg", // Fallback
        }
    ]
};

const BentoCard = ({ title, description, image, className }: { title: string, description: string, image: string, className?: string }) => (
    <div
        className={cn("border-gray-thin p-6 flex flex-col gap-6 h-full bg-white", className)}
        style={{ borderRadius: 'var(--radius-s)' }}
    >
        <ImagePrimitive
            src={image}
            alt={title}
            imageVariant="none"
            aspectRatio="aspect-video"
            className="w-full"
            style={{ borderRadius: 'var(--radius-s)' }}
            fallbackText="Feature Visual"
        />
        <div className="flex flex-col gap-2">
            <h3
                className="tracking-tight"
                style={{ color: 'var(--color-black)', fontSize: 'var(--font-size-base)', fontWeight: 'var(--font-weight-bold)' }}
            >
                {title}
            </h3>
            <p
                className="leading-relaxed"
                style={{ color: 'var(--color-black-lighter)', fontSize: 'var(--font-size-sm)', fontWeight: 'var(--font-weight-normal)' }}
            >
                {description}
            </p>
        </div>
    </div>
);

export function BentoGrid() {
    return (
        <div className="w-full bg-white flex items-center justify-center p-6 md:p-12 lg:p-24">
            <div
                className="w-full max-w-7xl flex flex-col"
                style={{ gap: 'var(--spacing-l)' }}
            >
                {/* Top Row: 2 Medium Cards */}
                <div
                    className="grid grid-cols-1 md:grid-cols-2"
                    style={{ gap: 'var(--spacing-l)' }}
                >
                    {SETTINGS.topRow.map((card, index) => (
                        <BentoCard
                            key={index}
                            title={card.title}
                            description={card.description}
                            image={card.image}
                        />
                    ))}
                </div>

                {/* Bottom Row: 3 Small Cards */}
                <div
                    className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3"
                    style={{ gap: 'var(--spacing-l)' }}
                >
                    {SETTINGS.bottomRow.map((card, index) => (
                        <BentoCard
                            key={index}
                            title={card.title}
                            description={card.description}
                            image={card.image}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default BentoGrid;
