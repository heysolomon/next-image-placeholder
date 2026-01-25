'use client'

import { useState, useEffect, useCallback, useRef, useTransition } from 'react'
import type { PlaceholderResult, PlaceholderOptions } from './types/index.js'

/**
 * Server action type that client components pass to the hook.
 * Users create this in their own codebase with 'use server'.
 */
export type PlaceholderAction = (
    imageUrl: string,
    options?: PlaceholderOptions
) => Promise<PlaceholderResult>

/**
 * Hook return type
 */
export interface UsePlaceholderReturn {
    /** The placeholder data (base64, color, metadata) */
    data: PlaceholderResult | null
    /** Whether the placeholder is currently loading */
    isLoading: boolean
    /** Any error that occurred */
    error: Error | null
    /** Manually refetch the placeholder */
    refetch: () => void
}

/**
 * Simple in-memory cache for placeholder results
 */
const cache = new Map<string, PlaceholderResult>()

/**
 * React hook for using image placeholders in client components.
 * 
 * Since image processing requires Node.js (sharp), this hook calls
 * a user-provided server action to generate the placeholder.
 * Uses useTransition for proper Next.js Server Action integration.
 * 
 * @param imageUrl - The image URL to generate a placeholder for
 * @param action - Server action that wraps getPlaceholder
 * @param options - Optional placeholder generation options
 * @returns Object with data, isLoading, error, and refetch
 * 
 * @example
 * ```tsx
 * // 1. Create a server action (actions.ts)
 * 'use server'
 * import { getPlaceholder } from 'next-image-placeholder'
 * 
 * export async function getPlaceholderAction(imageUrl: string) {
 *   return getPlaceholder(imageUrl)
 * }
 * 
 * // 2. Use in client component
 * 'use client'
 * import { usePlaceholder } from 'next-image-placeholder/react'
 * import { getPlaceholderAction } from './actions'
 * 
 * function ImageCard({ src }) {
 *   const { data, isLoading } = usePlaceholder(src, getPlaceholderAction)
 *   
 *   return (
 *     <Image
 *       src={src}
 *       placeholder={data?.base64 ? 'blur' : 'empty'}
 *       blurDataURL={data?.base64}
 *       style={{ backgroundColor: data?.color ?? '#e5e7eb' }}
 *     />
 *   )
 * }
 * ```
 */
export function usePlaceholder(
    imageUrl: string | null | undefined,
    action: PlaceholderAction,
    options?: PlaceholderOptions
): UsePlaceholderReturn {
    const [data, setData] = useState<PlaceholderResult | null>(() => {
        // Check cache on initial render
        if (imageUrl) {
            const cached = cache.get(imageUrl)
            if (cached) return cached
        }
        return null
    })
    const [error, setError] = useState<Error | null>(null)
    const [isPending, startTransition] = useTransition()

    // Track the current imageUrl to handle race conditions
    const currentUrlRef = useRef(imageUrl)
    currentUrlRef.current = imageUrl

    const fetchPlaceholder = useCallback((url: string, skipCache = false) => {
        // Check cache first
        if (!skipCache) {
            const cached = cache.get(url)
            if (cached) {
                setData(cached)
                return
            }
        }

        setError(null)

        // Use startTransition for proper Server Action integration
        startTransition(async () => {
            try {
                const result = await action(url, options)

                // Only update state if this is still the current URL
                if (currentUrlRef.current === url) {
                    cache.set(url, result)
                    setData(result)
                }
            } catch (err) {
                if (currentUrlRef.current === url) {
                    setError(err instanceof Error ? err : new Error('Failed to generate placeholder'))
                }
            }
        })
    }, [action, options])

    useEffect(() => {
        if (!imageUrl) {
            setData(null)
            setError(null)
            return
        }

        // Check cache first
        const cached = cache.get(imageUrl)
        if (cached) {
            setData(cached)
            return
        }

        fetchPlaceholder(imageUrl)
    }, [imageUrl, fetchPlaceholder])

    const refetch = useCallback(() => {
        if (imageUrl) {
            fetchPlaceholder(imageUrl, true)
        }
    }, [imageUrl, fetchPlaceholder])

    // isLoading is true when pending or when we have a URL but no data yet
    const isLoading = isPending || (!!imageUrl && !data && !error)

    return { data, isLoading, error, refetch }
}

/**
 * Clears the placeholder cache.
 * Useful for testing or when images are updated.
 */
export function clearPlaceholderCache(): void {
    cache.clear()
}

// Re-export types for convenience
export type { PlaceholderResult, PlaceholderOptions }

