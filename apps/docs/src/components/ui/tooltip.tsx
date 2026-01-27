"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export function Tooltip({
    children,
    content,
    delay = 0.2
}: {
    children: React.ReactNode;
    content: string;
    delay?: number;
}) {
    const [isVisible, setIsVisible] = useState(false);
    const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);

    const handleMouseEnter = () => {
        const id = setTimeout(() => setIsVisible(true), delay * 1000);
        setTimeoutId(id);
    };

    const handleMouseLeave = () => {
        if (timeoutId) clearTimeout(timeoutId);
        setIsVisible(false);
    };

    return (
        <div
            className="relative flex items-center justify-center"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onFocus={handleMouseEnter}
            onBlur={handleMouseLeave}
        >
            {children}
            <AnimatePresence>
                {isVisible && (
                    <motion.div
                        initial={{ opacity: 0, y: 5, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 5, scale: 0.9 }}
                        transition={{ duration: 0.15, ease: "easeOut" }}
                        className="absolute bottom-full mb-2 px-2 py-1 bg-neutral-800 text-neutral-200 text-[10px] rounded-md whitespace-nowrap z-50 shadow-xl border border-neutral-700 font-medium"
                    >
                        {content}
                        <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-neutral-800 rotate-45 border-r border-b border-neutral-700" />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
