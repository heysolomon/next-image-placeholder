
export default function DocsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold text-neutral-900 dark:text-neutral-50 mb-4" id="introduction">Introduction</h1>
        <p className="text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed">
          <code className="text-sm bg-neutral-100 dark:bg-neutral-800 px-1.5 py-0.5 rounded border border-neutral-200 dark:border-neutral-700 font-mono text-neutral-900 dark:text-neutral-200">next-image-placeholder</code> is a lightweight server-side utility for Next.js that generates blur placeholders and extracts dominant colors from images.
          It is designed to be used with the Next.js Image component to provide a better user experience while images load.
        </p>
      </div>

      <div className="border-t border-neutral-200 dark:border-neutral-800 pt-8">
        <h2 className="text-2xl font-semibold text-neutral-900 dark:text-neutral-50 mb-4" id="features">Features</h2>
        <ul className="list-disc list-inside space-y-2 text-neutral-600 dark:text-neutral-400">
          <li><strong>Zero Client-Side JS:</strong> All processing happens on the server.</li>
          <li><strong>Optimized:</strong> Caches results efficiently (implementation dependent).</li>
          <li><strong>Accurate:</strong> Uses advanced algorithms for dominant color extraction.</li>
          <li><strong>Typesafe:</strong> First-class TypeScript support.</li>
        </ul>
      </div>

      <div className="border-t border-neutral-200 dark:border-neutral-800 pt-8">
        <h2 className="text-2xl font-semibold text-neutral-900 dark:text-neutral-50 mb-4" id="installation">Installation</h2>
        <div className="rounded-lg border border-neutral-200 dark:border-neutral-800 bg-neutral-950 p-4">
          <code className="text-sm font-mono text-neutral-50">
            npm install next-image-placeholder
          </code>
        </div>
      </div>
    </div>
  );
}
