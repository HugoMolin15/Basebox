'use client';

import React, { useState, use, useEffect, useRef, useCallback } from 'react';
import { registry } from "@/lib/registry";
import { notFound } from "next/navigation";
import { Monitor, Tablet, Smartphone, Check, Copy, Terminal, ExternalLink } from 'lucide-react';
import { cn } from "@/lib/utils";
import { getComponentCode } from "@/lib/actions";

export default function ComponentPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = use(params);
    const [activeTab, setActiveTab] = useState<'preview' | 'code'>('preview');
    const [viewSize, setViewSize] = useState<'sm' | 'md' | 'lg'>('lg');
    const [codeData, setCodeData] = useState({ html: '', raw: '' });
    const [copied, setCopied] = useState(false);
    const [cmdCopied, setCmdCopied] = useState(false);

    const iframeRef = useRef<HTMLIFrameElement>(null);
    const entry = registry.find((item) => item.id === slug);

    if (!entry) notFound();

    // 1. Sync height logic wrapped in useCallback to prevent re-renders
    const syncHeight = useCallback(() => {
        const iframe = iframeRef.current;
        if (iframe && iframe.contentWindow) {
            try {
                if (viewSize === 'lg') {
                    iframe.style.height = '0px';
                    const height = iframe.contentWindow.document.body.scrollHeight;
                    iframe.style.height = `${height + 4}px`;
                } else {
                    iframe.style.height = '600px';
                }
            } catch (e) {
                iframe.style.height = '600px';
            }
        }
    }, [viewSize]);

    // 2. Fix for Vercel: Capturing entry properties in local constants
    useEffect(() => {
        if (!entry) return;

        const sourcePath = entry.sourceCodePath;

        async function fetchCode() {
            try {
                const data = await getComponentCode(sourcePath);
                setCodeData(data);
            } catch (error) {
                console.error("Build Error: Could not fetch component code", error);
            }
        }
        fetchCode();
    }, [entry]);

    // 3. Re-sync immediately on device toggle or tab change
    useEffect(() => {
        if (activeTab === 'preview') {
            syncHeight();
        }
    }, [viewSize, activeTab, syncHeight]);

    const widths = { sm: '375px', md: '768px', lg: '100%' };
    const installCmd = `npm install ${entry.dependencies?.join(' ') || ''}`;

    const handleCopy = async (text: string, type: 'code' | 'cmd') => {
        await navigator.clipboard.writeText(text);
        if (type === 'cmd') {
            setCmdCopied(true);
            setTimeout(() => setCmdCopied(false), 2000);
        } else {
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    return (
        /* Removed pt-8 md:pt-12 to close the gap between Navbar and Header */
        <div className="flex flex-col gap-6 w-full pb-20">
            {/* HEADER - Tightened leading and margins */}
            <div className="animate-in fade-in duration-300">
                <h1 className="text-4xl font-black tracking-tighter text-black uppercase leading-tight">
                    {entry.name}
                </h1>
                <p className="text-lg font-medium text-zinc-500 mt-2">
                    {entry.description}
                </p>
            </div>

            {/* TOOLBAR */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-zinc-200 pb-4">
                <div className="flex items-center gap-1 bg-zinc-100 p-1 rounded-lg w-fit border border-zinc-200 shadow-sm">
                    <button
                        onClick={() => setActiveTab('preview')}
                        className={cn("px-4 py-1.5 text-sm font-bold rounded-md transition-all cursor-pointer",
                            activeTab === 'preview' ? "bg-white shadow-sm text-black" : "text-zinc-500 hover:text-black")}
                    >
                        Preview
                    </button>
                    <button
                        onClick={() => setActiveTab('code')}
                        className={cn("px-4 py-1.5 text-sm font-bold rounded-md transition-all cursor-pointer",
                            activeTab === 'code' ? "bg-white shadow-sm text-black" : "text-zinc-500 hover:text-black")}
                    >
                        Code
                    </button>
                </div>

                {activeTab === 'preview' && (
                    <div className="flex items-center gap-1 bg-zinc-100 p-1 rounded-lg w-fit border border-zinc-200 shadow-sm">
                        {(['sm', 'md', 'lg'] as const).map((size) => (
                            <button
                                key={size}
                                onClick={() => setViewSize(size)}
                                className={cn("p-2 rounded-md transition-all cursor-pointer",
                                    viewSize === size ? "bg-white shadow-sm text-black" : "text-zinc-500 hover:text-black")}
                                title={`View in ${size}`}
                            >
                                {size === 'sm' ? <Smartphone size={16} /> : size === 'md' ? <Tablet size={16} /> : <Monitor size={16} />}
                            </button>
                        ))}

                        {/* Divider */}
                        <div className="w-px h-4 bg-zinc-300 mx-1" />

                        {/* New Window Button */}
                        <a
                            href={`/preview/${slug}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 rounded-md transition-all cursor-pointer text-zinc-500 hover:text-black hover:bg-white"
                            title="Open component in a blank page"
                        >
                            <ExternalLink size={16} />
                        </a>
                    </div>
                )}
            </div>

            {/* STAGE AREA */}
            <div className="relative w-full">
                {activeTab === 'preview' ? (
                    <div className={cn(
                        "bg-zinc-50/50 rounded-xl border border-zinc-200 flex justify-center items-start min-h-[400px] transition-all duration-300 overflow-hidden",
                        viewSize === 'lg' ? "p-0" : "p-4 md:p-8"
                    )}>
                        <div
                            style={{ width: widths[viewSize] }}
                            className={cn(
                                "transition-all duration-300 ease-in-out bg-white h-auto",
                                viewSize === 'lg'
                                    ? "w-full"
                                    : "border border-zinc-200 rounded-xl shadow-2xl shadow-zinc-200/50 overflow-hidden"
                            )}
                        >
                            <iframe
                                ref={iframeRef}
                                src={`/preview/${slug}`}
                                className="w-full border-none"
                                title="Preview"
                                scrolling={viewSize === 'lg' ? "no" : "yes"}
                                onLoad={syncHeight}
                                style={{ minHeight: '500px' }}
                            />
                        </div>
                    </div>
                ) : (
                    <div className="flex flex-col gap-6 animate-in fade-in duration-300">
                        <div className="relative w-full rounded-xl bg-[#1e1e1e] border border-zinc-800 overflow-hidden h-[700px] flex flex-col">
                            <button
                                onClick={() => handleCopy(codeData.raw, 'code')}
                                className="absolute top-4 right-4 z-10 flex items-center gap-2 px-3 py-1.5 rounded-md bg-zinc-800 border border-zinc-700 text-zinc-400 hover:text-white transition-all cursor-pointer shadow-xl"
                            >
                                {copied ? <Check size={14} className="text-green-400" /> : <Copy size={14} />}
                                <span className="text-[10px] font-bold uppercase tracking-wider">{copied ? 'Copied' : 'Copy'}</span>
                            </button>
                            <div className="flex-1 p-6 md:p-10 overflow-auto no-scrollbar">
                                <div
                                    className="text-sm md:text-base leading-relaxed font-mono text-zinc-300 text-left"
                                    dangerouslySetInnerHTML={{ __html: codeData.html }}
                                />
                            </div>
                        </div>

                        {/* INSTALLATION BAR */}
                        <div className="flex items-center justify-between bg-zinc-950 rounded-xl p-5 border border-zinc-800">
                            <div className="flex items-center gap-4 text-left">
                                <Terminal size={18} className="text-blue-400" />
                                <div className="flex flex-col">
                                    <span className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold mb-1">Installation</span>
                                    <code className="text-sm font-mono text-zinc-300">{installCmd}</code>
                                </div>
                            </div>
                            <button
                                onClick={() => handleCopy(installCmd, 'cmd')}
                                className="flex items-center gap-2 px-4 py-2 rounded-md bg-zinc-800 border border-zinc-700 text-zinc-400 hover:text-white transition-all cursor-pointer"
                            >
                                {cmdCopied ? <Check size={16} className="text-green-400" /> : <Copy size={16} />}
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
