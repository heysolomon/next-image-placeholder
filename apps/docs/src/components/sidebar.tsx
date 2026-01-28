"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
    {
        category: "Getting Started",
        items: [
            { label: "Introduction", href: "/" },
            { label: "Installation", href: "/installation" },
            { label: "Usage", href: "/usage" },
        ],
    },
    {
        category: "API Reference",
        items: [
            { label: "getPlaceholder", href: "/api/get-placeholder" },
            { label: "getBlurDataURL", href: "/api/get-blur-data-url" },
        ],
    },
];

export function Sidebar() {
    const pathname = usePathname();

    return (
        <aside className="w-64 border-r border-neutral-200 dark:border-neutral-800 hidden md:block shrink-0 sticky top-16 h-[calc(100vh-4rem)] overflow-y-auto py-8 pr-6 pl-2">
            <div className="space-y-6">
                {NAV_ITEMS.map((section) => (
                    <div key={section.category}>
                        <h4 className="font-medium text-sm text-neutral-900 dark:text-neutral-50 mb-3 px-2">
                            {section.category}
                        </h4>
                        <ul className="space-y-1">
                            {section.items.map((item) => {
                                // Exact match for root /docs, prefix match for others if needed, but simple exact match is safer for these specific routes.
                                // Actually, /docs is introduction.
                                const isActive = pathname === item.href;

                                return (
                                    <li key={item.href}>
                                        <Link
                                            href={item.href}
                                            className={cn(
                                                "block px-2 py-1.5 text-sm rounded-md transition-colors",
                                                isActive
                                                    ? "text-neutral-900 bg-neutral-100 dark:bg-neutral-800 dark:text-neutral-50 font-medium"
                                                    : "text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-50"
                                            )}
                                        >
                                            {item.label}
                                        </Link>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                ))}
            </div>
        </aside>
    );
}
