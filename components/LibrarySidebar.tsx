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
                        'flex items-center gap-2.5 w-full px-3 py-2 border border-[var(--library-border)] bg-[var(--library-card)] text-sm font-medium text-muted-foreground transition-all outline-none',
                        'rounded-[var(--radius-s)] hover:bg-[var(--color-white-dark)] hover:text-[var(--color-black-lighter)]',
                        isPageBuilder && 'bg-[var(--color-white-dark)] text-[var(--color-brand-normal)] font-semibold'
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
                        className="lib-search-input"
                    />
                    {searchQuery && (
                        <button onClick={() => setSearchQuery('')} className="absolute right-2 top-1/2 -translate-y-1/2 p-1 hover:bg-library-card/80 rounded-[var(--radius-s)]">
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
                                <h3 className="text-[10px] font-bold uppercase tracking-[0.15em] text-zinc-400 px-3">
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
                                                    "text-sm px-3 py-2 rounded-[var(--radius-s)] transition-all flex items-center justify-between",
                                                    isActive
                                                        ? "bg-[var(--color-white-dark)] text-[var(--color-brand-normal)] font-semibold"
                                                        : "text-muted-foreground hover:bg-[var(--color-white-dark)] hover:text-[var(--color-black-lighter)]"
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
