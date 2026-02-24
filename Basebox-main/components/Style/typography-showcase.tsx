'use client';

import React from 'react';
import { cn } from '@/lib/utils';

export function TypographyShowcase() {
    return (
        <section className="w-full py-24 px-6 bg-background">
            <div className="max-w-5xl mx-auto space-y-24">

                {/* Header */}
                <div className="space-y-4">
                    <h2 className="heading-lg text-foreground">Typography System</h2>
                    <p className="text-lg text-muted-foreground font-medium">
                        Standardized text styles and scales for clear information hierarchy.
                    </p>
                </div>

                {/* Headings */}
                <div className="space-y-12">
                    <h3 className="text-status-bold text-brand-primary border-b border-brand-primary/10 pb-4">Headings</h3>
                    <div className="space-y-12">
                        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 items-start">
                            <div className="text-status-medium text-muted-foreground/40 pt-4">Heading XL</div>
                            <div className="lg:col-span-3">
                                <h1 className="heading-xl text-foreground">Design without limits.</h1>
                                <p className="text-sm text-muted-foreground mt-4 font-mono">.heading-xl (60px / 6xl)</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 items-start">
                            <div className="text-status-medium text-muted-foreground/40 pt-2">Heading LG</div>
                            <div className="lg:col-span-3">
                                <h2 className="heading-lg text-foreground">The future of components.</h2>
                                <p className="text-sm text-muted-foreground mt-4 font-mono">.heading-lg (36px / 4xl)</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 items-start">
                            <div className="text-status-medium text-muted-foreground/40 pt-1">Heading MD</div>
                            <div className="lg:col-span-3">
                                <h3 className="heading-md text-foreground">Powerful and intuitive.</h3>
                                <p className="text-sm text-muted-foreground mt-2 font-mono">.heading-md (24px / 2xl)</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 items-start">
                            <div className="text-status-medium text-muted-foreground/40 pt-1">Heading SM</div>
                            <div className="lg:col-span-3">
                                <h4 className="heading-sm text-foreground">Simple integration.</h4>
                                <p className="text-sm text-muted-foreground mt-2 font-mono">.heading-sm (18px / text-lg)</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Status & Labels */}
                <div className="space-y-12">
                    <h3 className="text-status-bold text-brand-primary border-b border-brand-primary/10 pb-4">Status & Labels</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        <div className="space-y-4">
                            <p className="text-status-bold text-brand-primary">NEW FEATURE AVAILABLE</p>
                            <p className="text-sm text-muted-foreground font-mono">.text-status-bold</p>
                        </div>
                        <div className="space-y-4">
                            <p className="text-status-medium text-muted-foreground">Version 4.0.2 Deployment</p>
                            <p className="text-sm text-muted-foreground font-mono">.text-status-medium</p>
                        </div>
                    </div>
                </div>

                {/* Body & Paragraphs */}
                <div className="space-y-12">
                    <h3 className="text-status-bold text-brand-primary border-b border-brand-primary/10 pb-4">Body Text</h3>
                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 items-start">
                        <div className="text-status-medium text-muted-foreground/40 pt-1">Large Body</div>
                        <div className="lg:col-span-3">
                            <p className="text-lg text-muted-foreground font-medium leading-relaxed">
                                Basebox provides the cryptographic proof of authenticity for the modern web.
                                Our components are engineered for maximum performance and visual precision.
                            </p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 items-start">
                        <div className="text-status-medium text-muted-foreground/40 pt-1">Standard Body</div>
                        <div className="lg:col-span-3">
                            <p className="text-base text-muted-foreground leading-relaxed">
                                Deploy a proprietary neural layer to detect deepfakes, unauthorized brand clones,
                                and AI-driven misinformation before they reach your audience. Simple, powerful,
                                and built for the synthetic era.
                            </p>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
}
