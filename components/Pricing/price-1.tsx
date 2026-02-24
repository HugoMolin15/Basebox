"use client"

import React, { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Check, Sparkles } from "lucide-react"
import { cn } from "@/lib/utils"

export interface Plan {
    title: string
    price: {
        monthly: number
        yearly: number
    }
    description: string
    features: string[]
    ctaText: string
    ctaHref: string
    isFeatured?: boolean
}

export interface PricingProps {
    title?: string
    description?: string
    plans?: Plan[]
    className?: string
}

const AuroraText = ({ children, className }: { children: React.ReactNode; className?: string }) => (
    <span className={cn("relative inline-block font-bold tracking-tighter", className)}>
        <span className="absolute inset-0 bg-gradient-to-r from-brand-primary via-purple-500 to-indigo-400 blur-sm opacity-50 animate-pulse" />
        <span className="relative bg-gradient-to-r from-brand-primary via-purple-600 to-indigo-600 bg-clip-text text-transparent">
            {children}
        </span>
    </span>
)

const defaultPlans: Plan[] = [
    {
        title: "Starter",
        price: { monthly: 19, yearly: 190 },
        description: "Perfect for freelancers and side projects.",
        features: ["5 Projects", "Basic Analytics", "Community Support", "1GB Storage"],
        ctaText: "Get Started",
        ctaHref: "#"
    },
    {
        title: "Pro",
        price: { monthly: 49, yearly: 490 },
        description: "Everything you need to grow your business.",
        features: ["Unlimited Projects", "Advanced Analytics", "Priority Support", "10GB Storage", "Custom Domain"],
        ctaText: "Go Pro",
        ctaHref: "#",
        isFeatured: true
    },
    {
        title: "Enterprise",
        price: { monthly: 99, yearly: 990 },
        description: "Advanced features for large organizations.",
        features: ["Custom Contracts", "Dedicated Support", "SSO & SAML", "Unlimited Storage", "API Access"],
        ctaText: "Contact Us",
        ctaHref: "#"
    }
]

