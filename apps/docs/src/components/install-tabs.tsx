"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { CopyButton } from "./copy-button";
import { cn } from "@/lib/utils";

type PackageManager = "npm" | "pnpm" | "yarn" | "bun";

export function InstallTabs() {
    const [activeTab, setActiveTab] = useState<PackageManager>("npm");

    const commands: Record<PackageManager, string> = {
        npm: "npm install next-image-placeholder sharp",
        pnpm: "pnpm add next-image-placeholder sharp",
        yarn: "yarn add next-image-placeholder sharp",
        bun: "bun add next-image-placeholder sharp",
    };

    return (
        <div className="rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-950 overflow-hidden">
            <div className="flex border-b border-neutral-200 dark:border-neutral-800 bg-neutral-100/50 dark:bg-neutral-900/50">
                {(Object.keys(commands) as PackageManager[]).map((pm) => (
                    <button
                        key={pm}
                        onClick={() => setActiveTab(pm)}
                        className={cn(
                            "px-4 py-2.5 text-sm font-medium transition-colors relative outline-none",
                            activeTab === pm
                                ? "text-neutral-900 dark:text-neutral-50"
                                : "text-neutral-500 dark:text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200"
                        )}
                    >
                        {pm}
                        {activeTab === pm && (
                            <motion.div
                                layoutId="activeTab"
                                className="absolute bottom-0 left-0 right-0 h-0.5 bg-neutral-900 dark:bg-neutral-50"
                                transition={{ type: "spring", stiffness: 500, damping: 30 }}
                            />
                        )}
                    </button>
                ))}
            </div>
            <div className="p-4 flex items-center justify-between group bg-neutral-950">
                <code className="text-sm font-mono text-neutral-50">
                    {commands[activeTab]}
                </code>
                <CopyButton text={commands[activeTab]} className="opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
        </div>
    );
}
