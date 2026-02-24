import React from "react";
import { cn } from "@/lib/utils";
import {
    Terminal,
    MousePointerClick,
    BadgeDollarSign,
    Cloud,
    Layers,
    Headset,
    ThumbsUp,
    Heart
} from "lucide-react";

/**
 * CONFIGURATION FIRST
 */
const SETTINGS = {
    features: [
        {
            title: "Built for developers",
            description: "Built for engineers, developers, dreamers, thinkers and doers.",
            icon: <Terminal className="w-6 h-6" />,
        },
        {
            title: "Ease of use",
            description: "It's as easy as using an Apple, and as expensive as buying one.",
            icon: <MousePointerClick className="w-6 h-6" />,
        },
        {
            title: "Pricing like no other",
            description: "Our prices are best in the market. No cap, no lock, no credit card required.",
            icon: <BadgeDollarSign className="w-6 h-6" />,
        },
        {
            title: "100% Uptime guarantee",
            description: "We just cannot be taken down by anyone.",
            icon: <Cloud className="w-6 h-6" />,
        },
        {
            title: "Multi-tenant Architecture",
            description: "You can simply share passwords instead of buying new seats",
            icon: <Layers className="w-6 h-6" />,
        },
        {
            title: "24/7 Customer Support",
            description: "We are available a 100% of the time. Atleast our AI Agents are.",
            icon: <Headset className="w-6 h-6" />,
        },
        {
            title: "Money back guarantee",
            description: "If you donot like EveryAI, we will convince you to like us.",
            icon: <ThumbsUp className="w-6 h-6" />,
        },
        {
            title: "And everything else",
            description: "I just ran out of copy ideas. Accept my sincere apologies",
            icon: <Heart className="w-6 h-6" />,
        },
    ]
};

export function FeatureHover() {
    return (
        <main className="w-full bg-background flex flex-col items-center justify-center py-20">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 relative z-10 mx-auto max-w-7xl">
                {SETTINGS.features.map((feature, index) => (
                    <Feature key={feature.title} {...feature} index={index} />
                ))}
            </div>
        </main>
    );
}

const Feature = ({
    title,
    description,
    icon,
    index,
}: {
    title: string;
    description: string;
    icon: React.ReactNode;
    index: number;
}) => {
    return (
        <div
            className={cn(
                "flex flex-col py-10 relative group/feature transition-colors duration-300 ease-out hover:bg-zinc-50 border-gray-thin",
                (index === 0 || index === 4) ? "lg:border-l" : "lg:border-l-0",
                index < 4 ? "lg:border-b" : "lg:border-b-0"
            )}
        >
            <div
                className="mb-4 relative z-10 px-10 transition-colors duration-300 ease-out group-hover/feature:opacity-80"
                style={{ color: 'var(--color-brand-normal)' }}
            >
                {icon}
            </div>
            <div className="mb-2 relative z-10 px-10">
                <h3
                    className=""
                    style={{ color: 'var(--color-black)', fontSize: 'var(--font-size-base)', fontWeight: 'var(--font-weight-bold)' }}
                >
                    {title}
                </h3>
            </div>
            <p
                className="max-w-xs relative z-10 px-10 leading-relaxed"
                style={{ color: 'var(--color-black-lighter)', fontSize: 'var(--font-size-sm)', fontWeight: 'var(--font-weight-normal)' }}
            >
                {description}
            </p>
        </div>
    );
};
