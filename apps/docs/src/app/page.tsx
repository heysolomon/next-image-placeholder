

export default function DocsPage() {
  return (
    <div className="space-y-12">
      <div>
        <h1 className="text-4xl font-bold text-neutral-900 dark:text-neutral-50 mb-4" id="introduction">Introduction</h1>
        <p className="text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed">
          <code className="text-sm bg-neutral-100 dark:bg-neutral-800 px-1.5 py-0.5 rounded border border-neutral-200 dark:border-neutral-700 font-mono text-neutral-900 dark:text-neutral-200">next-image-placeholder</code> is a lightweight server-side utility for Next.js that generates blur placeholders and extracts dominant colors from images.
          It is designed to be used with the Next.js Image component to provide a better user experience while images load.
        </p>
      </div>

      <div className="border-t border-neutral-200 dark:border-neutral-800 pt-8">
        <h2 className="text-2xl font-semibold text-neutral-900 dark:text-neutral-50 mb-6" id="features">Features</h2>
        <ul className="grid sm:grid-cols-2 gap-4">
          {[
            { title: "Zero Client-Side JS", desc: "All processing happens on the server." },
            { title: "Optimized", desc: "Efficient caching strategies." },
            { title: "Accurate", desc: "Advanced algorithms for color extraction." },
            { title: "Typesafe", desc: "First-class TypeScript support." }
          ].map((feature) => (
            <li key={feature.title} className="p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900/50">
              <strong className="block text-neutral-900 dark:text-neutral-50 mb-1">{feature.title}</strong>
              <span className="text-sm text-neutral-600 dark:text-neutral-400">{feature.desc}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
