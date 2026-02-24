'use server';

import fs from 'fs/promises';
import path from 'path';
import { codeToHtml } from 'shiki';
import { registry } from '@/lib/registry';

export async function getComponentCode(filePath: string) {
    try {
        const fullPath = path.join(process.cwd(), filePath);
        const rawCode = await fs.readFile(fullPath, 'utf8');

        const highlightedCode = await codeToHtml(rawCode, {
            lang: 'tsx',
            theme: 'dark-plus',
            // This is the key part! 
            // It ensures every line is wrapped in a span with class "line"
            structure: 'classic',
            transformers: [
                {
                    line(node, line) {
                        node.properties['className'] = ['line']; // Explicitly add the class
                        node.properties['data-line'] = line;
                    },
                },
            ],
        });

        return {
            html: highlightedCode,
            raw: rawCode
        };
    } catch (error) {
        console.error('Error reading file:', error);
        return { html: '', raw: '' };
    }
}

// ─── Export payload types ──────────────────────────────────────────────────────
export interface ExportComponent {
    registryId: string;     // e.g. "hero-6"
    fileName: string;       // basename, e.g. "hero-6.tsx"
    zipPath: string;        // full path in ZIP, e.g. "components/Hero/hero-6.tsx"
    exportName: string;     // exact export used in dynamic import, e.g. "Hero6"
    sourceCode: string;     // raw tsx source (@/ aliases kept, tsconfig handles them)
}

export interface ExportPayload {
    components: ExportComponent[];
    supportFiles: { path: string; code: string }[];  // Media/, ui/ files verbatim
    globalsCss: string;
}

// ─── Parse registry.ts to build id → exact export name map ───────────────────
// Splits by registry object boundaries so each chunk is matched independently.
// An entry with no dynamic import (e.g. 'introduction') simply gets no entry.
async function buildExportNameMap(): Promise<Map<string, string>> {
    const registryPath = path.join(process.cwd(), 'lib/registry.ts');
    const source = await fs.readFile(registryPath, 'utf8');
    const map = new Map<string, string>();

    // Split on opening braces to isolate each registry object, then match id + mod.X within each chunk.
    // An object without a dynamic import (like 'introduction') simply won't match modMatch, so it's skipped.
    const parts = source.split(/(?:\n|\r\n)\s*\{/);
    for (const part of parts) {
        const idMatch = part.match(/id:\s*['"](.[^'"]+)['"]/);
        const modMatch = part.match(/\.then\s*\(\s*mod\s*=>\s*mod\.([A-Za-z0-9_]+)\s*\)/);
        if (idMatch && modMatch) {
            map.set(idMatch[1], modMatch[1]);
        }
    }

    return map;
}

// ─── Read all files from a directory (flat) ──────────────────────────────────
async function readDirFiles(dirPath: string, zipPrefix: string): Promise<{ path: string; code: string }[]> {
    const results: { path: string; code: string }[] = [];
    try {
        const entries = await fs.readdir(dirPath);
        for (const entry of entries) {
            const fullPath = path.join(dirPath, entry);
            const stat = await fs.stat(fullPath);
            if (stat.isFile()) {
                const code = await fs.readFile(fullPath, 'utf8');
                // Keep @/ aliases intact — tsconfig.json in the exported project handles them
                results.push({ path: `${zipPrefix}/${entry}`, code });
            }
        }
    } catch { /* ignore missing dirs */ }
    return results;
}

// ─── Main export action ───────────────────────────────────────────────────────
export async function exportPageProject(registryIds: string[]): Promise<ExportPayload> {
    // Deduplicate registry IDs (same component can appear multiple times on canvas)
    const uniqueIds = [...new Set(registryIds)];

    // Get the ground-truth export name for each registry ID
    const exportNameMap = await buildExportNameMap();

    const components: ExportComponent[] = [];

    for (const id of uniqueIds) {
        const entry = registry.find(r => r.id === id);
        if (!entry || !entry.sourceCodePath) continue;

        try {
            const fullPath = path.join(process.cwd(), entry.sourceCodePath);
            // Keep source verbatim — @/ aliases stay, tsconfig.json exports them correctly
            const sourceCode = await fs.readFile(fullPath, 'utf8');

            // Use the exact export name from the dynamic import in registry.ts
            const exportName = exportNameMap.get(id) ?? 'Component';

            const fileName = path.basename(entry.sourceCodePath); // e.g. "hero-6.tsx"
            components.push({ registryId: id, fileName, zipPath: entry.sourceCodePath, exportName, sourceCode });
        } catch {
            // Skip components whose source can't be read
        }
    }

    // ── Support folders: components/Media and components/ui ───────────────────
    const mediaFiles = await readDirFiles(
        path.join(process.cwd(), 'components/Media'),
        'components/Media'
    );
    const uiFiles = await readDirFiles(
        path.join(process.cwd(), 'components/ui'),
        'components/ui'
    );
    const supportFiles = [...mediaFiles, ...uiFiles];

    // ── globals.css ───────────────────────────────────────────────────────────
    const cssPath = path.join(process.cwd(), 'app/globals.css');
    const globalsCss = await fs.readFile(cssPath, 'utf8');

    return { components, supportFiles, globalsCss };
}