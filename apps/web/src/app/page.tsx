import { StripePanels } from "@/components/stripe-panels";
import { ComponentPreview } from "@/components/component-preview";
import Image from "next/image";

export default function Home() {
  return (
    <div className="relative min-h-screen flex flex-col items-center overflow-x-hidden">
      <StripePanels />

      <main className="w-full max-w-6xl relative z-0">
        {/* Horizontal Grid Line Top */}
        <div className="h-px w-full bg-neutral-200 dark:bg-neutral-800" />

        {/* Hero Section */}
        <div className="flex flex-col items-center justify-center pt-32 pb-24 px-6 border-b border-neutral-200 dark:border-neutral-800">
          <div className="space-y-8 text-center max-w-4xl">
            <div className="inline-flex items-center px-3 py-1 rounded-full border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900 text-xs font-medium text-neutral-600 dark:text-neutral-400 mb-4">
              v1.1.2 is now available
            </div>

            <h1 className="text-6xl md:text-7xl font-bold tracking-tight text-neutral-900 dark:text-neutral-50">
              Image Placeholders,<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-neutral-500 to-neutral-800 dark:from-neutral-400 dark:to-neutral-100">
                Perfected.
              </span>
            </h1>

            <p className="text-lg md:text-xl text-neutral-500 dark:text-neutral-400 max-w-2xl mx-auto leading-relaxed">
              Lightweight server-side blur placeholder and dominant color extraction for Next.js.
              Zero client-side JavaScript for generation.
            </p>

            <div className="flex gap-4 justify-center pt-8">
              <a
                href="/docs"
                className="px-6 py-3 rounded-full bg-neutral-900 dark:bg-neutral-50 text-neutral-50 dark:text-neutral-900 font-medium text-sm hover:opacity-90 transition-opacity"
              >
                Get Started
              </a>
              <a
                href="https://github.com/heysolomon/next-image-placeholder"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 rounded-full border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 text-neutral-900 dark:text-neutral-50 font-medium text-sm hover:bg-neutral-50 dark:hover:bg-neutral-900 transition-colors"
              >
                GitHub
              </a>
            </div>
          </div>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-neutral-200 dark:divide-neutral-800 border-b border-neutral-200 dark:border-neutral-800">
          {/* Card 1 */}
          <div className="p-12 relative group">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity" />
            <h3 className="text-lg font-semibold mb-3 text-neutral-900 dark:text-neutral-50">Server-Side Optimisation</h3>
            <p className="text-neutral-500 dark:text-neutral-400 text-sm leading-relaxed">
              Generate placeholders at build time or request time on the server. No client-side waterfall.
            </p>
          </div>

          {/* Card 2 */}
          <div className="p-12 relative group">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity" />
            <h3 className="text-lg font-semibold mb-3 text-neutral-900 dark:text-neutral-50">Dominant Color</h3>
            <p className="text-neutral-500 dark:text-neutral-400 text-sm leading-relaxed">
              Automatically extract legitimate dominant colors from images for a smooth loading experience.
            </p>
          </div>

          {/* Card 3 */}
          <div className="p-12 relative group">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-500 to-green-500 opacity-0 group-hover:opacity-100 transition-opacity" />
            <h3 className="text-lg font-semibold mb-3 text-neutral-900 dark:text-neutral-50">Typesafe & Lightweight</h3>
            <p className="text-neutral-500 dark:text-neutral-400 text-sm leading-relaxed">
              Built with TypeScript. Minimal dependencies. Designed for modern React Server Components.
            </p>
          </div>
        </div>

        {/* Demo Section */}
        <div className="p-12 border-b border-neutral-200 dark:border-neutral-800">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4 text-neutral-900 dark:text-neutral-50">See it in action</h2>
            <p className="text-neutral-500 dark:text-neutral-400 max-w-xl mx-auto">
              The library generates blur data URLs that you can pass directly to the Next.js Image component.
            </p>
          </div>

          <ComponentPreview
            code={`import Image from "next/image";
import { getPlaceholder } from "next-image-placeholder";

export default async function Page() {
  const { blurDataURL } = await getPlaceholder(
    "https://images.unsplash.com/photo-1579546929518-9e396f3cc809"
  );

  return (
    <Image
      src="https://images.unsplash.com/photo-1579546929518-9e396f3cc809"
      placeholder="blur"
      blurDataURL={blurDataURL}
      width={800}
      height={600}
      alt="Gradient"
    />
  );
}`}
            usage="npm install next-image-placeholder fast-average-color-node sharp"
          >
            <div className="relative w-full max-w-md aspect-[4/3] rounded-lg overflow-hidden shadow-fancy">
              {/* Mockup for preview since we can't run server actions in client component easily without setup */}
              <div className="w-full h-full bg-neutral-200 animate-pulse flex items-center justify-center text-neutral-400 text-sm">
                Image Preview
              </div>
            </div>
          </ComponentPreview>
        </div>

      </main>

      <footer className="w-full max-w-6xl border-b border-x border-neutral-200 dark:border-neutral-800 py-12 px-6">
        <div className="flex justify-between items-center">
          <p className="text-sm text-neutral-500 dark:text-neutral-400">
            © {new Date().getFullYear()} next-image-placeholder. MIT License.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-sm text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-50 transition-colors">Documentation</a>
            <a href="#" className="text-sm text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-50 transition-colors">Twitter</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
