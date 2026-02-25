'use client';
import React from 'react';
import { cn } from '@/lib/utils';
import { MenuToggleIcon } from '@/components/ui/menu-toggle-icon';
import { createPortal } from 'react-dom';
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';
import {
    CodeIcon,
    GlobeIcon,
    LayersIcon,
    UserPlusIcon,
    Users,
    Star,
    FileText,
    Shield,
    RotateCcw,
    Handshake,
    Leaf,
    HelpCircle,
    BarChart,
    PlugIcon,
    Box,
    type LucideIcon
} from 'lucide-react';
import Link from 'next/link';

type LinkItem = {
    title: string;
    href: string;
    icon: LucideIcon;
    description?: string;
};

/**
 * CONFIGURATION FIRST
 */
const SETTINGS = {
    logo: {
        href: "#",
    },
    actions: {
        primary: {
            text: 'Get Started',
            href: '#'
        },
        secondary: {
            text: 'Sign In',
            href: '#'
        },
    },
    pricing: {
        text: 'Pricing',
        href: '#'
    },
    productLinks: [
        {
            title: 'Website Builder',
            href: '#',
            description: 'Create responsive websites with ease',
            icon: GlobeIcon,
        },
        {
            title: 'Cloud Platform',
            href: '#',
            description: 'Deploy and scale apps in the cloud',
            icon: LayersIcon,
        },
        {
            title: 'Team Collaboration',
            href: '#',
            description: 'Tools to help your teams work better together',
            icon: UserPlusIcon,
        },
        {
            title: 'Analytics',
            href: '#',
            description: 'Track and analyze your website traffic',
            icon: BarChart,
        },
        {
            title: 'Integrations',
            href: '#',
            description: 'Connect your apps and services',
            icon: PlugIcon,
        },
        {
            title: 'API',
            href: '#',
            description: 'Build custom integrations with our API',
            icon: CodeIcon,
        },
    ] as LinkItem[],
    companyLinksPrimary: [
        {
            title: 'About Us',
            href: '#',
            description: 'Learn more about our story and team',
            icon: Users,
        },
        {
            title: 'Customer Stories',
            href: '#',
            description: 'See how Basebox has helped our clients succeed',
            icon: Star,
        },
        {
            title: 'Partnerships',
            href: '#',
            description: 'Collaborate with us for mutual growth',
            icon: Handshake,
        },
    ] as LinkItem[],
    companyLinksSecondary: [] as LinkItem[],
};

// --- HOOKS ---
function useScroll(threshold: number) {
    const [scrolled, setScrolled] = React.useState(false);

    const onScroll = React.useCallback(() => {
        setScrolled(window.scrollY > threshold);
    }, [threshold]);

    React.useEffect(() => {
        window.addEventListener('scroll', onScroll);
        return () => window.removeEventListener('scroll', onScroll);
    }, [onScroll]);

    React.useEffect(() => {
        onScroll();
    }, [onScroll]);

    return scrolled;
}

function MobileNavAccordion({ title, openDefault = false, children }: { title: string, openDefault?: boolean, children: React.ReactNode }) {
    const [open, setOpen] = React.useState(openDefault);
    return (
        <div className="flex flex-col w-full">
            <button
                onClick={() => setOpen(!open)}
                className="flex items-center justify-between w-full px-2 py-3 cursor-pointer transition-all bg-transparent border-none group/accordion"
            >
                <span
                    className="transition-colors group-hover/accordion:text-[var(--color-brand-normal)]"
                    style={{ color: 'var(--color-black)', fontWeight: 'var(--font-weight-medium)' }}
                >
                    {title}
                </span>
                <svg className={cn("size-4 transition-transform duration-200 text-[var(--color-black)] group-hover/accordion:text-[var(--color-brand-normal)]", open && "rotate-180")} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6" /></svg>
            </button>
            <div className={cn("overflow-hidden transition-all duration-300", open ? "max-h-[800px] opacity-100" : "max-h-0 opacity-0")}>
                <div className="flex flex-col gap-1 pb-4">
                    {children}
                </div>
            </div>
        </div>
    );
}

// --- SUBCOMPONENTS ---
const WordmarkIcon = (props: React.ComponentProps<"span">) => (
    <span className={cn("size-9 font-light tracking-tight text-brand-secondary whitespace-nowrap flex items-center justify-center transition-colors hover:text-brand-primary", props.className)}>
        <Box className="size-6 transition-colors group-hover/logo:text-brand-primary" />
    </span>
);

type MobileMenuProps = React.ComponentProps<'div'> & {
    open: boolean;
};

