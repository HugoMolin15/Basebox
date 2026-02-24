'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { ArrowRight } from 'lucide-react';
import { ImagePrimitive } from '@/components/Media/image-primitive';

/**
 * Configuration First: All changeable text, links, and image URLs MUST be defined here.
 */
const SETTINGS = {
    badge: "Latest News",
    title: "Our Recent News",
    subtitle: "There are many variations of available but the majority have suffered alteration in some form.",
    posts: [
        {
            title: "The Magic of Fall Crisp Air & Golden Leaves",
            description: "Lorem ipsum is simply dummy text of the printing and typesetting...",
            image: "https://i.pinimg.com/1200x/f2/07/0c/f2070ca40e6b6106386849db1044c9d0.jpg",
            imageAlt: "Colorful hot air balloons",
            link: "#",
        },
        {
            title: "Skyfall Adventures The Thrill of Air Craft Adventures",
            description: "Lorem ipsum is simply dummy text of the printing and typesetting...",
            image: "https://i.pinimg.com/1200x/39/fa/62/39fa62821f86b475f8faed3ab38cb124.jpg",
            imageAlt: "Small aircraft in flight",
            link: "#",
        },
        {
            title: "Gravity Defied The Beauty of Aerial Adventures",
            description: "Lorem ipsum is simply dummy text of the printing and typesetting...",
            image: "https://i.pinimg.com/1200x/b1/1f/ec/b11fec719d9329e484e888ce13519bed.jpg",
            imageAlt: "Person sandboarding in desert",
            link: "#",
        }
    ]
};

const BlogCard = ({ post }: { post: typeof SETTINGS.posts[0] }) => (
    <div className="flex flex-col h-full group transition-all cursor-pointer">
        <div className="mb-6 relative">
            <ImagePrimitive
                src={post.image}
                alt={post.imageAlt}
                imageVariant="soft"
                aspectRatio="aspect-video"
                className="w-full overflow-hidden"
                style={{ borderRadius: 'var(--radius-s)' }}
            />
        </div>

        <div className="flex flex-col gap-3 flex-grow">
            <h3
                className="leading-tight text-[var(--color-black)] group-hover:text-[var(--color-brand-normal)] transition-colors line-clamp-2 min-h-[3rem]"
                style={{ fontSize: 'var(--font-size-xl)', fontWeight: 'var(--font-weight-bold)' }}
            >
                {post.title}
            </h3>

            <p
                className="leading-relaxed line-clamp-2"
                style={{ color: 'var(--color-black-lighter)', fontSize: 'var(--font-size-sm)', fontWeight: 'var(--font-weight-medium)', opacity: 0.7 }}
            >
                {post.description}
            </p>

            <div className="mt-auto pt-6">
                <button className="btn-primary btn-lg btn-pill w-full">
                    Read More
                </button>
            </div>
        </div>
    </div>
);

export function BlogSection() {
    return (
        <div className="w-full bg-white flex flex-col items-center py-16 md:py-24 px-6">
            <div className="w-full max-w-7xl flex flex-col gap-12 md:gap-16">

                {/* Centered Header */}
                <div className="text-center flex flex-col items-center gap-4 max-w-2xl mx-auto mb-4">
                    <span
                        className="w-fit px-3 py-1 rounded-full uppercase tracking-widest"
                        style={{ backgroundColor: 'var(--color-white-dark)', color: 'var(--color-black-lighter)', fontSize: 'var(--font-size-xs)', fontWeight: 'var(--font-weight-black)', opacity: 0.8 }}
                    >
                        {SETTINGS.badge}
                    </span>
                    <h2 style={{ color: 'var(--color-black)', fontSize: 'var(--font-size-4xl)', fontWeight: 'var(--font-weight-extrabold)' }}>
                        {SETTINGS.title}
                    </h2>
                    <p style={{ color: 'var(--color-black-lighter)', fontSize: 'var(--font-size-base)', fontWeight: 'var(--font-weight-medium)', opacity: 0.7 }}>
                        {SETTINGS.subtitle}
                    </p>
                </div>

                {/* Posts Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[var(--spacing-library-gap)]">
                    {SETTINGS.posts.map((post, index) => (
                        <BlogCard key={index} post={post} />
                    ))}
                </div>

            </div>
        </div>
    );
}

export default BlogSection;
