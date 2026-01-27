import { codeToHtml } from "shiki";
import { CopyButton } from "./copy-button";
import { cn } from "@/lib/utils";

interface CodeBlockProps {
    code: string;
    lang?: string;
    className?: string;
}

export async function CodeBlock({ code, lang = "tsx", className }: CodeBlockProps) {
    const html = await codeToHtml(code, {
        lang,
        themes: {
            light: "github-light",
            dark: "github-dark-dimmed",
        },
    });

    return (
        <div className={cn("relative group rounded-xl border border-neutral-200 dark:border-neutral-800 overflow-hidden", className)}>
            <div className="absolute top-3 right-3 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
                <CopyButton text={code} className="bg-neutral-100/10 backdrop-blur-sm border border-neutral-200/20 text-neutral-500 dark:text-neutral-400" />
            </div>
            <div
                className="p-4 text-sm font-mono overflow-x-auto [&>pre]:!bg-transparent [&>pre]:!m-0"
                dangerouslySetInnerHTML={{ __html: html }}
            />
        </div>
    );
}
