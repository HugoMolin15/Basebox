'use client';

import React from 'react';
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { ChevronDown } from "lucide-react";
import { cn } from '@/lib/utils';

/**
 * CONFIGURATION FIRST
 */
const SETTINGS = {
    header: {
        title: "Frequently Asked Questions",
        description: "Here are some common questions and answers. If you don't find the answer you're looking for, feel free to reach out.",
        supportText: "Can't find what you're looking for? Contact our ",
        supportLink: {
            text: "customer support team",
            href: "#"
        }
    },
    faqs: [
        {
            id: 'item-1',
            title: 'What is the Basebox component library?',
            content: 'Basebox is a collection of beautifully crafted UI blocks and components, designed to help developers build modern websites completely within their existing technology stacks.',
        },
        {
            id: 'item-2',
            title: 'Who can benefit from this platform?',
            content: 'It is built for founders, product teams, and engineering agencies that want to accelerate idea validation and delivery without sacrificing absolute design mastery.',
        },
        {
            id: 'item-3',
            title: 'Can I customize components provided here?',
            content: 'Yes. Basebox offers editable design systems and raw copy-pasteable code scaffolding so you can tailor the React hooks, Tailwind styles, and raw data to your exact project workflow.',
        },
        {
            id: 'item-4',
            title: 'Does this integrate with my existing tools?',
            content: 'All blocks are designed to seamlessly paste straight into your Next.js, Vite, or raw React projects without fighting existing frameworks.',
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
                "flex flex-1 items-center justify-between py-4 transition-all text-left [&[data-state=open]>svg]:rotate-180 cursor-pointer outline-none",
                className
            )}
            style={{ color: 'var(--color-black)', fontWeight: 'var(--font-weight-bold)' }}
            {...props}
        >
            {children}
            <ChevronDown
                className="h-5 w-5 shrink-0 transition-transform duration-200"
                style={{ color: 'var(--color-black-lighter)' }}
            />
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

export function Faq4() {
    return (
        <section className="w-full bg-background flex items-center justify-center p-4 py-24">
            <div className="mx-auto w-full max-w-3xl space-y-12">
                <div className="space-y-4">
                    <h2
                        className=""
                        style={{ color: 'var(--color-black)', fontSize: 'var(--font-size-4xl)', fontWeight: 'var(--font-weight-extrabold)' }}
                    >
                        {SETTINGS.header.title}
                    </h2>
                    <p
                        className="max-w-2xl leading-relaxed"
                        style={{ color: 'var(--color-black-lighter)', fontSize: 'var(--font-size-lg)', fontWeight: 'var(--font-weight-medium)' }}
                    >
                        {SETTINGS.header.description}
                    </p>
                </div>

                <div
                    className="border-gray-thin bg-white shadow-sm"
                    style={{ borderRadius: 'var(--radius-s)' }}
                >
                    <Accordion
                        type="single"
                        collapsible
                        className="w-full -space-y-px"
                        defaultValue="item-1"
                    >
                        {SETTINGS.faqs.map((item) => (
                            <AccordionItem
                                value={item.id}
                                key={item.id}
                                className="relative px-2 first:border-t-0 last:border-b-0"
                            >
                                <AccordionTrigger
                                    className="px-4 py-5 hover:no-underline"
                                    style={{ fontSize: 'var(--font-size-lg)' }}
                                >
                                    {item.title}
                                </AccordionTrigger>
                                <AccordionContent
                                    className="px-4 leading-relaxed"
                                    style={{ color: 'var(--color-black-lighter)', fontSize: 'var(--font-size-base)', fontWeight: 'var(--font-weight-medium)' }}
                                >
                                    {item.content}
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                </div>

                <p style={{ color: 'var(--color-black-lighter)', fontWeight: 'var(--font-weight-medium)' }}>
                    {SETTINGS.header.supportText}
                    <a
                        href={SETTINGS.header.supportLink.href}
                        className="hover:underline transition-colors"
                        style={{ color: 'var(--color-brand-normal)', fontWeight: 'var(--font-weight-bold)' }}
                    >
                        {SETTINGS.header.supportLink.text}
                    </a>
                </p>
            </div>
            <style dangerouslySetInnerHTML={{
                __html: `
                [data-radix-collection-item]:hover {
                    color: var(--color-brand-normal) !important;
                }
                [data-state=open] > button {
                    color: var(--color-brand-normal) !important;
                }
            `}} />
        </section>
    );
}
