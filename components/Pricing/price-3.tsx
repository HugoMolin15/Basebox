'use client';

import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { Check } from 'lucide-react';
import { ImagePrimitive } from '@/components/Media/image-primitive';

/**
 * Configuration First: All changeable text, links, and image URLs MUST be defined here.
 */
const SETTINGS = {
    title: "Unlock Premium Forecasts",
    subtitle: "Get access to our industry-leading commodity price forecasts and gain a competitive edge in the market.",
    pricing: {
        monthly: {
            amount: "49",
            period: "/month",
        },
        yearly: {
            amount: "500",
            period: "/yearly",
        }
    },
    features: [
        "Unlimited Projects",
        "Up to 50 Team Members",
        "Real-time Collaboration",
        "Priority File Sharing (up to 1GB/file)",
    ],
    buttonText: "Subscribe",
    footerText: "By subscribing, you agree to our Terms of Service and Privacy Policy",
    image: {
        src: "https://i.pinimg.com/1200x/f0/2d/6c/f02d6cd899dda88d7d59df3ad3e6c930.jpg",
        alt: "Abstract premium visual",
        variant: "soft" as const,
    }
};

export function PricingPremium() {
    const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');

    const currentPricing = SETTINGS.pricing[billingCycle];

    return (
        <div className="w-full bg-white flex items-center justify-center p-6 md:p-12 lg:p-20">
            <div
                className="w-full max-w-6xl p-4 flex flex-col md:flex-row bg-white items-stretch"
                style={{ borderRadius: 'var(--radius-s)', gap: 'var(--spacing-l)' }}
            >

                {/* Left Side: Visual */}
                <div className="w-full md:w-1/2 min-h-[450px] flex items-center justify-center">
                    <ImagePrimitive
                        src={SETTINGS.image.src}
                        alt={SETTINGS.image.alt}
                        imageVariant="none"
                        aspectRatio="none"
                        className="w-full object-cover object-center"
                        style={{ borderRadius: 'var(--radius-s)', height: '450px' }}
                        fallbackText="Premium Visual"
                    />
                </div>

                {/* Right Side: Content */}
                <div className="w-full md:w-1/2 p-4 md:p-8 lg:p-10 flex flex-col justify-center">
                    <div className="mb-6">
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

                    {/* Toggle Switch */}
                    <div
                        className="flex p-1.5 mb-6 w-full bg-slate-50 border-gray-thin"
                        style={{ borderRadius: 'var(--radius-pill)' }}
                    >
                        <button
                            onClick={() => setBillingCycle('monthly')}
                            className={cn(
                                "flex-1 py-3 transition-all cursor-pointer text-center",
                                billingCycle === 'monthly'
                                    ? "text-white shadow-none"
                                    : "hover:text-black"
                            )}
                            style={{
                                borderRadius: 'var(--radius-pill)',
                                fontSize: 'var(--font-size-sm)',
                                fontWeight: 'var(--font-weight-bold)',
                                backgroundColor: billingCycle === 'monthly' ? 'var(--color-brand-normal)' : 'transparent',
                                color: billingCycle === 'monthly' ? 'white' : 'var(--color-black-lighter)'
                            }}
                        >
                            Monthly
                        </button>
                        <button
                            onClick={() => setBillingCycle('yearly')}
                            className={cn(
                                "flex-1 py-3 transition-all cursor-pointer text-center",
                                billingCycle === 'yearly'
                                    ? "text-white shadow-none"
                                    : "hover:text-black"
                            )}
                            style={{
                                borderRadius: 'var(--radius-pill)',
                                fontSize: 'var(--font-size-sm)',
                                fontWeight: 'var(--font-weight-bold)',
                                backgroundColor: billingCycle === 'yearly' ? 'var(--color-brand-normal)' : 'transparent',
                                color: billingCycle === 'yearly' ? 'white' : 'var(--color-black-lighter)'
                            }}
                        >
                            Yearly(20% OFF)
                        </button>
                    </div>

                    {/* Pricing */}
                    <div className="flex items-baseline gap-1 mb-6">
                        <span
                            className="tracking-tight"
                            style={{ color: 'var(--color-black)', fontSize: 'var(--font-size-2xl)', fontWeight: 'var(--font-weight-bold)' }}
                        >$</span>
                        <span
                            className="tracking-tighter"
                            style={{ color: 'var(--color-black)', fontSize: 'var(--font-size-5xl)', fontWeight: 'var(--font-weight-black)' }}
                        >
                            {currentPricing.amount}
                        </span>
                        <span
                            className="ml-1"
                            style={{ color: 'var(--color-black-lighter)', fontSize: 'var(--font-size-lg)', fontWeight: 'var(--font-weight-bold)', opacity: 0.6 }}
                        >
                            {currentPricing.period}
                        </span>
                    </div>

                    {/* Features List */}
                    <div className="flex flex-col gap-3 mb-8">
                        {SETTINGS.features.map((feature, index) => (
                            <div key={index} className="flex items-center gap-3">
                                <Check
                                    className="size-5"
                                    style={{ color: 'var(--color-black)' }}
                                />
                                <span
                                    style={{ color: 'var(--color-black-lighter)', fontSize: 'var(--font-size-sm)', fontWeight: 'var(--font-weight-bold)' }}
                                >
                                    {feature}
                                </span>
                            </div>
                        ))}
                    </div>

                    {/* Action */}
                    <div className="flex flex-col gap-4">
                        <button className="btn-primary btn-lg btn-pill w-full">
                            {SETTINGS.buttonText}
                        </button>
                        <p
                            className="text-center leading-relaxed max-w-xs mx-auto"
                            style={{ color: 'var(--color-black-lighter)', fontSize: 'var(--font-size-xs)', fontWeight: 'var(--font-weight-normal)', opacity: 0.6 }}
                        >
                            {SETTINGS.footerText}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PricingPremium;
