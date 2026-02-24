'use client';

import React, { useState } from 'react';
import { registry, Category } from '@/lib/registry';
import { PageBuilderProvider, usePageBuilder, PlacedComponent } from '@/lib/page-builder-store';
import {
    DndContext,
    closestCenter,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
    DragEndEvent,
} from '@dnd-kit/core';
import {
    SortableContext,
    sortableKeyboardCoordinates,
    useSortable,
    verticalListSortingStrategy,
    arrayMove,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import {
    GripVertical, Trash2, ChevronUp, ChevronDown, ExternalLink, Search, X, Layers, Plus, Trash, Download, Loader2
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { exportPageProject } from '@/lib/actions';

// ─── Category labels ─────────────────────────────────────────────────────────
const CATEGORIES: Category[] = [
    'navbar', 'hero', 'layout', 'stats', 'bento-grid', 'cta', 'testimonial',
    'faq', 'pricing', 'footer', 'form', 'blog', 'infinite-scroller',
    'background', 'button', 'parallax', 'text', 'styles',
];

// ─── Sortable Row ─────────────────────────────────────────────────────────────
function SortableRow({ comp, index, total }: { comp: PlacedComponent; index: number; total: number }) {
    const { removeComponent, moveUp, moveDown } = usePageBuilder();
    const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: comp.instanceId });
    const style = { transform: CSS.Transform.toString(transform), transition };

    return (
        <div
            ref={setNodeRef}
            style={style}
            className={cn(
                'group flex flex-col border border-zinc-200 rounded-xl overflow-hidden bg-white transition-shadow',
                isDragging ? 'shadow-2xl z-50 opacity-80' : 'shadow-sm',
            )}
        >
            {/* Row header */}
            <div className="flex items-center gap-2 px-4 py-3 bg-zinc-50 border-b border-zinc-200">
                {/* Drag handle */}
                <button
                    {...attributes}
                    {...listeners}
                    className="cursor-grab active:cursor-grabbing text-zinc-400 hover:text-zinc-700 p-1 rounded"
                    title="Drag to reorder"
                >
                    <GripVertical size={16} />
                </button>

                <span className="flex-1 text-sm font-semibold text-zinc-700 truncate">{comp.name}</span>

                {/* Up / down arrows */}
                <div className="flex items-center gap-1">
                    <button
                        onClick={() => moveUp(comp.instanceId)}
                        disabled={index === 0}
                        className="p-1.5 rounded hover:bg-zinc-200 text-zinc-500 hover:text-zinc-800 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                        title="Move up"
                    >
                        <ChevronUp size={14} />
                    </button>
                    <button
                        onClick={() => moveDown(comp.instanceId)}
                        disabled={index === total - 1}
                        className="p-1.5 rounded hover:bg-zinc-200 text-zinc-500 hover:text-zinc-800 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                        title="Move down"
                    >
                        <ChevronDown size={14} />
                    </button>
                </div>

                {/* Delete */}
                <button
                    onClick={() => removeComponent(comp.instanceId)}
                    className="p-1.5 rounded hover:bg-red-50 text-zinc-400 hover:text-red-500 transition-all cursor-pointer"
                    title="Remove component"
                >
                    <Trash2 size={14} />
                </button>
            </div>

            {/* Preview iframe */}
            <div className="w-full overflow-hidden bg-white" style={{ height: 320 }}>
                <iframe
                    src={`/preview/${comp.registryId}`}
                    title={comp.name}
                    className="w-full h-full border-none pointer-events-none"
                    style={{ transform: 'scale(0.65)', transformOrigin: 'top center', width: '154%', marginLeft: '-27%' }}
                />
            </div>
        </div>
    );
}

