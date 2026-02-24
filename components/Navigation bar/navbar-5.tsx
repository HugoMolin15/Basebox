'use client';

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { CustomEase } from "gsap/CustomEase";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Menu, X, Box } from "lucide-react";

// Register GSAP Plugins safely
if (typeof window !== "undefined") {
    gsap.registerPlugin(CustomEase);
}

/**
 * CONFIGURATION FIRST
 */
const SETTINGS = {
    links: [
        { label: "About us", href: "#", shapeLayer: 1 },
        { label: "Our work", href: "#", shapeLayer: 2 },
        { label: "Services", href: "#", shapeLayer: 3 },
        { label: "Blog", href: "#", shapeLayer: 4 },
        { label: "Contact us", href: "#", shapeLayer: 5 },
    ]
};

export function Navbar5() {
    const containerRef = useRef<HTMLDivElement>(null);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    // Background Hover Setup
    useEffect(() => {
        gsap.defaults({ ease: "power4.inOut", duration: 0.8 });
    }, []);

    // Panel Open/Close Animation Setup
    useEffect(() => {
        if (!containerRef.current) return;

        const ctx = gsap.context(() => {
            const navWrap = containerRef.current!.querySelector(".nav-overlay-wrapper");
            const menu = containerRef.current!.querySelector(".menu-content");
            const overlay = containerRef.current!.querySelector(".overlay");
            const bgPanels = containerRef.current!.querySelectorAll(".backdrop-layer");
            const menuLinks = containerRef.current!.querySelectorAll(".nav-link-text");

            const tl = gsap.timeline();

            if (isMenuOpen) {
                // OPENING SEQUENCE
                tl.set(navWrap, { display: "block" })
                    .set(menu, { xPercent: 0 }, "<")
                    .fromTo(overlay, { autoAlpha: 0 }, { autoAlpha: 1 }, "<")
                    .fromTo(bgPanels, { xPercent: 120 }, { xPercent: 0, stagger: 0.1, duration: 0.8, ease: "power4.inOut" }, "<")
                    .fromTo(menuLinks, { x: 50, opacity: 0 }, { x: 0, opacity: 1, stagger: 0.05, duration: 0.6, ease: "power3.out" }, "-=0.4");
            } else {
                // CLOSING SEQUENCE
                tl.to(menuLinks, { x: 30, opacity: 0, duration: 0.3, stagger: 0.02, ease: "power2.inOut" })
                    .to(bgPanels, { xPercent: 120, stagger: -0.1, duration: 0.7, ease: "power4.inOut" }, "<")
                    .to(overlay, { autoAlpha: 0, duration: 0.5 }, "-=0.5")
                    .set(navWrap, { display: "none" });
            }

        }, containerRef);

        return () => ctx.revert();
    }, [isMenuOpen]);

    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === "Escape" && isMenuOpen) {
                setIsMenuOpen(false);
            }
        };
        window.addEventListener("keydown", handleEsc);
        return () => window.removeEventListener("keydown", handleEsc);
    }, [isMenuOpen]);

    return (
        <div ref={containerRef} className="w-full relative">

            <header className="fixed top-0 left-0 w-full z-50 px-6 lg:px-12 py-6 flex items-center justify-between pointer-events-none">
                <Link href="#" className={cn("z-50 pointer-events-auto transition-all duration-300 group/logo", isMenuOpen && "opacity-0 md:opacity-100")}>
                    <Box
                        className="size-8 transition-colors duration-300"
                        style={{ color: 'var(--color-black)' }}
                    />
                </Link>

                <button
                    className={cn(
                        "z-50 bg-transparent flex items-center justify-center relative overflow-hidden group transition-all hover:scale-110 hover:opacity-70 cursor-pointer pointer-events-auto w-12 h-12 text-[var(--color-black)] hover:text-[var(--color-brand-normal)]"
                    )}
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    style={{ color: isMenuOpen ? 'var(--color-white)' : '' }}
                >
                    <Menu className={cn("w-8 h-8 absolute transition-all duration-300", isMenuOpen ? "opacity-0 rotate-90 scale-50" : "opacity-100 rotate-0 scale-100")} />
                    <X className={cn("w-8 h-8 absolute transition-all duration-300", isMenuOpen ? "opacity-100 rotate-0 scale-100" : "opacity-0 -rotate-90 scale-50")} />
                </button>
            </header>

            <section className="nav-overlay-wrapper fixed inset-0 z-40 hidden">
                <div className="overlay absolute inset-0 bg-black/20 backdrop-blur-sm cursor-pointer" onClick={() => setIsMenuOpen(false)}></div>

                <nav
                    className="menu-content absolute top-2 right-2 bottom-2 md:top-4 md:right-4 md:bottom-4 w-[80vw] sm:w-[400px] md:w-[500px] h-[calc(100%-1rem)] md:h-[calc(100%-2rem)] pointer-events-auto overflow-hidden"
                    style={{ borderRadius: 'var(--radius-l)', border: '1px solid var(--color-white-dark)' }}
                >
                    <div className="absolute inset-0 flex pointer-events-none">
                        <div className="backdrop-layer w-full h-full bg-white absolute inset-0"></div>
                        <div className="backdrop-layer w-full h-full absolute inset-0" style={{ backgroundColor: 'var(--color-white-dark)' }}></div>
                        <div className="backdrop-layer w-full h-full absolute inset-0" style={{ backgroundColor: 'var(--color-brand-normal)' }}></div>
                        <div className="backdrop-layer w-full h-full absolute inset-0" style={{ backgroundColor: 'var(--color-black-light)' }}></div>
                        <div className="backdrop-layer w-full h-full absolute inset-0" style={{ backgroundColor: 'var(--color-black)' }}></div>
                    </div>

                    <div className="relative z-10 flex flex-col h-full px-8 sm:px-14 md:px-20 overflow-y-auto overflow-x-hidden">
                        <ul className="flex flex-col gap-4 md:gap-6 mb-auto mt-24 md:mt-32 pb-12 origin-left">
                            {SETTINGS.links.map((link, idx) => (
                                <li key={idx} className="menu-list-item relative group w-fit cursor-pointer" data-shape={link.shapeLayer}>
                                    <a href={link.href} className="block group-hover:pl-4 transition-all duration-300 ease-out py-2 outline-none focus:outline-none" onClick={() => setIsMenuOpen(false)}>
                                        <p
                                            className="nav-link-text tracking-tighter text-[var(--color-white)] group-hover:text-[var(--color-brand-normal)] transition-colors duration-300 ease-out"
                                            style={{ fontSize: '48px', fontWeight: 'var(--font-weight-black)' }}
                                        >
                                            {link.label}
                                        </p>
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </nav>
            </section>
        </div>
    );
}
