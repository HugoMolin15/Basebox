'use client';

import React from 'react';
import { BookOpen, ArrowRight, Terminal } from 'lucide-react';

export default function HomePage() {
  return (
    /* Notice: No Navbar or Sidebar here! The RootLayout handles them now. */
    <div className="max-w-[800px] mx-auto text-left animate-in fade-in slide-in-from-bottom-4 duration-1000 py-12 px-6">

      {/* HERO SECTION */}
      <div className="mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-pill bg-brand-primary/10 text-brand-primary text-status-bold mb-6">
          <BookOpen size={12} />
          Documentation
        </div>

        <h1 className="heading-xl text-foreground mb-6">
          Build faster with <span className="text-brand-primary">Basebox.</span>
        </h1>

        <p className="text-xl text-muted-foreground max-w-[600px] leading-relaxed font-medium">
          A collection of professional, accessible, and high-performance components
          crafted with Tailwind CSS and Framer Motion.
        </p>
      </div>

      {/* QUICK START STEPS */}
      <div className="grid gap-12 w-full">

        {/* Step 1 */}
        <div className="flex flex-col items-start border-l-2 border-library-border pl-8 relative">
          <div className="absolute -left-[17px] top-0 w-8 h-8 rounded-full bg-brand-secondary text-white flex items-center justify-center text-xs font-bold border-4 border-background">
            1
          </div>

          <h3 className="heading-sm mb-2 text-foreground">Install dependencies</h3>

          <p className="text-muted-foreground mb-6 max-w-[500px] font-medium">
            Run this in your terminal to ensure icons and utility classes work correctly.
          </p>

          <div className="w-full lib-card p-4 flex justify-between items-center group">
            <code className="text-sm font-mono text-foreground/80">
              npm install lucide-react clsx tailwind-merge
            </code>
          </div>
        </div>

        {/* Step 2 */}
        <div className="flex flex-col items-start border-l-2 border-library-border pl-8 relative">
          <div className="absolute -left-[17px] top-0 w-8 h-8 rounded-full bg-brand-secondary text-white flex items-center justify-center text-xs font-bold border-4 border-background">
            2
          </div>

          <h3 className="heading-sm mb-2 text-foreground">Add your utility helper</h3>

          <p className="text-muted-foreground mb-6 max-w-[500px] font-medium">
            Create <code className="text-brand-primary font-mono text-xs">lib/utils.ts</code> for conditional classes.
          </p>

          <pre className="w-full lib-card p-6 text-xs font-mono text-foreground/80 overflow-x-auto">
            {`import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}`}
          </pre>
        </div>

        {/* Step 3 */}
        <div className="flex flex-col items-start border-l-2 border-transparent pl-8 relative pb-20">
          <div className="absolute -left-[17px] top-0 w-8 h-8 rounded-full bg-brand-primary text-white flex items-center justify-center text-xs font-bold border-4 border-background shadow-lg shadow-brand-primary/20">
            3
          </div>

          <h3 className="heading-sm mb-2 text-brand-primary">Start building</h3>

          <p className="text-muted-foreground mb-6 max-w-[500px] font-medium">
            Pick a component from the sidebar and copy the source code into your project.
          </p>

          <div className="flex items-center gap-2 text-brand-primary font-bold text-sm cursor-pointer hover:gap-3 transition-all">
            Browse all components <ArrowRight size={16} />
          </div>
        </div>

      </div>
    </div>
  );
}