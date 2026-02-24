'use client';

import React, { useState, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { registry, Category } from '@/lib/registry';
import { cn } from '@/lib/utils';
import { Search, X, LayoutTemplate } from 'lucide-react';

export function LibrarySidebar() {
    const pathname = usePathname();
    const [searchQuery, setSearchQuery] = useState('');
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    const categories: Category[] = [
        'getting-started', 'navbar', 'hero', 'infinite-scroller',
        'stats', 'bento-grid', 'background', 'layout',
        'testimonial', 'cta', 'faq', 'pricing', 'footer', 'sponsor', 'button', 'form', 'blog', 'parallax', 'text', 'styles'
    ];

    const filteredRegistry = registry.filter((item) => {
        const searchLower = searchQuery.toLowerCase();
        return (
            item.name.toLowerCase().includes(searchLower) ||
            item.description.toLowerCase().includes(searchLower)
        );
    });

    const isPageBuilder = pathname === '/page-builder';

    return (
        <aside className="w-full flex-1 flex flex-col bg-background overflow-hidden">
            {/* Page Builder CTA */}
            <div className="px-4 pt-4 pb-2">
                <Link
                    href="/page-builder"
                    className={cn(
                        'flex items-center gap-2.5 w-full px-3 py-2.5 rounded-lg text-sm font-bold transition-all border',
                        isPageBuilder
                            ? 'bg-brand-primary text-white border-brand-primary shadow-sm'
                            : 'bg-brand-primary/8 text-brand-primary border-brand-primary/20 hover:bg-brand-primary/15'
                    )}
                >
                    <LayoutTemplate size={15} />
                    Page Builder
                </Link>
            </div>

            {/* Search Header */}
            <div className="px-4 pt-2 pb-2">
                <div className="relative group">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={14} />
                    <input
                        type="text"
                        placeholder="Search..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-9 pr-8 py-2 bg-library-card border border-library-border rounded-button text-sm outline-none transition-all text-foreground placeholder:text-muted-foreground/50 focus:border-brand-primary/50"
                    />
                    {searchQuery && (
                        <button onClick={() => setSearchQuery('')} className="absolute right-2 top-1/2 -translate-y-1/2 p-1 hover:bg-library-card/80 rounded-md">
                            <X size={12} className="text-muted-foreground" />
                        </button>
                    )}
                </div>
            </div>

            {/* Scrollable Navigation Area */}
            <div
                ref={scrollContainerRef}
                className="flex-1 overflow-y-auto p-6 pt-4 no-scrollbar"
            >
                <div className="flex flex-col gap-8">
                    {categories.map((category) => {
                        const items = filteredRegistry.filter((item) => item.category === category);
                        if (items.length === 0) return null;

                        return (
                            <div key={category} className="flex flex-col gap-2">
                                <h3 className="text-[10px] font-bold uppercase tracking-[0.15em] text-muted-foreground px-3">
                                    {category.replace('-', ' ')}
                                </h3>
                                <div className="flex flex-col gap-1">
                                    {items.map((item) => {
                                        const isIntro = item.id === 'introduction';
                                        const href = isIntro ? '/' : `/components/${item.id}`;
                                        const isActive = pathname === href;

                                        return (
                                            <Link
                                                key={item.id}
                                                href={href}
                                                scroll={false} // Prevents main window jump
                                                className={cn(
                                                    "text-sm px-3 py-2 rounded-button transition-all flex items-center justify-between",
                                                    isActive
                                                        ? "bg-brand-primary/10 text-brand-primary font-semibold"
                                                        : "text-muted-foreground hover:bg-library-card hover:text-foreground"
                                                )}
                                            >
                                                {item.name}
                                            </Link>
                                        );
                                    })}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </aside>
    );
}
