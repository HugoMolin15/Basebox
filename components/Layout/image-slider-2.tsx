'use client';

import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ImagePrimitive } from '@/components/Media/image-primitive';

export interface ImageSlider2Item {
    id: number;
    type: 'text' | 'image';
    content?: string;
    author?: string;
    role?: string;
    imageSrc?: string;
}

export interface ImageSlider2Props {
    title?: string | React.ReactNode;
    description?: string;
    items?: ImageSlider2Item[];
    className?: string;
}

const defaultItems: ImageSlider2Item[] = [
    {
        id: 1,
        type: 'text',
        content: "From start to finish, the team was professional and efficient. The automated sizing and quoting tools saved us both time and budget on our Q1 rollout.",
        author: "Kylie Jefferson",
        role: "Project Manager"
    },
    { id: 2, type: 'image', imageSrc: "https://i.pinimg.com/1200x/f2/07/0c/f2070ca40e6b6106386849db1044c9d0.jpg" },
    {
        id: 3,
        type: 'text',
        content: "I was skeptical about the integration speed, but Basebox blew me away. No hidden costs or complexity—just a straightforward, high-performance experience.",
        author: "Tomas Gibson",
        role: "CTO, TechFlow"
    },
    { id: 4, type: 'image', imageSrc: "https://i.pinimg.com/1200x/ba/b4/a8/bab4a80dd3f989ca4fa305944639812d.jpg" },
    {
        id: 5,
        type: 'text',
        content: "The best investment we've made for our internal infrastructure. The transition was seamless and the results in performance metrics speak for themselves.",
        author: "Sarah Chen",
        role: "Operations Lead"
    },
    { id: 6, type: 'image', imageSrc: "https://i.pinimg.com/1200x/39/fa/62/39fa62821f86b475f8faed3ab38cb124.jpg" }
];

