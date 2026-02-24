"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
    Menu, X, ChevronDown,
    Users, BookOpen,
    Briefcase, Newspaper, Info,
    Rocket, Shield, Database,
    Cpu, FileCode, Search,
    ArrowRight, Building2, User, Box
} from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { ImagePrimitive } from '@/components/Media/image-primitive';

/**
 * SETTINGS
 * Configuration for all text, icons, and links.
 */
const SETTINGS = {
    logo: {
        icon: Box,
    },
    cta: {
        text: "Schedule a demo",
        href: "#",
    },
    heroImage: "https://framerusercontent.com/images/JNF6ehK6QCuGgpXd9YNG6ERIRHA.jpg?width=3024&height=1990",
    navigation: [
        {
            label: "Product",
            href: "#",
            variant: "multi-column",
            sections: [
                {
                    title: "Product",
                    items: [
                        { icon: Rocket, title: "Onboard", description: "High-converting onboarding journeys" },
                        { icon: Shield, title: "Decide", description: "Automated case management" },
                        { icon: Database, title: "Lifecycle", description: "Periodic reviews and monitoring" },
                    ]
                },
                {
                    title: "Platform",
                    items: [
                        { icon: Cpu, title: "Basebox AI", description: "Auditable AI agents" },
                        { icon: FileCode, title: "Policy engine", description: "Compliance translated into code" },
                        { icon: Search, title: "Data platform", description: "One API for all data sources" },
                    ]
                }
            ]
        },
        {
            label: "Customers",
            href: "#",
            variant: "split",
            content: {
                left: [
                    { icon: Building2, title: "Enterprise", description: "Solutions for large scale" },
                    { icon: User, title: "Startups", description: "Move fast with Basebox" },
                ],
                rightImage: {
                    src: "https://i.pinimg.com/736x/a1/bc/b7/a1bcb7a53797ce5e4eae6d37e79731d0.jpg",
                    alt: "Customer Success",
                }
            }
        },
        {
            label: "Company",
            href: "#",
            variant: "split",
            content: {
                left: [
                    { icon: Info, title: "About", description: "Our story" },
                    { icon: Newspaper, title: "News", description: "Press and insights" },
                    { icon: Briefcase, title: "Careers", description: "We're hiring" },
                ],
                rightImage: {
                    src: "https://i.pinimg.com/736x/a1/32/96/a132968e0785c9e5c064c9d15acaaebe.jpg",
                    alt: "Company Culture",
                }
            }
        },
        {
            label: "Resources",
            href: "#",
            variant: "split",
            content: {
                left: [
                    { icon: BookOpen, title: "Documentation", description: "APIs and integration guides" },
                    { icon: FileCode, title: "Case Studies", description: "Success stories from our partners" },
                ],
                rightImage: {
                    src: "https://i.pinimg.com/736x/b1/93/a5/b193a54f870f5167db9fec45ef439275.jpg",
                    alt: "Knowledge Base",
                }
            }
        }
    ],
};

