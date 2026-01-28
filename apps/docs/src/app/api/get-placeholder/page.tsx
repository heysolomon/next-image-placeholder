import { CodeBlock } from "@/components/code-block";

export default function GetPlaceholderPage() {
    return (
        <div className="space-y-8">
            <div>
                <h1 id="get-placeholder" className="text-3xl font-bold text-neutral-900 dark:text-neutral-50 mb-4 font-mono">getPlaceholder</h1>
                <p className="text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed mb-8">
                    Generates a blur placeholder and extracts dominant color from an image URL.
                </p>

                <div className="space-y-8">
                    <div className="space-y-4">
                        <h3 id="signature" className="text-xl font-semibold text-neutral-900 dark:text-neutral-50">Signature</h3>
                        <CodeBlock code={`getPlaceholder(url: string, options?: PlaceholderOptions): Promise<PlaceholderResult>`} lang="ts" />
                    </div>

                    <div className="space-y-4">
                        <h3 id="returns" className="text-xl font-semibold text-neutral-900 dark:text-neutral-50">Returns</h3>
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

                    <div className="space-y-4">
                        <h3 id="options" className="text-xl font-semibold text-neutral-900 dark:text-neutral-50">Options</h3>
                        <CodeBlock code={`interface PlaceholderOptions {
  size?: number;             // Thumbnail size (default: 16)
  quality?: number;          // WebP quality 0-100 (default: 70)
  colorAlgorithm?: 'simple' | 'sqrt' | 'dominant';  // (default: 'sqrt')
  timeout?: number;          // Fetch timeout in ms (default: 30000)
  retries?: number;          // Retry attempts (default: 3)
}`} lang="ts" />
                    </div>
                </div>
            </div>
        </div>
    );
}
