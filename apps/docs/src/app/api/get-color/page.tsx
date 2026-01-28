import { CodeBlock } from "@/components/code-block";

export default function GetColorPage() {
    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold text-neutral-900 dark:text-neutral-50 mb-4 font-mono" id="get-color">getColor</h1>
                <p className="text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed mb-8">
                    Extracts only the dominant color from an image. This is the fastest option if you do not need the blur placeholder.
                </p>

                <div className="space-y-8">
                    <div className="space-y-4">
                        <h3 className="text-xl font-semibold text-neutral-900 dark:text-neutral-50" id="signature">Signature</h3>
                        <CodeBlock code={`getColor(url: string, options?: PlaceholderOptions): Promise<string>`} lang="ts" />
                    </div>

                    <div className="space-y-4">
                        <h3 className="text-xl font-semibold text-neutral-900 dark:text-neutral-50" id="returns">Returns</h3>
                        <p className="text-neutral-600 dark:text-neutral-400">
                            Returns a Hex color string (e.g. <code>#ffffff</code>).
                        </p>
                    </div>

                    <div className="space-y-4">
                        <h3 className="text-xl font-semibold text-neutral-900 dark:text-neutral-50" id="example">Example</h3>
                        <CodeBlock code={`// Server Component
const color = await getColor(
  "https://images.unsplash.com/photo-1619441207978-3d326c46e2c9?q=80&w=2669&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
);

// Render
<div style={{ backgroundColor: color }}>
  <Image src="..." />
</div>`} lang="tsx" />
                    </div>
                </div>
            </div>

            <div className="pt-12 border-t border-neutral-200 dark:border-neutral-800">
                <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-50 mb-6 font-mono" id="get-color-rgb">getColorRGB</h2>
                <p className="text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed mb-6">
                    If you need the raw RGB values instead of a Hex string, use <code>getColorRGB</code>.
                </p>
                <CodeBlock code={`import { getColorRGB } from 'next-image-placeholder';

const { r, g, b, a } = await getColorRGB('/image.jpg');`} lang="tsx" />
            </div>
        </div>
    );
}