export function Navbar7() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [activeMenu, setActiveMenu] = useState<string | null>(null);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [expandedMobileItem, setExpandedMobileItem] = useState<string | null>(null);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <div className="w-full relative flex flex-col">

            <nav
                className={cn(
                    "fixed left-1/2 -translate-x-1/2 z-50 transition-all duration-700 px-6",
                    isScrolled
                        ? "top-0 w-full rounded-none py-4 bg-white/80 backdrop-blur-xl border-b border-gray-thin"
                        : "top-4 w-[95%] max-w-7xl rounded-full py-2.5 bg-transparent"
                )}
            >
                <div className="max-w-7xl mx-auto flex items-center justify-between">
                    {/* Logo */}
                    <Link href="/" className="flex items-center group cursor-pointer relative z-10">
                        <SETTINGS.logo.icon
                            size={28}
                            className="transition-colors duration-300"
                            style={{ color: 'var(--color-black)' }}
                        />
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden lg:flex items-center gap-1 relative z-10">
                        {SETTINGS.navigation.map((item) => (
                            <div
                                key={item.label}
                                className="relative"
                                onMouseEnter={() => setActiveMenu(item.label)}
                                onMouseLeave={() => setActiveMenu(null)}
                            >
                                <button
                                    className="transition-all py-2 px-5 rounded-md cursor-pointer relative z-10 text-[var(--color-black)] hover:text-[var(--color-brand-normal)]"
                                    style={{
                                        color: activeMenu === item.label ? 'var(--color-brand-normal)' : '',
                                        fontSize: 'var(--font-size-sm)',
                                        fontWeight: 'var(--font-weight-medium)'
                                    }}
                                >
                                    {item.label}
                                </button>

                                <AnimatePresence>
                                    {activeMenu === item.label && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 8, scale: 0.98 }}
                                            animate={{ opacity: 1, y: 0, scale: 1 }}
                                            exit={{ opacity: 0, y: 8, scale: 0.98 }}
                                            transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
                                            className="absolute top-full left-1/2 -translate-x-1/2 pt-6"
                                        >
                                            <div
                                                className="bg-white border-gray-thin p-2 overflow-hidden"
                                                style={{ borderRadius: 'var(--radius-s)' }}
                                            >
                                                {item.variant === "multi-column" ? (
                                                    <div className="grid grid-cols-2 gap-6 p-6 min-w-[580px]">
                                                        {item.sections?.map((section) => (
                                                            <div key={section.title} className="flex flex-col gap-5">
                                                                <h4
                                                                    className="uppercase tracking-[0.2em] px-3"
                                                                    style={{ color: 'var(--color-black-lighter)', fontSize: 'var(--font-size-xs)', fontWeight: 'var(--font-weight-black)', opacity: 0.5 }}
                                                                >
                                                                    {section.title}
                                                                </h4>
                                                                <div className="flex flex-col gap-1.5">
                                                                    {section.items.map((subItem) => (
                                                                        <Link
                                                                            key={subItem.title}
                                                                            href="#"
                                                                            className="group flex flex-col gap-1 p-3.5 transition-all cursor-pointer hover:opacity-80"
                                                                            style={{ borderRadius: 'var(--radius-s)' }}
                                                                        >
                                                                            <div className="flex items-center gap-4">
                                                                                <div
                                                                                    className="w-10 h-10 flex items-center justify-center transition-colors group-hover:bg-white"
                                                                                    style={{ backgroundColor: 'var(--color-white-dark)', borderRadius: 'var(--radius-s)' }}
                                                                                >
                                                                                    <subItem.icon size={18} className="text-[var(--color-black)] group-hover:text-[var(--color-brand-normal)] transition-colors" />
                                                                                </div>
                                                                                <div>
                                                                                    <span
                                                                                        className="block text-[var(--color-black)] group-hover:text-[var(--color-brand-normal)] transition-colors"
                                                                                        style={{ fontSize: 'var(--font-size-sm)', fontWeight: 'var(--font-weight-medium)' }}
                                                                                    >
                                                                                        {subItem.title}
                                                                                    </span>
                                                                                    <p
                                                                                        className="mt-0.5 line-clamp-1"
                                                                                        style={{ color: 'var(--color-black-lighter)', fontSize: 'var(--font-size-xs)', opacity: 0.7 }}
                                                                                    >
                                                                                        {subItem.description}
                                                                                    </p>
                                                                                </div>
                                                                            </div>
                                                                        </Link>
                                                                    ))}
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                ) : (
                                                    <div className="flex w-[660px]">
                                                        <div className="flex-1 p-6 flex flex-col gap-2">
                                                            {item.content?.left.map((subItem) => (
                                                                <Link
                                                                    key={subItem.title}
                                                                    href="#"
                                                                    className="group flex items-center gap-4 p-4 transition-all cursor-pointer hover:opacity-80"
                                                                    style={{ borderRadius: 'var(--radius-s)' }}
                                                                >
                                                                    <div
                                                                        className="w-10 h-10 flex items-center justify-center transition-colors group-hover:bg-white"
                                                                        style={{ backgroundColor: 'var(--color-white-dark)', borderRadius: 'var(--radius-s)' }}
                                                                    >
                                                                        <subItem.icon size={18} className="text-[var(--color-black)] group-hover:text-[var(--color-brand-normal)] transition-colors" />
                                                                    </div>
                                                                    <div>
                                                                        <span
                                                                            className="block text-[var(--color-black)] group-hover:text-[var(--color-brand-normal)] transition-colors"
                                                                            style={{ fontSize: 'var(--font-size-sm)', fontWeight: 'var(--font-weight-medium)' }}
                                                                        >
                                                                            {subItem.title}
                                                                        </span>
                                                                        <p
                                                                            className="mt-0.5"
                                                                            style={{ color: 'var(--color-black-lighter)', fontSize: 'var(--font-size-xs)', opacity: 0.7 }}
                                                                        >
                                                                            {subItem.description}
                                                                        </p>
                                                                    </div>
                                                                </Link>
                                                            ))}
                                                        </div>
                                                        <div className="flex-1 p-2">
                                                            <div
                                                                className="w-full h-full overflow-hidden border border-white-dark relative group/img"
                                                                style={{ borderRadius: 'var(--radius-s)' }}
                                                            >
                                                                <ImagePrimitive
                                                                    src={item.content?.rightImage?.src || ""}
                                                                    alt={item.content?.rightImage?.alt || ""}
                                                                    className="w-full h-full object-cover transition-transform duration-700 group-hover/img:scale-110"
                                                                />
                                                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-6 opacity-0 group-hover/img:opacity-100 transition-opacity">
                                                                    <p className="text-white font-medium" style={{ fontSize: 'var(--font-size-sm)' }}>{item.content?.rightImage?.alt}</p>
                                                                    <span className="text-white/60 font-medium" style={{ fontSize: 'var(--font-size-xs)' }}>Featured Resource</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        ))}
                    </div>

                    {/* CTA & Mobile Menu Trigger */}
                    <div className="flex items-center gap-3 relative z-10">
                        <Link href={SETTINGS.cta.href} className="hidden lg:block btn-primary btn-md btn-pill">
                            {SETTINGS.cta.text}
                        </Link>
                        <button
                            onClick={() => setIsMobileMenuOpen(true)}
                            className="lg:hidden w-10 h-10 flex items-center justify-center cursor-pointer transition-all z-50 text-[var(--color-black)] hover:text-[var(--color-brand-normal)]"
                            style={{}}
                        >
                            <Menu size={24} />
                        </button>
                    </div>
                </div>
            </nav>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 1.1 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 1.1 }}
                        className="fixed inset-0 z-[100] bg-white flex flex-col overflow-hidden"
                    >
                        <div className="absolute inset-0 pointer-events-none opacity-[0.05] contrast-125" style={{ backgroundImage: 'url("https://grainy-gradients.vercel.app/noise.svg")' }} />

                        <div className="relative flex items-center justify-between p-6 z-10">
                            <SETTINGS.logo.icon size={28} style={{ color: 'var(--color-black)' }} />
                            <button
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="w-10 h-10 flex items-center justify-center cursor-pointer text-[var(--color-black)] hover:text-[var(--color-brand-normal)] transition-colors"
                                style={{}}
                            >
                                <X size={24} />
                            </button>
                        </div>

                        <div className="relative flex-1 overflow-y-auto px-6 py-8 flex flex-col gap-2 z-10">
                            {SETTINGS.navigation.map((item) => (
                                <div key={item.label} className="">
                                    <button
                                        onClick={() => setExpandedMobileItem(expandedMobileItem === item.label ? null : item.label)}
                                        className="flex items-center justify-between w-full py-6 group cursor-pointer text-left"
                                    >
                                        <span
                                            className={cn("transition-colors", expandedMobileItem === item.label ? "text-[var(--color-brand-normal)]" : "text-[var(--color-black)] group-hover:text-[var(--color-brand-normal)]")}
                                            style={{ color: expandedMobileItem === item.label ? 'var(--color-brand-normal)' : '', fontSize: '24px', fontWeight: 'var(--font-weight-medium)' }}
                                        >
                                            {item.label}
                                        </span>
                                        <ChevronDown
                                            className={cn("transition-transform duration-300", expandedMobileItem === item.label ? "rotate-180" : "")}
                                            size={24}
                                            style={{ color: expandedMobileItem === item.label ? 'var(--color-brand-normal)' : 'var(--color-black)' }}
                                        />
                                    </button>

                                    <AnimatePresence>
                                        {expandedMobileItem === item.label && (
                                            <motion.div
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: "auto", opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                className="overflow-hidden"
                                            >
                                                <div className="pb-8 flex flex-col gap-4">
                                                    {(item.sections ? item.sections.flatMap(s => s.items) : item.content?.left || []).map((sub, idx) => (
                                                        <Link
                                                            key={idx}
                                                            href="#"
                                                            className="flex items-center gap-4 py-3 transition-all active:scale-[0.98] group/sub"
                                                            style={{ borderRadius: 'var(--radius-s)' }}
                                                            onClick={() => setIsMobileMenuOpen(false)}
                                                        >
                                                            <div
                                                                className="w-10 h-10 flex items-center justify-center transition-colors group-hover/sub:bg-white"
                                                                style={{ backgroundColor: 'var(--color-white-dark)', borderRadius: 'var(--radius-s)' }}
                                                            >
                                                                <sub.icon size={18} className="text-[var(--color-black)] group-hover/sub:text-[var(--color-brand-normal)] transition-colors" />
                                                            </div>
                                                            <div>
                                                                <h4
                                                                    className="text-[var(--color-black)] group-hover/sub:text-[var(--color-brand-normal)] transition-colors"
                                                                    style={{ fontSize: 'var(--font-size-sm)', fontWeight: 'var(--font-weight-medium)' }}
                                                                >
                                                                    {sub.title}
                                                                </h4>
                                                                <p
                                                                    className=""
                                                                    style={{ color: 'var(--color-black-lighter)', fontSize: 'var(--font-size-xs)', opacity: 0.7 }}
                                                                >
                                                                    {sub.description}
                                                                </p>
                                                            </div>
                                                        </Link>
                                                    ))}
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            ))}
                        </div>

                        <div className="relative px-6 py-8 z-10 w-full">
                            <Link
                                href={SETTINGS.cta.href}
                                className="btn-primary btn-md btn-pill w-full h-14 flex items-center justify-center font-bold"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                {SETTINGS.cta.text}
                            </Link>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Spacer for Scroll Demo */}
            <div className="h-[100vh] relative z-0" />
        </div>
    );
}
