'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { ArrowRight, Mail, Download, Play, Github } from 'lucide-react';

export function ButtonShowcase() {
    return (
        <section className="w-full py-24 px-6 bg-background">
            <div className="max-w-5xl mx-auto space-y-20">

                {/* Header */}
                <div className="space-y-4">
                    <h2 className="heading-lg text-foreground">Button Primitives</h2>
                    <p className="text-lg text-muted-foreground font-medium">
                        Standardized button components driven by the Basebox design system.
                    </p>
                </div>

                {/* Variants */}
                <div className="space-y-12">
                    <h3 className="heading-sm text-foreground pb-4" style={{ borderBottom: '1px solid var(--library-border)' }}>Styles</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        <div className="space-y-4">
                            <p className="text-status-bold text-muted-foreground/60">Primary</p>
                            <button className="btn-primary btn-md">Get Started</button>
                        </div>
                        <div className="space-y-4">
                            <p className="text-status-bold text-muted-foreground/60">Secondary</p>
                            <button className="btn-secondary btn-md">Learn More</button>
                        </div>
                        <div className="space-y-4">
                            <p className="text-status-bold text-muted-foreground/60">Glass</p>
                            <button className="btn-glass btn-md">View Docs</button>
                        </div>
                        <div className="space-y-4">
                            <p className="text-status-bold text-muted-foreground/60">Dark</p>
                            <button className="btn-dark btn-md">Initialize</button>
                        </div>
                        <div className="space-y-4">
                            <p className="text-status-bold text-muted-foreground/60">White</p>
                            <button className="btn-white btn-md">Contact Us</button>
                        </div>
                    </div>
                </div>

                {/* Modifiers */}
                <div className="space-y-12">
                    <h3 className="heading-sm text-foreground pb-4" style={{ borderBottom: '1px solid var(--library-border)' }}>Modifiers &amp; Shapes</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        <div className="space-y-4">
                            <p className="text-status-bold text-muted-foreground/60">Pill Shape</p>
                            <button className="btn-primary btn-md btn-pill">Pill Button</button>
                        </div>
                        <div className="space-y-4">
                            <p className="text-status-bold text-muted-foreground/60">With Icons</p>
                            <div className="flex gap-4">
                                <button className="btn-primary btn-md flex items-center gap-2">
                                    Send <Mail size={16} />
                                </button>
                                <button className="btn-glass btn-md flex items-center gap-2">
                                    <Github size={16} /> GitHub
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Sizes */}
                <div className="space-y-12">
                    <h3 className="heading-sm text-foreground pb-4" style={{ borderBottom: '1px solid var(--library-border)' }}>Sizes</h3>
                    <div className="flex flex-wrap items-end gap-8">
                        <div className="space-y-4">
                            <p className="text-status-bold text-muted-foreground/60">Small</p>
                            <button className="btn-primary btn-sm">Join Now</button>
                        </div>
                        <div className="space-y-4">
                            <p className="text-status-bold text-muted-foreground/60">Medium</p>
                            <button className="btn-primary btn-md">Join Now</button>
                        </div>
                        <div className="space-y-4">
                            <p className="text-status-bold text-muted-foreground/60">Large</p>
                            <button className="btn-primary btn-lg">Join Now</button>
                        </div>
                    </div>
                </div>

                {/* Combinations */}
                <div className="space-y-12">
                    <h3 className="heading-sm text-foreground pb-4" style={{ borderBottom: '1px solid var(--library-border)' }}>Real-world Examples</h3>
                    <div className="flex flex-wrap gap-4">
                        <button className="btn-primary btn-lg btn-pill flex items-center gap-3">
                            Download Now <Download size={20} />
                        </button>
                        <button className="btn-glass btn-lg btn-pill flex items-center gap-3">
                            Watch Video <Play size={20} fill="currentColor" />
                        </button>
                        <button className="btn-dark btn-md flex items-center gap-2">
                            Next Stage <ArrowRight size={18} />
                        </button>
                    </div>
                </div>

            </div>
        </section>
    );
}
