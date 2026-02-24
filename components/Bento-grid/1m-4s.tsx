'use client';

import { ImagePrimitive } from '@/components/Media/image-primitive';

export interface BentoItem {
    title: string;
    description?: string;
    imageSrc: string;
    type: 'card' | 'image';
    className?: string;
}

const DEFAULT_ITEMS: BentoItem[] = [
    {
        title: "75% of households",
        description: "Regularly reviewing and analyzing expenses helps",
        imageSrc: "",
        type: 'card',
        className: "flex-1 p-8 flex flex-col justify-center min-h-[250px]"
    },
    {
        title: "Analytics",
        imageSrc: "https://i.pinimg.com/736x/7a/8e/c1/7a8ec1381595cfe300899192af9f9c09.jpg",
        type: 'image',
        className: "flex-1 min-h-[250px]"
    },
    {
        title: "$3000+ Saved",
        description: "Strategic Financial Planning. Our automated algorithms analyze every transaction to identify patterns and suggest high-impact saving opportunities.",
        imageSrc: "",
        type: 'card',
        className: "h-full min-h-[500px] lg:min-h-0 bg-brand-primary/5"
    },
    {
        title: "Process",
        imageSrc: "https://i.pinimg.com/1200x/f6/25/59/f62559ce30e4be521a4db3acfc8640c9.jpg",
        type: 'image',
        className: "flex-1 min-h-[250px]"
    },
    {
        title: "24 hours",
        description: "Real-time processing ensures your data is never more than a few seconds behind the actual transaction.",
        imageSrc: "",
        type: 'card',
        className: "flex-1 p-8 flex flex-col justify-end min-h-[250px]"
    }
];

export function BentoGrid() {
    return (
        <section className="w-full py-24 bg-background">
            <div className="max-w-7xl mx-auto px-6">
                <div
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 auto-rows-fr lg:h-[700px]"
                    style={{ gap: 'var(--spacing-l)' }}
                >

                    {/* Left Column (Stats & Visual) */}
                    <div
                        className="flex flex-col h-full"
                        style={{ gap: 'var(--spacing-l)' }}
                    >
                        {/* 75% Small Card */}
                        <div
                            className={cn("border-gray-thin", DEFAULT_ITEMS[0].className)}
                            style={{ borderRadius: 'var(--radius-s)' }}
                        >
                            <p
                                className="uppercase tracking-wider mb-4 leading-relaxed max-w-[200px]"
                                style={{ color: 'var(--color-black-lighter)', fontSize: 'var(--font-size-xs)', fontWeight: 'var(--font-weight-bold)' }}
                            >
                                {DEFAULT_ITEMS[0].description}
                            </p>
                            <h3
                                className="mt-auto"
                                style={{ color: 'var(--color-black)', fontSize: 'var(--font-size-4xl)', fontWeight: 'var(--font-weight-extrabold)' }}
                            >
                                {DEFAULT_ITEMS[0].title}
                            </h3>
                        </div>
                        {/* Image Placeholder (Bottom Left) */}
                        <div
                            className={cn("overflow-hidden group relative", DEFAULT_ITEMS[1].className)}
                            style={{ borderRadius: 'var(--radius-s)' }}
                        >
                            <ImagePrimitive
                                src={DEFAULT_ITEMS[1].imageSrc}
                                aspectRatio="none"
                                imageVariant="none"
                                className="w-full h-full"
                            />
                        </div>
                    </div>

                    {/* Middle Column (Large Tall Card - The "Main") */}
                    <div className="h-full">
                        <div
                            className={cn("h-full border-gray-thin overflow-hidden relative group p-6 md:p-8 flex flex-col justify-between bg-zinc-50/50", DEFAULT_ITEMS[2].className)}
                            style={{ borderRadius: 'var(--radius-s)' }}
                        >
                            <div className="relative z-10">
                                <h3
                                    className="tracking-tighter"
                                    style={{ color: 'var(--color-black)', fontSize: 'var(--font-size-6xl)', fontWeight: 'var(--font-weight-black)' }}
                                >
                                    {DEFAULT_ITEMS[2].title}
                                </h3>
                            </div>

                            <div className="relative z-10 max-w-[280px]">
                                <p
                                    className="uppercase tracking-wider mb-2"
                                    style={{ color: 'var(--color-black)', fontSize: 'var(--font-size-xs)', fontWeight: 'var(--font-weight-bold)' }}
                                >
                                    Strategic Financial Planning
                                </p>
                                <p
                                    className="leading-relaxed"
                                    style={{ color: 'var(--color-black-lighter)', fontSize: 'var(--font-size-xs)', fontWeight: 'var(--font-weight-normal)' }}
                                >
                                    Our automated algorithms analyze every transaction to identify patterns and suggest high-impact saving opportunities.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Right Column (Visual & 24 Hours) */}
                    <div
                        className="flex flex-col h-full md:col-span-2 lg:col-span-1"
                        style={{ gap: 'var(--spacing-l)' }}
                    >
                        {/* Image Placeholder (Top Right) */}
                        <div
                            className={cn("overflow-hidden group relative", DEFAULT_ITEMS[3].className)}
                            style={{ borderRadius: 'var(--radius-s)' }}
                        >
                            <ImagePrimitive
                                src={DEFAULT_ITEMS[3].imageSrc}
                                aspectRatio="none"
                                imageVariant="none"
                                className="w-full h-full"
                            />
                        </div>
                        {/* 24 Hours Card */}
                        <div
                            className={cn("border-gray-thin", DEFAULT_ITEMS[4].className)}
                            style={{ borderRadius: 'var(--radius-s)' }}
                        >
                            <h3
                                className="mb-8"
                                style={{ color: 'var(--color-black)', fontSize: 'var(--font-size-4xl)', fontWeight: 'var(--font-weight-extrabold)' }}
                            >
                                {DEFAULT_ITEMS[4].title}
                            </h3>
                            <p
                                className="leading-relaxed max-w-[240px]"
                                style={{ color: 'var(--color-black-lighter)', fontSize: 'var(--font-size-xs)', fontWeight: 'var(--font-weight-normal)' }}
                            >
                                {DEFAULT_ITEMS[4].description}
                            </p>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}

import { cn } from '@/lib/utils';
