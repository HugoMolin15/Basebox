"use client"

import React from 'react'
import Link from 'next/link'
import { Library, Github } from 'lucide-react'

export function Navbar() {
    return (
        <header className="h-[70px] border-b border-gray-thin bg-background/80 backdrop-blur-md px-6 flex items-center justify-between shrink-0 sticky top-0 z-50">
            {/* LEFT SIDE: Minimalist Blue Icon */}
            <Link href="/" className="flex items-center group">
                <Library
                    size={28}
                    className="text-foreground transition-all group-hover:text-[var(--color-brand-normal)] group-hover:scale-110 group-hover:rotate-3"
                />
            </Link>

            {/* RIGHT SIDE: GitHub Icon with Blue Hover */}
            <div className="flex items-center">
                <Link
                    href="https://github.com/HugoMolin15/Basebox.git"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-button text-foreground hover:text-[var(--color-brand-normal)] transition-all duration-300"
                    aria-label="GitHub Repository"
                >
                    <Github size={24} />
                </Link>
            </div>
        </header>
    )
}
