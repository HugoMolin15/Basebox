'use client';

import { ImagePrimitive } from '@/components/Media/image-primitive';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface BentoCard {
    title: string;
    description: string;
    imageSrc: string;
    tag?: string;
    className?: string;
}

const DEFAULT_CARDS: BentoCard[] = [
    {
        title: "Unified dashboard",
        description: "Track all your assets, income, and growth metrics in one intuitive interface.",
        imageSrc: "https://i.pinimg.com/1200x/f0/2d/6c/f02d6cd899dda88d7d59df3ad3e6c930.jpg",
        className: "col-span-1 row-span-1"
    },
    {
        title: "Collaborative",
        description: "Sub-agents work together seamlessly to handle complex scenarios, achieving superior results.",
        imageSrc: "https://i.pinimg.com/1200x/b1/1f/ec/b11fec719d9329e484e888ce13519bed.jpg",
        className: "col-span-1 row-span-1"
    },
    {
        title: "Smart systems. Smarter growth.",
        description: "Data-driven insights to help you secure the best high-demand assets with consistent returns.",
        imageSrc: "https://i.pinimg.com/736x/72/1e/82/721e82ae54924e2f25973abad5a64fcc.jpg",
        tag: "Sustainable",
        className: "col-span-1 md:col-span-2 lg:col-span-1 lg:row-span-2 bg-library-card/50"
    },
    {
        title: "From single assets to a global empire",
        description: "Our coordinated systems handle the complexities of asset management, leaving you with consistent monthly returns.",
        imageSrc: "https://i.pinimg.com/736x/9b/93/ec/9b93ec9f2bfef3c1cdbf859294ec1155.jpg",
        className: "col-span-1 md:col-span-2 row-span-1 is-horizontal"
    }
];

export function BentoGrid({ cards = DEFAULT_CARDS }: { cards?: BentoCard[] }) {
    return (
        <section className="w-full py-24 bg-background">
            <div className="max-w-7xl mx-auto px-6">
                <div
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 auto-rows-[minmax(300px,auto)]"
                    style={{ gap: 'var(--spacing-l)' }}
                >

                    {cards.map((card, idx) => {
                        const isHorizontal = card.className?.includes('is-horizontal');
                        const isTall = card.className?.includes('row-span-2');

                        return (
                            <div
                                key={idx}
                                className={cn(
                                    "relative z-0 border-gray-thin p-8 flex flex-col overflow-hidden bg-white",
                                    isHorizontal ? "md:flex-row md:items-center gap-12" : "",
                                    card.className
                                )}
                                style={{ borderRadius: 'var(--radius-s)' }}
                            >
                                <div className={cn(
                                    "relative z-10",
                                    isHorizontal ? "w-full lg:w-[45%] flex flex-col items-center text-center lg:items-start lg:text-left mb-8 lg:mb-0" : "mb-8 text-center items-center flex flex-col"
                                )}>
                                    {card.tag && (
                                        <span
                                            className="px-3 py-1 rounded-md uppercase tracking-wider mb-6 shadow-sm border block w-fit"
                                            style={{
                                                backgroundColor: 'color-mix(in srgb, var(--color-brand-normal) 10%, transparent)',
                                                borderColor: 'color-mix(in srgb, var(--color-brand-normal) 20%, transparent)',
                                                color: 'var(--color-brand-normal)',
                                                fontSize: '10px',
                                                fontWeight: 'var(--font-weight-bold)'
                                            }}
                                        >
                                            {card.tag}
                                        </span>
                                    )}
                                    <h3
                                        className="mb-3 leading-tight"
                                        style={{
                                            color: 'var(--color-black)',
                                            fontSize: isHorizontal ? 'var(--font-size-2xl)' : 'var(--font-size-base)',
                                            fontWeight: 'var(--font-weight-bold)'
                                        }}
                                    >
                                        {card.title}
                                    </h3>
                                    <p
                                        className="leading-relaxed"
                                        style={{
                                            color: 'var(--color-black-lighter)',
                                            fontSize: isHorizontal ? 'var(--font-size-base)' : 'var(--font-size-sm)',
                                            fontWeight: 'var(--font-weight-normal)'
                                        }}
                                    >
                                        {card.description}
                                    </p>
                                    {isHorizontal && (
                                        <button className="btn-primary btn-md btn-pill flex items-center group mt-8">
                                            Start growing
                                            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform ml-2" />
                                        </button>
                                    )}
                                </div>

                                {/* Image area */}
                                <div
                                    className={cn(
                                        "relative overflow-hidden mt-auto border-gray-thin bg-muted/50",
                                        isHorizontal ? "w-full lg:w-[55%] h-64" : `w-full flex-1 min-h-[10rem] ${isTall ? 'max-h-72 lg:max-h-none' : 'max-h-72'}`
                                    )}
                                    style={{ borderRadius: 'var(--radius-s)' }}
                                >
                                    <ImagePrimitive
                                        src={card.imageSrc}
                                        aspectRatio="none"
                                        imageVariant="none"
                                        className="w-full h-full object-cover object-center"
                                    />
                                </div>
                            </div>
                        );
                    })}

                </div>
            </div>
        </section>
    );
}
