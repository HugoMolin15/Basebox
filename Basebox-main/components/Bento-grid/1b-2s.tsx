'use client';

import { cn } from "@/lib/utils";
import { MoveRight } from "lucide-react";
import { ImagePrimitive } from "@/components/Media/image-primitive";
import React from 'react';

interface BlogPost {
    id: number;
    title: string;
    category: string;
    imageUrl?: string;
    href?: string;
    views: number;
    readTime?: number;
    rating?: number;
    className?: string;
}

interface GridSectionProps {
    posts?: BlogPost[];
    className?: string;
    onPostClick?: (post: BlogPost) => void;
}

const DEFAULT_POSTS: BlogPost[] = [
    {
        id: 1,
        title: "The Future of Minimalist Design Systems",
        category: "Design",
        imageUrl: "https://i.pinimg.com/1200x/9f/29/dd/9f29dd9c3d7c1a4a9db4daf2506cec16.jpg", // Top-level for easy editing
        views: 12400,
        readTime: 5,
        rating: 5
    },
    {
        id: 2,
        title: "Scaling SaaS Infrastructure",
        category: "Tech",
        imageUrl: "https://i.pinimg.com/1200x/3b/ff/2f/3bff2f783d81982f194e7c4927f28f0b.jpg",
        views: 8200,
        rating: 4
    },
    {
        id: 3,
        title: "Privacy in the Age of AI",
        category: "Security",
        imageUrl: "https://i.pinimg.com/1200x/6b/ae/62/6bae62751fce6de1cf61471d7e85fbb6.jpg",
        views: 5100,
        rating: 5
    }
];

export const BentoGrid = ({
    posts,
    className,
    onPostClick,
}: GridSectionProps) => {
    const displayPosts = posts && posts.length > 0 ? posts : DEFAULT_POSTS;

    return (
        <section className={cn(
            "w-full relative py-24 mx-auto px-4 bg-background debug-border",
            className
        )}>
            <div
                className="grid h-auto grid-cols-1 md:h-[650px] md:grid-cols-2 lg:grid-cols-[1fr_0.5fr] w-full max-w-7xl mx-auto"
                style={{ gap: 'var(--spacing-l)' }}
            >
                {displayPosts.map((post, index) => {
                    const {
                        id,
                        title: postTitle,
                        category,
                        imageUrl,
                        views,
                        rating = 4,
                        className: postClassName
                    } = post;

                    const isPrimary = index === 0;

                    return (
                        <div
                            key={id || index}
                            className={cn(
                                "group relative z-0 flex size-full cursor-pointer flex-col justify-end overflow-hidden p-8 min-h-[400px] md:min-h-0 transition-all duration-300",
                                isPrimary ? "col-span-1 md:col-span-2 lg:col-span-1 lg:row-span-2" : "col-span-1",
                                postClassName
                            )}
                            style={{ borderRadius: 'var(--radius-s)' }}
                            onClick={() => onPostClick?.(post)}
                        >
                            {/* Background image */}
                            <div className="absolute inset-0 z-0">
                                <ImagePrimitive
                                    src={imageUrl}
                                    imageVariant="none"
                                    aspectRatio="none"
                                    className="w-full h-full"
                                />
                                {/* Bottom gradient for text readability */}
                                <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                            </div>

                            <article className="relative z-10 flex items-end justify-between w-full">
                                <div className="flex flex-1 flex-col gap-4">
                                    <div className="flex items-center gap-2 mb-2">
                                        <span
                                            className="uppercase tracking-widest py-1.5 px-4 rounded-full bg-white text-zinc-900"
                                            style={{ fontSize: '10px', fontWeight: 'var(--font-weight-bold)' }}
                                        >
                                            {category}
                                        </span>
                                    </div>

                                    <h3
                                        className="leading-tight tracking-tighter text-white text-pretty"
                                        style={{
                                            fontSize: isPrimary ? 'var(--font-size-4xl)' : 'var(--font-size-base)',
                                            fontWeight: isPrimary ? 'var(--font-weight-extrabold)' : 'var(--font-weight-bold)'
                                        }}
                                    >
                                        {postTitle}
                                    </h3>
                                </div>

                                <div
                                    className="ml-4 p-3 rounded-full bg-white text-zinc-900 shadow-lg transition-all duration-300 group-hover:bg-[var(--color-brand-normal)] group-hover:text-[var(--color-black)]"
                                >
                                    <MoveRight
                                        className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1"
                                        strokeWidth={2}
                                    />
                                </div>
                            </article>
                        </div>
                    );
                })}
            </div>
        </section>
    );
};
