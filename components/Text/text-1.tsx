'use client';

import React, { useEffect, useRef } from "react";
import { useInView } from "framer-motion";
import { annotate } from "rough-notation";
import { type RoughAnnotation } from "rough-notation/lib/model";
import { cn } from "@/lib/utils";

/**
 * CONFIGURATION FIRST
 * Centralized settings for the Text Component.
 */
const SETTINGS = {
    textStart: "The ",
    highlightName: "Magic UI Highlighter",
    highlightColor1: "#FF9800",
    textMiddle: " makes important ",
    highlightText2: "text stand out",
    highlightColor2: "#87CEFA",
    textEnd: " effortlessly.",
};

type AnnotationAction =
    | "highlight"
    | "underline"
    | "box"
    | "circle"
    | "strike-through"
    | "crossed-off"
    | "bracket";

interface HighlighterProps {
    children: React.ReactNode;
    action?: AnnotationAction;
    color?: string;
    strokeWidth?: number;
    animationDuration?: number;
    iterations?: number;
    padding?: number;
    multiline?: boolean;
    isView?: boolean;
}

export function Highlighter({
    children,
    action = "highlight",
    color = "#ffd1dc",
    strokeWidth = 1.5,
    animationDuration = 600,
    iterations = 2,
    padding = 2,
    multiline = true,
    isView = false,
}: HighlighterProps) {
    const elementRef = useRef<HTMLSpanElement>(null);
    const annotationRef = useRef<RoughAnnotation | null>(null);

    const isInView = useInView(elementRef, {
        once: true,
        margin: "-10%",
    });

    const shouldShow = !isView || isInView;

    useEffect(() => {
        if (!shouldShow) return;

        const element = elementRef.current;
        if (!element) return;

        const annotationConfig = {
            type: action,
            color,
            strokeWidth,
            animationDuration,
            iterations,
            padding,
            multiline,
        };

        const annotation = annotate(element, annotationConfig);

        annotationRef.current = annotation;
        annotationRef.current.show();

        const resizeObserver = new ResizeObserver(() => {
            annotation.hide();
            annotation.show();
        });

        resizeObserver.observe(element);
        resizeObserver.observe(document.body);

        return () => {
            if (element) {
                annotate(element, { type: action }).remove();
                resizeObserver.disconnect();
            }
        };
    }, [
        shouldShow,
        action,
        color,
        strokeWidth,
        animationDuration,
        iterations,
        padding,
        multiline,
    ]);

    return (
        <span ref={elementRef} className="relative inline-block bg-transparent text-foreground">
            {children}
        </span>
    );
}

export function Text1() {
    return (
        <section className="w-full min-h-screen bg-white flex flex-col items-center justify-center p-6 text-zinc-900">
            <div className="max-w-3xl text-center">
                <p className="heading-xl leading-tight">
                    {SETTINGS.textStart}
                    <Highlighter action="underline" color={SETTINGS.highlightColor1}>
                        {SETTINGS.highlightName}
                    </Highlighter>
                    {SETTINGS.textMiddle}
                    <Highlighter action="highlight" color={SETTINGS.highlightColor2}>
                        {SETTINGS.highlightText2}
                    </Highlighter>
                    {SETTINGS.textEnd}
                </p>
            </div>
        </section>
    );
}
