'use client';

import React from 'react';
import { Star, Zap, Shield, Sparkles, CreditCard, MousePointer2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface GlassIconItem {
    icon: React.ReactNode;
    color: string;
    label: string;
    customClass?: string;
}

interface GlassIconsProps {
    items?: GlassIconItem[];
    className?: string;
}

const gradientMapping: Record<string, string> = {
    blue: 'linear-gradient(hsl(223, 90%, 50%), hsl(208, 90%, 50%))',
    purple: 'linear-gradient(hsl(283, 90%, 50%), hsl(268, 90%, 50%))',
    red: 'linear-gradient(hsl(3, 90%, 50%), hsl(348, 90%, 50%))',
    indigo: 'linear-gradient(hsl(253, 90%, 50%), hsl(238, 90%, 50%))',
    orange: 'linear-gradient(hsl(43, 90%, 50%), hsl(28, 90%, 50%))',
    green: 'linear-gradient(hsl(123, 90%, 40%), hsl(108, 90%, 40%))'
};

export function GlassButtons({
    items = [
        { icon: <Star />, color: 'blue', label: 'Premium' },
        { icon: <Zap />, color: 'purple', label: 'Fast' },
        { icon: <Shield />, color: 'red', label: 'Secure' },
        { icon: <Sparkles />, color: 'indigo', label: 'Magic' },
        { icon: <CreditCard />, color: 'orange', label: 'Payments' },
        { icon: <MousePointer2 />, color: 'green', label: 'Interactive' },
    ],
    className
}: GlassIconsProps) {
    const getBackgroundStyle = (color: string) => {
        if (gradientMapping[color]) {
            return { background: gradientMapping[color] };
        }
        return { background: color };
    };

    return (
        /* min-h-screen and justify-center ensure the grid is centered vertically */
        <div className="w-full min-h-screen flex flex-col items-center justify-center bg-white p-12">
            <div className={cn(
                "grid gap-[6em] grid-cols-2 md:grid-cols-3 mx-auto overflow-visible",
                className
            )}>
                {items.map((item, index) => (
                    <button
                        key={index}
                        type="button"
                        aria-label={item.label}
                        className={cn(
                            "relative bg-transparent outline-none border-none cursor-pointer w-[4.5em] h-[4.5em] [perspective:24em] [transform-style:preserve-3d] [-webkit-tap-highlight-color:transparent] group",
                            item.customClass
                        )}
                    >
                        {/* Shadow Layer (Colored Card) */}
                        <span
                            className="absolute top-0 left-0 w-full h-full rounded-[1.25em] block transition-[opacity,transform] duration-300 ease-[cubic-bezier(0.83,0,0.17,1)] origin-[100%_100%] rotate-[15deg] [will-change:transform] group-hover:[transform:rotate(25deg)_translate3d(-0.5em,-0.5em,0.5em)]"
                            style={{
                                ...getBackgroundStyle(item.color),
                                boxShadow: '0.5em -0.5em 0.75em hsla(223, 10%, 10%, 0.15)'
                            }}
                        />

                        {/* Glass Layer */}
                        <span
                            className="absolute top-0 left-0 w-full h-full rounded-[1.25em] bg-[hsla(0,0%,100%,0.15)] transition-[opacity,transform] duration-300 ease-[cubic-bezier(0.83,0,0.17,1)] origin-[80%_50%] flex backdrop-blur-[0.75em] [-webkit-backdrop-filter:blur(0.75em)] [will-change:transform] transform group-hover:[transform:translate3d(0,0,2em)]"
                            style={{
                                boxShadow: '0 0 0 0.1em hsla(0, 0%, 100%, 0.3) inset'
                            }}
                        >
                            <span className="m-auto w-[1.5em] h-[1.5em] flex items-center justify-center [&>svg]:w-full [&>svg]:h-full text-white" aria-hidden="true">
                                {item.icon}
                            </span>
                        </span>

                        {/* Label */}
                        <span className="absolute top-full left-0 right-0 text-center whitespace-nowrap leading-[2] text-xs md:text-sm opacity-0 transition-[opacity,transform] duration-300 ease-[cubic-bezier(0.83,0,0.17,1)] translate-y-0 group-hover:opacity-100 group-hover:[transform:translateY(30%)] text-zinc-500 font-bold tracking-tight uppercase">
                            {item.label}
                        </span>
                    </button>
                ))}
            </div>
        </div>
    );
}
