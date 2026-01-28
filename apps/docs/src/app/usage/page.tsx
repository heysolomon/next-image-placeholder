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
          <CodeBlock code={`import Image from "next/image";
import { getPlaceholder } from "next-image-placeholder";

export default async function Page() {
  const { base64 } = await getPlaceholder(
    "https://example.com/image.jpg"
  );

  return (
    <Image
      src="https://example.com/image.jpg"
      placeholder="blur"
      blurDataURL={base64}
      width={500}
      height={300}
      alt="Example"
    />
  );
}`} />
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
          <CodeBlock code={`// 1. Create a server action (app/actions.ts)
'use server'
import { getPlaceholder } from 'next-image-placeholder'

export async function getPlaceholderAction(imageUrl: string) {
  return getPlaceholder(imageUrl)
}

// 2. Use it in your Client Component
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
