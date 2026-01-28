import { StripePanels } from "@/components/stripe-panels";
import { DemoTabs } from "@/components/demo-tabs";
import { ComponentPreview } from "@/components/component-preview";
import Image from "next/image";
import { getPlaceholder } from "next-image-placeholder";
import { codeToHtml } from "shiki";

const DEMO_IMAGE = "https://images.unsplash.com/photo-1619441207978-3d326c46e2c9?q=80&w=2669&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

export default async function Home() {
  const initialData = await getPlaceholder(DEMO_IMAGE);

  const blurCode = `// Server Component
const { base64 } = await getPlaceholder(
  "${DEMO_IMAGE}"
);

// Render
<Image
  src="${DEMO_IMAGE}"
  placeholder="blur"
  blurDataURL={base64}
  alt="Demo"
/>`;

  const colorCode = `// Server Component
const color = await getColor(
  "${DEMO_IMAGE}"
);

// Render
<div style={{ backgroundColor: color }}>
  <Image src="..." />
</div>`;

  const clientCode = `// 1. Create Server Action (app/actions.ts)
'use server'
import { getPlaceholder } from 'next-image-placeholder'

export async function getPlaceholderAction(imageUrl: string) {
  return getPlaceholder(imageUrl)
}

// 2. Use the component (Recommended)
'use client'
import { PlaceholderImage } from 'next-image-placeholder/react'
import { getPlaceholderAction } from './actions'

export function Gallery({ src }: { src: string }) {
  return (
    <PlaceholderImage
      src={src}
      action={getPlaceholderAction}
      width={400}
      height={300}
      alt="Gallery Image"
      className="rounded-lg"
    />
  )
}`;

  const codeSnippets = {
    blur: {
      code: blurCode,
      html: await codeToHtml(blurCode, { lang: 'tsx', theme: 'github-dark-dimmed' })
    },
    color: {
      code: colorCode,
      html: await codeToHtml(colorCode, { lang: 'tsx', theme: 'github-dark-dimmed' })
    },
    client: {
      code: clientCode,
      html: await codeToHtml(clientCode, { lang: 'tsx', theme: 'github-dark-dimmed' })
    }
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center overflow-x-hidden">
      <StripePanels />

      <main className="w-full max-w-6xl relative z-0">
        {/* Horizontal Grid Line Top */}
        <div className="h-px w-full bg-neutral-200 dark:bg-neutral-800" />

        {/* Hero Section */}
        <div className="flex flex-col items-center justify-center pt-20 pb-0 px-6">
          <div className="space-y-6 text-center max-w-4xl">
            <div className="inline-flex items-center px-3 py-1 rounded-full border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900 text-xs font-medium text-neutral-600 dark:text-neutral-400 mb-4">
              v1.1.2 is now available
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight text-neutral-900 dark:text-neutral-50">
              next image<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-neutral-500 to-neutral-800 dark:from-neutral-400 dark:to-neutral-100">
                placeholder
              </span>
            </h1>

            <p className="text-lg md:text-xl text-neutral-500 dark:text-neutral-400 max-w-2xl mx-auto leading-relaxed">
              Lightweight server-side blur placeholder and dominant color extraction for Next.js.
              Zero client-side JavaScript for generation.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
              <a
                href="https://next-image-placeholder.vercel.app/"
                className="px-6 py-3 rounded-full bg-neutral-900 dark:bg-neutral-50 text-neutral-50 dark:text-neutral-900 font-medium text-sm hover:opacity-90 transition-opacity text-center"
              >
                Get Started
              </a>
              <a
                href="https://github.com/heysolomon/next-image-placeholder"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 rounded-full border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 text-neutral-900 dark:text-neutral-50 font-medium text-sm hover:bg-neutral-50 dark:hover:bg-neutral-900 transition-colors text-center"
              >
                GitHub
              </a>
            </div>
          </div>
        </div>

        {/* Live Demo Section - Show, Don't Tell */}
        <div className="divide-y divide-neutral-200 dark:divide-neutral-800 border-b border-neutral-200 dark:border-neutral-800">
          <div className="px-8 pb-12 pt-12 lg:px-12 lg:pb-12 lg:pt-12">
            <DemoTabs
              initialData={initialData}
              sourceUrl={DEMO_IMAGE}
              codeSnippets={codeSnippets}
            />
          </div>
        </div>

      </main>

      <footer className="w-full max-w-6xl border-b border-neutral-200 dark:border-neutral-800 py-12 px-6">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-0">
          <p className="text-sm text-neutral-500 dark:text-neutral-400 text-center sm:text-left">
            © {new Date().getFullYear()} next-image-placeholder. MIT License.
          </p>
          <div className="flex gap-6">
            <a href="https://next-image-placeholder.vercel.app/" className="text-sm text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-50 transition-colors">Documentation</a>
            <a href="https://x.com/heysolomon" className="text-sm text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-50 transition-colors">Twitter</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
