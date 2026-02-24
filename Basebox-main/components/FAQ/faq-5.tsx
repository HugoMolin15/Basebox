'use client';

import React from 'react';
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { ChevronDown } from "lucide-react";
import { cn } from '@/lib/utils';

/**
 * CONFIGURATION FIRST
 */
const SETTINGS = {
    faqs: [
        {
            id: "1",
            title: "Who am I?",
            content: "I’m Ali Imam — a designer and creative developer focused on building digital experiences that are minimal, meaningful, and timeless.",
        },
        {
            id: "2",
            title: "What do I design?",
            content: "I create clean, functional interfaces, brand systems, and digital products. My work blends simplicity with clarity and usability.",
        },
        {
            id: "3",
            title: "My design approach",
            content: "For me, design isn’t just visuals — it’s how something feels and works. I focus on clarity, detail, and storytelling in every project.",
        },
        {
            id: "4",
            title: "Beyond design",
            content: "I bridge design and development, turning ideas into interactive experiences with modern tools and technology.",
        },
        {
            id: "5",
            title: "What inspires me",
            content: "Minimalism, architecture, and everyday details. I believe great design is found in the small things we often overlook.",
        },
        {
            id: "6",
            title: "Who I work with",
            content: "I collaborate with startups, brands, and individuals who value thoughtful design and want to create lasting impact.",
        },
        {
            id: "7",
            title: "My toolkit",
            content: "Figma, Next.js, and modern frameworks are part of my process — but for me, tools always serve the idea, not the other way around.",
        },
        {
            id: "8",
            title: "Let’s connect",
            content: "You can reach me through contact@aliimam.in or on social platforms. I’m always open to new projects, collaborations, and conversations.",
        },
    ]
};

const Accordion = AccordionPrimitive.Root;

const AccordionItem = React.forwardRef<
    React.ElementRef<typeof AccordionPrimitive.Item>,
    React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>
>(({ className, ...props }, ref) => (
    <AccordionPrimitive.Item
        ref={ref}
        className={cn("border-b", className)}
        style={{ borderColor: 'var(--color-white-dark)' }}
        {...props}
    />
));
AccordionItem.displayName = "AccordionItem";

const AccordionTrigger = React.forwardRef<
    React.ElementRef<typeof AccordionPrimitive.Trigger>,
    React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
    <AccordionPrimitive.Header className="flex">
        <AccordionPrimitive.Trigger
            ref={ref}
            className={cn(
                "flex flex-1 items-center justify-between py-4 transition-all text-left outline-none cursor-pointer",
                className
            )}
            {...props}
        >
            {children}
            <ChevronDown className="h-5 w-5 shrink-0 transition-transform duration-200 hidden" />
        </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
));
AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName;

const AccordionContent = React.forwardRef<
    React.ElementRef<typeof AccordionPrimitive.Content>,
    React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>
>(({ className, children, ...props }, ref) => (
    <AccordionPrimitive.Content
        ref={ref}
        className="overflow-hidden transition-all data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down"
        {...props}
    >
        <div className={cn("pb-5 pt-0", className)}>{children}</div>
    </AccordionPrimitive.Content>
));
AccordionContent.displayName = AccordionPrimitive.Content.displayName;

export function Faq5() {
    return (
        <section className="w-full bg-background flex flex-col items-center justify-center p-4 py-24">
            <div className="w-full max-w-4xl mx-auto">
                <Accordion type="single" defaultValue="1" collapsible className="w-full">
                    {SETTINGS.faqs.map((item) => (
                        <AccordionItem value={item.id} key={item.id} className="last:border-b-0">
                            <AccordionTrigger
                                className="pl-6 md:pl-14 overflow-hidden duration-300 hover:no-underline -space-y-6 data-[state=open]:space-y-0 [&>svg]:hidden mb-4 transition-colors"
                                style={{ color: 'var(--color-black-lighter)' }}
                            >
                                <div
                                    className="flex flex-1 items-start gap-4 md:gap-8 group"
                                    style={{ color: 'inherit' }}
                                >
                                    <p
                                        className="pt-1 md:pt-3"
                                        style={{ color: 'inherit', fontSize: 'var(--font-size-sm)', fontWeight: 'var(--font-weight-bold)' }}
                                    >
                                        {item.id}
                                    </p>
                                    <h1
                                        className="uppercase relative text-left"
                                        style={{
                                            color: 'inherit',
                                            fontSize: 'var(--font-size-5xl)',
                                            fontWeight: 'var(--font-weight-black)',
                                            lineHeight: '1'
                                        }}
                                    >
                                        {item.title}
                                    </h1>
                                </div>
                            </AccordionTrigger>

                            <AccordionContent
                                className="pb-8 pl-6 pr-4 md:px-20 leading-relaxed max-w-2xl"
                                style={{ color: 'var(--color-black-lighter)', fontSize: 'var(--font-size-lg)', fontWeight: 'var(--font-weight-medium)' }}
                            >
                                {item.content}
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
                <style dangerouslySetInnerHTML={{
                    __html: `
                    [data-state=open] h1, [data-state=open] p {
                        color: var(--color-brand-normal) !important;
                    }
                    button:hover h1, button:hover p {
                        color: var(--color-black) !important;
                    }
                `}} />
            </div>
        </section>
    );
}