function MobileMenu({ open, children, className, ...props }: MobileMenuProps) {
    if (!open || typeof window === 'undefined') return null;

    return createPortal(
        <div
            id="mobile-menu"
            className={cn(
                'bg-white',
                'fixed top-16 right-0 bottom-0 left-0 z-40 flex flex-col overflow-hidden lg:hidden',
            )}
        >
            <div
                data-slot={open ? 'open' : 'closed'}
                className={cn(
                    'ease-out',
                    'size-full p-4',
                    className,
                )}
                {...props}
            >
                {children}
            </div>
        </div>,
        document.body,
    );
}

function ListItem({
    title,
    description,
    icon: Icon,
    className,
    href,
    ...props
}: React.ComponentProps<typeof NavigationMenuLink> & LinkItem) {
    return (
        <NavigationMenuLink
            className={cn('w-full flex flex-row gap-x-3 p-3 transition-all group/item', className)}
            style={{ borderRadius: 'var(--radius-s)' }}
            {...props}
            asChild
        >
            <Link href={href}>
                <div
                    className="flex aspect-square size-10 items-center justify-center shrink-0 transition-all duration-300"
                    style={{
                        backgroundColor: 'var(--color-white-dark)',
                        borderRadius: 'var(--radius-s)',
                        color: 'var(--color-black)'
                    }}
                >
                    <Icon className="size-5 group-hover/item:text-[var(--color-brand-normal)] transition-colors" />
                </div>
                <div className="flex flex-col items-start justify-center">
                    <span
                        className="transition-colors group-hover/item:text-[var(--color-brand-normal)]"
                        style={{ color: 'var(--color-black)', fontSize: 'var(--font-size-sm)', fontWeight: 'var(--font-weight-medium)' }}
                    >
                        {title}
                    </span>
                    {description && (
                        <span
                            className="leading-snug mt-0.5 transition-colors group-hover/item:text-[var(--color-brand-normal)]"
                            style={{ color: 'var(--color-black-lighter)', fontSize: 'var(--font-size-xs)', fontWeight: 'var(--font-weight-normal)', opacity: 0.7 }}
                        >
                            {description}
                        </span>
                    )}
                </div>
            </Link>
        </NavigationMenuLink>
    );
}

