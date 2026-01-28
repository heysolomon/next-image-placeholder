import { CodeBlock } from "@/components/code-block";

export default function UsagePage() {
  return (
    <div className="space-y-12">
      <div>
        <h1 id="basic-usage" className="text-3xl font-bold text-neutral-900 dark:text-neutral-50 mb-4">Basic Usage</h1>
        <div className="space-y-6">
          <p className="text-neutral-600 dark:text-neutral-400 text-lg leading-relaxed">
            Use <code>getPlaceholder</code> in a Server Component to generate the blur data.
          </p>
          <CodeBlock code={`// Server Component
const { base64 } = await getPlaceholder(
  "https://images.unsplash.com/photo-1619441207978-3d326c46e2c9?q=80&w=2669&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
);

// Render
<Image
  src="https://images.unsplash.com/photo-1619441207978-3d326c46e2c9?q=80&w=2669&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  placeholder="blur"
  blurDataURL={base64}
  alt="Demo"
/>`} />
        </div>
      </div>

      <div>
        <h2 id="remote-images" className="text-2xl font-bold text-neutral-900 dark:text-neutral-50 mb-4">Remote Images</h2>
        <div className="space-y-6">
          <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed">
            The library works seamlessly with remote images. Just pass the URL.
          </p>
          <CodeBlock code={`import { getPlaceholder } from 'next-image-placeholder'

const imageUrl = 'https://images.unsplash.com/photo-123/image.jpg'
const { base64, color } = await getPlaceholder(imageUrl)`} lang="ts" />
        </div>
      </div>

      <div>
        <h2 id="client-components" className="text-2xl font-bold text-neutral-900 dark:text-neutral-50 mb-4">Client Components</h2>
        <div className="space-y-6">
          <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed">
            To use placeholders in Client Components, wrap the generation logic in a Server Action.
          </p>
          <CodeBlock code={`// 1. Create Server Action (app/actions.ts)
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
}`} lang="tsx" />
        </div>
      </div>
    </div>
  );
}
