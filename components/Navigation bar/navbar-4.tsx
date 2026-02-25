'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    ChevronDown,
    Menu,
    X,
    Globe,
    ArrowRight,
    Twitter,
    Youtube,
    Instagram,
    Linkedin,
    Wallet,
    TrendingUp,
    Repeat,
    Briefcase,
    Zap,
    Target,
    Layers,
    Box
} from 'lucide-react';
import { cn } from '@/lib/utils';

/**
 * CONFIGURATION FIRST
 * All changeable text, links, icons, and colors MUST be defined in a const SETTINGS = {} object at the top.
 */
const SETTINGS = {
    brand: {
        logo: Box,
        href: "#"
    },
    navLinks: [
        { name: 'Features', hasDropdown: true },
        { name: 'Developer', href: '#' },
        { name: 'MetaMask Card', href: '#' },
        { name: 'MetaMask USD', href: '#' },
    ],
    megaMenu: {
        features: [
            {
                title: 'Buy',
                description: 'Turn cash to crypto',
                icon: Wallet,
                color: 'bg-[#FF6B35]', // Orange
                href: '#'
            },
            {
                title: 'Earn',
                description: 'Grow your crypto',
                icon: TrendingUp,
                color: 'bg-[#BE8CF2]', // Purple
                href: '#'
            },
            {
                title: 'Swaps',
                description: 'Safely exchange any token',
                icon: Repeat,
                color: 'bg-[#004B40]', // Dark Green
                href: '#'
            },
            {
                title: 'RWAs',
                description: 'Trade tokenized stocks and ETFs',
                icon: Briefcase,
                color: 'bg-[#12123B]', // Dark Navy
                href: '#'
            },
            {
                title: 'Predict',
                description: 'Trade on the outcomes of real world events',
                icon: Target,
                color: 'bg-[#40125C]', // Deep Purple
                href: '#'
            },
            {
                title: 'Perps',
                description: 'Long or short tokens with up to 40x leverage',
                icon: Zap,
                color: 'bg-[#8AF24B]', // Lime/Green
                href: '#'
            },
        ],
        exploreMore: [
            'Platforms', 'Rewards', 'Transaction Shield', 'Cryptocurrencies', 'Security', 'Snaps', 'Blog'
        ],
        about: [
            'FAQs', 'Support', 'Careers', 'Learn'
        ],
        socials: [
            { icon: Twitter, href: '#' },
            { icon: Youtube, href: '#' },
            { icon: Instagram, href: '#' },
            { icon: Linkedin, href: '#' },
        ]
    },
    actions: {
        languages: ["English", "Italian", "Swedish"],
        cta: "Get MetaMask",
    }
};

