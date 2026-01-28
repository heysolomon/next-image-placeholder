export function Logo() {
    return (
        <div className="flex items-center gap-2">
            <div className="h-6 w-6 rounded bg-neutral-900 dark:bg-neutral-50 flex items-center justify-center">
                <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    xmlns="http://www.w3.org/2000/svg"
                    className="text-white dark:text-neutral-900"
                >
                    <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
                    <circle cx="9" cy="9" r="2" />
                    <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
                </svg>
            </div>
            <span className="font-bold text-neutral-900 dark:text-neutral-50">next-image-placeholder</span>
        </div>
    );
}
