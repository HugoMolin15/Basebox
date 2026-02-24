'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    ChevronDown,
    Menu,
    X,
    DollarSign,
    Globe,
    Zap,
    Users,
    ArrowRight,
    Box
} from 'lucide-react';
import { cn } from '@/lib/utils';

/**
 * CONFIGURATION FIRST
 * All changeable text, links, icons, and colors MUST be defined in a const SETTINGS = {} object at the top.
 */
const SETTINGS = {
    brand: {
        name: "Basebox",
        href: "#"
    },
    links: [
        { name: 'Pricing', href: '#' },
        { name: 'Blog', href: '#' },
        { name: 'Docs', href: '#' },
    ],
    features: [
        {
            title: 'Revenue',
            description: 'Track revenue by source',
            icon: DollarSign,
            color: 'bg-green-500',
            bgColor: 'bg-green-500/10',
            href: '#'
        },
        {
            title: 'Realtime',
            description: 'Live visitor map and feed',
            icon: Globe,
            color: 'bg-indigo-500',
            bgColor: 'bg-indigo-500/10',
            href: '#'
        },
        {
            title: 'Performance',
            description: 'Monitor your web vitals',
            icon: Zap,
            color: 'bg-amber-500',
            bgColor: 'bg-amber-500/10',
            href: '#'
        },
        {
            title: 'Profiles',
            description: 'Identify returning visitors',
            icon: Users,
            color: 'bg-pink-500',
            bgColor: 'bg-pink-500/10',
            href: '#'
        },
    ],
    actions: {
        login: { text: "Login", href: "#" },
        register: { text: "Register", href: "#" }
    },
};

/**
 * Animated Expandable Navbar
 * Features a spring-physics pill that expands to reveal nested features or a mobile menu.
 */