// --- MAIN COMPONENT ---
export function Navbar6() {
    const [open, setOpen] = React.useState(false);
    const scrolled = useScroll(10);

    React.useEffect(() => {
        if (open) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [open]);

    return (
        <div className="w-full relative flex flex-col">
            <header
                className={cn('fixed top-0 z-50 w-full transition-all duration-300 bg-white', {
                    'shadow-sm': scrolled && !open,
                })}
            >
                <nav className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-6">
                    <div className="flex items-center gap-6">
                        <Link href={SETTINGS.logo.href} className="transition-opacity group/logo flex items-center">
                            <WordmarkIcon className="text-foreground" />
                        </Link>
                        <NavigationMenu
                            className="hidden lg:flex"
                            viewportClassName="translate-y-6 bg-white border border-gray-thin rounded-[var(--radius-s)] shadow-lg"
                        >
                            <NavigationMenuList>
                                <NavigationMenuItem>
                                    <NavigationMenuTrigger
                                        className="bg-transparent font-medium text-[var(--color-black)] hover:text-[var(--color-brand-normal)] hover:bg-transparent data-[state=open]:bg-transparent data-[active]:bg-transparent cursor-pointer transition-colors"
                                        style={{ fontSize: 'var(--font-size-sm)' }}
                                    >
                                        Product
                                    </NavigationMenuTrigger>
                                    <NavigationMenuContent className="w-auto p-2">
                                        <ul className="space-y-1 min-w-[280px]">
                                            {SETTINGS.productLinks.map((item, i) => (
                                                <li key={i} className="whitespace-nowrap">
                                                    <ListItem {...item} />
                                                </li>
                                            ))}
                                        </ul>
                                    </NavigationMenuContent>
                                </NavigationMenuItem>
                                <NavigationMenuItem>
                                    <NavigationMenuTrigger
                                        className="bg-transparent font-medium text-[var(--color-black)] hover:text-[var(--color-brand-normal)] hover:bg-transparent data-[state=open]:bg-transparent data-[active]:bg-transparent cursor-pointer transition-colors"
                                        style={{ fontSize: 'var(--font-size-sm)' }}
                                    >
                                        Company
                                    </NavigationMenuTrigger>
                                    <NavigationMenuContent className="w-auto p-2">
                                        <ul className="space-y-1 min-w-[240px]">
                                            {SETTINGS.companyLinksPrimary.map((item, i) => (
                                                <li key={i} className="whitespace-nowrap">
                                                    <ListItem {...item} />
                                                </li>
                                            ))}
                                        </ul>
                                    </NavigationMenuContent>
                                </NavigationMenuItem>
                                <NavigationMenuLink asChild>
                                    <Link
                                        href={SETTINGS.pricing.href}
                                        className="px-4 py-2.5 transition-colors rounded-md cursor-pointer flex items-center h-9 text-[var(--color-black)] hover:text-[var(--color-brand-normal)]"
                                        style={{ fontSize: 'var(--font-size-sm)', fontWeight: 'var(--font-weight-medium)' }}
                                    >
                                        {SETTINGS.pricing.text}
                                    </Link>
                                </NavigationMenuLink>
                            </NavigationMenuList>
                        </NavigationMenu>
                    </div>
                    <div className="hidden items-center gap-3 lg:flex">
                        <Link href={SETTINGS.actions.secondary.href}>
                            <button className="btn-secondary btn-md btn-pill" style={{ color: 'var(--color-black)' }}>{SETTINGS.actions.secondary.text}</button>
                        </Link>
                        <Link href={SETTINGS.actions.primary.href}>
                            <button className="btn-primary btn-md btn-pill">{SETTINGS.actions.primary.text}</button>
                        </Link>
                    </div>
                    <button
                        onClick={() => setOpen(!open)}
                        className="lg:hidden p-2 text-[var(--color-black)] transition-colors -mr-2 cursor-pointer hover:text-[var(--color-brand-normal)]"
                        aria-expanded={open}
                        aria-controls="mobile-menu"
                        aria-label="Toggle menu"
                    >
                        <MenuToggleIcon open={open} className="size-5" duration={300} />
                    </button>
                </nav>
                <MobileMenu open={open} className="flex flex-col justify-between gap-4 overflow-y-auto">
                    <NavigationMenu className="max-w-full items-start justify-start w-full">
                        <div className="flex w-full flex-col gap-y-1 flex-1">
                            <MobileNavAccordion title="Product">
                                {SETTINGS.productLinks.map((link) => (
                                    <ListItem key={link.title} {...link} />
                                ))}
                            </MobileNavAccordion>
                            <MobileNavAccordion title="Company">
                                {SETTINGS.companyLinksPrimary.map((link) => (
                                    <ListItem key={link.title} {...link} />
                                ))}
                                {SETTINGS.companyLinksSecondary.map((link) => (
                                    <NavigationMenuLink key={link.title} asChild>
                                        <Link
                                            href={link.href}
                                            className="flex py-3 px-3 flex-row items-center gap-x-3 transition-colors w-full cursor-pointer group/sublink"
                                            style={{ borderRadius: 'var(--radius-s)' }}
                                        >
                                            <link.icon className="size-4 shrink-0 transition-colors group-hover/sublink:text-[var(--color-brand-normal)]" style={{ color: 'var(--color-black-lighter)', opacity: 0.4 }} />
                                            <span
                                                className="transition-colors text-[var(--color-black)] group-hover/sublink:text-[var(--color-brand-normal)]"
                                                style={{ fontSize: 'var(--font-size-sm)', fontWeight: 'var(--font-weight-medium)' }}
                                            >
                                                {link.title}
                                            </span>
                                        </Link>
                                    </NavigationMenuLink>
                                ))}
                            </MobileNavAccordion>
                            <NavigationMenuLink asChild>
                                <Link
                                    href={SETTINGS.pricing.href}
                                    className="flex py-3 px-2 flex-row items-center transition-colors w-full cursor-pointer text-[var(--color-black)] hover:text-[var(--color-brand-normal)]"
                                    style={{ fontWeight: 'var(--font-weight-medium)' }}
                                >
                                    <span>{SETTINGS.pricing.text}</span>
                                </Link>
                            </NavigationMenuLink>
                        </div>
                    </NavigationMenu>
                    <div className="flex flex-col gap-3 mt-8 pb-12 w-full shrink-0">
                        <Link href={SETTINGS.actions.secondary.href} className="w-full">
                            <button className="btn-secondary btn-md btn-pill w-full" style={{ color: 'var(--color-black)' }}>{SETTINGS.actions.secondary.text}</button>
                        </Link>
                        <Link href={SETTINGS.actions.primary.href} className="w-full">
                            <button className="btn-primary btn-md btn-pill w-full">{SETTINGS.actions.primary.text}</button>
                        </Link>
                    </div>
                </MobileMenu>
            </header>

        </div>
    );
}
