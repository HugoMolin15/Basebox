'use client'

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"

/**
 * CONFIGURATION FIRST
 */
const SETTINGS = {
    header: {
        title: "What we do",
        subtitle: "Transforming ideas into exceptional digital experiences.",
    },
    items: [
        {
            id: "design",
            number: "01",
            title: "Design",
            content:
                "We craft pixel-perfect interfaces that blend aesthetics with functionality, creating memorable digital experiences.",
        },
        {
            id: "development",
            number: "02",
            title: "Development",
            content: "Building robust, scalable solutions with modern technologies that stand the test of time and traffic.",
        },
        {
            id: "strategy",
            number: "03",
            title: "Strategy",
            content: "Data-driven insights and creative thinking combine to position your brand for lasting success.",
        },
        {
            id: "growth",
            number: "04",
            title: "Growth",
            content: "Sustainable scaling strategies that transform startups into industry leaders through measurable results.",
        },
    ]
};

export function Faq() {
    const [activeId, setActiveId] = useState<string | null>("design")
    const [hoveredId, setHoveredId] = useState<string | null>(null)

    return (
        <div className="w-full py-24 bg-background flex flex-col items-center justify-start p-8">
            <div className="w-full max-w-2xl">
                <div className="mb-12">
                    <h1
                        className="mb-3 text-balance items-start"
                        style={{ color: 'var(--color-black)', fontSize: 'var(--font-size-2xl)', fontWeight: 'var(--font-weight-bold)' }}
                    >
                        {SETTINGS.header.title}
                    </h1>
                    <p
                        className=""
                        style={{ color: 'var(--color-black-lighter)', fontSize: 'var(--font-size-lg)', fontWeight: 'var(--font-weight-normal)' }}
                    >
                        {SETTINGS.header.subtitle}
                    </p>
                </div>

                <div className="w-full">
                    <div className="space-y-0">
                        {SETTINGS.items.map((item, index) => {
                            const isActive = activeId === item.id
                            const isHovered = hoveredId === item.id
                            const isLast = index === SETTINGS.items.length - 1

                            return (
                                <div key={item.id}>
                                    <motion.button
                                        onClick={() => setActiveId(isActive ? null : item.id)}
                                        onMouseEnter={() => setHoveredId(item.id)}
                                        onMouseLeave={() => setHoveredId(null)}
                                        className="w-full group relative outline-none cursor-pointer"
                                        initial={false}
                                    >
                                        <div className="flex items-center gap-6 py-5 px-1">
                                            {/* Number with animated circle */}
                                            <div className="relative flex items-center justify-center w-10 h-10">
                                                <motion.div
                                                    className="absolute inset-0 rounded-full"
                                                    initial={false}
                                                    animate={{
                                                        scale: isActive ? 1 : isHovered ? 0.85 : 0,
                                                        opacity: isActive ? 1 : isHovered ? 0.2 : 0,
                                                    }}
                                                    style={{ backgroundColor: 'var(--color-brand-normal)' }}
                                                    transition={{
                                                        type: "spring",
                                                        stiffness: 400,
                                                        damping: 25,
                                                    }}
                                                />
                                                <motion.span
                                                    className="relative z-10 transition-colors duration-200"
                                                    style={{
                                                        color: isActive ? 'white' : 'var(--color-black-lighter)',
                                                        fontSize: 'var(--font-size-sm)',
                                                        fontWeight: 'var(--font-weight-bold)',
                                                        letterSpacing: '0.025em'
                                                    }}
                                                >
                                                    {item.number}
                                                </motion.span>
                                            </div>

                                            {/* Title */}
                                            <motion.h3
                                                className="tracking-tight transition-colors duration-200"
                                                animate={{
                                                    x: isActive || isHovered ? 4 : 0,
                                                }}
                                                style={{
                                                    color: isActive || isHovered ? 'var(--color-black)' : 'var(--color-black-lighter)',
                                                    fontSize: 'var(--font-size-2xl)',
                                                    fontWeight: 'var(--font-weight-medium)'
                                                }}
                                                transition={{
                                                    type: "spring",
                                                    stiffness: 400,
                                                    damping: 30,
                                                }}
                                            >
                                                {item.title}
                                            </motion.h3>

                                            {/* Animated indicator */}
                                            <div className="ml-auto flex items-center gap-3">
                                                <motion.div
                                                    className="flex items-center justify-center w-8 h-8"
                                                    animate={{ rotate: isActive ? 45 : 0 }}
                                                    transition={{
                                                        type: "spring",
                                                        stiffness: 300,
                                                        damping: 20,
                                                    }}
                                                >
                                                    <motion.svg
                                                        width="16"
                                                        height="16"
                                                        viewBox="0 0 16 16"
                                                        fill="none"
                                                        animate={{
                                                            color: isActive || isHovered ? 'var(--color-black)' : 'var(--color-black-lighter)',
                                                            opacity: isActive || isHovered ? 1 : 0.4
                                                        }}
                                                        transition={{ duration: 0.2 }}
                                                    >
                                                        <motion.path
                                                            d="M8 1V15M1 8H15"
                                                            stroke="currentColor"
                                                            strokeWidth="1.5"
                                                            strokeLinecap="round"
                                                            initial={false}
                                                        />
                                                    </motion.svg>
                                                </motion.div>
                                            </div>
                                        </div>

                                        {/* Animated underline */}
                                        <motion.div
                                            className="absolute bottom-0 left-0 right-0 h-px origin-left"
                                            initial={false}
                                            style={{ backgroundColor: 'var(--color-white-dark)' }}
                                        />
                                        <motion.div
                                            className="absolute bottom-0 left-0 h-px origin-left"
                                            initial={{ scaleX: 0 }}
                                            animate={{
                                                scaleX: isActive ? 1 : isHovered ? 0.3 : 0,
                                            }}
                                            style={{ backgroundColor: 'var(--color-black)' }}
                                            transition={{
                                                type: "spring",
                                                stiffness: 300,
                                                damping: 30,
                                            }}
                                        />
                                    </motion.button>

                                    {/* Content */}
                                    <AnimatePresence mode="wait">
                                        {isActive && (
                                            <motion.div
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{
                                                    height: "auto",
                                                    opacity: 1,
                                                    transition: {
                                                        height: { type: "spring", stiffness: 300, damping: 30 },
                                                        opacity: { duration: 0.2, delay: 0.1 },
                                                    },
                                                }}
                                                exit={{
                                                    height: 0,
                                                    opacity: 0,
                                                    transition: {
                                                        height: { type: "spring", stiffness: 300, damping: 30 },
                                                        opacity: { duration: 0.1 },
                                                    },
                                                }}
                                                className="overflow-hidden"
                                            >
                                                <motion.p
                                                    className="pl-16 pr-12 py-6 leading-relaxed text-left"
                                                    initial={{ y: -10 }}
                                                    animate={{ y: 0 }}
                                                    exit={{ y: -10 }}
                                                    style={{ color: 'var(--color-black-lighter)', fontSize: 'var(--font-size-base)', fontWeight: 'var(--font-weight-medium)' }}
                                                    transition={{
                                                        type: "spring",
                                                        stiffness: 300,
                                                        damping: 25,
                                                    }}
                                                >
                                                    {item.content}
                                                </motion.p>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}
