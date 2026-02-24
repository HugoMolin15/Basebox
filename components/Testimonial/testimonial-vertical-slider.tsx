'use client';

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface Testimonial {
    text: string;
    image: string;
    name: string;
    role: string;
}

const TestimonialsColumn = (props: {
    className?: string;
    testimonials: Testimonial[];
    duration?: number;
}) => {
    return (
        <div className={cn("flex flex-col", props.className)}>
            <motion.div
                animate={{
                    translateY: "-50%",
                }}
                transition={{
                    duration: props.duration || 10,
                    repeat: Infinity,
                    ease: "linear",
                    repeatType: "loop",
                }}
                className="flex flex-col pb-6"
                style={{ gap: 'var(--spacing-l)' }}
            >
                {[...new Array(2)].map((_, index) => (
                    <React.Fragment key={index}>
                        {props.testimonials.map(({ text, image, name, role }, i) => (
                            <div
                                className="p-8 border-gray-thin shadow-sm max-w-xs w-full bg-white transition-colors hover:bg-zinc-50/50"
                                key={i}
                                style={{ borderRadius: 'var(--radius-s)' }}
                            >
                                <div
                                    className="leading-relaxed italic"
                                    style={{ color: 'var(--color-black-lighter)', fontSize: 'var(--font-size-sm)', fontWeight: 'var(--font-weight-medium)' }}
                                >
                                    "{text}"
                                </div>
                                <div className="flex items-center gap-3 mt-6 pt-6">
                                    <img
                                        width={40}
                                        height={40}
                                        src={image}
                                        alt={name}
                                        className="h-10 w-10 rounded-full object-cover grayscale hover:grayscale-0 transition-all duration-300"
                                    />
                                    <div className="flex flex-col">
                                        <div
                                            className="tracking-tight leading-5"
                                            style={{ color: 'var(--color-black)', fontSize: 'var(--font-size-sm)', fontWeight: 'var(--font-weight-bold)' }}
                                        >
                                            {name}
                                        </div>
                                        <div
                                            className="leading-5 uppercase tracking-widest mt-1"
                                            style={{ color: 'var(--color-black-lighter)', fontSize: '10px', fontWeight: 'var(--font-weight-bold)' }}
                                        >
                                            {role}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </React.Fragment>
                ))}
            </motion.div>
        </div>
    );
};

const testimonials = [
    {
        text: "This platform has completely transformed how we manage our design system. It's intuitive, fast, and incredibly powerful.",
        image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150",
        name: "Alex Morgan",
        role: "Product Designer",
    },
    {
        text: "I was amazed by how quickly we could integrate this into our existing workflow. The documentation is top-notch.",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150",
        name: "David Chen",
        role: "Senior Developer",
    },
    {
        text: "The customer support team went above and beyond to help us get started. Truly exceptional service.",
        image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=150",
        name: "Sarah Williams",
        role: "CTO",
    },
    {
        text: "Vertical scrolling testimonials are a great way to showcase social proof without taking up too much vertical space.",
        image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150",
        name: "Michael Brown",
        role: "Marketing Director",
    },
    {
        text: "A game-changer for our agency. We've seen a 40% increase in client satisfaction since adopting this tool.",
        image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=150",
        name: "Emily Davis",
        role: "Agency Owner",
    },
    {
        text: "Simple, elegant, and effective. Exactly what we were looking for to boost our conversion rates.",
        image: "https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?auto=format&fit=crop&q=80&w=150",
        name: "James Wilson",
        role: "Growth Hacker",
    },
];

const firstColumn = testimonials.slice(0, 3);
const secondColumn = testimonials.slice(2, 5);
const thirdColumn = testimonials.slice(3, 6);

export function Testimonial() {
    return (
        <section className="bg-background py-24 relative w-full overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    viewport={{ once: true }}
                    className="flex flex-col items-center justify-center max-w-[600px] mx-auto text-center mb-16"
                >
                    <div
                        className="inline-block border py-1 px-3 rounded-md uppercase tracking-widest shadow-sm mb-6"
                        style={{
                            backgroundColor: 'color-mix(in srgb, var(--color-brand-normal) 10%, transparent)',
                            borderColor: 'color-mix(in srgb, var(--color-brand-normal) 20%, transparent)',
                            color: 'var(--color-brand-normal)',
                            fontSize: '10px',
                            fontWeight: 'var(--font-weight-bold)'
                        }}
                    >
                        Testimonials
                    </div>

                    <h2
                        className="mb-6"
                        style={{ color: 'var(--color-black)', fontSize: 'var(--font-size-4xl)', fontWeight: 'var(--font-weight-extrabold)' }}
                    >
                        Trusted by experts
                    </h2>
                    <p
                        className=""
                        style={{ color: 'var(--color-black-lighter)', fontSize: 'var(--font-size-lg)', fontWeight: 'var(--font-weight-normal)' }}
                    >
                        Join thousands of teams who have transformed their business using our modern infrastructure.
                    </p>
                </motion.div>

                <div
                    className="flex justify-center [mask-image:linear-gradient(to_bottom,transparent,black_15%,black_85%,transparent)] max-h-[700px] overflow-hidden"
                    style={{ gap: 'var(--spacing-l)' }}
                >
                    <TestimonialsColumn testimonials={firstColumn} duration={25} />
                    <TestimonialsColumn testimonials={secondColumn} className="hidden md:flex" duration={35} />
                    <TestimonialsColumn testimonials={thirdColumn} className="hidden lg:flex" duration={30} />
                </div>
            </div>
        </section>
    );
};
