'use client';

import * as React from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import {
    Box, Layers, Database, Cloud, Terminal, Blocks, Cpu, Network, Monitor,
    Lock, Server, Webhook, Globe, Binary, Rocket, Star, type LucideIcon
} from "lucide-react";

/**
 * CONFIGURATION FIRST
 */
const SETTINGS = {
    header: {
        title: "A World of Innovation",
        subtitle: "Explore a universe of possibilities with our platform, connecting you to the tools and technologies that shape the future.",
    },
    actions: {
        primary: {
            text: "Join the Revolution",
            href: "#",
        }
    },
    floatingIcons: [
        { id: 1, Icon: Box, className: 'top-[18%] left-[15%]' },
        { id: 2, Icon: Layers, className: 'top-[20%] right-[16%]' },
        { id: 3, Icon: Database, className: 'top-[70%] left-[14%]' },
        { id: 4, Icon: Cloud, className: 'bottom-[18%] right-[16%]' },
        { id: 5, Icon: Terminal, className: 'top-[12%] left-[40%]' },
        { id: 7, Icon: Cpu, className: 'bottom-[15%] left-[30%]' },
        { id: 9, Icon: Monitor, className: 'top-[80%] right-[32%]' },
        { id: 11, Icon: Server, className: 'top-[40%] right-[8%]' },
    ]
};

// Interface for the props of each individual icon
interface IconProps {
    id: number;
    Icon: LucideIcon;
    className: string;
}

// A single icon component with its own motion logic
const FloatingIcon = ({
    mouseX,
    mouseY,
    iconData,
    index,
}: {
    mouseX: React.MutableRefObject<number>;
    mouseY: React.MutableRefObject<number>;
    iconData: IconProps;
    index: number;
}) => {
    const ref = React.useRef<HTMLDivElement>(null);

    // Motion values for the icon's position, with spring physics for smooth movement
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const springX = useSpring(x, { stiffness: 300, damping: 20 });
    const springY = useSpring(y, { stiffness: 300, damping: 20 });

    React.useEffect(() => {
        const handleMouseMove = () => {
            if (ref.current) {
                const rect = ref.current.getBoundingClientRect();
                const distance = Math.sqrt(
                    Math.pow(mouseX.current - (rect.left + rect.width / 2), 2) +
                    Math.pow(mouseY.current - (rect.top + rect.height / 2), 2)
                );

                // If the cursor is close enough, repel the icon
                if (distance < 150) {
                    const angle = Math.atan2(
                        mouseY.current - (rect.top + rect.height / 2),
                        mouseX.current - (rect.left + rect.width / 2)
                    );
                    // The closer the cursor, the stronger the repulsion
                    const force = (1 - distance / 150) * 50;
                    x.set(-Math.cos(angle) * force);
                    y.set(-Math.sin(angle) * force);
                } else {
                    // Return to original position when cursor is away
                    x.set(0);
                    y.set(0);
                }
            }
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, [x, y, mouseX, mouseY]);

    return (
        <motion.div
            ref={ref}
            key={iconData.id}
            style={{
                x: springX,
                y: springY,
            }}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
                delay: index * 0.08,
                duration: 0.6,
                ease: [0.22, 1, 0.36, 1],
            }}
            className={cn('absolute', iconData.className)}
        >
            {/* Inner wrapper for the continuous floating animation utilizing basebox primitives */}
            <motion.div
                className="flex items-center justify-center w-16 h-16 md:w-20 md:h-20 p-3 border-gray-thin bg-white/60 backdrop-blur-md inner-glow opacity-60"
                style={{ borderRadius: 'var(--radius-s)' }}
                animate={{
                    y: [0, -8, 0, 8, 0],
                    x: [0, 6, 0, -6, 0],
                    rotate: [0, 5, 0, -5, 0],
                }}
                transition={{
                    duration: 5 + Math.random() * 5,
                    repeat: Infinity,
                    repeatType: 'mirror',
                    ease: 'easeInOut',
                }}
            >
                <iconData.Icon className="w-8 h-8 md:w-10 md:h-10" style={{ color: 'var(--color-brand-normal)' }} strokeWidth={1.5} />
            </motion.div>
        </motion.div>
    );
};

export function CtaCard3() {
    // Refs to track the raw mouse position
    const mouseX = React.useRef(0);
    const mouseY = React.useRef(0);

    const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
        mouseX.current = event.clientX;
        mouseY.current = event.clientY;
    };

    return (
        <section
            onMouseMove={handleMouseMove}
            className="relative w-full flex items-center justify-center overflow-hidden bg-background"
        >
            {/* Container for the background floating icons */}
            <div className="absolute inset-0 w-full h-full pointer-events-none">
                {SETTINGS.floatingIcons.map((iconData, index) => (
                    <FloatingIcon
                        key={iconData.id}
                        mouseX={mouseX}
                        mouseY={mouseY}
                        iconData={iconData}
                        index={index}
                    />
                ))}
            </div>

            {/* Container for the foreground content */}
            <div className="relative z-10 text-center px-4 max-w-4xl min-w-[50vw]">
                <div className="flex flex-col items-center justify-center p-8 md:p-12">
                    <h1
                        className="text-balance"
                        style={{ color: 'var(--color-black)', fontSize: 'var(--font-size-5xl)', fontWeight: 'var(--font-weight-black)' }}
                    >
                        {SETTINGS.header.title}
                    </h1>
                    <p
                        className="mt-6 max-w-xl mx-auto leading-relaxed"
                        style={{ color: 'var(--color-black-lighter)', fontSize: 'var(--font-size-lg)', fontWeight: 'var(--font-weight-normal)' }}
                    >
                        {SETTINGS.header.subtitle}
                    </p>
                    <div className="mt-10">
                        <Link href={SETTINGS.actions.primary.href}>
                            <button className="btn-primary btn-lg btn-pill">
                                {SETTINGS.actions.primary.text}
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}
