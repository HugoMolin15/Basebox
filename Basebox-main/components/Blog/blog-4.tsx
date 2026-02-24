'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { ImagePrimitive } from '@/components/Media/image-primitive';

/**
 * Configuration First: All changeable text, links, and image URLs MUST be defined here.
 */
const SETTINGS = {
    badge: "Highlights",
    title: "Our Recent News",
    subtitle: "There are many variations of available but the majority have suffered alteration in some form.",
    featured: {
        title: "The Art of Minimalist Design in Modern Homes",
        excerpt: "Minimalism is not just a style; it is a way of living that emphasizes simplicity and functionality...",
        image: "https://i.pinimg.com/1200x/f2/07/0c/f2070ca40e6b6106386849db1044c9d0.jpg",
        imageAlt: "Minimalist abstract architecture"
    },
    sidebar: [
        {
            title: "Sustainable Architecture: Building for a Greener Future",
            image: "https://i.pinimg.com/1200x/39/fa/62/39fa62821f86b475f8faed3ab38cb124.jpg",
            imageAlt: "Modern skyscrapers"
        },
        {
            title: "The Evolution of Skyscrapers: From Brick to Steel",
            image: "https://i.pinimg.com/1200x/b1/1f/ec/b11fec719d9329e484e888ce13519bed.jpg",
            imageAlt: "Curved glass architecture"
        },
        {
            title: "Top 10 Architectural Wonders You Must See",
            image: "https://i.pinimg.com/1200x/79/ff/17/79ff17f6e2b2f8385ff63985e9fccbdb.jpg",
            imageAlt: "Geometric building detail"
        }
    ]
};

const SidebarPost = ({ post }: { post: typeof SETTINGS.sidebar[0] }) => (
    <div className="group flex items-center gap-6 cursor-pointer">
        <div className="w-40 sm:w-48 lg:w-40 flex-shrink-0">
            <ImagePrimitive
                src={post.image}
                alt={post.imageAlt}
                imageVariant="soft"
                aspectRatio="aspect-video"
                className="w-full overflow-hidden"
                style={{ borderRadius: 'var(--radius-s)' }}
            />
        </div>
        <div className="flex flex-col gap-2">
            <h3
                className="text-[var(--color-black)] group-hover:text-[var(--color-brand-normal)] transition-colors leading-snug line-clamp-2"
                style={{ fontSize: 'var(--font-size-sm)', fontWeight: 'var(--font-weight-bold)' }}
            >
                {post.title}
            </h3>
        </div>
    </div>
);

export function BlogSection() {
    return (
        <div className="w-full bg-white flex flex-col items-center py-16 md:py-24 px-6">
            <div className="w-full max-w-7xl flex flex-col gap-12 md:gap-16">

                {/* Header Area */}
                <div className="flex flex-col gap-4 max-w-2xl">
                    <span
                        className="w-fit px-3 py-1 rounded-full uppercase tracking-widest"
                        style={{ backgroundColor: 'var(--color-white-dark)', color: 'var(--color-black-lighter)', fontSize: 'var(--font-size-xs)', fontWeight: 'var(--font-weight-black)', opacity: 0.8 }}
                    >
                        {SETTINGS.badge}
                    </span>
                    <h1 style={{ color: 'var(--color-black)', fontSize: 'var(--font-size-4xl)', fontWeight: 'var(--font-weight-extrabold)' }}>
                        {SETTINGS.title}
                    </h1>
                    <p style={{ color: 'var(--color-black-lighter)', fontSize: 'var(--font-size-base)', fontWeight: 'var(--font-weight-medium)', opacity: 0.7 }}>
                        {SETTINGS.subtitle}
                    </p>
                </div>

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-[var(--spacing-library-gap)] items-start">

                    {/* Featured Post (Left) */}
                    <div className="lg:col-span-7 flex flex-col group cursor-pointer">
                        <div className="mb-8 overflow-hidden">
                            <ImagePrimitive
                                src={SETTINGS.featured.image}
                                alt={SETTINGS.featured.imageAlt}
                                imageVariant="soft"
                                aspectRatio="aspect-video"
                                className="w-full"
                                style={{ borderRadius: 'var(--radius-s)' }}
                            />
                        </div>
                        <div className="flex flex-col gap-4">
                            <h2
                                className="text-[var(--color-black)] group-hover:text-[var(--color-brand-normal)] transition-colors cursor-pointer leading-tight"
                                style={{ fontSize: 'var(--font-size-2xl)', fontWeight: 'var(--font-weight-bold)' }}
                            >
                                {SETTINGS.featured.title}
                            </h2>
                            <p
                                className="leading-relaxed"
                                style={{ color: 'var(--color-black-lighter)', fontSize: 'var(--font-size-base)', fontWeight: 'var(--font-weight-medium)', opacity: 0.7 }}
                            >
                                {SETTINGS.featured.excerpt}
                            </p>
                        </div>
                    </div>

                    {/* Sidebar List (Right) */}
                    <div className="lg:col-span-5 flex flex-col gap-8">
                        {SETTINGS.sidebar.map((post, index) => (
                            <SidebarPost key={index} post={post} />
                        ))}
                    </div>

                </div>
            </div>
        </div>
    );
}

export default BlogSection;
