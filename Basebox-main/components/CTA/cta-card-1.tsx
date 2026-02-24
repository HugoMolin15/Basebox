'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import Link from 'next/link';

/**
 * CONFIGURATION FIRST
 */
const SETTINGS = {
    header: {
        titlePart1: "Ready to improve your ",
        titlePart2: "sales & conversions?",
    },
    actions: {
        primary: {
            text: "Get Started",
            href: "#",
        },
        secondary: {
            text: "Book Demo",
            href: "#",
        }
    }
};

export function CtaCard1() {
    return (
        <section className="w-full bg-background flex items-center justify-center p-4 py-24">
            <div className="w-full max-w-6xl mx-auto px-4">
                <div
                    className="relative w-full overflow-hidden border-gray-thin bg-white shadow-sm flex items-center"
                    style={{ borderRadius: 'var(--radius-s)' }}
                >

                    <div className="relative z-10 w-full px-6 md:px-16 py-10 md:py-12 flex flex-col md:flex-row items-center justify-between gap-8 md:gap-10">
                        {/* Text Content */}
                        <div className="text-center md:text-left flex-1">
                            <h2
                                className="text-balance"
                                style={{ color: 'var(--color-black)', fontSize: 'var(--font-size-4xl)', fontWeight: 'var(--font-weight-extrabold)' }}
                            >
                                {SETTINGS.header.titlePart1} <br className="hidden lg:block" /> {SETTINGS.header.titlePart2}
                            </h2>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 shrink-0 w-full md:w-auto">
                            <Link href={SETTINGS.actions.secondary.href} className="w-full sm:w-auto">
                                <button className="btn-white btn-lg btn-pill w-full">
                                    {SETTINGS.actions.secondary.text}
                                </button>
                            </Link>
                            <Link href={SETTINGS.actions.primary.href} className="w-full sm:w-auto">
                                <button className="btn-primary btn-lg btn-pill w-full">
                                    {SETTINGS.actions.primary.text}
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
