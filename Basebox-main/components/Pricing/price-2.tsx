'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { Check } from 'lucide-react';
import { ImagePrimitive } from '@/components/Media/image-primitive';

/**
 * Configuration First: All changeable text, links, and image URLs MUST be defined here.
 */
const SETTINGS = {
    title: "Upgrade to Pro Teams",
    subtitle: "Collaborate without limits, boost efficiency, and keep everyone in sync.",
    features: [
        "Unlimited Projects",
        "Up to 50 Team Members",
        "Real-time Collaboration",
        "Priority File Sharing (up to 1GB/file)",
        "Task Automation Tools",
        "Advanced Analytics Dashboard",
        "Dedicated Workspace",
        "No Storage Limits",
        "Priority email support"
    ],
    button: {
        text: "See Pricing Plans",
        href: "#",
    },
    image: {
        src: "https://i.pinimg.com/1200x/f0/2d/6c/f02d6cd899dda88d7d59df3ad3e6c930.jpg",
        alt: "Modern architecture reflecting professional growth",
        variant: "soft" as const,
    }
};

export function PricingUpgrade() {
    return (
        <div className="w-full bg-white flex items-center justify-center p-6 md:p-12 lg:p-24">
            <div
                className="w-full max-w-6xl overflow-hidden flex flex-col md:flex-row bg-white"
                style={{ borderRadius: 'var(--radius-s)' }}
            >

                {/* Left Side: Visual */}
                <div
                    className="w-full md:w-[42%] lg:w-[45%] h-full min-h-[300px] max-h-[600px] overflow-hidden flex items-center justify-center"
                    style={{ borderRadius: 'var(--radius-s)' }}
                >
                    <ImagePrimitive
                        src={SETTINGS.image.src}
                        alt={SETTINGS.image.alt}
                        imageVariant={SETTINGS.image.variant}
                        aspectRatio="none"
                        className="w-full h-full object-cover object-center"
                        style={{ borderRadius: 'var(--radius-s)' }}
                        fallbackText="Upgrade Visual"
                    />
                </div>

                {/* Right Side: Content */}
                <div className="w-full md:w-[58%] lg:w-[55%] p-8 md:p-12 lg:p-16 flex flex-col justify-center">
                    <div className="mb-8">
                        <h2
                            className="mb-4"
                            style={{ color: 'var(--color-black)', fontSize: 'var(--font-size-4xl)', fontWeight: 'var(--font-weight-extrabold)' }}
                        >
                            {SETTINGS.title}
                        </h2>
                        <p
                            className="leading-relaxed max-w-md"
                            style={{ color: 'var(--color-black-lighter)', fontSize: 'var(--font-size-lg)', fontWeight: 'var(--font-weight-medium)' }}
                        >
                            {SETTINGS.subtitle}
                        </p>
                    </div>

                    {/* Features Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4 mb-10">
                        {SETTINGS.features.map((feature, index) => (
                            <div key={index} className="flex items-start gap-3 group">
                                <Check
                                    className="size-5 mt-0.5 transition-colors"
                                    style={{ color: 'var(--color-black-lighter)' }}
                                />
                                <span
                                    className="leading-snug"
                                    style={{ color: 'var(--color-black-lighter)', fontSize: 'var(--font-size-sm)', fontWeight: 'var(--font-weight-bold)' }}
                                >
                                    {feature}
                                </span>
                            </div>
                        ))}
                    </div>

                    {/* Action Button */}
                    <button className="btn-primary btn-lg btn-pill w-full">
                        {SETTINGS.button.text}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default PricingUpgrade;
