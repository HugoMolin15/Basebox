import React from "react";
import { Sparkles, Instagram, Facebook, Twitter, Linkedin } from "lucide-react";

interface Footer2Props {
    logo?: {
        url: string;
        title: string;
    };
    sections?: Array<{
        title: string;
        links: Array<{ name: string; href: string }>;
    }>;
    description?: string;
    socialLinks?: Array<{
        icon: React.ReactNode;
        href: string;
        label: string;
    }>;
    copyright?: string;
    legalLinks?: Array<{
        name: string;
        href: string;
    }>;
}

const defaultSections = [
    {
        title: "Product",
        links: [
            { name: "Overview", href: "#" },
            { name: "Pricing", href: "#" },
            { name: "Marketplace", href: "#" },
            { name: "Features", href: "#" },
        ],
    },
    {
        title: "Company",
        links: [
            { name: "About", href: "#" },
            { name: "Team", href: "#" },
            { name: "Blog", href: "#" },
            { name: "Careers", href: "#" },
        ],
    },
    {
        title: "Resources",
        links: [
            { name: "Help Center", href: "#" },
            { name: "Sales", href: "#" },
            { name: "Advertise", href: "#" },
            { name: "Privacy", href: "#" },
        ],
    },
];

const defaultSocialLinks = [
    { icon: <Instagram className="size-5" />, href: "#", label: "Instagram" },
    { icon: <Facebook className="size-5" />, href: "#", label: "Facebook" },
    { icon: <Twitter className="size-5" />, href: "#", label: "Twitter" },
    { icon: <Linkedin className="size-5" />, href: "#", label: "LinkedIn" },
];

const defaultLegalLinks = [
    { name: "Terms and Conditions", href: "#" },
    { name: "Privacy Policy", href: "#" },
];

export const Footer = ({
    logo = {
        url: "/",
        title: "Basebox",
    },
    sections = defaultSections,
    description = "A collection of premium components for modern web experiences, designed for speed and scale.",
    socialLinks = defaultSocialLinks,
    copyright = "© 2026 Basebox. All rights reserved.",
    legalLinks = defaultLegalLinks,
}: Footer2Props) => {
    return (
        <section className="py-24 bg-white">
            <div className="w-full px-8 md:px-12 lg:px-24">
                <style dangerouslySetInnerHTML={{
                    __html: `
                    .footer-link:hover,
                    .legal-link:hover,
                    .social-icon-link:hover {
                        color: var(--color-brand-normal) !important;
                    }
                `}} />
                <div className="flex w-full flex-col justify-between gap-16 lg:flex-row lg:items-start lg:text-left">

                    {/* Brand Info */}
                    <div className="flex w-full flex-col justify-between gap-6 lg:items-start lg:max-w-sm">
                        <div className="flex items-center gap-2 lg:justify-start">
                            <a href={logo.url} className="flex items-center gap-2 group">
                                <div
                                    className="p-1.5 flex items-center justify-center transition-transform group-hover:rotate-12"
                                    style={{ backgroundColor: 'var(--color-brand-normal)', borderRadius: 'var(--radius-s)' }}
                                >
                                    <Sparkles className="h-5 w-5 text-white" />
                                </div>
                                <h2
                                    className="tracking-tighter"
                                    style={{ color: 'var(--color-black)', fontSize: 'var(--font-size-2xl)', fontWeight: 'var(--font-weight-bold)' }}
                                >
                                    {logo.title}
                                </h2>
                            </a>
                        </div>
                        <p
                            className="leading-relaxed"
                            style={{ color: 'var(--color-black-lighter)', fontSize: 'var(--font-size-base)', fontWeight: 'var(--font-weight-medium)' }}
                        >
                            {description}
                        </p>
                        <ul className="flex items-center space-x-6">
                            {socialLinks.map((social, idx) => (
                                <li key={idx} className="transition-colors duration-300 transform hover:scale-110">
                                    <a
                                        href={social.href}
                                        aria-label={social.label}
                                        className="social-icon-link cursor-pointer"
                                        style={{ color: 'var(--color-black-lighter)' }}
                                    >
                                        {social.icon}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Navigation Grid */}
                    <div className="grid w-full grid-cols-2 gap-10 md:grid-cols-3 lg:gap-20">
                        {sections.map((section, sectionIdx) => (
                            <div key={sectionIdx}>
                                <h3
                                    className="mb-6 uppercase tracking-[0.2em]"
                                    style={{ color: 'var(--color-black-lighter)', fontSize: 'var(--font-size-xs)', fontWeight: 'var(--font-weight-black)', opacity: 0.5 }}
                                >
                                    {section.title}
                                </h3>
                                <ul className="space-y-4">
                                    {section.links.map((link, linkIdx) => (
                                        <li
                                            key={linkIdx}
                                            className="transition-colors duration-200"
                                        >
                                            <a
                                                href={link.href}
                                                className="footer-link cursor-pointer tracking-tight"
                                                style={{ color: 'var(--color-black)', fontSize: 'var(--font-size-sm)', fontWeight: 'var(--font-weight-bold)' }}
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

                {/* Footer Bottom */}
                <div
                    className="mt-20 flex flex-col justify-between gap-6 py-10 uppercase tracking-widest md:flex-row md:items-center"
                    style={{ fontSize: 'var(--font-size-xs)', fontWeight: 'var(--font-weight-bold)' }}
                >
                    <p className="order-2 lg:order-1" style={{ color: 'var(--color-black-lighter)', opacity: 0.6 }}>{copyright}</p>
                    <ul className="order-1 flex flex-col gap-4 md:order-2 md:flex-row md:gap-8">
                        {legalLinks.map((link, idx) => (
                            <li key={idx} className="transition-colors duration-200">
                                <a
                                    href={link.href}
                                    className="legal-link cursor-pointer"
                                    style={{ color: 'var(--color-black-lighter)' }}
                                >
                                    {link.name}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </section>
    );
};