export function ExpandableNavbar() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isFeaturesOpen, setIsFeaturesOpen] = useState(false);
    const [isMobileFeaturesOpen, setIsMobileFeaturesOpen] = useState(false);

    return (
        <div className="w-full bg-white relative">
            <div className="fixed top-6 left-0 right-0 mx-auto z-50 w-[94%] md:w-auto md:max-w-3xl flex flex-col items-center">

                <motion.div
                    initial={false}
                    animate={{
                        height: (isFeaturesOpen || isMobileMenuOpen) ? 'auto' : 64,
                        borderRadius: (isFeaturesOpen || isMobileMenuOpen) ? '40px' : '32px',
                    }}
                    transition={{
                        height: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
                        borderRadius: { duration: 0.5, ease: [0.16, 1, 0.3, 1] }
                    }}
                    className="relative w-full flex flex-col bg-white/80 border-gray-thin backdrop-blur-md overflow-hidden pointer-events-auto will-change-[height,border-radius]"
                >

                    {/* Top Bar - Fixed Height */}
                    <div className="flex items-center justify-between px-5 h-[64px] shrink-0">
                        {/* Brand */}
                        <div className="flex items-center gap-3 shrink-0">
                            <a href={SETTINGS.brand.href} className="flex items-center justify-center transition-all duration-300 cursor-pointer pointer-events-auto group">
                                <Box
                                    className="w-7 h-7 transition-all duration-300 group-hover:scale-110"
                                    strokeWidth={2.5}
                                    style={{ color: 'var(--color-black)' }}
                                />
                            </a>
                        </div>

                        {/* Desktop Navigation */}
                        <div className="hidden md:flex items-center gap-10 ml-12">
                            <div className="relative group cursor-pointer pointer-events-auto">
                                <button
                                    className={cn(
                                        "flex items-center gap-2 transition-colors cursor-pointer hover:text-[var(--color-brand-normal)]!"
                                    )}
                                    style={{
                                        color: isFeaturesOpen ? 'var(--color-brand-normal)' : 'var(--color-black)',
                                        fontSize: 'var(--font-size-sm)',
                                        fontWeight: 'var(--font-weight-medium)'
                                    }}
                                    onClick={() => setIsFeaturesOpen(!isFeaturesOpen)}
                                >
                                    Features
                                    <ChevronDown
                                        size={14}
                                        strokeWidth={3}
                                        className={cn("transition-transform duration-300", isFeaturesOpen ? "rotate-180" : "")}
                                    />
                                </button>
                            </div>

                            {SETTINGS.links.map((link) => (
                                <a
                                    key={link.name}
                                    href={link.href}
                                    className="transition-colors cursor-pointer pointer-events-auto text-[var(--color-black)] hover:text-[var(--color-brand-normal)]"
                                    style={{ fontSize: 'var(--font-size-sm)', fontWeight: 'var(--font-weight-medium)' }}
                                >
                                    {link.name}
                                </a>
                            ))}
                        </div>

                        {/* Actions Row */}
                        <div className="flex items-center gap-4 ml-auto">
                            <a
                                href={SETTINGS.actions.login.href}
                                className="hidden md:inline-block transition-colors cursor-pointer pointer-events-auto px-2 text-[var(--color-black)] hover:text-[var(--color-brand-normal)]"
                                style={{ fontSize: 'var(--font-size-sm)', fontWeight: 'var(--font-weight-medium)' }}
                            >
                                {SETTINGS.actions.login.text}
                            </a>

                            <a
                                href={SETTINGS.actions.register.href}
                                className="hidden md:flex btn-primary btn-md btn-pill pointer-events-auto active:scale-95"
                            >
                                {SETTINGS.actions.register.text}
                            </a>

                            {/* Mobile Menu Toggle */}
                            <button
                                onClick={() => {
                                    setIsMobileMenuOpen(!isMobileMenuOpen);
                                    setIsFeaturesOpen(false);
                                    setIsMobileFeaturesOpen(false);
                                }}
                                className="md:hidden transition-colors p-2 cursor-pointer pointer-events-auto text-[var(--color-black)] hover:text-[var(--color-brand-normal)]"
                                style={{}}
                            >
                                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                            </button>
                        </div>
                    </div>

                    {/* Expandable Content Drawer */}
                    <AnimatePresence>
                        {(isFeaturesOpen || isMobileMenuOpen) && (
                            <motion.div
                                key="drawer"
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{
                                    height: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
                                    opacity: { duration: 0.3 }
                                }}
                                className="overflow-hidden pointer-events-auto"
                            >
                                <div className="p-6 md:p-8 pt-2 md:pt-4 max-h-[70vh] overflow-y-auto custom-scrollbar mx-2">

                                    {/* Features Grid (Desktop) */}
                                    {isFeaturesOpen && !isMobileMenuOpen && (
                                        <div className="grid grid-cols-2 gap-4">
                                            {SETTINGS.features.map((feature, idx) => (
                                                <a
                                                    key={idx}
                                                    href={feature.href}
                                                    className={cn(
                                                        "group relative p-5 flex items-center gap-5 transition-all duration-300 cursor-pointer overflow-hidden",
                                                        "bg-white/0 hover:bg-white-light border-gray-thin hover:border-transparent text-left"
                                                    )}
                                                    style={{ borderRadius: 'var(--radius-2xl)' }}
                                                >
                                                    <div className={cn(feature.color, "w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 text-white group-hover:scale-110 transition-transform duration-300")}>
                                                        <feature.icon size={22} strokeWidth={2.5} />
                                                    </div>
                                                    <div>
                                                        <h4
                                                            className="mb-1 whitespace-nowrap group-hover:text-[var(--color-brand-normal)] transition-colors"
                                                            style={{ color: 'var(--color-black)', fontSize: 'var(--font-size-sm)', fontWeight: 'var(--font-weight-bold)' }}
                                                        >
                                                            {feature.title}
                                                        </h4>
                                                        <p
                                                            className="leading-relaxed font-light"
                                                            style={{ color: 'var(--color-black-lighter)', fontSize: 'var(--font-size-xs)', opacity: 0.7 }}
                                                        >
                                                            {feature.description}
                                                        </p>
                                                    </div>
                                                </a>
                                            ))}
                                        </div>
                                    )}

                                    {/* Mobile Menu Content */}
                                    {isMobileMenuOpen && (
                                        <div className="flex flex-col gap-1 py-4">
                                            {/* Features Expandable */}
                                            <div className="flex flex-col transition-all duration-300">
                                                <button
                                                    onClick={() => setIsMobileFeaturesOpen(!isMobileFeaturesOpen)}
                                                    className="w-full flex items-center justify-between px-5 py-4 text-[var(--color-black)] hover:text-[var(--color-brand-normal)] hover:bg-white-light transition-all"
                                                    style={{ borderRadius: 'var(--radius-2xl)', fontSize: 'var(--font-size-base)', fontWeight: 'var(--font-weight-medium)' }}
                                                >
                                                    Features
                                                    <ChevronDown
                                                        size={18}
                                                        strokeWidth={3}
                                                        className={cn("transition-transform duration-300", isMobileFeaturesOpen ? "rotate-180" : "")}
                                                    />
                                                </button>

                                                <AnimatePresence>
                                                    {isMobileFeaturesOpen && (
                                                        <motion.div
                                                            initial={{ opacity: 0, height: 0 }}
                                                            animate={{ opacity: 1, height: 'auto' }}
                                                            exit={{ opacity: 0, height: 0 }}
                                                            transition={{
                                                                height: { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
                                                                opacity: { duration: 0.2 }
                                                            }}
                                                            className="overflow-hidden"
                                                        >
                                                            <div className="flex flex-col gap-2 py-4 ml-6 mt-2">
                                                                {SETTINGS.features.map((feature, idx) => (
                                                                    <a
                                                                        key={idx}
                                                                        href={feature.href}
                                                                        className="flex items-center gap-4 p-4 hover:bg-white-light transition-colors group cursor-pointer"
                                                                        style={{ borderRadius: 'var(--radius-2xl)' }}
                                                                    >
                                                                        <div className={cn(feature.color, "w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 text-white")}>
                                                                            <feature.icon size={18} strokeWidth={2.5} />
                                                                        </div>
                                                                        <span
                                                                            className="group-hover:text-[var(--color-brand-normal)] transition-colors"
                                                                            style={{ color: 'var(--color-black)', fontSize: 'var(--font-size-sm)', fontWeight: 'var(--font-weight-medium)' }}
                                                                        >
                                                                            {feature.title}
                                                                        </span>
                                                                    </a>
                                                                ))}
                                                            </div>
                                                        </motion.div>
                                                    )}
                                                </AnimatePresence>
                                            </div>

                                            {/* Main Links */}
                                            {SETTINGS.links.map((link) => (
                                                <a
                                                    key={link.name}
                                                    href={link.href}
                                                    className="px-5 py-4 text-[var(--color-black)] hover:text-[var(--color-brand-normal)] hover:bg-white-light transition-all"
                                                    style={{ borderRadius: 'var(--radius-2xl)', fontSize: 'var(--font-size-base)', fontWeight: 'var(--font-weight-medium)' }}
                                                >
                                                    {link.name}
                                                </a>
                                            ))}

                                            {/* Auth (Mobile Only) */}
                                            <a
                                                href={SETTINGS.actions.login.href}
                                                className="md:hidden px-5 py-4 text-[var(--color-black)] hover:text-[var(--color-brand-normal)] hover:bg-white-light transition-all"
                                                style={{ borderRadius: 'var(--radius-2xl)', fontSize: 'var(--font-size-base)', fontWeight: 'var(--font-weight-medium)' }}
                                            >
                                                {SETTINGS.actions.login.text}
                                            </a>

                                            <div className="h-px bg-white-dark my-2 mx-5" />
                                            <div className="px-5 pt-2">
                                                <a
                                                    href={SETTINGS.actions.register.href}
                                                    className="btn-primary btn-md btn-pill text-center h-12 flex items-center justify-center w-full active:scale-95 transition-all"
                                                >
                                                    {SETTINGS.actions.register.text}
                                                </a>
                                            </div>
                                        </div>
                                    )}

                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>
            </div>

        </div>
    );
}
