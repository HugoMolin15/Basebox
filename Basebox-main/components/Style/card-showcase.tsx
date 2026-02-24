'use client';

import React from 'react';
import { cn } from '@/lib/utils';

export function CardShowcase() {
    return (
        <section className="w-full py-24 px-6 bg-background">
            <div className="max-w-5xl mx-auto space-y-24">

                {/* Header */}
                <div className="space-y-4">
                    <h2 className="heading-lg text-foreground">Layout Primitives</h2>
                    <p className="text-lg text-muted-foreground font-medium">
                        Standardized containers and surfaces to maintain visual consistency.
                    </p>
                </div>

                {/* Card Variants */}
                <div className="space-y-12">
                    <h3 className="text-status-bold text-brand-primary border-b border-brand-primary/10 pb-4">Card Variants</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

                        {/* Glass Card */}
                        <div className="space-y-4">
                            <p className="text-status-medium text-muted-foreground">Glass Card (Works best on backgrounds)</p>
                            <div className="lib-card-glass p-10 min-h-[200px] flex flex-col justify-center gap-4">
                                <div className="h-2 w-24 bg-brand-primary/20 rounded-pill" />
                                <h4 className="heading-sm">Cryptographic Identity</h4>
                                <p className="text-sm text-muted-foreground">The foundation of the modern web starts with secure, verifiable proof.</p>
                            </div>
                            <p className="text-xs text-muted-foreground font-mono">.lib-card-glass</p>
                        </div>

                        {/* Clean White */}
                        <div className="space-y-4">
                            <p className="text-status-medium text-muted-foreground">Clean White (High Contrast)</p>
                            <div className="lib-card-white p-10 min-h-[200px] flex flex-col justify-center gap-4">
                                <div className="h-2 w-24 bg-slate-200 rounded-pill" />
                                <h4 className="heading-sm">Enterprise Ready</h4>
                                <p className="text-sm text-slate-500">Built for scale and interoperability across global networks and clusters.</p>
                            </div>
                            <p className="text-xs text-muted-foreground font-mono">.lib-card-white</p>
                        </div>

                        {/* Outline */}
                        <div className="space-y-4">
                            <p className="text-status-medium text-muted-foreground">Minimalist Outline</p>
                            <div className="lib-card-outline p-10 min-h-[200px] flex flex-col justify-center gap-4">
                                <div className="h-2 w-24 bg-slate-300 rounded-pill" />
                                <h4 className="heading-sm">Infrastructure Layer</h4>
                                <p className="text-sm text-muted-foreground">Deep-level integration with existing cloud and on-premise systems.</p>
                            </div>
                            <p className="text-xs text-muted-foreground font-mono">.lib-card-outline</p>
                        </div>

                    </div>
                </div>

            </div>
        </section>
    );
}
