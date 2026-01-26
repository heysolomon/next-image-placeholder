"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Check, Copy } from "lucide-react";

interface ComponentPreviewProps {
    children: React.ReactNode;
    code: string;
    className?: string;
    usage?: string;
}

export function ComponentPreview({ children, code, className, usage }: ComponentPreviewProps) {
    const [activeTab, setActiveTab] = useState<"preview" | "code" | "usage">("preview");
    const [copied, setCopied] = useState(false);

    const copyCode = () => {
        navigator.clipboard.writeText(activeTab === "usage" && usage ? usage : code);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className={cn("rounded-xl border border-neutral-200 dark:border-neutral-800 overflow-hidden", className)}>
            <div className="flex items-center justify-between border-b border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900 px-4 py-2">
                <div className="flex gap-4">
                    <button
                        onClick={() => setActiveTab("preview")}
                        className={cn(
                            "text-sm font-medium transition-colors",
                            activeTab === "preview"
                                ? "text-neutral-900 dark:text-neutral-50"
                                : "text-neutral-500 hover:text-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-200"
                        )}
                    >
                        Preview
                    </button>
                    <button
                        onClick={() => setActiveTab("code")}
                        className={cn(
                            "text-sm font-medium transition-colors",
                            activeTab === "code"
                                ? "text-neutral-900 dark:text-neutral-50"
                                : "text-neutral-500 hover:text-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-200"
                        )}
                    >
                        Code
                    </button>
                    {usage && (
                        <button
                            onClick={() => setActiveTab("usage")}
                            className={cn(
                                "text-sm font-medium transition-colors",
                                activeTab === "usage"
                                    ? "text-neutral-900 dark:text-neutral-50"
                                    : "text-neutral-500 hover:text-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-200"
                            )}
                        >
                            Usage
                        </button>
                    )}
                </div>

                {(activeTab === "code" || activeTab === "usage") && (
                    <button onClick={copyCode} className="p-1 hover:bg-neutral-200 dark:hover:bg-neutral-800 rounded">
                        {copied ? <Check size={14} className="text-green-500" /> : <Copy size={14} className="text-neutral-500" />}
                    </button>
                )}
            </div>

            {activeTab === "preview" && (
                <div className="p-8 min-h-[300px] flex items-center justify-center bg-neutral-50/50 dark:bg-neutral-950/50 bg-[url('https://grainy-gradients.vercel.app/noise.svg')]">
                    {children}
                </div>
            )}

            {activeTab === "code" && (
                <div className="p-4 bg-neutral-950 text-neutral-50 overflow-x-auto text-sm font-mono">
                    <pre>{code}</pre>
                </div>
            )}

            {activeTab === "usage" && usage && (
                <div className="p-4 bg-neutral-950 text-neutral-50 overflow-x-auto text-sm font-mono">
                    <pre>{usage}</pre>
                </div>
            )}
        </div>
    );
}
