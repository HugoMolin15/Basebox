'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { ImagePrimitive } from '@/components/Media/image-primitive';

/**
 * Configuration First: All changeable text, links, and image URLs MUST be defined here.
 */
const SETTINGS = {
    title: "Our Recent News",
    subtitle: "There are many variations of available but the majority have suffered alteration in some form.",
    posts: [
        {
            category: "Health",
            title: "5 Quick & Healthy Breakfast Ideas for Busy Mornings",
            description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when...",
            image: "https://i.pinimg.com/1200x/f2/07/0c/f2070ca40e6b6106386849db1044c9d0.jpg",
            imageAlt: "Healthy breakfast bowl with fruits and nuts",
            badgeClass: "bg-purple-100 text-purple-600",
        },
        {
            category: "Organic",
            title: "5 Quick & Healthy Breakfast Ideas for Busy Mornings",
            description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when...",
            image: "https://i.pinimg.com/1200x/39/fa/62/39fa62821f86b475f8faed3ab38cb124.jpg",
            imageAlt: "Single orange with blueberries on white background",
            badgeClass: "bg-green-100 text-green-600",
        },
        {
            category: "Food",
            title: "5 Quick & Healthy Breakfast Ideas for Busy Mornings",
            description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when...",
            image: "https://i.pinimg.com/1200x/b1/1f/ec/b11fec719d9329e484e888ce13519bed.jpg",
            imageAlt: "Strawberries splashing in water",
            badgeClass: "bg-red-100 text-red-600",
        }
    ]
};

const BlogCard = ({ post }: { post: typeof SETTINGS.posts[0] }) => (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center group cursor-pointer">
        {/* Visual Content */}
        <div className="md:col-span-4 lg:col-span-5">
            <ImagePrimitive
                src={post.image}
                alt={post.imageAlt}
                imageVariant="soft"
                aspectRatio="aspect-[4/3]"
                className="w-full overflow-hidden"
                style={{ borderRadius: 'var(--radius-s)' }}
            />
        </div>

        {/* Text Content */}
        <div className="md:col-span-8 lg:col-span-7 flex flex-col gap-4">
            <span
                className="w-fit px-3 py-1 rounded-full uppercase tracking-widest"
                style={{ backgroundColor: 'var(--color-white-dark)', color: 'var(--color-black-lighter)', fontSize: 'var(--font-size-xs)', fontWeight: 'var(--font-weight-black)', opacity: 0.8 }}
            >
                {post.category}
            </span>

            <h3
                className="text-[var(--color-black)] group-hover:text-[var(--color-brand-normal)] transition-colors cursor-pointer leading-tight"
                style={{ fontSize: 'var(--font-size-2xl)', fontWeight: 'var(--font-weight-bold)' }}
            >
                {post.title}
            </h3>

            <p
                className="leading-relaxed max-w-2xl line-clamp-2"
                style={{ color: 'var(--color-black-lighter)', fontSize: 'var(--font-size-sm)', fontWeight: 'var(--font-weight-medium)', opacity: 0.7 }}
            >
                {post.description}
            </p>
        </div>
    </div>
);

export function BlogSection() {
    return (
        <div className="w-full bg-white flex flex-col items-center py-16 md:py-24 px-6">
            <div className="w-full max-w-6xl flex flex-col gap-12 md:gap-20">

                {/* Centered Header */}
                <div className="text-center flex flex-col items-center gap-4 max-w-2xl mx-auto">
                    <h2 style={{ color: 'var(--color-black)', fontSize: 'var(--font-size-4xl)', fontWeight: 'var(--font-weight-extrabold)' }}>
                        {SETTINGS.title}
                    </h2>
                    <p style={{ color: 'var(--color-black-lighter)', fontSize: 'var(--font-size-base)', fontWeight: 'var(--font-weight-medium)', opacity: 0.7 }}>
                        {SETTINGS.subtitle}
                    </p>
                </div>

                {/* Vertical List of Posts */}
                <div className="flex flex-col gap-8 md:gap-12">
                    {SETTINGS.posts.map((post, index) => (
                        <BlogCard key={index} post={post} />
                    ))}
                </div>

            </div>
        </div>
    );
}

export default BlogSection;
