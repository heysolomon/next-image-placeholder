import { CodeBlock } from "@/components/code-block";

export default function GetPlaceholderPage() {
    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold text-neutral-900 dark:text-neutral-50 mb-4 font-mono">getPlaceholder</h1>
                <p className="text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed mb-8">
                    Generates a blur placeholder and extracts dominant color from an image URL.
                </p>

                <div className="space-y-8">
                    <div className="space-y-4">
                        <h3 className="text-xl font-semibold text-neutral-900 dark:text-neutral-50">Signature</h3>
                        <CodeBlock code={`getPlaceholder(url: string, options?: PlaceholderOptions): Promise<PlaceholderResult>`} lang="ts" />
                    </div>

                    <div className="space-y-4">
                        <h3 className="text-xl font-semibold text-neutral-900 dark:text-neutral-50">Returns</h3>
                        <CodeBlock code={`Promise<{
  base64: string; // The blur data URL
  color: {
    r: number;
    g: number;
    b: number;
    hex: string; // Hex color code (e.g. "#ffffff")
  }
}>`} lang="ts" />
                    </div>
                </div>
            </div>
        </div>
    );
}