export function Navbar4() {
    const [activeTab, setActiveTab] = useState<'features' | 'language' | 'mobile-menu' | null>(null);
    const [isMobileFeaturesOpen, setIsMobileFeaturesOpen] = useState(false);
    const [isMobileLangOpen, setIsMobileLangOpen] = useState(false);
    const [currentLang, setCurrentLang] = useState(SETTINGS.actions.languages[0]);
    const [isHoveringMenu, setIsHoveringMenu] = useState(false);

    const isExpanded = activeTab !== null;

    // Lock body scroll only when hovering the open menu
    useEffect(() => {
        if (isExpanded && isHoveringMenu) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isExpanded, isHoveringMenu]);

    const PILL_RADIUS = 36; // half of 72px height
    const EXPANDED_RADIUS = 32;

    const lastScrollY = useRef(0);
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            if (currentScrollY < 80) {
                setIsVisible(true);
            } else if (currentScrollY > lastScrollY.current) {
                setIsVisible(false);
            } else {
                setIsVisible(true);
            }
            lastScrollY.current = currentScrollY;
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className="w-full">
            <div
                className="fixed top-0 left-0 right-0 z-[100] max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 pointer-events-none transition-transform duration-300"
                style={{ transform: isVisible ? 'translateY(0)' : 'translateY(-100%)' }}
            >
                <motion.header
                    initial={false}
                    animate={{
                        height: isExpanded ? 'auto' : 72,
                        borderRadius: isExpanded ? '40px' : '36px',
                    }}
                    transition={{
                        height: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
                        borderRadius: { duration: 0.5, ease: [0.16, 1, 0.3, 1] }
                    }}
                    className="relative bg-white border-gray-thin pointer-events-auto overflow-hidden will-change-[height,border-radius]"
                >
                    <div className="relative z-10 flex items-center justify-between px-6 py-0 h-[72px]">

                        {/* Logo & Main Nav */}
                        <div className="flex items-center gap-8 lg:gap-12">
                            <a href={SETTINGS.brand.href} className="flex items-center gap-2 group">
                                <div className="p-2.5 transition-all duration-300 group-hover:scale-110 group-hover:rotate-12">
                                    <SETTINGS.brand.logo
                                        className="w-6 h-6 transition-colors"
                                        style={{ color: 'var(--color-black)' }}
                                    />
                                </div>
                            </a>

                            <nav className="hidden lg:flex items-center gap-8">
                                {SETTINGS.navLinks.map((link) => (
                                    <button
                                        key={link.name}
                                        onClick={() => {
                                            if (link.hasDropdown) {
                                                setActiveTab(activeTab === 'features' ? null : 'features');
                                            }
                                        }}
                                        className="flex items-center gap-1.5 transition-all cursor-pointer text-[var(--color-black)] hover:text-[var(--color-brand-normal)]"
                                        style={{
                                            color: (activeTab === 'features' && link.hasDropdown) ? 'var(--color-brand-normal)' : '',
                                            fontSize: 'var(--font-size-sm)',
                                            fontWeight: 'var(--font-weight-medium)'
                                        }}
                                    >
                                        {link.name}
                                        {link.hasDropdown && (
                                            <ChevronDown size={16} className={cn("transition-transform duration-300", activeTab === 'features' ? "rotate-180" : "")} />
                                        )}
                                    </button>
                                ))}
                            </nav>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center gap-4">
                            <button
                                onClick={() => setActiveTab(activeTab === 'language' ? null : 'language')}
                                className="hidden lg:flex items-center gap-2 transition-colors cursor-pointer group text-[var(--color-black)] hover:text-[var(--color-brand-normal)]"
                                style={{
                                    color: activeTab === 'language' ? 'var(--color-brand-normal)' : '',
                                    fontSize: 'var(--font-size-sm)',
                                    fontWeight: 'var(--font-weight-medium)'
                                }}
                            >
                                <span>{currentLang}</span>
                                <Globe size={18} className={cn("transition-colors", activeTab === 'language' ? "text-brand-primary" : "")} />
                            </button>

                            <button className="hidden lg:flex btn-primary btn-md btn-pill">
                                {SETTINGS.actions.cta}
                            </button>

                            <button
                                onClick={() => {
                                    if (activeTab === 'mobile-menu') {
                                        setActiveTab(null);
                                    } else {
                                        setActiveTab('mobile-menu');
                                        setIsMobileFeaturesOpen(false);
                                        setIsMobileLangOpen(false);
                                    }
                                }}
                                className="p-2 transition-all cursor-pointer lg:hidden text-[var(--color-black)] hover:text-[var(--color-brand-normal)]"
                            >
                                {isExpanded ? <X size={24} /> : <Menu size={24} />}
                                {isExpanded && <span className="sr-only">Close</span>}
                            </button>
                        </div>
                    </div>

                    {/* Expanded Content Overlay */}
                    <AnimatePresence mode="wait">
                        {isExpanded && (
                            <motion.div
                                key={activeTab || 'none'}
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                onMouseEnter={() => setIsHoveringMenu(true)}
                                onMouseLeave={() => setIsHoveringMenu(false)}
                                transition={{
                                    height: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
                                    opacity: { duration: 0.3 }
                                }}
                                className="relative z-10 overflow-hidden"
                            >
                                <div className="p-6 lg:p-10 lg:py-8 max-h-[80vh] overflow-y-auto custom-scrollbar">
                                    {activeTab === 'language' ? (
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                            {SETTINGS.actions.languages.map((lang) => (
                                                <button
                                                    key={lang}
                                                    onClick={() => {
                                                        setCurrentLang(lang);
                                                        setActiveTab(null);
                                                    }}
                                                    className={cn(
                                                        "p-6 border text-left transition-all group cursor-pointer",
                                                        currentLang === lang
                                                            ? "bg-white-light border-[var(--color-brand-normal)]"
                                                            : "bg-white border-gray-thin hover:border-[var(--color-brand-normal)]"
                                                    )}
                                                    style={{ borderRadius: 'var(--radius-s)' }}
                                                >
                                                    <span
                                                        className="block mb-2 text-[var(--color-black)] group-hover:text-[var(--color-brand-normal)]"
                                                        style={{
                                                            color: currentLang === lang ? 'var(--color-brand-normal)' : '',
                                                            fontSize: 'var(--font-size-lg)',
                                                            fontWeight: 'var(--font-weight-bold)'
                                                        }}
                                                    >
                                                        {lang}
                                                    </span>
                                                    <div className="text-xs font-normal opacity-60" style={{ color: 'var(--color-black-lighter)' }}>Set platform language to {lang}</div>
                                                </button>
                                            ))}
                                        </div>
                                    ) : activeTab === 'mobile-menu' ? (
                                        <div className="flex flex-col gap-6 py-4">
                                            {/* Primary Mobile Links */}
                                            <div className="flex flex-col gap-4">
                                                {SETTINGS.navLinks.map((link) => (
                                                    <div key={link.name} className="flex flex-col">
                                                        {link.hasDropdown ? (
                                                            <div className="flex flex-col">
                                                                <button
                                                                    onClick={() => setIsMobileFeaturesOpen(!isMobileFeaturesOpen)}
                                                                    className="flex items-center justify-between transition-colors text-left group py-2 cursor-pointer text-[var(--color-black)] hover:text-[var(--color-brand-normal)]"
                                                                    style={{ fontSize: 'var(--font-size-xl)', fontWeight: 'var(--font-weight-medium)' }}
                                                                >
                                                                    <span>{link.name}</span>
                                                                    <ChevronDown size={20} className={cn("transition-transform duration-300", isMobileFeaturesOpen ? "rotate-180" : "")} />
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
                                                                            className="overflow-hidden bg-white-light mt-2 px-4 py-2 flex flex-col gap-4"
                                                                            style={{ borderRadius: 'var(--radius-s)' }}
                                                                        >
                                                                            {SETTINGS.megaMenu.features.map((feature, idx) => (
                                                                                <a key={idx} href={feature.href} className="flex items-center gap-4 group/item py-2">
                                                                                    <div className={cn("p-2 rounded-xl text-white", feature.color)}>
                                                                                        <feature.icon size={18} />
                                                                                    </div>
                                                                                    <div className="flex flex-col">
                                                                                        <span
                                                                                            className="group-hover/item:text-[var(--color-brand-normal)] transition-colors"
                                                                                            style={{ color: 'var(--color-black)', fontSize: 'var(--font-size-sm)', fontWeight: 'var(--font-weight-bold)' }}
                                                                                        >
                                                                                            {feature.title}
                                                                                        </span>
                                                                                        <span className="text-xs font-normal" style={{ color: 'var(--color-black-lighter)', opacity: 0.7 }}>{feature.description}</span>
                                                                                    </div>
                                                                                </a>
                                                                            ))}
                                                                        </motion.div>
                                                                    )}
                                                                </AnimatePresence>
                                                            </div>
                                                        ) : (
                                                            <a
                                                                href={link.href}
                                                                className="transition-colors py-2 text-[var(--color-black)] hover:text-[var(--color-brand-normal)]"
                                                                style={{ fontSize: 'var(--font-size-xl)', fontWeight: 'var(--font-weight-medium)' }}
                                                            >
                                                                {link.name}
                                                            </a>
                                                        )}
                                                    </div>
                                                ))}
                                            </div>

                                            {/* Sub Links & Socials */}
                                            <div className="flex flex-col gap-6 py-6">
                                                <div className="flex flex-col gap-3">
                                                    {SETTINGS.megaMenu.about.map((link) => (
                                                        <a
                                                            key={link}
                                                            href="#"
                                                            className="transition-colors text-[var(--color-black-lighter)] hover:text-[var(--color-brand-normal)]"
                                                            style={{ fontSize: 'var(--font-size-sm)', fontWeight: 'var(--font-weight-medium)' }}
                                                        >
                                                            {link}
                                                        </a>
                                                    ))}
                                                </div>
                                                <div className="flex items-center gap-4">
                                                    {SETTINGS.megaMenu.socials.map((social, idx) => (
                                                        <a key={idx} href={social.href} className="p-2 transition-all text-[var(--color-black)] hover:text-[var(--color-brand-normal)]">
                                                            <social.icon size={18} />
                                                        </a>
                                                    ))}
                                                </div>
                                            </div>

                                            <div className="flex flex-col gap-4">
                                                <div className="flex flex-col">
                                                    <button
                                                        onClick={() => setIsMobileLangOpen(!isMobileLangOpen)}
                                                        className="flex items-center justify-between transition-colors py-2 cursor-pointer group text-[var(--color-black-lighter)] hover:text-[var(--color-brand-normal)]"
                                                        style={{ fontSize: 'var(--font-size-sm)', fontWeight: 'var(--font-weight-medium)' }}
                                                    >
                                                        <div className="flex items-center gap-2">
                                                            <Globe size={18} className="group-hover:text-[var(--color-brand-normal)] transition-colors" style={{ color: 'var(--color-black)' }} />
                                                            <span>{currentLang}</span>
                                                        </div>
                                                        <ChevronDown size={16} className={cn("transition-transform duration-300", isMobileLangOpen ? "rotate-180" : "")} />
                                                    </button>

                                                    <AnimatePresence>
                                                        {isMobileLangOpen && (
                                                            <motion.div
                                                                initial={{ opacity: 0, height: 0 }}
                                                                animate={{ opacity: 1, height: 'auto' }}
                                                                exit={{ opacity: 0, height: 0 }}
                                                                transition={{
                                                                    height: { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
                                                                    opacity: { duration: 0.2 }
                                                                }}
                                                                className="overflow-hidden bg-white-light mt-2 flex flex-col"
                                                                style={{ borderRadius: 'var(--radius-s)' }}
                                                            >
                                                                {SETTINGS.actions.languages.map((lang) => (
                                                                    <button
                                                                        key={lang}
                                                                        onClick={() => {
                                                                            setCurrentLang(lang);
                                                                            setIsMobileLangOpen(false);
                                                                        }}
                                                                        className={cn(
                                                                            "w-full text-left px-4 py-3 text-sm font-normal transition-colors border-b last:border-0 border-gray-thin cursor-pointer hover:bg-white-dark text-[var(--color-black)] hover:text-[var(--color-brand-normal)]",
                                                                            currentLang === lang ? "text-[var(--color-brand-normal)] font-bold" : ""
                                                                        )}
                                                                        style={{ color: currentLang === lang ? 'var(--color-brand-normal)' : '' }}
                                                                    >
                                                                        {lang}
                                                                    </button>
                                                                ))}
                                                            </motion.div>
                                                        )}
                                                    </AnimatePresence>
                                                </div>

                                                <button className="btn-primary btn-md btn-pill w-full">
                                                    {SETTINGS.actions.cta}
                                                </button>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

                                            {/* Feature Cards */}
                                            <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-3">
                                                {SETTINGS.megaMenu.features.map((feature, idx) => (
                                                    <a href={feature.href} key={idx} className="group relative p-5 overflow-hidden min-h-[140px] flex flex-col justify-between transition-all duration-500 hover:scale-[1.01] bg-white border-gray-thin hover:border-brand-primary hover:bg-white-light" style={{ borderRadius: 'var(--radius-s)' }}>
                                                        <div className="relative z-10">
                                                            <div className={cn("inline-flex p-2.5 rounded-xl mb-3 text-white", feature.color)}>
                                                                <feature.icon size={20} strokeWidth={1.5} />
                                                            </div>
                                                            <h3
                                                                className="mb-1 group-hover:text-[var(--color-brand-normal)] transition-colors"
                                                                style={{ color: 'var(--color-black)', fontSize: 'var(--font-size-xl)', fontWeight: 'var(--font-weight-bold)' }}
                                                            >
                                                                {feature.title}
                                                            </h3>
                                                            <p
                                                                className="font-normal"
                                                                style={{ color: 'var(--color-black-lighter)', fontSize: 'var(--font-size-xs)', opacity: 0.7 }}
                                                            >
                                                                {feature.description}
                                                            </p>
                                                        </div>

                                                        <div className="relative z-10 flex justify-end">
                                                            <div className="p-2 border border-gray-thin rounded-full group-hover:bg-brand-primary group-hover:border-brand-primary group-hover:text-white transition-all duration-300" style={{ color: 'var(--color-black)' }}>
                                                                <ArrowRight size={16} />
                                                            </div>
                                                        </div>
                                                    </a>
                                                ))}
                                            </div>

                                            {/* Side Navigation */}
                                            <div className="lg:col-span-4 flex flex-col justify-between">
                                                <div className="space-y-12">
                                                    <div>
                                                        <h4
                                                            className="mb-4 tracking-[0.2em] uppercase"
                                                            style={{ color: 'var(--color-black-lighter)', fontSize: 'var(--font-size-xs)', fontWeight: 'var(--font-weight-black)', opacity: 0.5 }}
                                                        >
                                                            Explore More
                                                        </h4>
                                                        <ul className="space-y-2">
                                                            {SETTINGS.megaMenu.exploreMore.map((link) => (
                                                                <li key={link}>
                                                                    <a href="#" className="transition-colors inline-flex items-center group text-[var(--color-black)] hover:text-[var(--color-brand-normal)]" style={{ fontSize: 'var(--font-size-lg)', fontWeight: 'var(--font-weight-medium)' }}>
                                                                        {link}
                                                                        <ArrowRight size={18} className="ml-2 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                                                                    </a>
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </div>

                                                    <div>
                                                        <h4
                                                            className="mb-4 tracking-[0.2em] uppercase"
                                                            style={{ color: 'var(--color-black-lighter)', fontSize: 'var(--font-size-xs)', fontWeight: 'var(--font-weight-black)', opacity: 0.5 }}
                                                        >
                                                            About
                                                        </h4>
                                                        <ul className="space-y-2">
                                                            {SETTINGS.megaMenu.about.map((link) => (
                                                                <li key={link}>
                                                                    <a
                                                                        href="#"
                                                                        className="transition-colors text-[var(--color-black-lighter)] hover:text-[var(--color-brand-normal)]"
                                                                        style={{ fontSize: 'var(--font-size-sm)', fontWeight: 'var(--font-weight-medium)' }}
                                                                    >
                                                                        {link}
                                                                    </a>
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </div>
                                                </div>

                                                <div className="pt-6 mt-6">
                                                    <div className="flex items-center justify-between mb-4">
                                                        <span
                                                            className="uppercase tracking-widest"
                                                            style={{ color: 'var(--color-black-lighter)', fontSize: 'var(--font-size-xs)', fontWeight: 'var(--font-weight-black)', opacity: 0.5 }}
                                                        >
                                                            Follow Us
                                                        </span>
                                                        <div className="flex items-center gap-4">
                                                            {SETTINGS.megaMenu.socials.map((social, idx) => (
                                                                <a key={idx} href={social.href} className="p-2 transition-all text-[var(--color-black)] hover:text-[var(--color-brand-normal)]">
                                                                    <social.icon size={18} />
                                                                </a>
                                                            ))}
                                                        </div>
                                                    </div>

                                                    {/* Mobile CTA */}
                                                    <div className="md:hidden">
                                                        <button className="btn-primary btn-md btn-pill w-full">
                                                            {SETTINGS.actions.cta}
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>

                                        </div>
                                    )}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.header>
            </div>
        </div>
    );
}
