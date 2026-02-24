'use client'

import React from 'react'
import { Github, Twitter, Linkedin, ArrowRight, Hexagon } from 'lucide-react'
import { cn } from '@/lib/utils'

/**
 * CONFIGURATION FIRST
 */
const SETTINGS = {
    logoText: "SEEKER",
    description: "Next-generation interface primitives for the modern web. Built for speed, designed for awe.",
    newsletterPlaceholder: "Enter your signal...",
    publishedBy: "// PUBLISHED_BY_BASEBOX",
    statusText: "All Systems Normal",
    sections: [
        { title: "Product", links: ["Components", "Templates", "Pricing", "Features"] },
        { title: "Company", links: ["About", "Careers", "Legal", "Blog"] },
        { title: "Connect", links: ["Twitter", "GitHub", "Discord", "Whatsapp"] }
    ],
    socials: [
        { icon: Github, href: "#" },
        { icon: Twitter, href: "#" },
        { icon: Linkedin, href: "#" },
    ]
};

export function Footer3() {
    return (
        <div className="w-full bg-white flex flex-col justify-end">
            {/* Fake content buffer for iframe showcase accuracy */}
            <div className="flex-1" />

            <footer
                className="w-full mx-auto bg-white flex flex-wrap pt-16 pb-8 relative overflow-hidden"
                style={{ borderTopLeftRadius: 'var(--radius-s)', borderTopRightRadius: 'var(--radius-s)' }}
            >
                <style dangerouslySetInnerHTML={{
                    __html: `
                    .social-icon-link:hover {
                        color: var(--color-brand-normal) !important;
                    }
                    .lib-input:focus {
                        outline: none !important;
                        box-shadow: none !important;
                        border-color: var(--color-white-dark) !important;
                    }
                `}} />

                {/* Background Tech Pattern */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.02)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(circle_at_center,black,transparent_80%)] pointer-events-none" />

                <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 w-full">
                    <div className="grid grid-cols-2 md:grid-cols-12 gap-12 md:gap-8 mb-16">

                        {/* Brand Column (Span 4) */}
                        <div className="col-span-2 md:col-span-5 flex flex-col gap-6">
                            <div className="flex items-center gap-2">
                                <Hexagon
                                    className="animate-pulse"
                                    size={24}
                                    style={{ color: 'var(--color-brand-normal)', fill: 'rgba(var(--color-brand-normal-rgb), 0.1)' }}
                                />
                                <h2
                                    className="tracking-tighter"
                                    style={{ color: 'var(--color-black)', fontSize: 'var(--font-size-2xl)', fontWeight: 'var(--font-weight-bold)' }}
                                >
                                    {SETTINGS.logoText}
                                </h2>
                            </div>
                            <p
                                className="leading-relaxed max-w-sm"
                                style={{ color: 'var(--color-black-lighter)', fontSize: 'var(--font-size-base)', fontWeight: 'var(--font-weight-medium)' }}
                            >
                                {SETTINGS.description}
                            </p>

                            {/* Minimal Input */}
                            <div className="flex items-center gap-2 mt-2 group w-full max-w-sm">
                                <div className="relative flex-1">
                                    <input
                                        type="email"
                                        placeholder={SETTINGS.newsletterPlaceholder}
                                        className="lib-input border-gray-thin px-4 md:px-6 py-3 focus:ring-0 focus:outline-none"
                                        style={{ borderRadius: 'var(--radius-pill)', fontSize: 'var(--font-size-sm)' }}
                                    />
                                </div>
                                <button className="btn-primary btn-md btn-pill px-4 md:px-6 whitespace-nowrap">
                                    Connect
                                </button>
                            </div>
                        </div>

                        {/* Links Columns (Span 2 each) */}
                        {SETTINGS.sections.map((section, idx) => (
                            <div key={idx} className="col-span-1 md:col-span-2 flex flex-col gap-4">
                                <h4
                                    className="uppercase tracking-widest"
                                    style={{ color: 'var(--color-black-lighter)', fontSize: 'var(--font-size-xs)', fontWeight: 'var(--font-weight-black)', opacity: 0.5 }}
                                >
                                    {section.title}
                                </h4>
                                <ul className="flex flex-col gap-3">
                                    {section.links.map((link) => (
                                        <li key={link}>
                                            <a
                                                href="#"
                                                className="transition-colors flex items-center gap-2 group w-fit cursor-pointer hover:text-[var(--color-brand-normal)]"
                                                style={{ color: 'var(--color-black)', fontSize: 'var(--font-size-sm)', fontWeight: 'var(--font-weight-normal)' }}
                                            >
                                                <span
                                                    className="w-1.5 h-1.5 rounded-full transition-all group-hover:w-3 duration-300"
                                                    style={{ backgroundColor: 'var(--color-brand-normal)' }}
                                                />
                                                {link}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>

                    {/* Bottom Bar */}
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-8">
                        <p
                            className="uppercase tracking-widest text-center sm:text-left"
                            style={{ color: 'var(--color-black-lighter)', fontSize: 'var(--font-size-xs)', fontWeight: 'var(--font-weight-bold)', opacity: 0.6 }}
                        >
                            {SETTINGS.publishedBy}
                        </p>

                        <div className="flex items-center gap-6">
                            {/* Socials - Integrated Horizontal */}
                            <div className="flex gap-5">
                                {SETTINGS.socials.map((social, i) => {
                                    const Icon = social.icon;
                                    return (
                                        <a
                                            key={i}
                                            href={social.href}
                                            className="social-icon-link transition-colors cursor-pointer"
                                            style={{ color: 'var(--color-black-lighter)' }}
                                        >
                                            <Icon size={18} />
                                        </a>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    )
}
