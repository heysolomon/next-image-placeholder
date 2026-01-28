import { CodeBlock } from "@/components/code-block";

export default function GetBlurDataURLPage() {
    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold text-neutral-900 dark:text-neutral-50 mb-4 font-mono" id="get-blur-data-url">getBlurDataURL</h1>
                <p className="text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed mb-8">
                    A helper that returns only the base64 blur data URL string (useful if you don't need the color).
                </p>

                <div className="space-y-8">
                    <div className="space-y-4">
                        <h3 className="text-xl font-semibold text-neutral-900 dark:text-neutral-50" id="signature">Signature</h3>
                        <CodeBlock code={`getBlurDataURL(url: string, options?: PlaceholderOptions): Promise<string>`} lang="ts" />
                    </div>

                    <div className="space-y-4">
                        <h3 className="text-xl font-semibold text-neutral-900 dark:text-neutral-50" id="returns">Returns</h3>
                        <CodeBlock code={`Promise<string>`} lang="ts" />
                    </div>
                </div>
            </div>
        </div>
    );
}
