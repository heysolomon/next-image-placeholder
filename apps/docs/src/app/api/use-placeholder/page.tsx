import { CodeBlock } from "@/components/code-block";

export default function UsePlaceholderPage() {
    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold text-neutral-900 dark:text-neutral-50 mb-4 font-mono" id="use-placeholder">usePlaceholder</h1>
                <p className="text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed mb-8">
                    A React hook for client components. It requires a Server Action to bridge the server-side image processing.
                </p>

                <div className="space-y-8">
                    <div className="space-y-4">
                        <h3 className="text-xl font-semibold text-neutral-900 dark:text-neutral-50" id="signature">Signature</h3>
                        <CodeBlock code={`usePlaceholder(imageUrl: string | null | undefined, action: PlaceholderAction, options?: PlaceholderOptions): UsePlaceholderReturn`} lang="ts" />
                    </div>

                    <div className="space-y-4">
                        <h3 className="text-xl font-semibold text-neutral-900 dark:text-neutral-50" id="returns">Returns</h3>
                        <CodeBlock code={`interface UsePlaceholderReturn {
  data: PlaceholderResult | null;  // { base64, color, metadata }
  isLoading: boolean;              // Loading state
  error: Error | null;             // Any error
  refetch: () => void;             // Manual refetch function
}`} lang="ts" />
                    </div>

                    <div className="space-y-4">
                        <h3 className="text-xl font-semibold text-neutral-900 dark:text-neutral-50" id="example">Example</h3>
                        <CodeBlock code={`'use client'
import Image from 'next/image'
import { usePlaceholder } from 'next-image-placeholder/react'
import { getPlaceholderAction } from './actions'

export function CustomCard({ src }: { src: string }) {
  const { data, isLoading } = usePlaceholder(src, getPlaceholderAction)

  if (isLoading || !data?.base64) return <Skeleton />

  return (
    <Image
        src={src}
        placeholder="blur"
        blurDataURL={data.base64}
        style={{ backgroundColor: data.color }}
        alt="Image"
        width={400}
        height={300}
    />
  )
}`} lang="tsx" />
                    </div>
                </div>
            </div>
        </div>
    );
}
