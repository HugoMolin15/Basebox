'use client'

import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Plus } from 'lucide-react';
import { cn } from '@/lib/utils';

/**
 * CONFIGURATION FIRST
 */
const SETTINGS = {
    header: {
        title: "Frequently Asked Questions",
        subtitle: "Let's answer some questions",
    },
    faqs: [
        {
            question: "What is web development?",
            answer: "Web development is the process of building and maintaining websites. It involves a combination of client-side and server-side programming, database management, and other web-related technologies."
        },
        {
            question: "What programming languages are essential for web development?",
            answer: "Essential languages for web development include HTML, CSS, and JavaScript for front-end development. For back-end development, popular languages include Python, Ruby, PHP, Java, and Node.js."
        },
        {
            question: "What's the difference between front-end and back-end development?",
            answer: "Front-end development focuses on the user interface and user experience of a website, while back-end development deals with server-side logic, databases, and application integration."
        },
        {
            question: "How long does it typically take to develop a website?",
            answer: "The time to develop a website can vary greatly depending on its complexity. A simple static website might take a few days, while a complex web application could take several months or even years."
        },
        {
            question: "What is responsive web design?",
            answer: "Responsive web design is an approach to web design that makes web pages render well on a variety of devices and window or screen sizes. It ensures that websites are accessible and visually appealing across different platforms."
        }
    ]
};

export function Faq3() {
    return (
        <section className="w-full bg-background relative overflow-hidden px-4 flex flex-col items-center justify-center py-24">
            <Faq3Styles />
            <FAQHeader title={SETTINGS.header.title} subtitle={SETTINGS.header.subtitle} />
            <FAQList faqs={SETTINGS.faqs} />
        </section>
    );
}

const FAQHeader = ({ title, subtitle }: { title: string, subtitle: string }) => (
    <div className="relative z-10 flex flex-col items-center justify-center w-full max-w-3xl text-center">
        <span
            className="mb-4 uppercase tracking-[0.2em]"
            style={{ color: 'var(--color-brand-normal)', fontSize: '10px', fontWeight: 'var(--font-weight-bold)' }}
        >
            {subtitle}
        </span>
        <h2
            className="mb-12"
            style={{ color: 'var(--color-black)', fontSize: 'var(--font-size-4xl)', fontWeight: 'var(--font-weight-extrabold)' }}
        >
            {title}
        </h2>
    </div>
);

const FAQList = ({ faqs }: { faqs: { question: string, answer: string }[] }) => (
    <div className="mx-auto mt-4 max-w-2xl w-full z-10 relative">
        <div className="flex flex-col gap-4 w-full">
            {faqs.map((faq, index) => (
                <FAQItem key={index} {...faq} />
            ))}
        </div>
    </div>
);

const FAQItem = ({ question, answer }: { question: string, answer: string }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <motion.div
            animate={isOpen ? "open" : "closed"}
            className={cn(
                "faq-item-container border-gray-thin bg-white transition-all duration-300 overflow-hidden shadow-sm",
            )}
            style={{ borderRadius: 'var(--radius-s)' }}
        >
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex w-full items-center justify-between gap-6 p-5 md:p-6 text-left cursor-pointer outline-none group"
            >
                <span
                    className="question-text transition-colors duration-300"
                    style={{
                        color: isOpen ? 'var(--color-black)' : 'var(--color-black-lighter)',
                        fontSize: 'var(--font-size-lg)',
                        fontWeight: 'var(--font-weight-bold)'
                    }}
                >
                    {question}
                </span>
                <motion.span
                    variants={{
                        open: { rotate: "45deg" },
                        closed: { rotate: "0deg" },
                    }}
                    transition={{ duration: 0.2 }}
                    className="shrink-0"
                >
                    <Plus
                        className="h-5 w-5 transition-colors duration-300"
                        style={{ color: isOpen ? 'var(--color-black)' : 'var(--color-black-lighter)' }}
                        strokeWidth={2.5}
                    />
                </motion.span>
            </button>
            <motion.div
                initial={false}
                animate={{
                    height: isOpen ? "auto" : "0px",
                    opacity: isOpen ? 1 : 0
                }}
                transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
                className="px-5 md:px-6"
            >
                <p
                    className="pb-5 md:pb-6 leading-relaxed"
                    style={{ color: 'var(--color-black-lighter)', fontSize: 'var(--font-size-base)', fontWeight: 'var(--font-weight-medium)' }}
                >
                    {answer}
                </p>
            </motion.div>
        </motion.div>
    );
};

export const Faq3Styles = () => (
    <style dangerouslySetInnerHTML={{
        __html: `
        .faq-item-container:hover .question-text {
            color: var(--color-brand-normal) !important;
        }
    `}} />
);
