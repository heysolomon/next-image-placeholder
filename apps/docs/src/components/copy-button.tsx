"use client";

import { Check, Copy } from "lucide-react";
import { useState } from "react";
import { Tooltip } from "./ui/tooltip";
import { cn } from "@/lib/utils";

interface CopyButtonProps {
    text: string;
    className?: string;
}

export function CopyButton({ text, className }: CopyButtonProps) {
    const [copied, setCopied] = useState(false);

    const handleCopy = async () => {
        await navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <Tooltip content={copied ? "Copied!" : "Copy to clipboard"}>
            <button
                onClick={handleCopy}
                className={cn(
                    "p-1.5 rounded-md hover:bg-neutral-800 transition-colors focus:outline-none focus:ring-1 focus:ring-neutral-700",
                    className
                )}
                aria-label="Copy to clipboard"
            >
                {copied ? (
                    <Check className="h-3.5 w-3.5" />
                ) : (
                    <Copy className="h-3.5 w-3.5" />
                )}
            </button>
        </Tooltip>
    );
}