export function Pricing({
    title = "Simple, transparent pricing",
    description = "Choose the best plan for your team. Save 20% with yearly billing.",
    plans = defaultPlans,
    className
}: PricingProps) {
    const [isYearly, setIsYearly] = useState(false)

    return (
        <section className={cn("w-full py-24 bg-background", className)}>
            <div className="max-w-7xl mx-auto px-6 md:px-12 space-y-16">

                {/* Header */}
                <div className="text-center space-y-8">
                    <div className="space-y-4">
                        <h2
                            className="tracking-tighter"
                            style={{ color: 'var(--color-black)', fontSize: 'var(--font-size-4xl)', fontWeight: 'var(--font-weight-extrabold)' }}
                        >
                            {title}
                        </h2>
                        <p
                            className="max-w-2xl mx-auto leading-relaxed"
                            style={{ color: 'var(--color-black-lighter)', fontSize: 'var(--font-size-lg)', fontWeight: 'var(--font-weight-medium)' }}
                        >
                            {description}
                        </p>
                    </div>

                    <div className="flex items-center justify-center">
                        <div
                            className="flex p-1 bg-white border-gray-thin"
                            style={{ borderRadius: 'var(--radius-pill)' }}
                        >
                            <button
                                onClick={() => setIsYearly(false)}
                                className={cn(
                                    "px-6 py-2 transition-all cursor-pointer",
                                    !isYearly ? "text-white" : "hover:text-black"
                                )}
                                style={{
                                    borderRadius: 'var(--radius-pill)',
                                    fontSize: 'var(--font-size-sm)',
                                    fontWeight: 'var(--font-weight-bold)',
                                    backgroundColor: !isYearly ? 'var(--color-brand-normal)' : 'transparent',
                                    color: !isYearly ? 'white' : 'var(--color-black-lighter)'
                                }}
                            >
                                Monthly
                            </button>
                            <button
                                onClick={() => setIsYearly(true)}
                                className={cn(
                                    "px-6 py-2 transition-all flex items-center gap-2 cursor-pointer",
                                    isYearly ? "text-white" : "hover:text-black"
                                )}
                                style={{
                                    borderRadius: 'var(--radius-pill)',
                                    fontSize: 'var(--font-size-sm)',
                                    fontWeight: 'var(--font-weight-bold)',
                                    backgroundColor: isYearly ? 'var(--color-brand-normal)' : 'transparent',
                                    color: isYearly ? 'white' : 'var(--color-black-lighter)'
                                }}
                            >
                                Yearly
                                <AuroraText className="text-[10px] uppercase">
                                    <span style={{ color: isYearly ? 'white' : 'inherit' }}>-20%</span>
                                </AuroraText>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Grid */}
                <div
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-stretch"
                    style={{ gap: 'var(--spacing-l)' }}
                >
                    {plans.map((plan) => {
                        const currentPrice = isYearly ? Math.round(plan.price.yearly / 12) : plan.price.monthly;

                        return (
                            <div
                                key={plan.title}
                                className={cn(
                                    "relative flex flex-col h-full p-8 transition-all duration-500 text-center border-gray-thin bg-white",
                                    plan.isFeatured ? "z-10 md:scale-105" : ""
                                )}
                                style={{ borderRadius: 'var(--radius-s)' }}
                            >
                                {plan.isFeatured && (
                                    <div
                                        className="absolute -top-4 inset-x-0 mx-auto w-fit text-white px-4 py-1 font-bold flex items-center gap-2"
                                        style={{ backgroundColor: 'var(--color-brand-normal)', borderRadius: 'var(--radius-pill)', fontSize: 'var(--font-size-xs)' }}
                                    >
                                        <Sparkles className="size-3" />
                                        Most Popular
                                    </div>
                                )}

                                <div className="mb-8 flex flex-col items-center">
                                    <h3
                                        className="mb-2"
                                        style={{ color: 'var(--color-black)', fontSize: 'var(--font-size-xl)', fontWeight: 'var(--font-weight-bold)' }}
                                    >
                                        {plan.title}
                                    </h3>
                                    <p
                                        className="max-w-[200px] leading-relaxed"
                                        style={{ color: 'var(--color-black-lighter)', fontSize: 'var(--font-size-sm)', fontWeight: 'var(--font-weight-normal)' }}
                                    >
                                        {plan.description}
                                    </p>

                                    <div className="flex items-baseline justify-center gap-1 mt-6">
                                        <span
                                            style={{ color: 'var(--color-black)', fontSize: 'var(--font-size-2xl)', fontWeight: 'var(--font-weight-bold)' }}
                                        >$</span>
                                        <span
                                            className="leading-none"
                                            style={{ color: 'var(--color-black)', fontSize: 'var(--font-size-5xl)', fontWeight: 'var(--font-weight-black)' }}
                                        >
                                            {currentPrice}
                                        </span>
                                        <span
                                            style={{ color: 'var(--color-black-lighter)', fontSize: 'var(--font-size-sm)', fontWeight: 'var(--font-weight-medium)', opacity: 0.6 }}
                                        >/mo</span>
                                    </div>
                                    <div
                                        className="mt-4 uppercase tracking-wider"
                                        style={{ color: 'var(--color-black-lighter)', fontSize: 'var(--font-size-xs)', fontWeight: 'var(--font-weight-bold)', opacity: 0.6 }}
                                    >
                                        {isYearly ? "Billed annually" : "Billed monthly"}
                                    </div>
                                </div>

                                {/* Feature List Center Alignment Fix */}
                                <div className="mb-10 flex-1 flex flex-col items-center">
                                    <div className="space-y-4 inline-block text-left w-full max-w-[240px]">
                                        {plan.features.map((feature) => (
                                            <div key={feature} className="flex items-center gap-3">
                                                <div
                                                    className="size-5 rounded-full flex items-center justify-center shrink-0"
                                                    style={{ backgroundColor: 'color-mix(in srgb, var(--color-brand-normal), transparent 90%)' }}
                                                >
                                                    <Check className="size-3" style={{ color: 'var(--color-brand-normal)' }} />
                                                </div>
                                                <span
                                                    style={{ color: 'var(--color-black-lighter)', fontSize: 'var(--font-size-sm)', fontWeight: 'var(--font-weight-medium)' }}
                                                >
                                                    {feature}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <a
                                    href={plan.ctaHref}
                                    className={cn(
                                        "w-full btn-lg btn-pill transition-all active:scale-95 cursor-pointer block",
                                        plan.isFeatured
                                            ? "btn-primary"
                                            : "btn-white border-gray-thin"
                                    )}
                                >
                                    {plan.ctaText}
                                </a>
                            </div>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}
