"use client"

import React, { useEffect, useId, useRef, useState } from "react"
import { motion } from "framer-motion"

import { cn } from "@/lib/utils"

/**
 * CONFIGURATION FIRST
 * Centralized settings for the component.
 */
const SETTINGS = {
    title: "Dot Pattern Background",
    width: 16,
    height: 16,
    cx: 1,
    cy: 1,
    cr: 1.5,
    glow: true,
};

/**
 *  DotPattern Component Props
 */
interface DotPatternProps extends React.SVGProps<SVGSVGElement> {
    width?: number
    height?: number
    x?: number
    y?: number
    cx?: number
    cy?: number
    cr?: number
    className?: string
    glow?: boolean
    [key: string]: unknown
}

export function DotPattern({
    width = 16,
    height = 16,
    x = 0,
    y = 0,
    cx = 1,
    cy = 1,
    cr = 1,
    className,
    glow = false,
    ...props
}: DotPatternProps) {
    const id = useId()
    const containerRef = useRef<SVGSVGElement>(null)
    const [dimensions, setDimensions] = useState({ width: 0, height: 0 })

    useEffect(() => {
        const updateDimensions = () => {
            if (containerRef.current) {
                const { width, height } = containerRef.current.getBoundingClientRect()
                setDimensions({ width, height })
            }
        }

        updateDimensions()
        window.addEventListener("resize", updateDimensions)
        return () => window.removeEventListener("resize", updateDimensions)
    }, [])

    const dots = Array.from(
        {
            length:
                Math.ceil(dimensions.width / width) *
                Math.ceil(dimensions.height / height),
        },
        (_, i) => {
            const col = i % Math.ceil(dimensions.width / width)
            const row = Math.floor(i / Math.ceil(dimensions.width / width))
            return {
                x: col * width + cx,
                y: row * height + cy,
                delay: Math.random() * 5,
                duration: Math.random() * 3 + 2,
            }
        }
    )

    return (
        <svg
            ref={containerRef}
            aria-hidden="true"
            className={cn(
                "pointer-events-none absolute inset-0 h-full w-full text-slate-300",
                className
            )}
            {...props}
        >
            <defs>
                <radialGradient id={`${id}-gradient`}>
                    <stop offset="0%" stopColor="currentColor" stopOpacity="1" />
                    <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
                </radialGradient>
            </defs>
            {dots.map((dot, index) => (
                <circle
                    key={`${dot.x}-${dot.y}`}
                    cx={dot.x}
                    cy={dot.y}
                    r={cr}
                    fill={glow ? `url(#${id}-gradient)` : "currentColor"}
                    style={glow ? { opacity: 1 } : {}}
                />
            ))}
        </svg>
    )
}

export function Background() {
    return (
        <section className="relative w-full min-h-screen bg-background flex flex-col items-center justify-center p-4 overflow-hidden">
            <DotPattern
                className="opacity-100"
                width={SETTINGS.width}
                height={SETTINGS.height}
                cx={SETTINGS.cx}
                cy={SETTINGS.cy}
                cr={SETTINGS.cr}
                glow={SETTINGS.glow}
            />
        </section>
    );
}
