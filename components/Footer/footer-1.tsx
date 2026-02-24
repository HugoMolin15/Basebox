'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import {
    Github,
    Twitter,
    Linkedin,
    ArrowRight,
    Mail,
    Globe,
    Shield,
    Zap
} from 'lucide-react';
import { ImagePrimitive } from '@/components/Media/image-primitive';

/**
 * CONFIGURATION FIRST
 * All text, icons, and links are defined here for easy maintenance.
 */
const SETTINGS = {
    brand: {
        name: "Basebox",
        description: "A premium collection of high-performance components for modern web applications.",
        logo: {
            imageSrc: "", // Keep empty for fallback system
            imageAlt: "Basebox Logo"
        }
    },
    newsletter: {
        title: "Stay updated",
        description: "Get the latest component updates and design tips.",
        placeholder: "Enter your email",
        buttonText: "Subscribe",
    },
    navigation: [
        {
            title: "Product",
            links: [
                { name: 'Components', href: '#' },
                { name: 'Templates', href: '#' },
                { name: 'Pricing', href: '#' },
                { name: 'Changelog', href: '#' },
            ]
        },
        {
            title: "Resources",
            links: [
                { name: 'Documentation', href: '#' },
                { name: 'Community', href: '#' },
                { name: 'Support', href: '#' },
                { name: 'API Reference', href: '#' },
            ]
        },
        {
            title: "Company",
            links: [
                { name: 'About', href: '#' },
                { name: 'Careers', href: '#' },
                { name: 'Contact', href: '#' },
                { name: 'Legal', href: '#' },
            ]
        }
    ],
    socials: [
        { icon: Github, href: '#', label: 'GitHub' },
        { icon: Twitter, href: '#', label: 'Twitter' },
        { icon: Linkedin, href: '#', label: 'LinkedIn' },
    ],
    legal: {
        copyright: "© 2026 Basebox Inc.",
        links: [
            { name: "Privacy Policy", href: "#" },
            { name: "Terms of Service", href: "#" },
            { name: "Cookie Policy", href: "#" }
        ]
    }
};

