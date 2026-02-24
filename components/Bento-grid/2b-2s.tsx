'use client';

import React from 'react';
import {
    Fingerprint,
    History,
    MonitorSmartphone,
    Activity,
    LineChart,
    PieChart,
    ChevronRight,
    Smile,
    Shield,
    ShoppingBag,
    Zap
} from 'lucide-react';
import { cn } from '@/lib/utils';

// Helper components
const StatusDot = ({ className }: { className?: string }) => (
    <div className={cn("w-2 h-2 rounded-full", className)} />
);

const HeatmapGrid = () => {
    const rows = 5;
    const cols = 26;
    return (
        <div className="flex flex-col gap-1 w-full overflow-hidden">
            {Array.from({ length: rows }).map((_, r) => (
                <div key={r} className="flex gap-1">
                    {Array.from({ length: cols }).map((_, c) => {
                        const active = Math.random() > 0.8;
                        const color = active
                            ? (Math.random() > 0.5 ? 'bg-blue-500' : 'bg-blue-300')
                            : 'bg-zinc-100';

                        return (
                            <div key={c} className={cn("w-2 h-2 rounded-full shrink-0", color)} />
                        )
                    })}
                </div>
            ))}
        </div>
    );
}

export function BentoGrid() {
    return (
        <section className="w-full py-20 bg-background">
            <div className="max-w-6xl mx-auto px-4 md:px-6">
                {/* 2 Big, 2 Small Grid Layout */}
                <div
                    className="grid grid-cols-1 md:grid-cols-2"
                    style={{ gap: 'var(--spacing-l)' }}
                >

                    {/* Card 1: Visitor Profiles (BIG) */}
                    <div
                        className="border-gray-thin p-5 flex flex-col h-full bg-white"
                        style={{ borderRadius: 'var(--radius-s)' }}
                    >
                        <div
                            className="mb-8 p-6 border-gray-thin bg-background/50 relative overflow-hidden shadow-inner"
                            style={{ borderRadius: 'var(--radius-s)' }}
                        >
                            <div className="flex items-start justify-between mb-6">
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-zinc-200 to-zinc-400 shadow-inner" />
                                    <div>
                                        <div className="flex items-center gap-2">
                                            <h3 style={{ color: 'var(--color-black)', fontSize: 'var(--font-size-base)', fontWeight: 'var(--font-weight-bold)' }}>Basebox User</h3>
                                            <Fingerprint className="w-4 h-4 text-blue-500" />
                                        </div>
                                        <div className="flex items-center gap-1.5 mt-0.5">
                                            <StatusDot className="bg-green-500" />
                                            <span style={{ color: 'var(--color-black-lighter)', fontSize: 'var(--font-size-xs)', fontWeight: 'var(--font-weight-normal)' }}>Online</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div
                                className="flex items-center gap-2 mb-6"
                                style={{ color: 'var(--color-black-lighter)', fontSize: 'var(--font-size-sm)', fontWeight: 'var(--font-weight-normal)' }}
                            >
                                <span className="flex items-center gap-1">🇺🇸 US Office</span>
                            </div>

                            <div className="grid grid-cols-3 gap-4 mb-8">
                                <div>
                                    <p className="mb-1" style={{ color: 'var(--color-black-lighter)', fontSize: 'var(--font-size-xs)', fontWeight: 'var(--font-weight-medium)' }}>First seen</p>
                                    <p style={{ color: 'var(--color-black)', fontSize: 'var(--font-size-sm)', fontWeight: 'var(--font-weight-semibold)' }}>Feb 2026</p>
                                </div>
                                <div>
                                    <p className="mb-1" style={{ color: 'var(--color-black-lighter)', fontSize: 'var(--font-size-xs)', fontWeight: 'var(--font-weight-medium)' }}>Sessions</p>
                                    <p style={{ color: 'var(--color-black)', fontSize: 'var(--font-size-sm)', fontWeight: 'var(--font-weight-semibold)' }}>24</p>
                                </div>
                                <div>
                                    <p className="mb-1" style={{ color: 'var(--color-black-lighter)', fontSize: 'var(--font-size-xs)', fontWeight: 'var(--font-weight-medium)' }}>Revenue</p>
                                    <p style={{ color: 'var(--color-brand-normal)', fontSize: 'var(--font-size-sm)', fontWeight: 'var(--font-weight-semibold)' }}>$599</p>
                                </div>
                            </div>

                            <div>
                                <p className="mb-2" style={{ color: 'var(--color-black-lighter)', fontSize: 'var(--font-size-xs)', fontWeight: 'var(--font-weight-medium)' }}>Activity</p>
                                <HeatmapGrid />
                            </div>
                        </div>

                        <div className="mt-auto">
                            <div className="w-10 h-10 rounded-library-md bg-blue-500/10 flex items-center justify-center mb-4 text-blue-500 border border-blue-500/20 shadow-sm">
                                <Smile className="w-6 h-6" />
                            </div>
                            <h3 className="mb-2" style={{ color: 'var(--color-black)', fontSize: 'var(--font-size-base)', fontWeight: 'var(--font-weight-bold)' }}>Visitor Profiles</h3>
                            <p className="mb-6 leading-relaxed" style={{ color: 'var(--color-black-lighter)', fontSize: 'var(--font-size-sm)', fontWeight: 'var(--font-weight-normal)' }}>
                                Every visitor gets a profile showing their complete journey.
                            </p>
                            <ul className="space-y-3 mb-8">
                                <li className="flex items-center gap-2" style={{ color: 'var(--color-black-light)', fontSize: 'var(--font-size-sm)', fontWeight: 'var(--font-weight-medium)' }}>
                                    <History className="w-4 h-4 text-blue-500" /> Full session history
                                </li>
                                <li className="flex items-center gap-2" style={{ color: 'var(--color-black-light)', fontSize: 'var(--font-size-sm)', fontWeight: 'var(--font-weight-medium)' }}>
                                    <MonitorSmartphone className="w-4 h-4 text-blue-500" /> Device tracking
                                </li>
                            </ul>
                            <button className="btn-primary btn-md btn-pill flex items-center group">
                                Explore profiles <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-0.5 transition-transform" />
                            </button>
                        </div>
                    </div>

                    {/* Card 2: Performance Metrics (BIG) */}
                    <div
                        className="border-gray-thin p-5 flex flex-col h-full bg-white"
                        style={{ borderRadius: 'var(--radius-s)' }}
                    >
                        <div className="flex-1 flex flex-col items-center justify-center py-12 mb-8 relative">
                            <div className="relative w-40 h-40 flex items-center justify-center mb-6">
                                <svg className="w-full h-full transform -rotate-90">
                                    <circle cx="80" cy="80" r="70" stroke="rgba(0,0,0,0.05)" strokeWidth="12" fill="none" />
                                    <circle cx="80" cy="80" r="70" stroke="var(--color-brand-normal)" strokeWidth="12" fill="none" strokeDasharray="440" strokeDashoffset="0" />
                                </svg>
                                <span className="absolute" style={{ color: 'var(--color-black)', fontSize: 'var(--font-size-4xl)', fontWeight: 'var(--font-weight-bold)' }}>100</span>
                            </div>

                            <h4 className="mb-2 text-center" style={{ color: 'var(--color-black)', fontSize: 'var(--font-size-base)', fontWeight: 'var(--font-weight-bold)' }}>Perfect Score</h4>
                            <p className="text-center max-w-xs mb-6 px-4 leading-relaxed" style={{ color: 'var(--color-black-lighter)', fontSize: 'var(--font-size-sm)', fontWeight: 'var(--font-weight-normal)' }}>
                                Delivering high-performance experiences for every user.
                            </p>

                            <div className="grid grid-cols-3 gap-4 w-full px-4">
                                {[
                                    { label: 'TTFB', val: '0.74s' },
                                    { label: 'FCP', val: '1.35s' },
                                    { label: 'LCP', val: '1.68s' },
                                ].map((m, i) => (
                                    <div key={i} className="text-center">
                                        <p className="uppercase tracking-wider mb-1" style={{ color: 'var(--color-black-lighter)', fontSize: '10px', fontWeight: 'var(--font-weight-bold)' }}>{m.label}</p>
                                        <p style={{ color: 'var(--color-brand-normal)', fontSize: 'var(--font-size-sm)', fontWeight: 'var(--font-weight-bold)' }}>{m.val}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="mt-auto">
                            <div className="w-10 h-10 rounded-library-md bg-blue-500/10 flex items-center justify-center mb-4 text-blue-500 border border-blue-500/20 shadow-sm">
                                <Zap className="w-6 h-6" />
                            </div>
                            <h3 className="mb-2" style={{ color: 'var(--color-black)', fontSize: 'var(--font-size-base)', fontWeight: 'var(--font-weight-bold)' }}>Performance</h3>
                            <p className="mb-6 leading-relaxed" style={{ color: 'var(--color-black-lighter)', fontSize: 'var(--font-size-sm)', fontWeight: 'var(--font-weight-normal)' }}>
                                Real user metrics showing how your site performs.
                            </p>
                            <ul className="space-y-3 mb-8">
                                <li className="flex items-center gap-2" style={{ color: 'var(--color-black-light)', fontSize: 'var(--font-size-sm)', fontWeight: 'var(--font-weight-medium)' }}>
                                    <Activity className="w-4 h-4 text-blue-500" /> Core Web Vitals
                                </li>
                                <li className="flex items-center gap-2" style={{ color: 'var(--color-black-light)', fontSize: 'var(--font-size-sm)', fontWeight: 'var(--font-weight-medium)' }}>
                                    <PieChart className="w-4 h-4 text-blue-500" /> Experience Score
                                </li>
                            </ul>
                            <button className="btn-primary btn-md btn-pill flex items-center group">
                                View Metrics <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-0.5 transition-transform" />
                            </button>
                        </div>
                    </div>

                    {/* Card 3: Privacy (SMALL) */}
                    <div
                        className="border-gray-thin p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-library-gap bg-white"
                        style={{ borderRadius: 'var(--radius-s)' }}
                    >
                        <div className="max-w-md">
                            <h3 className="mb-3" style={{ color: 'var(--color-black)', fontSize: 'var(--font-size-base)', fontWeight: 'var(--font-weight-bold)' }}>Privacy-first</h3>
                            <p className="leading-relaxed" style={{ color: 'var(--color-black-lighter)', fontSize: 'var(--font-size-sm)', fontWeight: 'var(--font-weight-normal)' }}>
                                Fully GDPR compliant foundation for your analytics.
                            </p>
                        </div>
                        <div className="shrink-0 text-zinc-200">
                            <Shield className="w-16 h-16 stroke-1 text-blue-500/20" />
                        </div>
                    </div>

                    {/* Card 4: Integrations (SMALL) */}
                    <div
                        className="border-gray-thin p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-library-gap bg-white"
                        style={{ borderRadius: 'var(--radius-s)' }}
                    >
                        <div className="max-w-md">
                            <h3 className="mb-3" style={{ color: 'var(--color-black)', fontSize: 'var(--font-size-base)', fontWeight: 'var(--font-weight-bold)' }}>Integrations</h3>
                            <p className="leading-relaxed" style={{ color: 'var(--color-black-lighter)', fontSize: 'var(--font-size-sm)', fontWeight: 'var(--font-weight-normal)' }}>
                                Connect your favorite tools in seconds.
                            </p>
                        </div>
                        <div className="shrink-0 flex items-center -space-x-3">
                            <div className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg border-2 border-background shadow-sm z-30" style={{ backgroundColor: 'var(--color-brand-normal)' }}>B</div>
                            <div className="w-12 h-12 rounded-full bg-black flex items-center justify-center text-white border-2 border-white shadow-sm z-20">
                                <ShoppingBag className="w-5 h-5" />
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
