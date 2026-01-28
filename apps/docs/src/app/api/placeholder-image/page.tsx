import { CodeBlock } from "@/components/code-block";

export default function PlaceholderImagePage() {
    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold text-neutral-900 dark:text-neutral-50 mb-4 font-mono">{"<PlaceholderImage />"}</h1>
                <p className="text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed mb-8">
                    A wrapper around <code>next/image</code> that automatically handles placeholder generation using a Server Action.
                </p>

                <div className="space-y-8">
                    <div className="space-y-4">
                        <h3 className="text-xl font-semibold text-neutral-900 dark:text-neutral-50">Props</h3>
                        <ul className="list-disc pl-5 space-y-2 text-neutral-600 dark:text-neutral-400">
                            <li><code className="text-sm font-mono text-neutral-900 dark:text-neutral-200">action</code> (Required): The Server Action wrapping <code>getPlaceholder</code>.</li>
                            <li><code className="text-sm font-mono text-neutral-900 dark:text-neutral-200">placeholderOptions</code>: Optional configuration for generation.</li>
                            <li><code className="text-sm font-mono text-neutral-900 dark:text-neutral-200">fallback</code>: React Node to show while loading.</li>
                            <li>All other standard <code className="text-sm font-mono text-neutral-900 dark:text-neutral-200">next/image</code> props.</li>
                        </ul>
                    </div>

                    <div className="space-y-4">
                        <h3 className="text-xl font-semibold text-neutral-900 dark:text-neutral-50">1. Define Server Action</h3>
                        <p className="text-neutral-600 dark:text-neutral-400">
                            First, create a Server Action that wraps <code>getPlaceholder</code>. This is necessary because <code>{"<PlaceholderImage />"}</code> is a Client Component and cannot import server-side logic directly.
                        </p>
                        <CodeBlock code={`"use server";

import { getPlaceholder } from "next-image-placeholder";

export async function getPlaceholderAction(url: string) {
    return getPlaceholder(url);
}`} lang="typescript" />
                    </div>

                    <div className="space-y-4">
                        <h3 className="text-xl font-semibold text-neutral-900 dark:text-neutral-50">2. Usage</h3>
                        <CodeBlock code={`'use client'
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
      fallback={<div className="bg-neutral-200 w-[400px] h-[300px]" />}
    />
  )
}`} lang="tsx" />
                    </div>
                </div>
            </div>
        </div>
    );
}
