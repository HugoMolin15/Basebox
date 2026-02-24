'use client';

import React, { useEffect, useState } from 'react';
import { registry } from '@/lib/registry';
import { PlacedComponent } from '@/lib/page-builder-store';

const STORAGE_KEY = 'basebox-page-builder';

export default function PagePreview() {
    const [components, setComponents] = useState<PlacedComponent[]>([]);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        try {
            const saved = localStorage.getItem(STORAGE_KEY);
            if (saved) {
                const parsed: PlacedComponent[] = JSON.parse(saved);
                if (Array.isArray(parsed)) setComponents(parsed);
            }
        } catch { /* ignore */ }
        setMounted(true);
    }, []);

    if (!mounted) {
        return (
            <div className="min-h-screen bg-white flex items-center justify-center">
                <div className="w-8 h-8 rounded-full border-4 border-zinc-200 border-t-zinc-700 animate-spin" />
            </div>
        );
    }

    if (components.length === 0) {
        return (
            <div className="min-h-screen bg-white flex flex-col items-center justify-center gap-4 text-zinc-400">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="3" width="18" height="18" rx="2" /><path d="M3 9h18M9 21V9" />
                </svg>
                <p className="text-lg font-semibold text-zinc-500">No components added yet</p>
                <p className="text-sm">Go to the <strong>Page Builder</strong> and add some components first.</p>
            </div>
        );
    }

    return (
        <main className="w-full min-h-screen bg-white">
            {components.map(comp => {
                const entry = registry.find(r => r.id === comp.registryId);
                if (!entry) return null;
                const Component = entry.component;
                return (
                    <div key={comp.instanceId} className="w-full">
                        <Component />
                    </div>
                );
            })}
        </main>
    );
}
