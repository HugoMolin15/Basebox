'use client';

import React, { createContext, useContext, useReducer, useEffect, useCallback } from 'react';

export interface PlacedComponent {
    instanceId: string; // unique per-placement
    registryId: string; // matches registry entry id
    name: string;       // display name
}

interface PageBuilderState {
    components: PlacedComponent[];
}

type Action =
    | { type: 'ADD'; component: PlacedComponent }
    | { type: 'REMOVE'; instanceId: string }
    | { type: 'REORDER'; components: PlacedComponent[] }
    | { type: 'LOAD'; components: PlacedComponent[] };

const STORAGE_KEY = 'basebox-page-builder';

function reducer(state: PageBuilderState, action: Action): PageBuilderState {
    switch (action.type) {
        case 'ADD':
            return { ...state, components: [...state.components, action.component] };
        case 'REMOVE':
            return { ...state, components: state.components.filter(c => c.instanceId !== action.instanceId) };
        case 'REORDER':
            return { ...state, components: action.components };
        case 'LOAD':
            return { ...state, components: action.components };
        default:
            return state;
    }
}

interface PageBuilderContextValue {
    components: PlacedComponent[];
    addComponent: (registryId: string, name: string) => void;
    removeComponent: (instanceId: string) => void;
    reorderComponents: (components: PlacedComponent[]) => void;
    moveUp: (instanceId: string) => void;
    moveDown: (instanceId: string) => void;
    clearAll: () => void;
}

const PageBuilderContext = createContext<PageBuilderContextValue | null>(null);

export function PageBuilderProvider({ children }: { children: React.ReactNode }) {
    const [state, dispatch] = useReducer(reducer, { components: [] });

    // Load from localStorage on mount
    useEffect(() => {
        try {
            const saved = localStorage.getItem(STORAGE_KEY);
            if (saved) {
                const parsed: PlacedComponent[] = JSON.parse(saved);
                if (Array.isArray(parsed)) {
                    dispatch({ type: 'LOAD', components: parsed });
                }
            }
        } catch { /* ignore */ }
    }, []);

    // Persist to localStorage on every change
    useEffect(() => {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(state.components));
        } catch { /* ignore */ }
    }, [state.components]);

    const addComponent = useCallback((registryId: string, name: string) => {
        dispatch({
            type: 'ADD',
            component: {
                instanceId: `${registryId}-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
                registryId,
                name,
            },
        });
    }, []);

    const removeComponent = useCallback((instanceId: string) => {
        dispatch({ type: 'REMOVE', instanceId });
    }, []);

    const reorderComponents = useCallback((components: PlacedComponent[]) => {
        dispatch({ type: 'REORDER', components });
    }, []);

    const moveUp = useCallback((instanceId: string) => {
        dispatch({
            type: 'REORDER',
            components: (() => {
                const arr = [...state.components];
                const idx = arr.findIndex(c => c.instanceId === instanceId);
                if (idx <= 0) return arr;
                [arr[idx - 1], arr[idx]] = [arr[idx], arr[idx - 1]];
                return arr;
            })(),
        });
    }, [state.components]);

    const moveDown = useCallback((instanceId: string) => {
        dispatch({
            type: 'REORDER',
            components: (() => {
                const arr = [...state.components];
                const idx = arr.findIndex(c => c.instanceId === instanceId);
                if (idx < 0 || idx >= arr.length - 1) return arr;
                [arr[idx], arr[idx + 1]] = [arr[idx + 1], arr[idx]];
                return arr;
            })(),
        });
    }, [state.components]);

    const clearAll = useCallback(() => {
        dispatch({ type: 'REORDER', components: [] });
    }, []);

    return (
        <PageBuilderContext.Provider value={{
            components: state.components,
            addComponent,
            removeComponent,
            reorderComponents,
            moveUp,
            moveDown,
            clearAll,
        }}>
            {children}
        </PageBuilderContext.Provider>
    );
}

export function usePageBuilder() {
    const ctx = useContext(PageBuilderContext);
    if (!ctx) throw new Error('usePageBuilder must be used within PageBuilderProvider');
    return ctx;
}
