'use client';

import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Menu, X, ArrowRight, Box } from 'lucide-react';
import { ImagePrimitive } from '@/components/Media/image-primitive';

/**
 * CONFIGURATION FIRST
 * All changeable text, links, and image URLs MUST be defined in a const SETTINGS = {} object at the top.
 */
const SETTINGS = {
    brand: {
        name: "Basebox",
        logo: {
            imageSrc: "", // Keeping empty for fallback
            imageAlt: "Basebox Logo"
        }
    },
    links: [
        { name: 'Home', href: '#', active: true },
        { name: 'How it Works', href: '#' },
        { name: 'Features', href: '#' },
        { name: 'Pricing', href: '#' },
    ],
    cta: {
        text: "Try for free",
        href: "#"
    }
};

/**
 * Floating Scroll Navbar
 * Transforms from a full-width header to a floating pill on scroll.
 */
export function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Lock body scroll when mobile menu is open
    useEffect(() => {
        if (mobileMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [mobileMenuOpen]);

    return (
        <>
            {/* Mobile Backdrop */}
            <div
                className={cn(
                    "fixed inset-0 bg-black/20 backdrop-blur-md z-[90] lg:hidden transition-all duration-500",
                    mobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
                )}
                onClick={() => setMobileMenuOpen(false)}
            />

            {/* Navbar Container */}
            <nav className={cn(
                "fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ease-in-out flex justify-center items-center pointer-events-none"
            )}>
                <div className={cn(
                    "w-full transition-all duration-500 ease-in-out pointer-events-auto",
                    scrolled
                        ? "bg-white/80 backdrop-blur-xl border-b border-gray-thin px-6 py-3"
                        : "bg-transparent border-b border-transparent px-8 py-5"
                )}>
                    <div className="max-w-7xl mx-auto flex items-center justify-between">

                        {/* 1. Brand / Logo */}
                        <div className="flex items-center gap-2 group cursor-pointer">
                            <Box
                                className="w-7 h-7 transition-all duration-300 group-hover:scale-110"
                                strokeWidth={2.5}
                                style={{ color: 'var(--color-black)' }}
                            />
                        </div>

                        {/* 2. Desktop Navigation (Pill Layout) */}
                        <div className="hidden lg:flex items-center gap-1 p-1">
                            {SETTINGS.links.map((link) => (
                                <a
                                    key={link.name}
                                    href={link.href}
                                    className="px-6 py-2 transition-all duration-300 text-[var(--color-black)] hover:text-[var(--color-brand-normal)]"
                                    style={{ fontSize: 'var(--font-size-sm)', fontWeight: 'var(--font-weight-medium)' }}
                                >
                                    {link.name}
                                </a>
                            ))}
                        </div>

                        {/* 3. Actions */}
                        <div className="flex items-center gap-4">
                            <a
                                href={SETTINGS.cta.href}
                                className="hidden lg:flex btn-primary btn-md btn-pill"
                            >
                                {SETTINGS.cta.text}
                            </a>

                            {/* Mobile Toggle */}
                            <button
                                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                                className="lg:hidden p-2 transition-all duration-300 cursor-pointer active:scale-90 text-[var(--color-black)] hover:text-[var(--color-brand-normal)]"
                                style={{}}
                            >
                                {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile Menu Dropdown */}
                <div
                    className={cn(
                        "absolute top-full left-4 right-4 mt-2 bg-white border-gray-thin p-6 transition-all duration-300 transform origin-top lg:hidden",
                        mobileMenuOpen ? "opacity-100 scale-100 pointer-events-auto" : "opacity-0 scale-95 pointer-events-none"
                    )}
                    style={{ borderRadius: 'var(--radius-s)' }}
                >
                    <div className="flex flex-col gap-4">
                        {SETTINGS.links.map((link) => (
                            <a
                                key={link.name}
                                href={link.href}
                                onClick={() => setMobileMenuOpen(false)}
                                className="px-4 py-3 rounded-2xl transition-all duration-300 cursor-pointer active:scale-[0.98] flex items-center gap-2 text-[var(--color-black)] hover:text-[var(--color-brand-normal)] hover:bg-white-light"
                                style={{ fontSize: 'var(--font-size-base)', fontWeight: 'var(--font-weight-medium)' }}
                            >
                                {link.name}
                            </a>
                        ))}
                        <div className="h-px bg-white-dark my-2" />
                        <a href={SETTINGS.cta.href} className="btn-primary btn-md btn-pill text-center">
                            {SETTINGS.cta.text}
                        </a>
                    </div>
                </div>
            </nav>
        </>
    );
}