export function Footer() {
    return (
        <footer className="w-full bg-white flex flex-col justify-between overflow-hidden">
            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-6 py-20 w-full flex-1">
                <style dangerouslySetInnerHTML={{
                    __html: `
                    .footer-link:hover,
                    .social-link:hover,
                    .legal-link:hover {
                        color: var(--color-brand-normal) !important;
                    }
                    .lib-input:focus {
                        outline: none !important;
                        box-shadow: none !important;
                        border-color: var(--color-white-dark) !important;
                    }
                `}} />
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-[var(--spacing-l)] items-start">

                    {/* Left Column: Brand & Newsletter */}
                    <div className="flex flex-col gap-12">
                        <div className="flex flex-col gap-6 max-w-md">
                            <div className="flex items-center gap-3">
                                <div
                                    className="w-10 h-10 overflow-hidden bg-black flex items-center justify-center"
                                    style={{ borderRadius: 'var(--radius-s)' }}
                                >
                                    {SETTINGS.brand.logo.imageSrc ? (
                                        <ImagePrimitive
                                            src={SETTINGS.brand.logo.imageSrc}
                                            alt={SETTINGS.brand.logo.imageAlt}
                                            aspectRatio="none"
                                            imageVariant="none"
                                        />
                                    ) : (
                                        <Zap className="text-white" size={20} />
                                    )}
                                </div>
                                <span style={{ color: 'var(--color-black)', fontSize: 'var(--font-size-2xl)', fontWeight: 'var(--font-weight-bold)' }}>{SETTINGS.brand.name}</span>
                            </div>
                            <p
                                className="leading-relaxed"
                                style={{ color: 'var(--color-black-lighter)', fontSize: 'var(--font-size-lg)', fontWeight: 'var(--font-weight-medium)' }}
                            >
                                {SETTINGS.brand.description}
                            </p>
                        </div>

                        {/* Newsletter */}
                        <div className="py-8 flex flex-col gap-6 max-w-md">
                            <div className="flex flex-col gap-2">
                                <h4 style={{ color: 'var(--color-black)', fontSize: 'var(--font-size-xl)', fontWeight: 'var(--font-weight-bold)' }}>{SETTINGS.newsletter.title}</h4>
                                <p style={{ color: 'var(--color-black-lighter)', fontSize: 'var(--font-size-sm)', fontWeight: 'var(--font-weight-medium)' }}>{SETTINGS.newsletter.description}</p>
                            </div>
                            <div className="flex flex-col sm:flex-row gap-3">
                                <input
                                    type="email"
                                    placeholder={SETTINGS.newsletter.placeholder}
                                    className="lib-input border-gray-thin px-6 py-3 focus:ring-0 focus:outline-none"
                                    style={{ borderRadius: 'var(--radius-pill)' }}
                                />
                                <button className="btn-primary btn-md btn-pill whitespace-nowrap">
                                    {SETTINGS.newsletter.buttonText}
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Navigation Links */}
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-[var(--spacing-l)]">
                        {SETTINGS.navigation.map((group) => (
                            <div key={group.title} className="flex flex-col gap-6">
                                <h4 style={{ color: 'var(--color-black-lighter)', fontSize: 'var(--font-size-sm)', fontWeight: 'var(--font-weight-black)', opacity: 0.5, textTransform: 'uppercase' }}>{group.title}</h4>
                                <ul className="flex flex-col gap-4">
                                    {group.links.map((link) => (
                                        <li key={link.name}>
                                            <a
                                                href={link.href}
                                                className="footer-link transition-colors tracking-tight"
                                                style={{
                                                    color: 'var(--color-black)',
                                                    fontSize: 'var(--font-size-base)',
                                                    fontWeight: 'var(--font-weight-medium)'
                                                }}
                                            >
                                                {link.name}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Footer Bottom: Socials & Legal */}
                <div className="mt-20 pt-8 flex flex-col md:flex-row justify-between items-center gap-8">
                    <div className="flex items-center gap-6">
                        {SETTINGS.socials.map((social) => (
                            <a
                                key={social.label}
                                href={social.href}
                                className="social-link transition-all transform hover:scale-110"
                                aria-label={social.label}
                                style={{ color: 'var(--color-black-lighter)' }}
                            >
                                <social.icon size={20} />
                            </a>
                        ))}
                    </div>

                    <div className="flex flex-wrap justify-center items-center gap-x-8 gap-y-4">
                        {SETTINGS.legal.links.map((link) => (
                            <a
                                key={link.name}
                                href={link.href}
                                className="legal-link transition-colors uppercase tracking-widest"
                                style={{ color: 'var(--color-black-lighter)', fontSize: 'var(--font-size-xs)', fontWeight: 'var(--font-weight-bold)' }}
                            >
                                {link.name}
                            </a>
                        ))}
                        <span style={{ color: 'var(--color-black-lighter)', fontSize: 'var(--font-size-xs)', fontWeight: 'var(--font-weight-medium)', opacity: 0.4 }}>{SETTINGS.legal.copyright}</span>
                    </div>
                </div>
            </div>

            {/* Oversized Brand Text Area */}
            <div className="relative w-full overflow-hidden pointer-events-none select-none flex justify-center items-end h-[30vh]">
                <h2
                    className="leading-[0.7] tracking-[-0.07em] m-0 p-0 uppercase whitespace-nowrap translate-y-[15%]"
                    style={{ color: 'var(--color-black)', fontSize: '25vw', fontWeight: 'var(--font-weight-black)' }}
                >
                    {SETTINGS.brand.name}
                </h2>

                {/* Decorative glow/gradient */}
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-[50%] bg-gradient-to-t from-white to-transparent z-10" />
            </div>
        </footer>
    );
}
