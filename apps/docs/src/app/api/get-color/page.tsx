import { CodeBlock } from "@/components/code-block";

export default function GetColorPage() {
    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold text-neutral-900 dark:text-neutral-50 mb-4 font-mono">getColor</h1>
                <p className="text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed mb-8">
                    Extracts only the dominant color from an image. This is the fastest option if you do not need the blur placeholder.
                </p>

                <div className="space-y-8">
                    <div className="space-y-4">
                        <h3 className="text-xl font-semibold text-neutral-900 dark:text-neutral-50">Signature</h3>
                        <CodeBlock code={`getColor(url: string, options?: PlaceholderOptions): Promise<string>`} lang="ts" />
                    </div>

                    <div className="space-y-4">
                        <h3 className="text-xl font-semibold text-neutral-900 dark:text-neutral-50">Returns</h3>
                        <p className="text-neutral-600 dark:text-neutral-400">
                            Returns a Hex color string (e.g. <code>#ffffff</code>).
                        </p>
                    </div>

                    <div className="space-y-4">
                        <h3 className="text-xl font-semibold text-neutral-900 dark:text-neutral-50">Example</h3>
                        <CodeBlock code={`import { getColor } from 'next-image-placeholder';

const color = await getColor('/image.jpg');

// Use as solid color background
<div style={{ backgroundColor: color }}>
  <Image src="/image.jpg" fill alt="..." />
</div>`} lang="tsx" />
                    </div>
                </div>
            </div>

            <div className="pt-12 border-t border-neutral-200 dark:border-neutral-800">
                <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-50 mb-6 font-mono">getColorRGB</h2>
                <p className="text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed mb-6">
                    If you need the raw RGB values instead of a Hex string, use <code>getColorRGB</code>.
                </p>
                <CodeBlock code={`import { getColorRGB } from 'next-image-placeholder';

const { r, g, b, a } = await getColorRGB('/image.jpg');`} lang="tsx" />
            </div>
        </div>
    );
}
