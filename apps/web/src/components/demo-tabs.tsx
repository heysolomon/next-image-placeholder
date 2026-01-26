"use client";

import { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Copy, Check, RotateCw } from "lucide-react";
import { motion } from "framer-motion";
import NextImage from "next/image";
import { usePlaceholder, PlaceholderImage } from "next-image-placeholder/react";
import { getPlaceholderAction } from "@/app/actions";

type DemoMode = "blur" | "color" | "client";

export function DemoTabs({
    initialData,
    sourceUrl,
    codeSnippets
}: {
    initialData: any,
    sourceUrl: string,
    codeSnippets?: Record<string, { code: string, html: string }>
}) {
    const [mode, setMode] = useState<DemoMode>("blur");
    const [copied, setCopied] = useState(false);
    const [refreshKey, setRefreshKey] = useState(0);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [isDemoing, setIsDemoing] = useState(false);

    // Clip-path animation state
    const [clipPath, setClipPath] = useState("inset(0 100% 0 0 round 9999px)");
    const containerRef = useRef<HTMLDivElement>(null);
    const buttonRefs = useRef<(HTMLButtonElement | null)[]>([]);

    useEffect(() => {
        const updateClipPath = () => {
            if (!containerRef.current) return;

            const modeIndex = (Object.keys(modes) as DemoMode[]).indexOf(mode);
            const activeEl = buttonRefs.current[modeIndex];

            if (activeEl) {
                const containerRect = containerRef.current.getBoundingClientRect();
                const activeRect = activeEl.getBoundingClientRect();

                // Calculate relative positions
                const left = activeRect.left - containerRect.left;
                const right = containerRect.width - (left + activeRect.width);

                setClipPath(`inset(0 ${right}px 0 ${left}px round 9999px)`);
            }
        };

        // Initial update and on mode change
        updateClipPath();

        // Update on resize
        window.addEventListener('resize', updateClipPath);
        return () => window.removeEventListener('resize', updateClipPath);
    }, [mode]);

    const handleRefresh = () => {
        setIsRefreshing(true);
        setIsDemoing(true);
        setRefreshKey(prev => prev + 1);
        setTimeout(() => setIsRefreshing(false), 500);
        setTimeout(() => setIsDemoing(false), 1500); // Keep placeholder visible for 1.5s
    };

    // Client-side hook usage
    const { data: clientData, isLoading } = usePlaceholder(
        mode === "client" ? sourceUrl : null,
        getPlaceholderAction
    );

    // Configuration for each mode
    const modes = {
        blur: {
            label: "Blur Placeholder",
            description: "Standard server-side generation. Creates a base64 blur hash.",
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2.5 2.5a13.5 13.5 0 0 0 16.7 16.7" /><path d="M4.8 4.8a10.2 10.2 0 0 1 14.4 14.4" /><path d="M7 7a7 7 0 0 1 10 10" /><path d="M9.3 9.3a3.5 3.5 0 0 1 5.4 5.4" /></svg>
            ),
        },
        color: {
            label: "Dominant Color",
            description: "Extracts a single dominant color. Ultra-lightweight fallback.",
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><path d="m14.31 8 5.74 9.94" /><path d="M9.69 8h11.48" /></svg>
            ),
        },
        client: {
            label: "Client Components",
            description: "Interactive UI using hooks and server actions.",
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="3" rx="2" ry="2" /><path d="M9 3v18" /><path d="M15 9h-6" /><path d="M15 15h-6" /></svg>
            ),
        }
    };

    const copyCode = () => {
        const codeToCopy = codeSnippets ? codeSnippets[mode].code : "";
        navigator.clipboard.writeText(codeToCopy);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="w-full max-w-5xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-neutral-200 dark:divide-neutral-800 border border-neutral-200 dark:border-neutral-800 rounded-xl bg-white dark:bg-neutral-950 shadow-sm overflow-hidden">

                {/* Preview Panel */}
                <div className="flex flex-col min-h-[400px] relative overflow-hidden group">
                    {/* Background image for context (faded) */}
                    <div
                        className="absolute inset-0 opacity-10 bg-cover bg-center grayscale"
                        style={{ backgroundImage: `url(${sourceUrl})` }}
                    />

                    <div className="relative w-full h-full flex-1 bg-white dark:bg-neutral-900" key={refreshKey}>

                        {/* Visual implementation tailored to mode */}
                        {mode === 'blur' && initialData?.base64 && (
                            <div className="relative w-full h-full">
                                {/* Force explicit blur placeholder when demoing */}
                                <div
                                    className={cn(
                                        "absolute inset-0 bg-cover bg-center transition-opacity duration-700 z-10",
                                        isDemoing ? "opacity-100" : "opacity-0 pointer-events-none"
                                    )}
                                    style={{
                                        backgroundImage: `url(${initialData.base64})`,
                                        filter: 'blur(20px) scale(1.2)'
                                    }}
                                />
                                <NextImage
                                    src={sourceUrl}
                                    alt="Demo Content"
                                    fill
                                    className="object-cover"
                                    placeholder="blur"
                                    blurDataURL={initialData.base64}
                                    sizes="(max-width: 768px) 100vw, 50vw"
                                />
                            </div>
                        )}

                        {mode === 'color' && initialData?.color && (
                            <div className="relative w-full h-full" style={{ backgroundColor: initialData.color }}>
                                <NextImage
                                    src={sourceUrl}
                                    alt="Demo Content"
                                    fill
                                    className={cn(
                                        "object-cover transition-opacity duration-700",
                                        isDemoing ? "opacity-0" : "opacity-100"
                                    )}
                                    onLoad={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
                                        const img = e.target as HTMLImageElement;
                                        if (!isDemoing) img.style.opacity = '1';
                                    }}
                                    style={{ opacity: isDemoing ? 0 : 1 }}
                                    sizes="(max-width: 768px) 100vw, 50vw"
                                />
                            </div>
                        )}

                        {mode === 'client' && (
                            <div className="absolute inset-0 flex flex-col items-center justify-center">
                                <div className="relative w-full h-full">
                                    {/* Force explicit blur placeholder when demoing */}
                                    <div
                                        className={cn(
                                            "absolute inset-0 bg-cover bg-center transition-opacity duration-700 z-10",
                                            isDemoing ? "opacity-100" : "opacity-0 pointer-events-none"
                                        )}
                                        style={{
                                            backgroundImage: `url(${clientData?.base64})`,
                                            filter: 'blur(20px) scale(1.2)'
                                        }}
                                    />
                                    <PlaceholderImage
                                        src={sourceUrl}
                                        action={getPlaceholderAction}
                                        alt="Demo Client Content"
                                        fill
                                        className="object-cover"
                                        sizes="(max-width: 768px) 100vw, 50vw"
                                    />
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Code Panel */}
                <div className="bg-neutral-950 flex flex-col">
                    <div className="flex items-center justify-between px-3 py-2 border-b border-neutral-800 bg-neutral-900/50">
                        {/* Clip-path Tabs Container */}
                        <div className="relative flex bg-neutral-900 p-0.5 rounded-full border border-neutral-800" ref={containerRef}>
                            {/* Layer 1: Inactive State (Bottom) */}
                            <div className="flex relative z-0">
                                {(Object.keys(modes) as DemoMode[]).map((key, index) => (
                                    <button
                                        key={`inactive-${key}`}
                                        ref={el => { buttonRefs.current[index] = el }}
                                        onClick={() => setMode(key)}
                                        className="px-4 py-2 rounded-full text-xs font-medium transition-colors whitespace-nowrap text-neutral-500 hover:text-neutral-300 relative"
                                    >
                                        {modes[key].label}
                                    </button>
                                ))}
                            </div>

                            {/* Layer 2: Active State (Top - Clipped) */}
                            <div
                                className="absolute inset-0.5 flex bg-neutral-800 z-10 pointer-events-none overflow-hidden transition-[clip-path] duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]"
                                style={{ clipPath }}
                            >
                                {(Object.keys(modes) as DemoMode[]).map((key) => (
                                    <button
                                        key={`active-${key}`}
                                        className="px-4 py-2 rounded-full text-xs font-medium whitespace-nowrap text-white"
                                        aria-hidden="true"
                                        tabIndex={-1}
                                    >
                                        {modes[key].label}
                                    </button>
                                ))}
                            </div>
                        </div>
                        <div className="flex items-center gap-1">
                            <motion.button
                                onClick={handleRefresh}
                                animate={{ rotate: isRefreshing ? 360 : 0 }}
                                transition={{ duration: 0.5, ease: "easeInOut" }}
                                className="text-neutral-400 hover:text-white transition-colors p-2 hover:bg-neutral-800 rounded-md"
                                title="Refresh Demo"
                            >
                                <RotateCw size={14} />
                            </motion.button>
                            <button
                                onClick={copyCode}
                                className="text-neutral-400 hover:text-white transition-colors p-2 hover:bg-neutral-800 rounded-md"
                                title="Copy Code"
                            >
                                {copied ? <Check size={14} /> : <Copy size={14} />}
                            </button>
                        </div>
                    </div>
                    <div className="flex-1 p-6 overflow-x-auto custom-scrollbar">
                        {codeSnippets && (
                            <div
                                className="text-xs sm:text-sm font-mono leading-relaxed whitespace-pre-wrap break-all [&>pre]:bg-transparent! [&>pre]:p-0! [&_code]:font-mono"
                                dangerouslySetInnerHTML={{ __html: codeSnippets[mode].html }}
                            />
                        )}
                    </div>

                </div>

            </div>
        </div>
    );
}
