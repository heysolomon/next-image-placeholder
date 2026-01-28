"use client";

import { usePathname } from "next/navigation";
import { Check, ChevronRight, FileText, Home } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import TurndownService from "turndown";
import { cn } from "@/lib/utils";

function CopyMarkdownButton() {
    const [hasCopied, setHasCopied] = useState(false);

    const copyMarkdown = () => {
        const content = document.querySelector("main");
        if (!content) return;

        // Clone to avoid modifying the visible DOM during cleaning
        const clone = content.cloneNode(true) as HTMLElement;

        // Remove the header/pager from the clone if they exist inside main
        // (Our layout puts PageHeader and Pager inside main, so we might want to exclude them specifically
        // or just select the prose content. The layout has `prose-custom`. Let's try to target the content better or clean the clone.)
        const header = clone.querySelector(".page-header"); // We need to add this class to PageHeader
        if (header) header.remove();

        const pager = clone.querySelector(".pager"); // Pager usually has a wrapper, need to verify class
        if (pager) pager.remove();

        const turndownService = new TurndownService({
            headingStyle: "atx",
            codeBlockStyle: "fenced"
        });

        // Custom rule to clean up Next.js specific or decorative elements if needed
        // For now default behavior is usually decent.

        const markdown = turndownService.turndown(clone);

        navigator.clipboard.writeText(markdown);
        setHasCopied(true);
        setTimeout(() => setHasCopied(false), 2000);
    };

    return (
        <button
            onClick={copyMarkdown}
            className="inline-flex items-center gap-1.5 text-xs text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-200 transition-colors"
            title="Copy page as Markdown"
        >
            {hasCopied ? (
                <Check className="h-3.5 w-3.5" />
            ) : (
                <FileText className="h-3.5 w-3.5" />
            )}
            <span>{hasCopied ? "Copied" : "Copy Page"}</span>
        </button>
    );
}

export function PageHeader() {
    const pathname = usePathname();
    const segments = pathname.split("/").filter(Boolean);

    // Don't show on home page if you want, or just show "Docs"
    // specific formatting for labels
    const formatSegment = (segment: string) => {
        return segment
            .split("-")
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" ");
    };

    return (
        <div className="page-header flex items-center justify-between mb-8 pb-4 border-b border-neutral-200 dark:border-neutral-800">
            <nav aria-label="Breadcrumb" className="flex items-center gap-1 text-sm text-neutral-500 dark:text-neutral-400">
                <Link
                    href="/"
                    className="flex items-center hover:text-neutral-900 dark:hover:text-neutral-50 transition-colors"
                >
                    <Home className="h-4 w-4" />
                </Link>

                {segments.length > 0 && <ChevronRight className="h-4 w-4 text-neutral-300 dark:text-neutral-700" />}

                {segments.map((segment, index) => {
                    const href = `/${segments.slice(0, index + 1).join("/")}`;
                    const isLast = index === segments.length - 1;
                    const label = formatSegment(segment);

                    return (
                        <div key={href} className="flex items-center gap-1">
                            {isLast ? (
                                <span className="font-medium text-neutral-900 dark:text-neutral-50">
                                    {label}
                                </span>
                            ) : (
                                <>
                                    <Link
                                        href={href}
                                        className="hover:text-neutral-900 dark:hover:text-neutral-50 transition-colors"
                                    >
                                        {label}
                                    </Link>
                                    <ChevronRight className="h-4 w-4 text-neutral-300 dark:text-neutral-700" />
                                </>
                            )}
                        </div>
                    );
                })}
            </nav>

            <CopyMarkdownButton />
        </div>
    );
}