export function ImageSlider2({
    title = <>Our experience<br />runs deep</>,
    description = "See why teams trust Basebox for their modern web infrastructure.",
    items = defaultItems,
    className
}: ImageSlider2Props) {
    const scrollRef = useRef<HTMLDivElement>(null);

    const scroll = (direction: 'left' | 'right') => {
        if (scrollRef.current) {
            const { scrollLeft, clientWidth } = scrollRef.current;
            const scrollAmount = clientWidth * 0.8;
            scrollRef.current.scrollTo({
                left: direction === 'left' ? scrollLeft - scrollAmount : scrollLeft + scrollAmount,
                behavior: 'smooth'
            });
        }
    };

    return (
        <section className={cn("w-full py-24 bg-background overflow-hidden", className)}>
            <div className="max-w-7xl mx-auto px-6">
                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
                    <div className="space-y-4">
                        <h2
                            className="leading-tight"
                            style={{ color: 'var(--color-black)', fontSize: 'var(--font-size-4xl)', fontWeight: 'var(--font-weight-extrabold)' }}
                        >
                            {title}
                        </h2>
                        <p
                            className=""
                            style={{ color: 'var(--color-black-lighter)', fontSize: 'var(--font-size-lg)', fontWeight: 'var(--font-weight-normal)' }}
                        >
                            {description}
                        </p>
                    </div>
                    <div className="hidden md:flex gap-2">
                        <button
                            onClick={() => scroll('left')}
                            className="w-12 h-12 rounded-full border-gray-thin flex items-center justify-center hover:bg-zinc-50 transition-all cursor-pointer group active:scale-95"
                        >
                            <ChevronLeft size={20} className="transition-colors group-hover:text-black" style={{ color: 'var(--color-black-lighter)' }} />
                        </button>
                        <button
                            onClick={() => scroll('right')}
                            className="w-12 h-12 rounded-full border-gray-thin flex items-center justify-center hover:bg-zinc-50 transition-all cursor-pointer group active:scale-95"
                        >
                            <ChevronRight size={20} className="transition-colors group-hover:text-black" style={{ color: 'var(--color-black-lighter)' }} />
                        </button>
                    </div>
                </div>

                {/* Carousel Container */}
                <div
                    ref={scrollRef}
                    className="flex overflow-x-auto no-scrollbar snap-x snap-mandatory pb-8"
                    style={{ gap: 'var(--spacing-l)' }}
                >
                    {items.map((item) => (
                        <div
                            key={item.id}
                            className="min-w-[320px] md:min-w-[450px] h-[550px] snap-start"
                        >
                            {item.type === 'text' ? (
                                <div
                                    className="w-full h-full border-gray-thin p-10 flex flex-col justify-between relative overflow-hidden group bg-white"
                                    style={{ borderRadius: 'var(--radius-s)' }}
                                >
                                    <div className="relative z-10">
                                        <span
                                            className="font-black text-4xl leading-none opacity-50 block mb-6 outline-none"
                                            style={{ color: 'var(--color-brand-normal)' }}
                                        >
                                            “
                                        </span>
                                        <p
                                            className="leading-relaxed tracking-tight"
                                            style={{ color: 'var(--color-black)', fontSize: 'var(--font-size-xl)', fontWeight: 'var(--font-weight-medium)' }}
                                        >
                                            {item.content}
                                        </p>
                                    </div>

                                    <div className="flex items-center gap-4 relative z-10">
                                        <div
                                            className="w-12 h-12 rounded-full flex-shrink-0 border"
                                            style={{ borderStyle: 'solid', borderColor: 'color-mix(in srgb, var(--color-brand-normal) 20%, transparent)', backgroundColor: 'color-mix(in srgb, var(--color-brand-normal) 10%, transparent)' }}
                                        />
                                        <div>
                                            <h4
                                                className="tracking-tight"
                                                style={{ color: 'var(--color-black)', fontSize: 'var(--font-size-sm)', fontWeight: 'var(--font-weight-bold)' }}
                                            >
                                                {item.author}
                                            </h4>
                                            <p
                                                className="uppercase tracking-widest mt-1"
                                                style={{ color: 'var(--color-black-lighter)', fontSize: '10px', fontWeight: 'var(--font-weight-bold)' }}
                                            >
                                                {item.role}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Brand Accent Glow */}
                                    <div
                                        className="absolute bottom-[-100px] right-[-100px] w-64 h-64 blur-[100px] rounded-full pointer-events-none"
                                        style={{ backgroundColor: 'color-mix(in srgb, var(--color-brand-normal) 5%, transparent)' }}
                                    />
                                </div>
                            ) : (
                                <div
                                    className="w-full h-full flex items-center justify-center overflow-hidden relative group"
                                    style={{ borderRadius: 'var(--radius-s)' }}
                                >
                                    <ImagePrimitive
                                        src={item.imageSrc || "https://i.pinimg.com/1200x/f2/07/0c/f2070ca40e6b6106386849db1044c9d0.jpg"}
                                        imageVariant="none"
                                        aspectRatio="none"
                                        className="w-full h-full"
                                        style={{ borderRadius: 'var(--radius-s)' }}
                                    />
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                {/* Mobile Navigation */}
                <div className="flex md:hidden justify-center gap-4 mt-8">
                    <button
                        onClick={() => scroll('left')}
                        className="w-12 h-12 rounded-full border-gray-thin flex items-center justify-center active:scale-95"
                    >
                        <ChevronLeft size={20} style={{ color: 'var(--color-black-lighter)' }} />
                    </button>
                    <button
                        onClick={() => scroll('right')}
                        className="w-12 h-12 rounded-full border-gray-thin flex items-center justify-center active:scale-95"
                    >
                        <ChevronRight size={20} style={{ color: 'var(--color-black-lighter)' }} />
                    </button>
                </div>
            </div>

            <style jsx global>{`
                .no-scrollbar::-webkit-scrollbar {
                    display: none;
                }
                .no-scrollbar {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }
            `}</style>
        </section>
    );
}