// ─── Canvas (right panel) ─────────────────────────────────────────────────────
function Canvas() {
    const { components, reorderComponents, clearAll } = usePageBuilder();
    const [exporting, setExporting] = useState(false);
    const [projectName, setProjectName] = useState('my-basebox-site');

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }),
    );

    function handleDragEnd(event: DragEndEvent) {
        const { active, over } = event;
        if (!over || active.id === over.id) return;
        const oldIndex = components.findIndex(c => c.instanceId === active.id);
        const newIndex = components.findIndex(c => c.instanceId === over.id);
        reorderComponents(arrayMove(components, oldIndex, newIndex));
    }

    async function handleExport() {
        if (components.length === 0) return;
        setExporting(true);
        const safeName = projectName.trim().replace(/[^a-zA-Z0-9-_]/g, '-') || 'my-basebox-site';
        try {
            // Build an ordered list of registry IDs (preserving duplicates order)
            const orderedIds = components.map(c => c.registryId);

            // Call server action to get all file contents
            const payload = await exportPageProject(orderedIds);

            // Dynamically import JSZip (client-only)
            const JSZip = (await import('jszip')).default;
            const zip = new JSZip();

            // ── Generated page.tsx ────────────────────────────────────────────
            // Map registryId → ExportComponent — direct ID match, no guessing
            const idToExport = new Map(
                payload.components.map(ec => [ec.registryId, ec] as const)
            );

            // Import lines: one per unique component, using the exact zipPath for the @/ import
            const importLines = payload.components
                .map(ec => {
                    const importPath = `@/${ec.zipPath.replace(/\.tsx$/, '')}`;
                    return `import { ${ec.exportName} } from '${importPath}';`;
                })
                .join('\n');

            // Render lines in canvas order (duplicates preserved)
            const renderLines = components
                .map(comp => {
                    const ec = idToExport.get(comp.registryId);
                    return ec ? `      <${ec.exportName} />` : null;
                })
                .filter(Boolean)
                .join('\n');

            const pageTsx = `import type { Metadata } from 'next';
import './globals.css';
${importLines}

export const metadata: Metadata = {
  title: 'My Site',
  description: 'Built with Basebox',
};

export default function Home() {
  return (
    <main>
${renderLines}
    </main>
  );
}
`;

            // ── layout.tsx ────────────────────────────────────────────────────
            const layoutTsx = `import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata: Metadata = {
  title: 'My Site',
  description: 'Built with Basebox',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={\`\${inter.variable} \${inter.className} antialiased\`}>
        {children}
      </body>
    </html>
  );
}
`;

            // ── lib/utils.ts ──────────────────────────────────────────────────
            const utilsTs = `import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
`;

            // ── package.json ──────────────────────────────────────────────────
            const packageJson = JSON.stringify({
                name: safeName,
                version: '0.1.0',
                private: true,
                scripts: {
                    dev: 'next dev',
                    build: 'next build',
                    start: 'next start',
                },
                dependencies: {
                    '@radix-ui/react-accordion': '^1.2.12',
                    '@radix-ui/react-navigation-menu': '^1.2.14',
                    '@radix-ui/react-slot': '^1.2.4',
                    '@react-three/fiber': '^9.5.0',
                    '@types/three': '^0.182.0',
                    'class-variance-authority': '^0.7.1',
                    'clsx': '^2.1.1',
                    'framer-motion': '^12.34.2',
                    'gsap': '^3.14.2',
                    'lucide-react': '^0.574.0',
                    'next': '16.1.6',
                    'next-themes': '^0.4.6',
                    'ogl': '^1.0.11',
                    'react': '19.2.3',
                    'react-dom': '19.2.3',
                    'react-use-measure': '^2.1.7',
                    'rough-notation': '^0.5.1',
                    'tailwind-merge': '^3.4.1',
                    'three': '^0.183.0',
                },
                devDependencies: {
                    '@tailwindcss/postcss': '^4',
                    '@types/node': '^20',
                    '@types/react': '^19',
                    '@types/react-dom': '^19',
                    'tailwindcss': '^4',
                    'typescript': '^5',
                },
            }, null, 2);

            // ── tsconfig.json ─────────────────────────────────────────────────
            const tsconfigJson = JSON.stringify({
                compilerOptions: {
                    target: 'ES2017',
                    lib: ['dom', 'dom.iterable', 'esnext'],
                    allowJs: true,
                    skipLibCheck: true,
                    strict: true,
                    noEmit: true,
                    esModuleInterop: true,
                    module: 'esnext',
                    moduleResolution: 'bundler',
                    resolveJsonModule: true,
                    isolatedModules: true,
                    jsx: 'preserve',
                    incremental: true,
                    plugins: [{ name: 'next' }],
                    paths: { '@/*': ['./*'] },
                },
                include: ['next-env.d.ts', '**/*.ts', '**/*.tsx', '.next/types/**/*.ts'],
                exclude: ['node_modules'],
            }, null, 2);

            // ── next.config.ts ────────────────────────────────────────────────
            const nextConfig = `import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: '**' },
    ],
  },
};

export default nextConfig;
`;

            // ── postcss.config.mjs ────────────────────────────────────────────
            const postcssConfig = `const config = {
  plugins: {
    '@tailwindcss/postcss': {},
  },
};

export default config;
`;

            // ── README.md ─────────────────────────────────────────────────────
            const readme = `# My Basebox Site

Built with [Basebox](https://github.com/HugoMolin15/Basebox).

## Getting Started

\`\`\`bash
npm install
npm run dev
\`\`\`

Then open [http://localhost:3000](http://localhost:3000).
`;

            // ── Assemble ZIP ──────────────────────────────────────────────────
            zip.file('app/page.tsx', pageTsx);
            zip.file('app/layout.tsx', layoutTsx);
            zip.file('app/globals.css', payload.globalsCss);
            zip.file('lib/utils.ts', utilsTs);
            zip.file('package.json', packageJson);
            zip.file('tsconfig.json', tsconfigJson);
            zip.file('next.config.ts', nextConfig);
            zip.file('postcss.config.mjs', postcssConfig);
            zip.file('README.md', readme);

            // Component files — placed at their full original path (e.g. components/Hero/hero-6.tsx)
            // This makes @/components/Hero/hero-6 resolve correctly via tsconfig @/ alias
            for (const ec of payload.components) {
                zip.file(ec.zipPath, ec.sourceCode);
            }

            // Support files: components/Media and components/ui
            for (const sf of payload.supportFiles) {
                zip.file(sf.path, sf.code);
            }

            // Empty public dir placeholder
            zip.file('public/.gitkeep', '');

            // Generate and download
            const blob = await zip.generateAsync({ type: 'blob' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `${safeName}.zip`;
            a.click();
            URL.revokeObjectURL(url);
        } catch (err) {
            console.error('Export failed:', err);
            alert('Export failed — check the console for details.');
        } finally {
            setExporting(false);
        }
    }

    const isEmpty = components.length === 0;

    return (
        <div className="flex-1 flex flex-col min-h-0 bg-zinc-50">
            {/* Canvas toolbar */}
            <div className="flex items-center justify-between px-6 py-4 bg-white border-b border-zinc-200 shrink-0">
                <div className="flex items-center gap-3">
                    <Layers size={18} className="text-zinc-500 shrink-0" />
                    <span className="font-bold text-zinc-800 text-sm shrink-0">Canvas</span>
                    {components.length > 0 && (
                        <span className="px-2 py-0.5 rounded-full bg-brand-primary/10 text-brand-primary text-xs font-bold shrink-0">
                            {components.length}
                        </span>
                    )}
                    {/* Project name input */}
                    <input
                        type="text"
                        value={projectName}
                        onChange={e => setProjectName(e.target.value)}
                        placeholder="project-name"
                        className="ml-2 px-3 py-1.5 text-xs font-mono bg-zinc-50 border border-zinc-200 rounded-lg outline-none focus:border-brand-primary/50 transition-all text-zinc-700 placeholder:text-zinc-400 w-44"
                        title="ZIP folder name"
                    />
                </div>
                <div className="flex items-center gap-2">
                    {components.length > 0 && (
                        <button
                            onClick={clearAll}
                            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg text-zinc-500 hover:text-red-500 hover:bg-red-50 transition-all border border-zinc-200 cursor-pointer"
                        >
                            <Trash size={12} />
                            Clear all
                        </button>
                    )}
                    {/* Export ZIP */}
                    <button
                        onClick={handleExport}
                        disabled={components.length === 0 || exporting}
                        className={cn(
                            'flex items-center gap-1.5 px-4 py-1.5 text-xs font-bold rounded-lg transition-all border',
                            components.length === 0
                                ? 'opacity-40 cursor-not-allowed bg-zinc-100 border-zinc-200 text-zinc-500'
                                : 'bg-zinc-900 text-white border-zinc-900 hover:opacity-90 shadow-sm cursor-pointer',
                        )}
                    >
                        {exporting ? <Loader2 size={12} className="animate-spin" /> : <Download size={12} />}
                        {exporting ? 'Exporting…' : 'Export ZIP'}
                    </button>
                    {/* Open Preview */}
                    <a
                        href="/page-preview"
                        target="_blank"
                        rel="noopener noreferrer"
                        className={cn(
                            'flex items-center gap-1.5 px-4 py-1.5 text-xs font-bold rounded-lg transition-all border cursor-pointer',
                            components.length === 0
                                ? 'opacity-40 pointer-events-none bg-zinc-100 border-zinc-200 text-zinc-500'
                                : 'bg-[var(--color-brand-normal)] text-white border-[var(--color-brand-normal)] hover:opacity-90 shadow-sm',
                        )}
                    >
                        <ExternalLink size={12} />
                        Open Preview
                    </a>
                </div>
            </div>

            {/* Component rows */}
            <div className="flex-1 overflow-y-auto p-6">
                {isEmpty ? (
                    <div className="h-full flex flex-col items-center justify-center text-center gap-3 py-20 text-zinc-400">
                        <Layers size={40} className="text-zinc-300" />
                        <p className="font-semibold text-zinc-500">No components yet</p>
                        <p className="text-sm">Pick components from the left panel and click <strong>Add</strong></p>
                    </div>
                ) : (
                    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                        <SortableContext items={components.map(c => c.instanceId)} strategy={verticalListSortingStrategy}>
                            <div className="flex flex-col gap-4">
                                {components.map((comp, i) => (
                                    <SortableRow key={comp.instanceId} comp={comp} index={i} total={components.length} />
                                ))}
                            </div>
                        </SortableContext>
                    </DndContext>
                )}
            </div>
        </div>
    );
}


// ─── Component Picker (left panel) ───────────────────────────────────────────
function ComponentPicker() {
    const { addComponent } = usePageBuilder();
    const [search, setSearch] = useState('');
    const [added, setAdded] = useState<string | null>(null);

    const filtered = registry.filter(item =>
        item.category !== 'getting-started' &&
        (item.name.toLowerCase().includes(search.toLowerCase()) ||
            item.description.toLowerCase().includes(search.toLowerCase()))
    );

    const handleAdd = (id: string, name: string) => {
        addComponent(id, name);
        setAdded(id);
        setTimeout(() => setAdded(null), 1000);
    };

    return (
        <aside className="w-72 shrink-0 flex flex-col border-r border-zinc-200 bg-white overflow-hidden">
            <div className="px-4 pt-4 pb-3 border-b border-zinc-200">
                <p className="text-xs font-bold uppercase tracking-widest text-zinc-400 mb-3">Components</p>
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={14} />
                    <input
                        type="text"
                        placeholder="Search..."
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                        className="lib-search-input"
                    />
                    {search && (
                        <button onClick={() => setSearch('')} className="absolute right-2 top-1/2 -translate-y-1/2 p-1 hover:bg-library-card/80 rounded-[var(--radius-s)]">
                            <X size={12} className="text-muted-foreground" />
                        </button>
                    )}
                </div>
            </div>

            <div className="flex-1 overflow-y-auto p-3 no-scrollbar">
                {CATEGORIES.map(cat => {
                    const items = filtered.filter(i => i.category === cat);
                    if (items.length === 0) return null;
                    return (
                        <div key={cat} className="mb-5">
                            <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-zinc-400 px-2 mb-1.5">
                                {cat.replace(/-/g, ' ')}
                            </p>
                            <div className="flex flex-col gap-0.5">
                                {items.map(item => (
                                    <div
                                        key={item.id}
                                        className="flex items-center justify-between gap-2 px-2 py-2 rounded-lg group"
                                    >
                                        <span className="text-sm text-zinc-600 truncate">
                                            {item.name}
                                        </span>
                                        <button
                                            onClick={() => handleAdd(item.id, item.name)}
                                            className={cn(
                                                'shrink-0 flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-bold transition-all cursor-pointer',
                                                added === item.id
                                                    ? 'bg-green-100 text-green-600'
                                                    : 'bg-zinc-100 text-zinc-500 hover:bg-[var(--color-brand-normal)] hover:text-[var(--color-white)]',
                                            )}
                                            title={`Add ${item.name}`}
                                        >
                                            <Plus size={10} />
                                            {added === item.id ? 'Added!' : 'Add'}
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    );
                })}
            </div>
        </aside>
    );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function PageBuilderPage() {
    return (
        <PageBuilderProvider>
            <div className="flex h-full w-full overflow-hidden">
                <ComponentPicker />
                <Canvas />
            </div>
        </PageBuilderProvider>
    );
}
