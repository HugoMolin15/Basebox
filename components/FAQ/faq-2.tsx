'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FAQItem {
    id: number;
    question: string;
    answer: string;
}

const faqs: FAQItem[] = [
    {
        id: 1,
        question: "What are heat pumps?",
        answer: "Reversible air conditioners that can cool your home in the summer, and heat your home in the winter—all from the same device. They work with and without central air ducts."
    },
    {
        id: 2,
        question: "How much do I get in rebates?",
        answer: "Rebate amounts vary by location and equipment efficiency. Many homeowners qualify for $2,000 or more in federal tax credits plus local utility incentives."
    },
    {
        id: 3,
        question: "How long does it take to get a rebate?",
        answer: "The timeline depends on your local program. Generally, tax credits are claimed during your yearly filing, while utility rebates often take 4-8 weeks to process."
    },
    {
        id: 4,
        question: "How long does it take to get a quote?",
        answer: "Our online quoting system provides an initial estimate in under 5 minutes. A finalized site-specific quote usually follows within 24-48 hours after a technician visit."
    }
];

export function Faq() {
    const [openId, setOpenId] = useState<number | null>(1);

    const toggle = (id: number) => {
        setOpenId(openId === id ? null : id);
    };

    return (
        <section className="w-full py-24 bg-background">
            <div className="max-w-7xl mx-auto px-6 md:px-12">
                <div className="flex flex-col lg:flex-row gap-12 lg:gap-24 w-full">

                    {/* Left Side: Header */}
                    <div className="w-full lg:w-1/3 text-left">
                        <h2
                            className=""
                            style={{ color: 'var(--color-black)', fontSize: 'var(--font-size-4xl)', fontWeight: 'var(--font-weight-extrabold)' }}
                        >
                            Frequently asked questions
                        </h2>
                        <p
                            className="mt-6 leading-relaxed max-w-sm"
                            style={{ color: 'var(--color-black-lighter)', fontSize: 'var(--font-size-lg)', fontWeight: 'var(--font-weight-medium)' }}
                        >
                            Can't find what you're looking for? Reach out to our support team for specialized assistance.
                        </p>
                    </div>

                    {/* Right Side: Accordion Grid */}
                    <div className="w-full lg:w-2/3 flex flex-col gap-4">
                        {faqs.map((faq) => {
                            const isOpen = openId === faq.id;
                            return (
                                <motion.div
                                    layout
                                    key={faq.id}
                                    className={cn(
                                        "faq-card border-gray-thin bg-white transition-all duration-300 shadow-sm",
                                    )}
                                    style={{ borderRadius: 'var(--radius-s)' }}
                                >
                                    <button
                                        onClick={() => toggle(faq.id)}
                                        className="w-full flex items-start gap-4 md:gap-6 p-6 md:p-8 text-left cursor-pointer group focus:outline-none"
                                    >
                                        {/* Minimalist Icons */}
                                        <div className="mt-1.5 shrink-0 transition-colors duration-300">
                                            {isOpen ? (
                                                <Minus className="w-5 h-5" style={{ color: 'var(--color-black)' }} strokeWidth={2.5} />
                                            ) : (
                                                <Plus className="w-5 h-5 transition-colors" style={{ color: 'var(--color-black-lighter)' }} strokeWidth={2.5} />
                                            )}
                                        </div>

                                        <div className="flex flex-col w-full">
                                            <h3
                                                className="transition-colors"
                                                style={{
                                                    color: isOpen ? 'var(--color-black)' : 'var(--color-black-lighter)',
                                                    fontSize: 'var(--font-size-lg)',
                                                    fontWeight: 'var(--font-weight-bold)'
                                                }}
                                            >
                                                {faq.question}
                                            </h3>

                                            <AnimatePresence initial={false}>
                                                {isOpen && (
                                                    <motion.div
                                                        initial={{ height: 0, opacity: 0 }}
                                                        animate={{ height: "auto", opacity: 1 }}
                                                        exit={{ height: 0, opacity: 0 }}
                                                        transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
                                                        className="overflow-hidden"
                                                    >
                                                        <p
                                                            className="leading-relaxed pt-4 max-w-2xl"
                                                            style={{ color: 'var(--color-black-lighter)', fontSize: 'var(--font-size-base)', fontWeight: 'var(--font-weight-medium)' }}
                                                        >
                                                            {faq.answer}
                                                        </p>
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        </div>
                                    </button>
                                </motion.div>
                            );
                        })}
                    </div>

                </div>
            </div>
            <style dangerouslySetInnerHTML={{
                __html: `
                .faq-card:hover h3, .faq-card:hover svg {
                    color: var(--color-brand-normal) !important;
                }
            `}} />
        </section>
    );
}
