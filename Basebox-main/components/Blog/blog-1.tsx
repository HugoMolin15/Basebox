'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { ImagePrimitive } from '@/components/Media/image-primitive';

/**
 * Configuration First: All changeable text, links, and image URLs MUST be defined here.
 */
const SETTINGS = {
    badge: "Latest News",
    title: "Our Recent News",
    subtitle: "There are many variations of available but the majority have suffered alteration in some form",
    button: {
        text: "View All Posts",
        href: "#",
    },
    posts: [
        {
            title: "Power & Politics Breaking News and Insights",
            author: "Tatiana Diaz",
            image: "https://i.pinimg.com/1200x/f2/07/0c/f2070ca40e6b6106386849db1044c9d0.jpg",
            imageAlt: "Politics Discussion",
        },
        {
            title: "The State of the Nation: Key Political Developments",
            author: "Darrell Steward",
            image: "https://i.pinimg.com/1200x/39/fa/62/39fa62821f86b475f8faed3ab38cb124.jpg",
            imageAlt: "Conference meeting",
        },
        {
            title: "Election Watch Tracking the Future of Governance",
            author: "Jane Cooper",
            image: "https://i.pinimg.com/1200x/b1/1f/ec/b11fec719d9329e484e888ce13519bed.jpg",
            imageAlt: "Presidential speech",
        },
        {
            title: "From Capitol to Communities: Politics That Matter",
            author: "Esther Howard",
            image: "https://i.pinimg.com/1200x/79/ff/17/79ff17f6e2b2f8385ff63985e9fccbdb.jpg",
            imageAlt: "Modern building",
        },
    ]
};

const BlogCard = ({ post }: { post: typeof SETTINGS.posts[0] }) => (
    <div className="flex flex-col sm:flex-row gap-6 items-start group cursor-pointer">
        <div className="w-full sm:w-48 flex-shrink-0">
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
                className="leading-tight text-[var(--color-black)] group-hover:text-[var(--color-brand-normal)] transition-colors cursor-pointer"
                style={{ fontSize: 'var(--font-size-xl)', fontWeight: 'var(--font-weight-bold)' }}
            >
                {post.title}
            </h3>
            <div
                className="font-medium"
                style={{ color: 'var(--color-black-lighter)', fontSize: 'var(--font-size-sm)', opacity: 0.6 }}
            >
                <span>{post.author}</span>
            </div>
        </div>
    </div>
);

export function BlogSection() {
    return (
        <div className="w-full bg-white flex flex-col items-center justify-center p-6 md:p-12 lg:p-24">
            <div className="w-full max-w-7xl flex flex-col gap-16">

                {/* Header Area */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <div className="flex flex-col gap-4 max-w-2xl">
                        <span
                            className="w-fit px-3 py-1 rounded-full uppercase tracking-widest"
                            style={{ backgroundColor: 'var(--color-white-dark)', color: 'var(--color-black-lighter)', fontSize: 'var(--font-size-xs)', fontWeight: 'var(--font-weight-black)', opacity: 0.8 }}
                        >
                            {SETTINGS.badge}
                        </span>
                        <h1
                            className="leading-tight"
                            style={{ color: 'var(--color-black)', fontSize: 'var(--font-size-4xl)', fontWeight: 'var(--font-weight-extrabold)' }}
                        >
                            {SETTINGS.title}
                        </h1>
                        <p
                            className="leading-relaxed"
                            style={{ color: 'var(--color-black-lighter)', fontSize: 'var(--font-size-base)', fontWeight: 'var(--font-weight-medium)', opacity: 0.7 }}
                        >
                            {SETTINGS.subtitle}
                        </p>
                    </div>
                    <button className="btn-primary btn-lg btn-pill w-fit px-12">
                        {SETTINGS.button.text}
                    </button>
                </div>

                {/* Posts Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-[var(--spacing-library-gap)]">
                    {SETTINGS.posts.map((post, index) => (
                        <BlogCard key={index} post={post} />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default BlogSection;
