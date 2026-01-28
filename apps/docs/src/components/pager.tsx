"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { DOCS_CONFIG } from "@/config/docs";
import { cn } from "@/lib/utils";

export function Pager() {
    const pathname = usePathname();

    // Flatten the links list
    const links = DOCS_CONFIG.nav.flatMap((section) => section.items);
    const currentIndex = links.findIndex((link) => link.href === pathname);

    if (currentIndex === -1) return null;

    const prev = links[currentIndex - 1];
    const next = links[currentIndex + 1];

    if (!prev && !next) return null;

    return (
        <div className="pager flex flex-row items-center justify-between mt-16 pt-8 border-t border-neutral-200 dark:border-neutral-800">
            {prev ? (
                <Link
                    href={prev.href}
                    className={cn(
                        "group flex flex-col gap-1 pl-4 pr-6 py-4 rounded-lg border border-transparent hover:border-neutral-200 dark:hover:border-neutral-800 hover:bg-neutral-50 dark:hover:bg-neutral-900/50 transition-all"
                    )}
                >
                    <div className="flex items-center gap-2 text-sm text-neutral-500 group-hover:text-neutral-900 dark:group-hover:text-neutral-50 transition-colors">
                        <ChevronLeft className="h-4 w-4" />
                        Previous
                    </div>
                    <div className="font-medium text-neutral-900 dark:text-neutral-50">
                        {prev.label}
                    </div>
                </Link>
            ) : (
                <div /> // Spacer
            )}

            {next && (
                <Link
                    href={next.href}
                    className={cn(
                        "group flex flex-col gap-1 items-end pl-6 pr-4 py-4 rounded-lg border border-transparent hover:border-neutral-200 dark:hover:border-neutral-800 hover:bg-neutral-50 dark:hover:bg-neutral-900/50 transition-all"
                    )}
                >
                    <div className="flex items-center gap-2 text-sm text-neutral-500 group-hover:text-neutral-900 dark:group-hover:text-neutral-50 transition-colors">
                        Next
                        <ChevronRight className="h-4 w-4" />
                    </div>
                    <div className="font-medium text-neutral-900 dark:text-neutral-50">
                        {next.label}
                    </div>
                </Link>
            )}
        </div>
    );
}
