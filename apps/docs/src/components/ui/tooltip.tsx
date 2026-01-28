"use client";

import { useState, useRef, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { createPortal } from "react-dom";

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
    const [coords, setCoords] = useState({ top: 0, left: 0 });
    const triggerRef = useRef<HTMLDivElement>(null);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const updatePosition = () => {
        if (triggerRef.current) {
            const rect = triggerRef.current.getBoundingClientRect();
            setCoords({
                top: rect.top + window.scrollY,
                left: rect.left + rect.width / 2 + window.scrollX,
            });
        }
    };

    const handleMouseEnter = () => {
        updatePosition();
        const id = setTimeout(() => setIsVisible(true), delay * 1000);
        timeoutRef.current = id;
    };

    const handleMouseLeave = () => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        setIsVisible(false);
    };

    return (
        <>
            <div
                ref={triggerRef}
                className="relative flex items-center justify-center"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                onFocus={handleMouseEnter}
                onBlur={handleMouseLeave}
            >
                {children}
            </div>
            {mounted && createPortal(
                <AnimatePresence>
                    {isVisible && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            transition={{ duration: 0.15, ease: "easeOut" }}
                            style={{
                                top: coords.top,
                                left: coords.left,
                            }}
                            className="absolute -translate-x-1/2 -translate-y-full -mt-2 px-2 py-1 bg-neutral-800 text-neutral-200 text-[10px] rounded-md whitespace-nowrap z-[9999] shadow-xl border border-neutral-700 font-medium pointer-events-none"
                        >
                            {content}
                            <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-neutral-800 rotate-45 border-r border-b border-neutral-700" />
                        </motion.div>
                    )}
                </AnimatePresence>,
                document.body
            )}
        </>
    );
}
