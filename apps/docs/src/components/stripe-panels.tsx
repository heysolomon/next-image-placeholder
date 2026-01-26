import { cn } from "@/lib/utils";

export function StripePanels() {
    return (
        <>
            <div
                className="fixed inset-y-0 left-0 -z-10 hidden xl:block"
                style={{ width: "calc((100vw - min(100vw - 3rem, 72rem)) / 2)" }}
            >
                <div className="absolute inset-y-0 right-0 w-px bg-neutral-200 dark:bg-neutral-800" />
                <div
                    className="absolute inset-0 opacity-[0.03] dark:opacity-[0.08]"
                    style={{
                        backgroundImage: `repeating-linear-gradient(45deg, currentColor 0, currentColor 1px, transparent 1px, transparent 6px)`
                    }}
                />
            </div>
            <div
                className="fixed inset-y-0 right-0 -z-10 hidden xl:block"
                style={{ width: "calc((100vw - min(100vw - 3rem, 72rem)) / 2)" }}
            >
                <div className="absolute inset-y-0 left-0 w-px bg-neutral-200 dark:bg-neutral-800" />
                <div
                    className="absolute inset-0 opacity-[0.03] dark:opacity-[0.08]"
                    style={{
                        backgroundImage: `repeating-linear-gradient(45deg, currentColor 0, currentColor 1px, transparent 1px, transparent 6px)`
                    }}
                />
            </div>
        </>
    );
}
