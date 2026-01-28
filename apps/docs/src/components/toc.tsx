"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

interface TocItem {
    id: string;
    text: string;
    level: number;
}

export function TableOfContents() {
    const [headings, setHeadings] = useState<TocItem[]>([]);
    const [activeId, setActiveId] = useState<string>("");
    const pathname = usePathname();

    useEffect(() => {
        // Run after render to find headings
        const elements = Array.from(document.querySelectorAll("h1, h2, h3"))
            .filter((element) => element.id) // Only elements with IDs
            .map((element) => ({
                id: element.id,
                text: element.textContent || "",
                level: Number(element.tagName.substring(1)),
            }));

        setHeadings(elements);

        // Setup intersection observer for active state
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveId(entry.target.id);
                    }
                });
            },
            { rootMargin: "0px 0px -80% 0px" }
        );

        elements.forEach((heading) => {
            const element = document.getElementById(heading.id);
            if (element) observer.observe(element);
        });

        return () => observer.disconnect();
    }, [pathname]); // Re-run when route changes

    if (headings.length === 0) return null;

    return (
        <aside className="w-64 border-l border-neutral-200 dark:border-neutral-800 hidden lg:block shrink-0 h-full overflow-y-auto py-12 px-6">
            <h5 className="font-medium text-xs uppercase tracking-wider text-neutral-500 mb-4">On this page</h5>
            <ul className="space-y-2 text-sm">
                {headings.map((heading) => (
                    <li
                        key={heading.id}
                        style={{ paddingLeft: (heading.level - 1) * 12 }}
                    >
                        <a
                            href={`#${heading.id}`}
                            className={cn(
                                "block transition-colors",
                                activeId === heading.id
                                    ? "text-neutral-900 dark:text-neutral-50 font-medium"
                                    : "text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-50"
                            )}
                            onClick={(e) => {
                                e.preventDefault();
                                document.getElementById(heading.id)?.scrollIntoView({
                                    behavior: "smooth",
                                });
                                setActiveId(heading.id);
                            }}
                        >
                            {heading.text}
                        </a>
                    </li>
                ))}
            </ul>
        </aside>
    );
}
